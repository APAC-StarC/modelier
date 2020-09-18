from django.db import models


# class Status(models.TextChoices):
#     UNPUBLISHED = 'UN', 'Unpublished'
#     PUBLISHED = 'PB', 'Published'


class PointSizeType(models.IntegerChoices):
    FIXED = 0
    ATTENUATED = 1
    ADAPTIVE = 2


class PointShape(models.IntegerChoices):
    SQUARE = 0
    CIRCLE = 1
    PARABOLOID = 2
