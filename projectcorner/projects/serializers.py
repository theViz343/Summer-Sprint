from rest_framework import serializers
from .models import Project

class ProjectSerializer(serializers.ModelSerializer):
    # url =  serializers.HyperlinkedIdentityField(view_name = )
    class Meta:
        model = Project
        fields = ('id' , 'url' , 'name' , 'short_description','detail','posted_by','applicants')
