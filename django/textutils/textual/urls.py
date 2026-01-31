from django.urls import path
from textual.views import load_initial

urlpatterns = [
    path("", load_initial)
]