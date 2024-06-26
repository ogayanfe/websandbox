from django.contrib.auth.models import AbstractUser, UserManager
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.utils.translation import gettext as _


class UsernameValidator(UnicodeUsernameValidator):
    regex = r"^[\w.+-]+\Z"
    message = _(
        "Enter a valid username. This value may contain only letters, "
        "numbers, and ./+/-/_ characters."
    )

class User(AbstractUser):
    # email = models.EmailField(_('email address'), unique=True)
    username_validator = UsernameValidator()
    first_name = None
    last_name = None
    username = models.CharField(
        _("username"),
        max_length=150,
        null=False,
        unique=True, 
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and ./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    # EMAIL_FIELD = "email"
    REQUIRED_FIELDS = []
    USERNAME_FIELD = "username"
    is_demo = models.BooleanField(default=False, null=False, help_text="Designates if user is used to demo website content")
    objects = UserManager()

    def __str__(self):
        return self.email

