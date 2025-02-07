from django.urls import path 
from . import views 

app_name = "frontend"

urlpatterns = [
    path('/create', views.CreateTaskView.as_view()),
]
