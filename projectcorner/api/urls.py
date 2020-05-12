from django.urls import include, path
from rest_framework_simplejwt import views as jwt_views
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('projects' , views.projectsViews.ProjectsListView)

urlpatterns = [
    path('token/',jwt_views.TokenObtainPairView.as_view() , name = "token_obtain_pair"),
    path('token/refresh/' , jwt_views.TokenRefreshView.as_view() , name= "token_refresh"),
    # path('rest-auth/registration/',include('rest_auth.registration.urls')),


    #projects urls here
    # path('projects/',views.projectsViews.ProjectsListView.as_view() , name="projects_list")
    path('' , include(router.urls)),
]
