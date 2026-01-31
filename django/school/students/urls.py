from django.urls import path
from students.views import home_page

urlpatterns = [
    path("", home_page)
]
