from django.db import models

# Create your models here.


class Canvas(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    data = models.TextField()

    def __str__(self):
        return self.title


class Pixel(models.Model):
    canvas = models.ForeignKey(Canvas, on_delete=models.CASCADE, related_name="pixels")
    position = models.PositiveIntegerField()
    color = models.PositiveSmallIntegerField()

    def __str__(self):
        return "Pixel at ({0}, {1})".format(self.position%250, self.position//250)



