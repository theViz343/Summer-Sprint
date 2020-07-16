from django.shortcuts import render
from rest_framework import viewsets
from .models import Application,Project
from .serializers import ApplicationSerializer,ProjectSerializer,TagSerializer
from rest_framework.permissions import BasePermission ,IsAuthenticated
from rest_framework.parsers import FormParser , MultiPartParser
from taggit.models import Tag

class IsTeacher(BasePermission):
    def has_permission(self,request,view):
        if request.user.is_teacher:
            return True
        else:
            return False

class IsStudent(BasePermission):
    def has_permission(self,request , view):
        if request.user.is_student:
            return True
        else:
            return False


class TechListViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer

    def get_queryset(self):
        queryset = Tag.objects.all()
        return queryset


class ApplicationViewSet(viewsets.ModelViewSet):

    parser_classes = (MultiPartParser , FormParser)
    serializer_class = ApplicationSerializer

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [IsAuthenticated ,IsStudent]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]


    def get_queryset(self):

        queryset = Application.objects.all().order_by('-pk')
        project_id = self.request.query_params.get('project_id')
        student_id = self.request.query_params.get('student_id')
        status = self.request.query_params.get('status')

        if project_id is not None:
            queryset = queryset.filter(project__pk=project_id).order_by('-pk')

        if student_id is not None:
            queryset = queryset.filter(student__pk=student_id).order_by('-pk')

        if status is not None :
            if status == "all":
                queryset = queryset.filter(project__pk=project_id).order_by('-pk')
            elif status == "selected" :
                queryset = queryset.filter(application_status__pk=1).filter(project__pk=project_id).order_by('-pk')
            else :
                queryset = queryset.filter(application_status__pk=2).filter(project__pk=project_id).order_by('-pk')

        return queryset

class ProjectViewSet(viewsets.ModelViewSet):

    serializer_class = ProjectSerializer


    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [IsAuthenticated , IsTeacher]
        else:
            permission_classes = [IsAuthenticated ]
        return [permission() for permission in permission_classes]

    def get_queryset(self):

        queryset = Project.objects.all().order_by('-pk')
        professor_id = self.request.query_params.get('professor_id')

        if professor_id is not None:
            queryset = queryset.filter(professor__pk=professor_id).order_by('-pk')

        return queryset
