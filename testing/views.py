from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.template import loader
from .models import Canvas

# Create your views here.
def say_hello(request):
    print(request)
    return HttpResponse("Hello World")

def homepage(request):
    template = loader.get_template("index.html")
    return HttpResponse(template.render())

def ajax_get_canvas(request):
    obj = Canvas.objects.filter(title="testcanvas")[0]
    data = {
        "board": obj.data
    }
    return JsonResponse(data, status=200)


