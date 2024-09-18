from django.db.models.signals import post_save
from django.dispatch import receiver

from Payments.services.payment_services import PaymentService
from .models import WithdrawalRequest


@receiver(post_save, sender=WithdrawalRequest)
def handle_withdrawal_request_save(sender, instance, created, **kwargs):
    if created:
        print(f"New withdrawal request created: {instance}")
    else:
        PaymentService.create_withdrawal_update_notification(
            withdrawal_request=instance)
