from django.urls import path 
from . import views 

app_name = "api"

urlpatterns = [
    path('tasks', views.TaskSerializerView.as_view(), name="tasks"),
    path('create-task', views.CreateTask.as_view(), name="create-task"),
    path('update-task', views.UpdateTask.as_view(), name="update-task"),
    path('delete/<int:task_id>', views.DeleteTask.as_view(), name="delete-task"),
]
