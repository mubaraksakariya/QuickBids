from rest_framework import serializers
from decimal import Decimal
from Wallet.models import Wallet, Transaction
from django.db.models import Sum


class WalletService:

    @staticmethod
    def get_wallet(user):
        """
        Retrieve the wallet for a given user.
        """
        try:
            return Wallet.objects.get(user=user)
        except Wallet.DoesNotExist:
            raise serializers.ValidationError({'detail': 'Wallet not found.'})

    @staticmethod
    def has_wallet_balance(wallet, amount):
        """
        Check if the wallet has sufficient balance.
        """
        if wallet.balance < amount:
            raise serializers.ValidationError(
                {'detail': 'Insufficient balance in wallet, please top up your wallet and retry.'}
            )
        return True

    @staticmethod
    def process_transaction(wallet, amount, transaction_type, transaction_id):
        """
        General method to handle wallet transactions.
        This method can be used to charge or refund a wallet depending on the transaction type.
        """
        try:
            if transaction_type == 'REFUND' or transaction_type == 'AUCTION_SALE' or transaction_type == 'WITHDRAWAL_FAILED':
                wallet.balance += amount
            elif transaction_type == 'PAYMENT' or transaction_type == 'AUCTION_BUY_NOW' or transaction_type == 'WITHDRAWAL':
                wallet.balance -= amount
                amount = -amount

            else:
                raise ValueError('Invalid transaction type.')

            wallet.save()

            Transaction.objects.create(
                wallet=wallet,
                amount=amount,
                transaction_type=transaction_type,
                transaction_id=transaction_id,
            )
        except Exception as e:
            raise serializers.ValidationError(
                {'detail': f'Failed to process transaction: {str(e)}'})

    @staticmethod
    def total_spend_by_user(user):
        try:
            # Ensure to handle Wallet not found
            wallet = Wallet.objects.get(user=user)

            # Aggregate spend amounts from transactions
            spend_amount = Transaction.objects.filter(
                wallet=wallet,
                transaction_type__in=['PAYMENT', 'AUCTION_BUY_NOW']
            ).aggregate(spend_amount=Sum('amount'))['spend_amount'] or 0

            # Aggregate refund amounts from transactions
            total_refunds = Transaction.objects.filter(
                wallet=wallet,
                transaction_type='REFUND'
            ).aggregate(refunds=Sum('amount'))['refunds'] or 0

            # Calculate total spend by subtracting refunds from spend amounts
            total_spend = spend_amount - total_refunds

            return total_spend

        except Wallet.DoesNotExist:
            # Handle the case where the wallet does not exist for the user
            return 0
        except Exception as e:
            # Handle other possible exceptions
            print(f"An error occurred: {e}")
            return 0
