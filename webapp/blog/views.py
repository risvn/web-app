from django.shortcuts import render
from django.http import HttpResponse
from django import forms
from .models import Post
from django.views.generic import ListView,DetailView


from django.shortcuts import render



def home(request):
    context = {
        'posts':Post.objects.all()
    }
    return render(request, 'blog/home.html', context)


def about(request):
    return render(request, 'blog/about.html', {'title': 'About'})


class PostListView(ListView):
    model=Post
    context_object_name='posts'
    template_name='blog/home.html'
    ordering=['-date_posted']


class PostDetailView(DetailView):
    model=Post
 
