from django.shortcuts import render

# Create your views here.

def load_initial(req):
    return render(req, "textual/index.html")