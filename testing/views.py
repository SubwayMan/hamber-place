from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template import loader
from .models import Canvas
from django.views.decorators.csrf import ensure_csrf_cookie
import json
# Create your views here.
def say_hello(request):
    print(request)
    return HttpResponse("Hello World")

@ensure_csrf_cookie
def homepage(request):
    template = loader.get_template("index.html")
    return HttpResponse(template.render())

def ajax_get_canvas(request):
    canvas = Canvas.objects.filter(title="testcanvas")[0]
    data = {
        "board": canvas.data
    }
    return JsonResponse(data, status=200)

def ajax_update_canvas(request):
    canvas = Canvas.objects.filter(title="testcanvas")[0]
    post_data = json.load(request)
    print(post_data)

    return JsonResponse({}, status=200)

    
