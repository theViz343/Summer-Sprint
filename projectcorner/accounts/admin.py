from django.contrib import admin
from .models import Professor,Student,User
from django.contrib.auth.admin import UserAdmin
from django.conf import settings
from django.contrib.auth import get_user_model



admin.site.register(Professor)
admin.site.register(Student)

UserAdmin.fieldsets += ('custom_fields_set', {'fields': ('is_student','is_teacher')}),

admin.site.register(get_user_model(),UserAdmin)
