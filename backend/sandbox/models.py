from django.db import models
from pytz import timezone

from accounts.models import User

# Create your models here.
class Sandbox(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE) 
    title = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    files = models.JSONField(null=True)

    class Meta: 
        unique_together = ["owner", "title"]
