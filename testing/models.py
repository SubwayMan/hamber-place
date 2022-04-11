from django.db import models

# Create your models here.


class Canvas(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    data = models.TextField()

    def __str__(self):
        return self.title
