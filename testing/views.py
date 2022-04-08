from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

# Create your views here.
def say_hello(request):
    print(request)
    return HttpResponse("Hello World")

def homepage(request):
    template = loader.get_template("index.html")
    return HttpResponse(template.render())

