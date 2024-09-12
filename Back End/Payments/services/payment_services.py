from decimal import Decimal
from django.core.exceptions import ValidationError
from Payments.models import AccountDetail, CardDetail, UPIDetail, WithdrawalRequest
from cryptography.fernet import Fernet
from django.conf import settings


class PaymentService:
    @staticmethod
    def create_withdrawal_request_by_card(user, card_id, amount):
        try:
            card = CardDetail.objects.get(id=card_id, user=user)
            withdrawal_request = WithdrawalRequest.objects.create(
                user=user,
                card_number=card.card_number,
                amount=amount,
                type='CARD'
            )
            return withdrawal_request
        except CardDetail.DoesNotExist:
            raise ValidationError('Card detail not found.')

    @staticmethod
    def create_withdrawal_request_by_account(user, account_id, amount):
        try:
            account = AccountDetail.objects.get(id=account_id, user=user)
            withdrawal_request = WithdrawalRequest.objects.create(
                user=user,
                account_detail=account,
                amount=amount,
                type='ACCOUNT'
            )
            return withdrawal_request
        except AccountDetail.DoesNotExist:
            raise ValidationError('Account detail not found.')

    @staticmethod
    def create_withdrawal_request_by_upi(user, upi_id, amount):
        try:
            upi = UPIDetail.objects.get(id=upi_id, user=user)
            withdrawal_request = WithdrawalRequest.objects.create(
                user=user,
                upi_id=upi.upi_id,
                amount=amount,
                type='UPI'
            )
            return withdrawal_request
        except UPIDetail.DoesNotExist:
            raise ValidationError('UPI detail not found.')

    @staticmethod
    def create_card(user, card_number, cvv, valid_through, name_on_card):
        card, created = CardDetail.objects.get_or_create(
            user=user,
            card_number=card_number,
            defaults={
                'cvv': cvv,
                'valid_through': valid_through,
                'name_on_card': name_on_card,
                'type': 'DEBIT'  # or 'CREDIT' based on your requirement
            }
        )
        return card

    @staticmethod
    def create_account(user, account_number, ifsc_code, bank_name='unknown'):
        encryption_key = settings.ENCRYPTION_SECRET_KEY
        cipher = Fernet(encryption_key)

        encrypted_account_number = cipher.encrypt(account_number.encode())
        encrypted_ifsc_code = cipher.encrypt(ifsc_code.encode())

        account, created = AccountDetail.objects.get_or_create(
            user=user,
            account_number=encrypted_account_number,
            defaults={
                'ifsc_code': encrypted_ifsc_code,
                'bank_name': bank_name
            }
        )
        return account

    @staticmethod
    def create_upi(user, upi_id):
        upi, created = UPIDetail.objects.get_or_create(
            user=user,
            upi_id=upi_id
        )
        return upi
