# Generated by Django 3.1.3 on 2021-04-08 08:48

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('pointclouds', '0010_auto_20201116_1037'),
    ]

    operations = [
        migrations.CreateModel(
            name='Visualization',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(blank=True, help_text='Viewer Title', max_length=254)),
                ('subtitle', models.CharField(blank=True, help_text='Viewer Title', max_length=254)),
                ('tools_enabled', models.BooleanField(default=True)),
                ('show_appearance', models.BooleanField(default=True)),
                ('show_tools', models.BooleanField(default=True)),
                ('show_scene', models.BooleanField(default=True)),
                ('show_filters', models.BooleanField(default=True)),
                ('show_about', models.BooleanField(default=True)),
                ('show_gallery', models.BooleanField(default=True, verbose_name='Show photo gallery')),
                ('potree_config', models.JSONField(default={})),
            ],
        ),
        migrations.AlterField(
            model_name='potreevisualization',
            name='initial_edl_radius',
            field=models.FloatField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(1.0), django.core.validators.MaxValueValidator(4.0)]),
        ),
        migrations.AlterField(
            model_name='potreevisualization',
            name='initial_edl_strength',
            field=models.FloatField(blank=True, null=True, validators=[django.core.validators.MinValueValidator(0.0), django.core.validators.MaxValueValidator(5.0)]),
        ),
        migrations.CreateModel(
            name='Pointcloud',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(help_text='Identifier for the model', max_length=254)),
                ('url', models.CharField(help_text='Full url for accessing the root folder of the point cloud cloud.js', max_length=254)),
                ('visualization', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pointclouds', to='pointclouds.visualization')),
            ],
        ),
    ]