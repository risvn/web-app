import json
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.contrib import messages
# Create your views here.



def register(request):
    if request.method == "POST":
       try:
            data=json.loads(request.body)
            username=data.get("username")
            password=data.get("password")
            email=data.get("email")
            
              #  Check if username already exists
            if User.objects.filter(username=username).exists():
                 return JsonResponse({"success": False, "message": "Username already exists"})
            #creating the user
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()

            return JsonResponse({"success": True, "message": "User registered successfully!","redirect_url":"/login/"})

        
       except Exception as e:
            return JsonResponse({"success": False, "message": f"Error: {str(e)}"})
    return render(request,'users/register.html')
    



def login_view(request):
    if request.method=="POST":
        data=json.loads(request.body)
        username=data.get("username")
        password=data.get("password")
        user=authenticate(request,username=username,password=password)
        if user is not None:
            login(request,user)
            return JsonResponse({"success": True, "message": "You login successfully!","redirect_url":"/blog/"})
        else:
            return JsonResponse({"success": False, "message": "Please enter the valid user and password"})
    return render(request,'users/login.html')



def logout_view(request):
    logout(request)  # clears session + cookie
    return render(request,'users/logout.html')
