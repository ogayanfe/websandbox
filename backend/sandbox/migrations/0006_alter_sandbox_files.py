# Generated by Django 4.2.6 on 2023-11-20 23:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sandbox', '0005_alter_sandbox_files_alter_sandbox_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sandbox',
            name='files',
            field=models.JSONField(default=list),
        ),
    ]
