from django.shortcuts import render
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def learn_django(req):
    data = {"name": "Danishk", "sirName": "Sinha"}
    return render(req, "course/index.html", context=data)