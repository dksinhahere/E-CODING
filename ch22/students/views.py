from django.shortcuts import render
from students.models import Profile

# Create your views here.
def home(req):
    all_students = list(Profile.objects.values("name","email","city","comment","state"))
    return render(req, "students/index.html", {"student": all_students})