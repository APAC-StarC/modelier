# Generated by Django 3.0.7 on 2020-07-02 08:07

import collaborators.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Collaborator',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=254)),
                ('url', models.URLField(blank=True)),
                ('logo', models.ImageField(upload_to=collaborators.models.collaborator_logo_path)),
            ],
        ),
    ]
