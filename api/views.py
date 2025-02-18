from django.shortcuts import render
from rest_framework import generics, status 
from .models import Task 
from .serializers import TaskSerializer, UpdateTaskSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist

class TaskSerializerView(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class CreateTask(APIView):
    serializer_class = TaskSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            task = serializer.data.get("title")
            # create the task.
            task = Task(title=task)
            task.save()
            return Response(TaskSerializer(task).data, status=status.HTTP_201_CREATED)
        else: 
            return Response({'Bad Request': 'Invalid Task'}, status=status.HTTP_400_BAD_REQUEST)


class UpdateTask(APIView):
    serializer_class = UpdateTaskSerializer 

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        # handle the updating of the task object.
        task_id = request.data.get("id")
        serializer = self.serializer_class(data=request.data)
        # print(serializer.initial_data)
        if serializer.is_valid():
            # get the values passed from the frontend.
            title = serializer.data.get("title")
            completed = serializer.data.get("completed")
            tasks = Task.objects.filter(id=task_id)
            # checks if the task object exists.
            if tasks.exists():
                task = tasks[0]
                task.title = title
                task.completed = completed 
                task.save(update_fields=['completed', 'title'])
                return Response({'Task Updated': 'Task was updated successfully'}, status=status.HTTP_200_OK)
            return Response({'Bad Request': 'Invalid task id passed.'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'Bad Request': 'Invalid data passed.'}, status=status.HTTP_400_BAD_REQUEST)


class DeleteTask(APIView):
    def delete(self, request, task_id, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        try: 
            task = Task.objects.get(id=task_id)
        except ObjectDoesNotExist:
            return Response({'Bad Request': 'Task object with the provided ID does not exist...'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            task.delete()
            return Response({'response': 'Task deleted Successfully'}, status=status.HTTP_204_NO_CONTENT)
    

class GetTask(APIView):
    serializer_class = TaskSerializer
    lookup_url_kwarg = 'id'

    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        id = self.request.GET.get(self.lookup_url_kwarg)
        try: 
            task = Task.objects.get(id=id)
        except:
            return Response({'Bad Request': 'Invalid Task Id passed'}, status=status.HTTP_404_NOT_FOUND)
        else: 
            room_data= TaskSerializer(task).data 
            return Response(room_data, status=status.HTTP_200_OK)