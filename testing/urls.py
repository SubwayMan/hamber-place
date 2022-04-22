from django.urls import path, include
from . import views
from .views import API
from django.views.generic.base import RedirectView
from django.contrib.staticfiles.storage import staticfiles_storage


urlpatterns = [
    path('api-auth/', include('rest_framework.urls')),
    path('hello/', views.say_hello),
    path('', views.homepage),
    path('ajax/canvas', views.ajax_get_canvas),
    path('ajax/update', views.ajax_update_canvas),
    path('ajax/login', views.ajax_validate_user),
]
