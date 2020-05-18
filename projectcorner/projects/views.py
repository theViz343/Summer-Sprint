from django.shortcuts import render
from rest_framework import viewsets
from .models import Application,Project
from .serializers import ApplicationSerializer,ProjectSerializer



class ApplicationViewSet(viewsets.ModelViewSet):

    serializer_class = ApplicationSerializer

    def get_queryset(self):

        queryset = Application.objects.all()
        project_id = self.request.query_params.get('project_id')

        if project_id is not None:
            queryset = Application.objects.filter(project__pk=project_id)

        return queryset

class ProjectViewSet(viewsets.ModelViewSet):

    serializer_class = ProjectSerializer

    def get_queryset(self):

        queryset = Project.objects.all()
        professor_id = self.request.query_params.get('professor_id')

        if professor_id is not None:
            queryset = Project.objects.filter(professor__pk=professor_id)

        return queryset
