from django.db import models
from django.contrib.auth.models import (
    BaseUserManager,
    AbstractBaseUser,
    PermissionsMixin,
)


class UserManager(BaseUserManager):
    def create_user(self, email, username, name, surname, password, **extra_fields):
        if not email:
            raise ValueError("The email must be set")

        email = self.normalize_email(email)
        user = self.model(
            email=email, username=username, name=name, surname=surname, **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=20, unique=False)
    surname = models.CharField(max_length=20, unique=False)
    email = models.EmailField(unique=True)
    following = models.ManyToManyField(
        "self", symmetrical=False, related_name="followers", blank=True
    )
    image = models.ImageField(upload_to="users/", blank=True, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"

    is_active = models.BooleanField(default=True)  # important
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    def __str__(self):
        return str(self.email)
