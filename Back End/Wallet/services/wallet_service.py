from rest_framework import serializers
from decimal import Decimal
from Wallet.models import Wallet, Transaction


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
            if transaction_type == 'REFUND':
                wallet.balance += amount
            elif transaction_type == 'PAYMENT':
                wallet.balance -= amount
            else:
                raise ValueError('Invalid transaction type.')

            wallet.save()

            if transaction_type == 'PAYMENT':
                amount = -amount

            Transaction.objects.create(
                wallet=wallet,
                amount=amount,
                transaction_type=transaction_type,
                transaction_id=transaction_id,
            )
        except Exception as e:
            raise serializers.ValidationError(
                {'detail': f'Failed to process transaction: {str(e)}'})
