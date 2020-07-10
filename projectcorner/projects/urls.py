from django.urls import path,include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'applications', views.ApplicationViewSet,basename="applications")
router.register(r'projects', views.ProjectViewSet,basename="projects")
router.register(r'techs',views.TechListViewSet,basename="techs")

urlpatterns=[

    path('api/',include(router.urls)),
    path('api-auth/',include('rest_framework.urls', namespace='rest_framework')),
]