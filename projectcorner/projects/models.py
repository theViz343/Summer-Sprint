from django.db import models
from accounts.models import Professor

class Project(models.Model):

    title=models.CharField(max_length=200)
    description=models.CharField(max_length=1000)
    tech_used=models.CharField(max_length=200)
    criterion=models.CharField(max_length=200, default="None")
    professor=models.ForeignKey('accounts.Professor', on_delete=models.CASCADE)


    def __str__(self):
        return self.title

class Application(models.Model):

    name=models.CharField(max_length=200)
    enrollment_id=models.CharField(max_length=20)
    email_id=models.EmailField(max_length=200)
    department=models.CharField(max_length=60)
    cgpa=models.CharField(max_length=10)
    statement_of_purpose=models.CharField(max_length=1000)
    project=models.ForeignKey(Project, on_delete=models.CASCADE)


    def __str__(self):
        return self.name
