from . import views
from django.urls import path
from .views import PostListView,PostDetailView


urlpatterns=[
        path('',PostListView.as_view(),name='blog-home'),
        path('post/<int:pk>',PostDetailView.as_view(),name='post-detail'),
        path('update/<int:pk>',views.post_update,name='post-update'),
        path('delete/<int:pk>',views.post_delete,name='post-delete'),
        path('about/',views.about,name='blog-about'),
        path('create/',views.post_create,name='post-create'),
]
