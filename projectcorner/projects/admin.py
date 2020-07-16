from django.contrib import admin

from .models import Project,Application,Applicationstatus,Projectstatus


admin.site.register(Application)
admin.site.register(Project)
admin.site.register(Applicationstatus)
admin.site.register(Projectstatus)
