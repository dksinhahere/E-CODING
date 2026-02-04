
from django.urls import path
from dashboard.views import dashboard_html

urlpatterns = [
    path("", dashboard_html),
]