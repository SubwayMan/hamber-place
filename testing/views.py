from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template import loader
from .models import Canvas, Pixel, TempUser
from django.views.decorators.csrf import ensure_csrf_cookie
from django.db.models import F
from rest_framework import viewsets


import json
import datetime
# Create your views here.
def say_hello(request):
    return HttpResponse("Hello World")

@ensure_csrf_cookie
def homepage(request):
    template = loader.get_template("index.html")
    return HttpResponse(template.render())

def ajax_get_canvas(request):
    canvas = Canvas.objects.filter(title="testcanvas")[0]
    field = ["0" for i in range(250**2)]
    for pixel in canvas.pixels.all():
        field[pixel.position] = pixel.color

    data = {
        "board": "".join(field)
    }
    return JsonResponse(data, status=200)

def ajax_update_canvas(request):
    post_data = json.load(request)
    if not check_fields(post_data, (str, "auth"), (int, "pixel"), (str, "color")):
        return JsonResponse({"message": "Badly formatted request"}, status=400)

    if not 0 <= post_data["pixel"] < 250**2:
        return JsonResponse({"message": "Bad pixel placement"}, status=400)

    if not 0 <= int(post_data["color"], 16) < 16:
        return JsonResponse({"message": "Invalid color"}, status=400)
    
    user = TempUser.objects.filter(userId=post_data["auth"])
    if user:
        user = user[0]
    else:
        return JsonResponse({"message": "user id not found"}, status=400)
    
    currentTime = datetime.datetime.now(datetime.timezone.utc)
    if (currentTime - user.lastPost).total_seconds() < 10:
        return JsonResponse({"message": "You are on cooldown!"}, status=400)
    
    user.lastPost = currentTime
    user.save()
    canvas = Canvas.objects.filter(title="testcanvas")[0]
    pixel = Pixel.objects.filter(position=post_data["pixel"])
    if pixel:
        pixel = pixel[0]
        pixel.color = post_data["color"]
    else:
        pixel = Pixel(canvas=canvas, position=post_data["pixel"], color=post_data["color"])
    
    pixel.save()
    return JsonResponse({"message": "success"}, status=200)

def ajax_validate_user(request):
    post_data = json.load(request)
    if not check_fields(post_data, (str, "auth")):
        return JsonResponse({"message": "Badly formatted request"}, status=400)

    user = TempUser.objects.filter(userId=post_data["auth"])
    if user:
        return JsonResponse({"message": "successful login"}, status=200)
    else:
        return JsonResponse({"message": "user id not found"}, status=400)

def check_fields(request, *args):
    for argtype, arg in args:
        if arg not in request or type(request[arg]) != argtype:
            return False
    return True
