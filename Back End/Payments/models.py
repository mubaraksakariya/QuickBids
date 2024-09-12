from pickle import TRUE
from django.db import models
from Customer.models import CustomUser
from Product.models import Product
from django.conf import settings
from cryptography.fernet import Fernet


class CardDetail(models.Model):
    TYPE_CHOICES = [
        ('DEBIT', 'Debit'),
        ('CREDIT', 'Credit'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    type = models.CharField(
        max_length=20, choices=TYPE_CHOICES, default='DEBIT')
    card_number = models.BinaryField()
    cvv = models.BinaryField()
    valid_through = models.DateField()
    name_on_card = models.CharField(max_length=50)
    last_four_digits = models.CharField(max_length=4, editable=False)

    def save(self, *args, **kwargs):
        encryption_key = settings.ENCRYPTION_SECRET_KEY
        cipher = Fernet(encryption_key)

        if isinstance(self.card_number, str):
            self.card_number = cipher.encrypt(self.card_number.encode())
        if isinstance(self.cvv, str):
            self.cvv = cipher.encrypt(self.cvv.encode())

        # Store last 4 digits for display purposes
        self.last_four_digits = self.card_number[-4:].decode()  # type: ignore

        super().save(*args, **kwargs)

    def __getattribute__(self, name):
        value = super().__getattribute__(name)
        if name in ['card_number', 'cvv']:
            encryption_key = settings.ENCRYPTION_SECRET_KEY
            cipher = Fernet(encryption_key)
            return cipher.decrypt(value).decode()
        return value


class AccountDetail(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    account_number = models.BinaryField()
    ifsc_code = models.BinaryField()
    bank_name = models.CharField(max_length=100, null=True, blank=True)

    def save(self, *args, **kwargs):
        encryption_key = settings.ENCRYPTION_SECRET_KEY
        cipher = Fernet(encryption_key)

        if isinstance(self.account_number, str):
            self.account_number = cipher.encrypt(self.account_number.encode())
        if isinstance(self.ifsc_code, str):
            self.ifsc_code = cipher.encrypt(self.ifsc_code.encode())

        super().save(*args, **kwargs)

    def get_account_number(self):
        encryption_key = settings.ENCRYPTION_SECRET_KEY
        cipher = Fernet(encryption_key)
        return cipher.decrypt(self.account_number).decode()

    def get_ifsc_code(self):
        encryption_key = settings.ENCRYPTION_SECRET_KEY
        cipher = Fernet(encryption_key)
        return cipher.decrypt(self.ifsc_code).decode()


class UPIDetail(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL,
                             on_delete=models.CASCADE)
    upi_id = models.BinaryField()

    def save(self, *args, **kwargs):
        encryption_key = settings.ENCRYPTION_SECRET_KEY
        cipher = Fernet(encryption_key)

        if isinstance(self.upi_id, str):
            self.upi_id = cipher.encrypt(self.upi_id.encode())

        super().save(*args, **kwargs)

    def __getattribute__(self, name):
        value = super().__getattribute__(name)
        if name == 'upi_id':
            encryption_key = settings.ENCRYPTION_SECRET_KEY
            cipher = Fernet(encryption_key)
            return cipher.decrypt(value).decode()
        return value


class Payment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, null=True, default=None)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    TRANSACTION_TYPE_CHOICES = [
        ('WALLET', 'Wallet'),
        ('RAZORPAY', 'Razorpay'),
    ]
    transaction_type = models.CharField(
        max_length=10, choices=TRANSACTION_TYPE_CHOICES, default='WALLET')
    transaction_id = models.CharField(max_length=255, default=None)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment by {self.user.email} - {self.amount}"


class WithdrawalRequest(models.Model):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('REJECTED', 'Rejected'),
        ('COMPLETED', 'Completed'),
        ('FAILED', 'Failed'),
    ]
    TYPE_CHOICES = [
        ('ACCOUNT', 'Account'),
        ('UPI', 'upi'),
        ('CARD', 'card')
    ]
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    type = models.CharField(
        max_length=10,
        choices=TYPE_CHOICES,
        default='ACCOUNT'
    )
    # Linking with payment methods
    account_detail = models.ForeignKey(
        AccountDetail, on_delete=models.SET_NULL, null=True, blank=True)
    card_detail = models.ForeignKey(
        CardDetail, on_delete=models.SET_NULL, null=True, blank=True)
    upi_detail = models.ForeignKey(
        UPIDetail, on_delete=models.SET_NULL, null=True, blank=True)

    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='PENDING'
    )
    requested_at = models.DateTimeField(auto_now_add=True)
    processed_at = models.DateTimeField(auto_now=True)
    failure_reason = models.TextField(blank=True)

    class Meta:
        ordering = ['-requested_at']

    def __str__(self):
        return f'Withdrawal Request {self.user.email}'  # type: ignore

    def mark_as_completed(self):
        self.status = 'COMPLETED'
        self.save()

    def mark_as_failed(self, reason):
        self.status = 'FAILED'
        self.failure_reason = reason
        self.save()
