from django.urls import path
from . import views
urlpatterns = [
    path('<uuid:id>/embed/', views.potree_viewer, {'vtype': 'unbranded'}, name="potree_embedded"),
    path('<uuid:id>/view/',  views.potree_viewer, {'vtype': 'branded'}, name="potree_standalone"),

    path('admin/model-preview/<uuid:id>/',  views.admin_model_preview, name="potree_admin_model_preview"),


    path('admin/vis-potree-management/<uuid:id>/',  views.admin_visualization_management, name="potree_admin_visualization_management"),
    path('admin/vis-potree-management/<uuid:id>/config-update',  views.admin_update_potree_config, name="potree_admin_visualization_management_config_update"),
    path('<uuid:id>/v2/embed/', views.potree_viewer_1_7, {'vtype': 'unbranded'}, name="potree_v2_embedded"),

]
