from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer
from django.contrib.auth import get_user_model




class UserViewSet(viewsets.ModelViewSet):

    serializer_class = UserSerializer

    def get_queryset(self):

        queryset = get_user_model().objects.all()
        username = self.request.query_params.get('username')

        if username is not None:
            queryset = get_user_model().objects.filter(username=username)

        return queryset
