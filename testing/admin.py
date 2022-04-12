from django.contrib import admin
from .models import Canvas, Pixel, TempUser

for cl in [Canvas, Pixel, TempUser]:
    admin.site.register(cl)

# Register your models here.
