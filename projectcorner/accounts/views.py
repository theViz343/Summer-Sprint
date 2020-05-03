from django.shortcuts import render , redirect
from django.views.generic import TemplateView , CreateView
from .forms import StudentSignUpForm , TeacherSignUpForm
from .models import User , Student
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login

# Create your views here.
class SignUpView(TemplateView):
    template_name = 'accounts/signup.html'


def home(request):
    if request.user.is_authenticated:
        if request.user.is_teacher:
            return redirect('teachers:projects_posted')
        else:
            return redirect('students:projects_applied')
    return render(request , 'accounts/home.html')


class StudentSignUpView(CreateView):
    model = User
    form_class = StudentSignUpForm
    template_name = 'accounts/signup_form.html'

    def get_context_data(self , **kwargs):
        kwargs['user_type'] = 'student'
        return super().get_context_data(**kwargs)

    def form_valid(self , form):
        user = form.save()
        login(self.request , user)
        return redirect('students:projects_applied')

class TeacherSignUpView(CreateView):
    model = User
    form_class = TeacherSignUpForm
    template_name = 'accounts/signup_form.html'

    def get_context_data(self , **kwargs):
        kwargs['user_type'] = 'teacher'
        return super().get_context_data(**kwargs)

    def form_valid(self , form):
        user = form.save()
        login(self.request , user)
        return redirect('teachers:projects_posted')
