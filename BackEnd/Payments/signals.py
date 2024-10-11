from django.db.models.signals import post_save
from django.dispatch import receiver

from Customer.services.user_services import UserServices
from Notifications.models import Notification
from Notifications.services.notification_service import NotificationService
from Payments.services.payment_services import PaymentService
from .models import WithdrawalRequest


@receiver(post_save, sender=WithdrawalRequest)
def handle_withdrawal_request_save(sender, instance, created, **kwargs):
    if created:
        print(f"New withdrawal request created: {instance}")
        # create notification for all admin users, (is_superuser)
        all_admins = UserServices.get_all_super_users()
        message = f'New withdrawal request by {instance.user.email} has been created, check it out'
        type = 'WITHDRAWALREQUEST'
        for user in all_admins:
            NotificationService.create_notification(
                user=user,
                message=message,
                type=type,
                withdrawal_request=instance
            )
    else:
        PaymentService.create_withdrawal_update_notification(
            withdrawal_request=instance)
