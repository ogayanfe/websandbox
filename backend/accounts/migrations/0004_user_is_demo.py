# Generated by Django 4.2.6 on 2024-05-01 17:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_user_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_demo',
            field=models.BooleanField(default=False),
        ),
    ]
