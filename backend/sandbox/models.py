from collections.abc import Collection
from django.db import models
from django.core.validators import RegexValidator
from rest_framework.validators import ValidationError
from django.utils.translation import gettext as _


from accounts.models import User

message = _(
    "Enter a valid sandbox title. This value may contain only unaccented lowercase a-z "
    "and uppercase A-Z letters, numbers, and @/./+/- characters."
)  
REGEXP = r"^[\w.@+-]+\Z"

# Create your models here.
class Sandbox(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE) 
    title = models.TextField(
        validators=[RegexValidator(regex=REGEXP, message=message)]
    )
    created = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    files = models.JSONField(default=list)

    class Meta: 
        unique_together = ["owner", "title"]

    def clean_fields(self, exclude: Collection[str] | None ) -> None:
        if Sandbox.objects.filter(title__iexact=self.owner): 
            raise ValidationError("Sandbox Title Must Be Unique")
        return super().clean_fields(exclude)
    
    def __str__(self): 
        return f'{self.owner.username} / {self.title}'