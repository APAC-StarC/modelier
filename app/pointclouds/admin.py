from django.contrib import admin
from .models import PotreeVisualization, PotreeModel, PotreeVisualizationCollaborator
from .models import PotreeHotspot, PotreeAnnotation, PotreeImage
from .models import Visualization, Pointcloud, GalleryImage, UndergroundDepiction
from suit.sortables import SortableTabularInline, SortableStackedInline

# class PotreeAnnotationInline(SortableStackedInline):
#     model = PotreeAnnotation
#     #min_num = 1
#     sortable = 'order'
#     extra = 0
#     verbose_name_plural = 'Annotations'
#     suit_form_inlines_hide_original = True
#     suit_classes = 'suit-tab suit-tab-annotations'
#
# class PotreeImageInline(SortableTabularInline):
#     model = PotreeImage
#     #min_num = 1
#     sortable = 'order'
#     extra = 0
#     verbose_name_plural = 'Images'
#     suit_form_inlines_hide_original = True
#     suit_classes = 'suit-tab suit-tab-images'
#
# @admin.register(PotreeModel)
# class PotreeModelAdmin(admin.ModelAdmin):
#     list_display = ['title']
#     search_fields = ['title']
#     inlines = (PotreeAnnotationInline, PotreeImageInline)
#     suit_form_tabs = (('general', 'General'),
#                       ('modelconfig', 'Model Config'),
#                       # ('hotspots', 'Hotspots'),
#                       ('annotations', 'Annotations'),
#                       ('images', 'Images'))
#     suit_form_includes = (
#         ('admin/pointclouds/potreemodel/potree_preview_include.html', 'middle', ''),
#     )
#     # Somehow on each save or change we should rerender the model? or maybe the config from scratch? (so instead of reloading the whole model,
#     # we can instead reload the config from zero
#     # No, for reloading the model, we need to do a save (so a refresh happens).
#     # For every changefield change (like in input change event, or a focus-out event), we rerender the config (not reloading the pointcloud,
#     # we just cleanup the pointcloud config and reapply the config
#     fieldsets = [
#         (None, {
#             'classes': ('suit-tab', 'suit-tab-general',),
#             'fields': ['title', 'pointcloud_url']
#         }),
#         ('General Settings', {
#             'classes': ('suit-tab', 'suit-tab-modelconfig',),
#             'fields': ["material_point_size_type", "material_shape", "material_active_attribute_name", "material_active_attribute_name_color"]}),
#
#         # ('Hotspots', {
#         #     'classes': ('suit-tab', 'suit-tab-hotspots',),
#         #     'fields': []}),
#
#         ('Annotations', {
#             'classes': ('suit-tab', 'suit-tab-annotations',),
#             'fields': []}),
#         ('Images', {
#             'classes': ('suit-tab', 'suit-tab-images',),
#             'fields': []}),
#     ]
#
# class PotreeVisualizationCollaboratorInlineAdmin(admin.TabularInline):
#     model = PotreeVisualizationCollaborator
#     suit_classes = 'suit-tab suit-tab-branding'
#
# @admin.register(PotreeVisualization)
# class PotreeVisualizationAdmin(admin.ModelAdmin):
#     list_display = ['id', 'title', 'branded_preview_link', 'preview_link', 'get_embedded_code']
#     filter_horizontal = ['pointclouds']
#     inlines = [PotreeVisualizationCollaboratorInlineAdmin]
#     fieldsets = [
#         (None, {
#             'classes': ('suit-tab', 'suit-tab-general',),
#             'fields': ['title', 'subtitle']
#         }),
#         ('General Settings', {
#             'classes': ('suit-tab', 'suit-tab-settings',),
#             'fields': ["tools_enabled","show_gallery",]}),
#         ('Potree Tools Settings', {
#             'classes': ('suit-tab', 'suit-tab-potreetools',),
#             'fields': ["show_appearance", "show_tools", "show_scene", "show_filters",
#                        "show_about"]}),
#
#         # ('Initialization settings', {
#         #     'classes': ('suit-tab', 'suit-tab-initsettings',),
#         #     'fields': ["initial_fov", "initial_opacity", "initial_edl_enabled",
#         #                "initial_edl_radius", "initial_edl_strength", "initial_point_budget",
#         #                "initial_show_bounding_box", "initial_material", "initial_point_sizing", "initial_quality",
#         #                "initial_position", "initial_target", "initial_background", ]}),
#         ('Initialization settings', {
#             'classes': ('suit-tab', 'suit-tab-initsettings',),
#             'fields': ["initial_edl_enabled", "initial_edl_radius", "initial_edl_strength",]}),
#
#         ('Point Clouds', {
#             'classes': ('suit-tab', 'suit-tab-pointclouds',),
#             'fields': ['pointclouds']}),
#         ('Styling', {
#             'classes': ('suit-tab', 'suit-tab-branding',),
#             'fields': ['background_color','navbar_height']}),
#         ('Copyright', {
#             'classes': ('suit-tab', 'suit-tab-branding',),
#             'fields': ['copyright_notice']}),
#     ]
#
#     suit_form_tabs = (('general', 'General'),
#                       ('pointclouds', 'Point Clouds'),
#                       ('settings', 'General settings'),
#                       ('initsettings','Visualization load settings'),
#                       ('potreetools',"Potree settings"),
#                       ('branding','Branding'))
#


class PointcloudInlineAdmin(admin.StackedInline):
    suit_classes = 'suit-tab suit-tab-general'
    model = Pointcloud
    extra=0

class GalleryImageInline(admin.StackedInline):
    suit_classes = 'suit-tab suit-tab-gallery'
    model = GalleryImage
    extra = 0

class GeoreferencedImagesInline(admin.StackedInline):
    suit_classes = 'suit-tab suit-tab-georeferenced'
    model = UndergroundDepiction
    extra = 0

@admin.register(Visualization)
class VisualizationAdmin(admin.ModelAdmin):
    search_fields = ['title']
    list_display = ['id', 'title', 'admin_management_link', 'preview_link', 'get_embedded_code']
    inlines = [PointcloudInlineAdmin, GalleryImageInline, GeoreferencedImagesInline]

    fieldsets = [
            (None, {
                'classes': ('suit-tab', 'suit-tab-general',),
                'fields': ['title', 'subtitle',"tools_enabled"]
            }),

            ('Potree Tools Settings', {
                'classes': ('suit-tab', 'suit-tab-potreetools',),
                'fields': ["show_appearance", "show_tools", "show_scene", "show_filters",
                           "show_about"]}),

            ('', {
                'classes': ('suit-tab', 'suit-tab-gallery',),
                'fields': []}),
            ('', {
                'classes': ('suit-tab', 'suit-tab-georeferenced',),
                'fields': []}),
            ('Development', {
                'classes': ('suit-tab', 'suit-tab-development',),
                'fields': ['potree_config']}),

        ]

    suit_form_tabs = (('general', 'General'),
                      ('potreetools', "Potree tools"),
                      ('gallery','Gallery'),
                      ('georeferenced', "Georeferenced photos"),
                      ('development','Development'))