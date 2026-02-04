from django.shortcuts import render

# Create your views here.

def dashboard_html(req):
    return render(req, "dashboard/index.html")