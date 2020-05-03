from django.urls import include , path

from . import views

urlpatterns = [
    # list if url patterns for students under namespace students
    path('students/',include(([
        path('projects_applied/' , views.projects_applied , name="projects_applied"),
    ] , 'projects'),namespace = 'students')),
    # list of all url patterns for teachrs under namespace teacher
    path('teachers/' , include(([
        path('projects_posted/' , views.projects_posted, name="projects_posted"),
    ] , 'projects') ,namespace = 'teachers')),
]
