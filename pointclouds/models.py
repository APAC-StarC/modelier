import stringcase
import uuid
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from urllib.parse import urlencode
from django.contrib.sites.models import Site
from django.urls import reverse
from django.utils.html import mark_safe
from colorfield.fields import ColorField
from ckeditor.fields import RichTextField
from .potree_enums import PointSizeType, PointShape
class PotreeModel(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    title = models.CharField(max_length=254, help_text="Identifier for the model - Internal Use")
    pointcloud_url = models.CharField(max_length=254,
                                      help_text="Full url for accessing the root folder of the point cloud cloud.js")

    material_point_size_type = models.PositiveSmallIntegerField(choices=PointSizeType.choices, default=PointSizeType.ADAPTIVE)
    material_shape = models.PositiveSmallIntegerField(choices=PointShape.choices, default=PointShape.CIRCLE)
    #material_active_attribute_name  =models.CharField()
    def __str__(self):
        return self.title


BACKGROUND_OPTIONS = (
    ('', 'None'),
    ('skybox', 'Skybox'),
    ('gradient', 'Gradient'),
    ('black', 'Black'),
    ('white', 'White')
)

POTREE_INIT_PARAMS = ['pointSize', 'FOV', 'opacity', 'edlEnabled', 'edlRadiues', 'edlStrength', 'pointBudget',
                      'showBoundingBox', 'material', 'pointSizing', 'quality', 'position', 'target', 'background']


class PotreeVisualization(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4)
    title = models.CharField(max_length=254, blank=True, help_text="Viewer Title")
    subtitle = models.CharField(max_length=254, blank=True, help_text="Viewer Title")
    pointclouds = models.ManyToManyField(PotreeModel, blank=True)
    tools_enabled = models.BooleanField(default=True)
    # Viewer initial settings
    initial_fov = models.FloatField(blank=True, null=True)
    initial_opacity = models.FloatField(blank=True, null=True,
                                        validators=[MinValueValidator(limit_value=0), MaxValueValidator(limit_value=1)])
    initial_edl_enabled = models.BooleanField(default=True)
    initial_edl_radius = models.FloatField(blank=True, null=True)
    initial_edl_strength = models.FloatField(blank=True, null=True)
    initial_point_budget = models.FloatField(blank=True, null=True)
    initial_show_bounding_box = models.BooleanField(default=False)
    initial_material = models.CharField(max_length=254, blank=True)
    initial_point_sizing = models.CharField(max_length=254, blank=True)
    initial_quality = models.CharField(max_length=254, blank=True)
    initial_position = models.CharField(max_length=254, blank=True)
    initial_target = models.CharField(max_length=254, blank=True)
    initial_background = models.CharField(max_length=254, choices=BACKGROUND_OPTIONS, default='', blank=True)

    # toolbar sections
    show_appearance = models.BooleanField(default=True)
    show_tools = models.BooleanField(default=True)
    show_scene = models.BooleanField(default=True)
    show_filters = models.BooleanField(default=True)
    show_about = models.BooleanField(default=True)

    # Branding
    collaborators = models.ManyToManyField('collaborators.Collaborator', through='PotreeVisualizationCollaborator')
    background_color = ColorField(default='#FF0000')
    navbar_height = models.PositiveSmallIntegerField(default=80, help_text="Navbar height in pixels")
    copyright_notice =  RichTextField(config_name='basic_editor', blank=True)
    facebook_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)


    def get_url_init_params(self):
        params = {}
        for param in POTREE_INIT_PARAMS:
            val = getattr(self, f"initial_{stringcase.snakecase(param)}", "")
            if bool(val): params[param] = val
        return urlencode(params)

    def get_iframe_html(self):
        pass

    def get_viewer_standalone_url(self):
        pass

    def get_embedded_code(self):
        site = Site.objects.get_current()
        code = f'<iframe id="{self.id}" width="100%" src="http://{site.domain}{self.get_unbranded_url()}"></iframe>'
        return code

    get_embedded_code.short_description = 'Embedded Code'
    get_embedded_code.allow_tags = False

    def get_embedded_code_ssl(self):
        site = Site.objects.get_current()
        code = f'<iframe id="{self.id}" width="100%" src="https://{site.domain}{self.get_unbranded_url()}"></iframe>'
        return code

    get_embedded_code_ssl.short_description = 'SSL Embedded Code'
    get_embedded_code_ssl.allow_tags = False

    def get_branded_url(self):
        return reverse('potree_standalone', kwargs={'id': self.id})

    def get_unbranded_url(self):
        return reverse('potree_embedded', kwargs={'id': self.id})

    def preview_link(self):
        return mark_safe("<a href='%s' target='_blank'>Preview</a>" % self.get_unbranded_url())

    def branded_preview_link(self):
        return mark_safe("<a href='%s' target='_blank'>Check</a>" % self.get_branded_url())

    def preview_link_ssl(self):
        return mark_safe("<a href='%s?ssl=true' target='_blank'>Preview SSL</a>" % self.get_unbranded_url())

    preview_link.short_description = 'Preview'
    branded_preview_link.short_description = 'Website'
    preview_link_ssl.short_description = 'Preview SSL'


class PotreeVisualizationCollaborator(models.Model):
    '''
    Intermediate table for collaborators M2M fields on PotreeVisualization, to hold ordering etc..
    '''
    visualization = models.ForeignKey(PotreeVisualization, on_delete=models.CASCADE)
    collaborator = models.ForeignKey('collaborators.Collaborator', on_delete=models.CASCADE)
    order = models.PositiveSmallIntegerField(default=9)

    def __str__(self):
        return f"Collaborator"