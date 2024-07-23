from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404
from .models import Wallet, Transaction
from .serializers import WalletSerializer, TransactionSerializer




class WalletViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = WalletSerializer

    def get_queryset(self):
        return Wallet.objects.filter(user=self.request.user)
    
    def list(self, request, *args, **kwargs):
        wallet, created = Wallet.objects.get_or_create(user=self.request.user)
        serializer = self.get_serializer(wallet)
        return Response(serializer.data)
        



class TransactionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(wallet__user=self.request.user)

    def list(self, request, *args, **kwargs):
        wallet_transactions = self.get_queryset()
        serializer = self.get_serializer(wallet_transactions, many=True)
        return Response(serializer.data)
    

    def create(self, request, *args, **kwargs):
        wallet = get_object_or_404(Wallet, user=request.user)
        data = request.data.copy()
        data['wallet'] = wallet.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        transaction = serializer.instance
        if transaction.transaction_type == 'DEPOSIT':
            wallet.balance += transaction.amount
        elif transaction.transaction_type == 'WITHDRAWAL':
            if wallet.balance < transaction.amount:
                return Response({"error": "Insufficient funds"}, status=status.HTTP_400_BAD_REQUEST)
            wallet.balance -= transaction.amount
        wallet.save()
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
