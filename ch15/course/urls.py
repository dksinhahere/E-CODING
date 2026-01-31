from django.urls import path
from course.views import home

urlpatterns = [
    path("", home)
]