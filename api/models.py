from django.db import models

# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=50)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    description = models.CharField(max_length=127, null=True, blank=True)
