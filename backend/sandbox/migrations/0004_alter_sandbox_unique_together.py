# Generated by Django 4.2.6 on 2023-11-07 16:43

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('sandbox', '0003_alter_sandbox_files'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='sandbox',
            unique_together={('owner', 'title')},
        ),
    ]
