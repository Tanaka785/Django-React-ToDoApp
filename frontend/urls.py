from django.urls import path 
from . import views 

app_name = "frontend"

urlpatterns = [
    path("", views.index, name="index"),
    path("create", views.index, name="create-task"),
    path("tasks", views.index, name="tasks"),
    path("tasks/<int:task_id>/edit", views.index, name="edit-task")
]
