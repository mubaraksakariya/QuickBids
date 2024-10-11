import requests
from django.conf import settings


class RazorpayService:

    @staticmethod
    def verify_bank_account(account_number, ifsc_code):
        url = "https://api.razorpay.com/v1/accounts/verify"
        headers = {
            "Authorization": f"Bearer {settings.RAZORPAY_KEY_ID}",
        }
        payload = {
            "account_number": account_number,
            "ifsc_code": ifsc_code,
        }

        response = requests.post(url, headers=headers, json=payload)
        print(response)
        if response.status_code == 200:
            return response.json()
        return None
