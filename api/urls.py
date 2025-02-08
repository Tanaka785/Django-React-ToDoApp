from django.urls import path 
from . import views 

app_name = "frontend"

urlpatterns = [
    path('tasks', views.TaskSerializer.as_view(), name="create-task"),
    path('create-task', views.CreateTask.as_view(), name="create-task"),
]
