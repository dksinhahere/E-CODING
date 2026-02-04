from django.urls import path
from students.views import home

urlpatterns = [
    path("", home)
]