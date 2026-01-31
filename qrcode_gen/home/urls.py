
from django.urls import path
from home.views import home
from home.views import generateQr

urlpatterns = [
    path("", home),
    path("generateimage/", generateQr)
]