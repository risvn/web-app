from django.shortcuts import render,redirect,get_object_or_404
from django.http import HttpResponse
from django.contrib.auth.models import User
from django import forms
from .models import Post
from django.views.generic import ListView,DetailView
from django.contrib.auth.decorators import login_required

from django.shortcuts import render





def home(request):
    context = {
        'posts': Post.objects.all().order_by('-date_posted'),
        'users': User.objects.all(),

    }

    return render(request, 'blog/home.html', context)





def about(request):
    return render(request, 'blog/about.html', {'title': 'About'})

@login_required
def post_create(request):
    if request.method=="POST":
        title=request.POST.get("title")
        content=request.POST.get("content")
        author=request.user


        Post.objects.create(title=title, content=content,author=author)

        return redirect("blog-home")


    return render(request, "blog/post_create.html")


#  BUG(post_update):fix logic for only author can edit the post

@login_required
def post_update(request,pk):
    post=get_object_or_404(Post,pk=pk)
    
    if request.user != post.author:
        return HttpResponse("<h1> 403 Forbidden </h1>")

    if request.method=="POST" and request.user==post.author:
        post.title=request.POST.get("title")
        post.content=request.POST.get("content")
        post.save()
        return redirect("blog-home")

    return render(request, "blog/post_update.html", {"post": post})



@login_required
def post_delete(request,pk):
    post=get_object_or_404(Post,pk=pk)

    if request.user != post.author:
        return HttpResponse("<h1> 403 Forbidden </h1>")

    if request.method=="GET" and request.user==post.author:
       post.delete()
       return redirect("blog-home")
    return redirect("blog-home")


class PostDetailView(DetailView):
    model=Post
 
