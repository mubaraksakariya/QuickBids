from django.db import transaction
from decimal import Decimal

from rest_framework import serializers
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny

from Auction.models import Auction
from Auction.services.auction_service import AuctionService
from Bids.services.bid_service import BidService, ProxyBidService
from Customer.models import CustomUser
from Wallet.services.wallet_service import WalletService
from .models import Bid, ProxyBid
from .serializers import BidSerializer, ProxyBidSerializer


class BidViewSet(viewsets.ModelViewSet):
    queryset = Bid.objects.filter(is_deleted=False)
    serializer_class = BidSerializer
    # permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['highest_bid', ]:
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        try:
            user = request.user
            auction_id = request.data.get('auction_id')
            amount = Decimal(request.data.get('amount'))

            # Fetch the auction details
            auction = AuctionService.get_auction(auction_id)

            # Validate the bid amount and get the current highest bid if any
            highest_bid = BidService.validate_bid_amount(amount, auction)

            # Refund the highest bidder using WalletService
            if highest_bid:
                WalletService.process_transaction(
                    wallet=WalletService.get_wallet(highest_bid.user),
                    amount=highest_bid.amount,
                    transaction_type='REFUND',
                    transaction_id=highest_bid.id  # type: ignore
                )

            # Get the new bidder's wallet and check balance using WalletService
            new_bidder_wallet = WalletService.get_wallet(user)
            # Throws error if insufficient balance
            WalletService.has_wallet_balance(new_bidder_wallet, amount)

            # Create the bid instance using BidService
            bid = BidService.create_bid(auction, user, amount)

            # Charge the new bidder's wallet using WalletService
            WalletService.process_transaction(
                wallet=new_bidder_wallet,
                amount=amount,
                transaction_type='PAYMENT',
                transaction_id=bid.id  # type: ignore
            )
            # check if proxy bid available and works on it
            ProxyBidService.handle_proxy_bidding(auction=auction)
            return Response(BidSerializer(bid).data, status=status.HTTP_201_CREATED)

        except serializers.ValidationError as e:
            transaction.set_rollback(True)
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Decimal.InvalidOperation:  # type: ignore
            transaction.set_rollback(True)
            return Response({'detail': 'Invalid bid amount provided.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            transaction.set_rollback(True)
            return Response({'detail': 'An unexpected error occurred: ' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['get'], url_path='highest-bid')
    def highest_bid(self, request, pk=None):
        try:
            auction = Auction.objects.get(id=pk)
            highest_bid = Bid.objects.filter(
                auction=auction).order_by('-amount').first()
            if highest_bid:
                return Response(BidSerializer(highest_bid).data)
            else:
                return Response({'message': 'No bids'}, status=status.HTTP_200_OK)
        except Auction.DoesNotExist:
            return Response({'detail': 'Auction not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(str(e))
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], url_path='highest-bid-by-user')
    def highest_bid_by_user(self, request):
        auction_id = request.query_params.get('auction_id')
        user_id = request.query_params.get('user_id')

        if not auction_id or not user_id:
            return Response({'detail': 'Both auction_id and user_id are required.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            auction = Auction.objects.get(id=auction_id)
            user = CustomUser.objects.get(id=user_id)

            highest_bid = Bid.objects.filter(
                auction=auction, user=user).order_by('-amount').first()

            if highest_bid:
                return Response(BidSerializer(highest_bid).data)
            else:
                return Response({'message': 'No bids'}, status=status.HTTP_200_OK)

        except Auction.DoesNotExist:
            return Response({'detail': 'Auction not found'}, status=status.HTTP_404_NOT_FOUND)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(str(e))
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class ProxyBidViewSet(viewsets.ModelViewSet):
    queryset = ProxyBid.objects.filter(is_deleted=False)
    serializer_class = ProxyBidSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'], url_path='place-proxy-bid')
    def place_proxy_bid(self, request):
        data = request.data.copy()
        data['user'] = request.user.id

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            user = request.user
            auction_id = request.data.get('auction')
            max_bid = Decimal(request.data.get('max_bid'))
            bid_step = Decimal(request.data.get('bid_step'))

            try:
                auction = AuctionService.get_auction(auction_id)

                # Checks:
                # 1. A higher or equal proxy bid does not already exist.
                # 2. The max_bid is greater than the current highest bid.
                # throws error if any
                ProxyBidService.validate_proxy_bid(auction, max_bid)

                # Create the proxy bid
                proxy_bid = ProxyBidService.create_proxy_bid(
                    user=user,
                    auction=auction,
                    max_bid=max_bid,
                    bid_step=bid_step
                )

                # Handle proxy bidding logic,ie, create the first bid if valid
                ProxyBidService.handle_proxy_bidding(auction=auction)

                # Serialize and return the response data
                serializer = self.get_serializer(proxy_bid)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except serializers.ValidationError as e:
                return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
            except Auction.DoesNotExist:
                return Response({'detail': 'Auction not found'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                return Response({'detail': 'An unexpected error occurred: ' + str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
