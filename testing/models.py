from django.db import models

# Create your models here.


class Canvas(models.Model):
    description = models.CharField(max_length=200)
    data = models.TextField()
