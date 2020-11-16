# Generated by Django 3.0.7 on 2020-11-16 10:37

import colorfield.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pointclouds', '0009_potreevisualization_show_gallery'),
    ]

    operations = [
        migrations.AddField(
            model_name='potreemodel',
            name='material_active_attribute_name',
            field=models.CharField(choices=[('rgba', 'Rgba'), ('color', 'Color'), ('intensity', 'Intensity'), ('classification', 'Classification')], default='rgba', max_length=50),
        ),
        migrations.AddField(
            model_name='potreemodel',
            name='material_active_attribute_name_color',
            field=colorfield.fields.ColorField(default='#E2DDDD', max_length=18),
        ),
        migrations.AlterField(
            model_name='potreevisualization',
            name='show_gallery',
            field=models.BooleanField(default=True, verbose_name='Show photo gallery'),
        ),
    ]
