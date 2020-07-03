from django.contrib import admin
from .models import PotreeVisualization, PotreeModel, PotreeVisualizationCollaborator


@admin.register(PotreeModel)
class PotreeModelAdmin(admin.ModelAdmin):
    list_display = ['title']
    search_fields = ['title']

class PotreeVisualizationCollaboratorInlineAdmin(admin.TabularInline):
    model = PotreeVisualizationCollaborator
    suit_classes = 'suit-tab suit-tab-branding'

@admin.register(PotreeVisualization)
class PotreeVisualizationAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'branded_preview_link', 'preview_link', 'get_embedded_code']
    filter_horizontal = ['pointclouds']
    inlines = [PotreeVisualizationCollaboratorInlineAdmin]
    fieldsets = [
        (None, {
            'classes': ('suit-tab', 'suit-tab-general',),
            'fields': ['title', 'subtitle']
        }),
        ('General Settings', {
            'classes': ('suit-tab', 'suit-tab-settings',),
            'fields': ["tools_enabled","show_appearance","show_tools","show_scene","show_filters","show_about"]}),


        ('Initialization settings', {
            'classes': ('suit-tab', 'suit-tab-settings',),
            'fields': ["initial_point_size", "initial_fov", "initial_opacity", "initial_edl_enabled",
                       "initial_edl_radius", "initial_edl_strength", "initial_point_budget",
                       "initial_show_bounding_box", "initial_material", "initial_point_sizing", "initial_quality",
                       "initial_position", "initial_target", "initial_background", ]}),

        ('Point Clouds', {
            'classes': ('suit-tab', 'suit-tab-pointclouds',),
            'fields': ['pointclouds']}),
        ('Styling', {
            'classes': ('suit-tab', 'suit-tab-branding',),
            'fields': ['background_color','navbar_height']}),
        ('Copyright', {
            'classes': ('suit-tab', 'suit-tab-branding',),
            'fields': ['copyright_notice']}),
    ]

    suit_form_tabs = (('general', 'General'),
                      ('pointclouds', 'Point Clouds'),
                      ('settings', 'Viewer settings'),
                      ('branding','Branding'))
