from django.urls import path
from . import views


urlpatterns = [
    path('hello/', views.say_hello),
    path('', views.homepage),
    path('ajax/canvas', views.ajax_get_canvas),
]
