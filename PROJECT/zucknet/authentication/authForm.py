# forms.py
from django import forms
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from authentication.models import Registration


class SignupForm(forms.ModelForm):
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Password'}),
        label="Password",
        help_text=""  # Remove help text
    )
    confirm_password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Confirm Password'}),
        label="Confirm Password",
        help_text=""  # Remove help text
    )
    
    class Meta:
        model = Registration
        fields = ["name", "username", "email", "dob"]
        widgets = {
            'name': forms.TextInput(attrs={'placeholder': 'Full Name'}),
            'username': forms.TextInput(attrs={'placeholder': 'Username'}),
            'email': forms.EmailInput(attrs={'placeholder': 'Email'}),
            'dob': forms.DateInput(attrs={'type': 'date', 'placeholder': 'Date of Birth'}),
        }
        help_texts = {
            'username': '',  # Remove default help text
        }
    
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if Registration.objects.filter(email=email).exists():
            raise forms.ValidationError("This email is already registered.")
        return email
    
    def clean_username(self):
        username = self.cleaned_data.get('username')
        if Registration.objects.filter(username=username).exists():
            raise forms.ValidationError("This username is already taken.")
        return username
    
    def clean_password(self):
        password = self.cleaned_data.get('password')
        if password:
            # Optional: Add Django's password validation
            try:
                validate_password(password)
            except ValidationError as e:
                raise forms.ValidationError(e.messages)
        return password
    
    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")
        
        if password and confirm_password and password != confirm_password:
            self.add_error('confirm_password', "Passwords do not match.")
        
        return cleaned_data
    
    def save(self, commit=True):
        user = super().save(commit=False)
        # Hash the password before saving
        user.password = make_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user


class LoginForm(forms.Form):
    username_or_email = forms.CharField(
        max_length=255,
        label="Username or Email",
        widget=forms.TextInput(attrs={'placeholder': 'Username or Email'})
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={'placeholder': 'Password'}),
        label="Password"
    )
    
    def clean(self):
        cleaned_data = super().clean()
        identifier = cleaned_data.get("username_or_email")
        password = cleaned_data.get("password")
        
        if not identifier or not password:
            return cleaned_data
        
        # Try to find user by username or email
        user = None
        if '@' in identifier:
            user = Registration.objects.filter(email=identifier).first()
        else:
            user = Registration.objects.filter(username=identifier).first()
        
        # If not found, try the other field
        if not user:
            if '@' in identifier:
                user = Registration.objects.filter(username=identifier).first()
            else:
                user = Registration.objects.filter(email=identifier).first()
        
        if not user:
            raise forms.ValidationError("Invalid username/email or password.")
        
        # Check hashed password
        if not check_password(password, user.password):
            raise forms.ValidationError("Invalid username/email or password.")
        
        cleaned_data['user'] = user
        return cleaned_data