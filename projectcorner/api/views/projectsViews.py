from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status , viewsets

from projects.models import Project
from projects.serializers import ProjectSerializer

class ProjectsListView(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
