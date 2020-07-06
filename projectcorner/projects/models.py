from django.db import models
from accounts.models import Professor,Student

class Project(models.Model):

    title=models.CharField(max_length=200)
    description=models.CharField(max_length=1000)
    tech_used=models.CharField(max_length=200)
    criterion=models.CharField(max_length=200, default="None")
    is_open = models.BooleanField(default=True)
    professor=models.ForeignKey('accounts.Professor', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class Application(models.Model):

    statement_of_purpose=models.CharField(max_length=1000)
    student = models.ForeignKey('accounts.Student', on_delete=models.CASCADE , default=None)
    project=models.ForeignKey(Project, on_delete=models.CASCADE)
    is_selected = models.BooleanField(default=False)
    resume = models.FileField(upload_to="resume" , default="default.pdf")

    def __str__(self):
        return self.name
