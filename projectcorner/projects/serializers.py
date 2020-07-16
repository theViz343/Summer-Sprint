from rest_framework import serializers
from .models import Application,Project,Applicationstatus,Projectstatus
from accounts.models import Professor,Student
from django.contrib.auth.models import User
from django.conf import settings
from accounts.serializers import UserSerializer,ProfessorSerializer,StudentSerializer
from django.contrib.auth import get_user_model
from taggit_serializer.serializers import (TagListSerializerField,TaggitSerializer)
from taggit.models import Tag
import six




class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Tag
        fields = ('id','name')

class NewTagListSerializerField(TagListSerializerField):
    def to_internal_value(self, value):
        if isinstance(value, six.string_types):
            value = value.split(',')

        if not isinstance(value, list):
            self.fail('not_a_list', input_type=type(value).__name__)

        for s in value:
            if not isinstance(s, six.string_types):
                self.fail('not_a_str')

            self.child.run_validation(s)
        return value


class ProjectstatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projectstatus
        fields = '__all__'

class ApplicationstatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applicationstatus
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):

    professor = ProfessorSerializer(read_only=True)
    project_status = ProjectstatusSerializer(read_only=True)
    professor_id = serializers.PrimaryKeyRelatedField(queryset = Professor.objects.all(), source='professor', write_only=True)
    project_status_id =  serializers.PrimaryKeyRelatedField(queryset = Projectstatus.objects.all(), source='project_status', write_only=True)
    tech_used=NewTagListSerializerField()

    def create(self,validated_data):
        tech_used = validated_data.pop('tech_used')
        instance = super(ProjectSerializer,self).create(validated_data)
        instance.tech_used.set(*tech_used)
        return instance
    def update(self,instance ,validated_data):
        tech_used = validated_data.pop('tech_used')
        instance = super(ProjectSerializer,self).update(instance,validated_data)
        instance.tech_used.set(*tech_used)
        return instance

    class Meta:
        model = Project
        fields= '__all__'

class ApplicationSerializer(serializers.ModelSerializer):

    project = ProjectSerializer(read_only=True)
    student = StudentSerializer(read_only=True)
    application_status = ApplicationstatusSerializer(read_only=True)
    project_id = serializers.PrimaryKeyRelatedField(queryset = Project.objects.all(), source='project', write_only=True)
    student_id = serializers.PrimaryKeyRelatedField(queryset = Student.objects.all(), source='student', write_only=True)
    application_status_id = serializers.PrimaryKeyRelatedField(queryset = Applicationstatus.objects.all(), source='application_status', write_only=True)

    class Meta:
        model = Application
        fields = '__all__'
