from django.shortcuts import render,redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
# Create your views here.



def register(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        if username and password :
            messages.success(request,"You have logged in successfully")
            return redirect('blog-home')
    return render(request,'users/register.html')




