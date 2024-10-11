# Generated by Django 5.0.6 on 2024-08-01 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Payments', '0004_alter_payment_transaction_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payment',
            name='transaction_type',
            field=models.CharField(choices=[('WALLET', 'Wallet'), ('RAZORPAY', 'Razorpay')], default='WALLET', max_length=10),
        ),
    ]
