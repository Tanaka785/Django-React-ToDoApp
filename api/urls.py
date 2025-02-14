from django.urls import path 
from . import views 

app_name = "api"

urlpatterns = [
    path('tasks', views.TaskSerializerView.as_view(), name="tasks"),
    path('tasks/active', views.GetActiveTasks.as_view(), name="active-tasks"),
    path('tasks/completed', views.GetCompletedTasks.as_view(), name="completed-tasks"),
    path('create-task', views.CreateTask.as_view(), name="create-task"),
    path('update-task', views.UpdateTask.as_view(), name="update-task"),
]
