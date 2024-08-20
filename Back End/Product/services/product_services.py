from rest_framework import serializers
from Auction.services.auction_service import AuctionService
from Bids.services.bid_service import BidService


class ProductService:

    @staticmethod
    def check_product_buyable(product):
        if not product or not hasattr(product, 'id') or product.buy_now_prize is None:
            raise serializers.ValidationError(
                {'detail': 'Invalid product or missing attributes.'})

        # Retrieve the auction for the given product
        auction = AuctionService.get_auction_by_product(product_id=product.id)
        if auction is None:
            raise serializers.ValidationError(
                {'detail': 'Auction not found for this product.'})

        # Retrieve the highest bid for the auction
        highest_bid = BidService.get_highest_bid(auction=auction)
        if highest_bid is None:
            # No bids have been placed, so the product is buyable
            return

        # Check if the highest bid exceeds the buy now price
        if highest_bid.amount > product.buy_now_prize:
            raise serializers.ValidationError(
                {'detail': 'This product is not buyable, bid exceeded the buy now price.'}
            )
