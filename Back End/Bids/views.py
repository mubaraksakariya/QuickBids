from decimal import Decimal
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db import transaction
from rest_framework.permissions import IsAuthenticated, AllowAny

from Auction.models import Auction
from Customer.models import CustomUser
from Wallet.models import Transaction, Wallet
from .models import Bid, ProxyBid
from .serializers import BidSerializer, ProxyBidSerializer
import logging


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
            auction = Auction.objects.get(id=auction_id)

            # Check the existing highest bid
            highest_bid = Bid.objects.filter(auction=auction).order_by('-amount').first()
            if highest_bid and amount <= highest_bid.amount:
                transaction.set_rollback(True)
                return Response(
                    {'detail': 'Your bid must be higher than the current highest bid.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            if amount < auction.initial_prize:
                transaction.set_rollback(True)
                return Response(
                    {'detail': 'Your bid must be higher or equal to the initial prize.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            # Refund the highest bidder and update the wallet log
            if highest_bid:
                highest_bidder = highest_bid.user
                highest_bidder_wallet = Wallet.objects.get(user=highest_bidder)
                
                Transaction.objects.create(
                    wallet = highest_bidder_wallet,
                    amount = highest_bid.amount,
                    transaction_type = 'REFUND',
                    transaction_id = highest_bid.id,
                )
                
                highest_bidder_wallet.balance += highest_bid.amount
                highest_bidder_wallet.save()


            # Check for balance for new bidder
            new_bidder_wallet = Wallet.objects.get(user=user)
            if new_bidder_wallet.balance < amount:
                transaction.set_rollback(True)
                return Response(
                    {'detail': 'Insufficient balance in wallet, please top up your wallet and retry.'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Create the bid instance
            bid = Bid.objects.create(
                auction=auction,
                user=user,
                amount=amount
            )
            # Charge the new bidder
            new_bidder_wallet.balance -= amount
            new_bidder_wallet.save()
            
            # update the wallet log
            Transaction.objects.create(
                wallet = new_bidder_wallet,
                amount = -1 * amount,
                transaction_type = 'PAYMENT',
                transaction_id = bid.id,
            )

            return Response(BidSerializer(bid).data, status=status.HTTP_201_CREATED)

        except Auction.DoesNotExist:
            return Response({'detail': 'Auction not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Wallet.DoesNotExist:
            return Response({'detail': 'Wallet not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            transaction.set_rollback(True)
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=True, methods=['get'], url_path='highest-bid')
    def highest_bid(self, request, pk=None):
        try:
            auction = Auction.objects.get(id=pk)
            highest_bid = Bid.objects.filter(auction=auction).order_by('-amount').first()
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
            
            highest_bid = Bid.objects.filter(auction=auction, user=user).order_by('-amount').first()
            
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
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            auction_id = request.data.get('auction_id')
            try:
                auction = Auction.objects.get(id=auction_id)
            except Auction.DoesNotExist:
                return Response({'detail': 'Auction not found'}, status=status.HTTP_404_NOT_FOUND)

            # Additional logic for managing proxy bidding
            # Ensure to handle bid_step, max_bid, current_bid fields properly
            serializer.save(user=user, auction=auction)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
