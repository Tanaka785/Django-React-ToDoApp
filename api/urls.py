from django.urls import path 
from . import views 

app_name = "api"

urlpatterns = [
    path('tasks', views.TaskSerializerView.as_view(), name="tasks"),
    path('create-task', views.CreateTask.as_view(), name="create-task"),
]
