from django.urls import path
from . import views


urlpatterns = [
    path('hello/', views.say_hello),
    path('', views.homepage),
    path('ajax/canvas', views.ajax_get_canvas),
    path('ajax/update', views.ajax_update_canvas),
    path('ajax/login', views.ajax_validate_user),
]
