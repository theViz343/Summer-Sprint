from django.db import models
from accounts.models import Professor,Student
from taggit.managers import TaggableManager

class Applicationstatus(models.Model):
    status_name=models.CharField(max_length=1000)

    def __str__(self):
        return self.status_name

class Projectstatus(models.Model):
    status_name=models.CharField(max_length=1000)

    def __str__(self):
        return self.status_name


class Project(models.Model):

    title=models.CharField(max_length=200)
    description=models.CharField(max_length=1000)
    tech_used=TaggableManager(blank=True)
    criterion=models.CharField(max_length=200, default="None")
    project_status = models.ForeignKey(Projectstatus, on_delete=models.PROTECT, null=True)
    professor=models.ForeignKey('accounts.Professor', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Application(models.Model):

    statement_of_purpose=models.CharField(max_length=1000)
    student = models.ForeignKey('accounts.Student', on_delete=models.CASCADE , default=None)
    project=models.ForeignKey(Project, on_delete=models.CASCADE)
    application_status = models.ForeignKey(Applicationstatus, on_delete=models.PROTECT , null=True)
    resume = models.FileField(upload_to="resume" , default="default.pdf")
