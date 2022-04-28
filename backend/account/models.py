from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

def logo_upload_location(instance, filename):
    
    print(instance.company_name)
    file_path = f"logos/{instance.company_name}/{filename}"

    return file_path

class AccountManager(BaseUserManager):

    def create_user(self, email, company_name, password=None):

        user = self.model(
            email=self.normalize_email(email),
            company_name=company_name
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, company_name, password):

        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
            company_name=company_name
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    company_name = models.CharField(
        verbose_name="company name", max_length=30, unique=True)
    date_joined = models.DateTimeField(
        verbose_name='date joined', auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    logo = models.ImageField(upload_to=logo_upload_location, default=None, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['company_name']

    objects = AccountManager()

    def __str__(self):
        return self.company_name

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True
