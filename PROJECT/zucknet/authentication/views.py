# views.py
from django.shortcuts import render, redirect
from django.http import JsonResponse
from .authForm import SignupForm, LoginForm

def auth(request):
    """Main view that renders both forms"""
    return render(request, "authentication/index.html", {
        "signup_form": SignupForm(),
        "login_form": LoginForm(),
    })

def signup(request):
    """Handle signup form submission"""
    if request.method == "POST":
        print("=== SIGNUP DEBUG ===")
        print("POST data:", request.POST)
        form = SignupForm(request.POST)
        print("Form valid:", form.is_valid())
        if not form.is_valid():
            print("Signup errors:", form.errors)
        
        if form.is_valid():
            user = form.save()
            request.session['user_id'] = user.id
            request.session['username'] = user.username
            print(f"User created: {user.username}")
            return redirect('auth')
        else:
            return render(request, "authentication/index.html", {
                "signup_form": form,
                "login_form": LoginForm(),
            })
    
    return redirect('auth')

def login(request):
    """Handle login form submission"""
    if request.method == "POST":
        print("=== LOGIN DEBUG ===")
        print("POST data:", request.POST)
        form = LoginForm(request.POST)
        print("Form valid:", form.is_valid())
        if not form.is_valid():
            print("Login errors:", form.errors)
        
        if form.is_valid():
            user = form.cleaned_data['user']
            request.session['user_id'] = user.id
            request.session['username'] = user.username
            print(f"User logged in: {user.username}")
            return redirect('/dashboard/')  # Fixed: added leading slash
        else:
            return render(request, "authentication/index.html", {
                "signup_form": SignupForm(),
                "login_form": form,
            })
    
    return redirect('auth')

def logout(request):
    """Handle logout"""
    request.session.flush()
    return redirect('auth')