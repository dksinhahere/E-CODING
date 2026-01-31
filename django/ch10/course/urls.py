from django.urls import path
from course.views import learn_django

urlpatterns = [
    path("", learn_django),
    path("dj/", learn_django)
]