from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def projects_posted(request):
    return HttpResponse("sir , you have posted these projects")


def projects_applied(request):
    return HttpResponse("heya you have applied to these projects")
