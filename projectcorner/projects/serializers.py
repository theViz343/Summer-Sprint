from rest_framework import serializers
from .models import Application,Project
from accounts.models import Professor,Student
from django.contrib.auth.models import User
from django.conf import settings
from accounts.serializers import UserSerializer,ProfessorSerializer,StudentSerializer
from django.contrib.auth import get_user_model


class ProjectSerializer(serializers.ModelSerializer):

    professor = ProfessorSerializer(read_only=True)
    professor_id = serializers.PrimaryKeyRelatedField(queryset = Professor.objects.all(), source='professor', write_only=True)


    class Meta:
        model = Project
        fields= '__all__'

class ApplicationSerializer(serializers.ModelSerializer):

    project = ProjectSerializer(read_only=True)
    student = StudentSerializer(read_only=True)
    project_id = serializers.PrimaryKeyRelatedField(queryset = Project.objects.all(), source='project', write_only=True)
    student_id = serializers.PrimaryKeyRelatedField(queryset = Student.objects.all(), source='student', write_only=True)

    class Meta:
        model = Application
        fields = '__all__'
