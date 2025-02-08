from django.shortcuts import render
from rest_framework import generics, status 
from .models import Task 
from .serializers import TaskSerializer 
from rest_framework.views import APIView


# Create your views here.
class TaskSerializer(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class CreateTask(APIView):
    ...
