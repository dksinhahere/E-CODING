from django.db import models

# Create your models here.

class Profile(models.Model):
    name = models.CharField(max_length=255)
    email= models.EmailField(max_length=255)
    city= models.CharField(max_length=255)
    roll = models.IntegerField(max_length=255)
    comment = models.CharField(max_length=255, default="nothing")
    state = models.CharField(max_length=255,default="nothing")
    
    def __str__(self):
        return self.name
    
class Result(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    
    def __str__(self):
        return self.name