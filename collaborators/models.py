import uuid
from django.db import models
from django.utils.html import mark_safe


def collaborator_logo_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    _, ext = filename.split('.')
    filename = str(uuid.uuid4().hex)
    return f'collaborators/{filename}.{ext}'


class Collaborator(models.Model):
    name = models.CharField(max_length=254)
    url = models.URLField(blank=True)
    logo = models.ImageField(upload_to=collaborator_logo_path)

    def __str__(self):
        return self.name
    @property
    def logo_img(self):
        return mark_safe(f"<img src='{self.logo.url}' />")
