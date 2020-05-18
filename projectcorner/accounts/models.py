from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    is_student = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)

class Student(models.Model):
    user = models.OneToOneField(User , on_delete = models.CASCADE , primary_key = True)
    phone_number = models.CharField(max_length=12)
    email = models.EmailField(max_length=254)

    def __str__(self):
        return self.user.username

class Professor(models.Model):
    user = models.OneToOneField(User , on_delete = models.CASCADE , primary_key = True)
    department = models.CharField(max_length=12)


    def __str__(self):
        return self.user.username
