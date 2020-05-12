from django.db import models
from accounts.models import User


# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length = 100)
    short_description = models.CharField(max_length=200)
    detail = models.TextField()
    posted_by = models.ForeignKey(User , on_delete=models.CASCADE,related_name= "posted_by")
    applicants = models.ManyToManyField(User,related_name= "applicants")
