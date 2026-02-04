from django.shortcuts import render, redirect
from students.forms import StudentCreateForm

def home(req):
    
    if req.method == "POST":
        student_form = StudentCreateForm(req.POST)
        
        if student_form.is_valid():
            student = student_form.save() 
            return redirect('home')
    else:
        student_form = StudentCreateForm()
    
    return render(req, "students/index.html", {"student_form": student_form})