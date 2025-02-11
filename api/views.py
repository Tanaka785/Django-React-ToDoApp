from django.shortcuts import render
from rest_framework import generics, status 
from .models import Task 
from .serializers import TaskSerializer 
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

# Create your views here.
class TaskSerializerView(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class CreateTask(APIView):
    serializer_class = TaskSerializer

    def post(self, request, format=None):
        # creates a session.
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        print(serializer.initial_data)
        if serializer.is_valid():
            task = serializer.data.get("title")
            # create the task.
            task = Task(title=task)
            task.save()
            return Response(TaskSerializer(task).data, status=status.HTTP_200_OK)
        else: 
            return Response({'Bad Request': 'Invalid Task'}, status=status.HTTP_400_BAD_REQUEST)


            


