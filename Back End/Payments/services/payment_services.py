from decimal import Decimal
from django.core.exceptions import ValidationError
from Payments.models import WithdrawalRequest


class PaymentService:

    @staticmethod
    def create_withdrawal_request(user, account_number, ifsc_code, amount):
        try:
            # Ensure the amount is a Decimal
            amount = Decimal(amount)

            # Create the withdrawal request
            withdrawal_request = WithdrawalRequest.objects.create(
                user=user,
                account_number=account_number,
                ifsc_code=ifsc_code,
                amount=amount
            )

            return withdrawal_request

        except ValidationError as e:
            raise ValidationError(f"Validation Error: {str(e)}")
        except Exception as e:
            raise Exception(f"An unexpected error occurred: {str(e)}")
