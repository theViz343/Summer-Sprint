from django.shortcuts import render
from rest_framework import viewsets
from .models import Application,Project
from .serializers import ApplicationSerializer,ProjectSerializer

class ApplicationViewSet(viewsets.ModelViewSet):

    serializer_class = ApplicationSerializer

    def get_queryset(self):

        queryset = Application.objects.all().order_by('-pk')
        project_id = self.request.query_params.get('project_id')
        student_id = self.request.query_params.get('student_id')

        if project_id is not None:
            queryset = queryset.filter(project__pk=project_id).order_by('-pk')

        if student_id is not None:
            queryset = queryset.filter(student__pk=student_id).order_by('-pk')

        return queryset

class ProjectViewSet(viewsets.ModelViewSet):

    serializer_class = ProjectSerializer

    def get_queryset(self):

        queryset = Project.objects.all().order_by('-pk')
        professor_id = self.request.query_params.get('professor_id')

        if professor_id is not None:
            queryset = queryset.filter(professor__pk=professor_id).order_by('-pk')

        return queryset
