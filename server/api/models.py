from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    USER_TYPES = [
        ('basic', 'Basic'),
        ('admin', 'Admin'),
        ('manager', 'Manager'),
    ]
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    user_type = models.CharField(max_length=20, choices=USER_TYPES, default='basic')

    def __str__(self):
        return f"{self.user.username} ({self.user_type})"