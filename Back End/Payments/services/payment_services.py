from decimal import Decimal
from django.core.exceptions import ValidationError
from Payments.models import AccountDetail, CardDetail, UPIDetail, WithdrawalRequest
from cryptography.fernet import Fernet
from django.conf import settings
import hashlib


class PaymentService:
    @staticmethod
    def create_withdrawal_request_by_card(user, card_id, amount):
        try:
            card = CardDetail.objects.get(id=card_id, user=user)
            withdrawal_request = WithdrawalRequest.objects.create(
                user=user,
                card_detail=card,
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
                upi_detail=upi,
                amount=amount,
                type='UPI'
            )
            return withdrawal_request
        except UPIDetail.DoesNotExist:
            raise ValidationError('UPI detail not found.')

    @staticmethod
    def create_card(user, card_number, cvv, valid_through, name_on_card):
        encryption_key = settings.ENCRYPTION_SECRET_KEY
        cipher = Fernet(encryption_key)

        encrypted_cvv = cipher.encrypt(cvv.encode())
        encrypted_card_number = cipher.encrypt(card_number.encode())

        # for identifying card, encripted data cannot be used in get_or_create
        card_hash = hashlib.sha256(card_number.encode()).hexdigest()

        card, created = CardDetail.objects.get_or_create(
            user=user,
            card_hash=card_hash,
            defaults={
                'card_number': encrypted_card_number,
                'cvv': encrypted_cvv,
                'valid_through': valid_through,
                'name_on_card': name_on_card,
                'type': 'DEBIT'
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
        encryption_key = settings.ENCRYPTION_SECRET_KEY
        cipher = Fernet(encryption_key)

        encrypted_upi_id = cipher.encrypt(upi_id.encode())

        # for identifying upi id, encripted data cannot be used in get_or_create
        upi_id_hash = hashlib.sha256(upi_id.encode()).hexdigest()

        upi, created = UPIDetail.objects.get_or_create(
            user=user,
            upi_id_hash=upi_id_hash,
            defaults={
                'upi_id': encrypted_upi_id
            }
        )
        return upi
