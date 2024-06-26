import random
import time
from collections.abc import Collection
from django.db import models
from django.core.validators import RegexValidator
from rest_framework.validators import ValidationError
from django.utils.translation import gettext as _
import hashlib
from accounts.models import User

message = _(
    "Enter a valid sandbox title. This value may contain only unaccented lowercase a-z "
    "and uppercase A-Z letters, numbers, and @/./+/- characters."
)  
REGEXP = r"^[\w.@+-]+\Z"

def get_default_files():
    """The function returns the default sandbox files""" 
    
    return [ 
        { "id": f"{random.random()}{time.time()}", "name": "index.html", "content": "<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <title>Document</title>\r\n    <link rel=\"stylesheet\" href=\"./styles.css\" />\r\n</head>\r\n<body>\r\n    <h1>Hello World</h1>\r\n    <script type=\"module\" src=\"./index.js\"></script>\r\n</body>\r\n</html>\r\n" },
        { "id": f"{random.random()}{time.time()}", "name": "styles.css", "content": "" }, 
        { "id": f"{random.random()}{time.time()}", "name": "index.js", "content": "console.log(\"Hello World\")" } 
    ]

def sandbox_preview_path(instance, filename: str) -> str:
    """
    Return a unique path for all user images
    """
    extension = filename.split(".").pop()
    directory_name = f"{instance.owner.username}_{instance.title}"
    hash = hashlib.md5(directory_name.encode()).hexdigest()
    return f"images/sandbox/{directory_name}/{hash}.{extension}"


# Create your models here.
class Sandbox(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE) 
    title = models.TextField(
        validators=[RegexValidator(regex=REGEXP, message=message)]
    )
    created = models.DateTimeField(auto_now_add=True)
    update = models.DateTimeField(auto_now=True)
    files = models.JSONField(default=get_default_files)
    starred_users = models.ManyToManyField(User, related_name="starred")
    preview = models.ImageField(upload_to=sandbox_preview_path, default="", null=True)

    class Meta: 
        unique_together = ["owner", "title"]

    def clean_fields(self, exclude: Collection[str] | None ) -> None:
        if Sandbox.objects.filter(title__iexact=self.owner): 
            raise ValidationError("Sandbox Title Must Be Unique")
        return super().clean_fields(exclude)

    def __str__(self): 
        return f'{self.owner.username} / {self.title}'

    def save(self, *args, **kwargs):
        if self.title: 
            self.title = self.title.lower()
        return super().save(*args, **kwargs)
