# Generated by Django 5.0.6 on 2024-08-01 12:30

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Payments', '0005_alter_payment_transaction_type'),
        ('Product', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='payment',
            name='item',
        ),
        migrations.AddField(
            model_name='payment',
            name='product',
            field=models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='Product.product'),
        ),
    ]
