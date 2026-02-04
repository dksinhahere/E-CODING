from django import forms
from .models import Student  # ← Add this import

class StudentCreateForm(forms.ModelForm):  # ← Change Form to ModelForm
    class Meta:  # ← Add this Meta class
        model = Student
        fields = ['name', 'username', 'bio', 'password', 'gender']
        widgets = {
            'password': forms.PasswordInput(),
            'bio': forms.Textarea(),
        }