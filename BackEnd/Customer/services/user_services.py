from Customer.models import CustomUser


class UserServices:
    @staticmethod
    def get_all_super_users():
        return CustomUser.objects.filter(is_superuser=True)
