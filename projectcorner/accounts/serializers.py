from rest_framework import serializers
from django.conf import settings
from .models import Professor
from django.contrib.auth import get_user_model
from django.contrib.auth.validators import UnicodeUsernameValidator

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ['id','username','email','is_teacher','is_student']
        extra_kwargs = {
            'username':{
                'validators':[UnicodeUsernameValidator()],
            }
        }

class ProfessorSerializer(serializers.ModelSerializer):

    user = UserSerializer()

    class Meta:
        model = Professor
        fields = '__all__'
