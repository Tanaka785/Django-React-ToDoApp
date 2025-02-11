from django.shortcuts import render
from rest_framework import generics, status 
from .models import Task 
from .serializers import TaskSerializer, UpdateTaskSerializer
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
        CreateUserSession.create_session()

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


class UpdateTask(APIView):
    serializer_class = UpdateTaskSerializer 

    def patch(self, request, format=None):
        # create user session.
        CreateUserSession.create_session()
        # handle the updating of the task object.
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # get the values passed.
            task_id = serializer.data.get("task_id")
            completed = serializer.data.get("completed")
            # get the task object with the passed id.
            tasks = Task.objects.filter(id=task_id)
            # checks if the task object exists.
            if tasks.exists():
                task = tasks[0]
                task.completed = completed 
                task.save(update_fields=['completed'])
                return Response({'Task Updated': 'Task was updated successfully'}, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'Invalid task id passed.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid data passed.'}, status=status.HTTP_400_BAD_REQUEST)

class CreateUserSession(APIView):
    def create_session(self):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()            


