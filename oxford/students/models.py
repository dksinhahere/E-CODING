from django.db import models

class Student(models.Model):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    
    name = models.CharField(max_length=100, verbose_name="Full Name")
    username = models.CharField(max_length=100, unique=True, verbose_name="Username")
    bio = models.TextField(verbose_name="Biography")
    password = models.CharField(max_length=100, verbose_name="Password")
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, verbose_name="Gender")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Student"
        verbose_name_plural = "Students"
    
    def __str__(self):
        return f"{self.name} (@{self.username})"