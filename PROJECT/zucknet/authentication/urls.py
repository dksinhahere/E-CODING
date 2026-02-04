# authentication/urls.py
from django.urls import path
from authentication.views import auth, signup, login, logout

urlpatterns = [
    path("", auth, name="auth"),
    path("signup/", signup, name="signup"),
    path("login/", login, name="login"),
    path("logout/", logout, name="logout"),
]