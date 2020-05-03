from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.db import transaction
from django.forms.utils import ValidationError
from .models import (User , Student)


class StudentSignUpForm(UserCreationForm):
    phone_number = forms.CharField(max_length=12)
    email = forms.CharField(max_length=254)
    class Meta(UserCreationForm.Meta):
        model = User

    @transaction.atomic
    def save(self):
        user = super().save(commit = False)
        user.is_student = True
        user.save()
        student = Student.objects.create(user=user)
        student.phone_number = self.cleaned_data.get('phone_number')
        student.email = self.cleaned_data.get('email')
        return user


class TeacherSignUpForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User

    def save(self , commit=True):
        user = super().save(commit = False)
        user.is_teacher = True
        user.save()
        if commit:
            user.save()
        return user
