from django.urls import path
from . import views
urlpatterns = [
    path('<uuid:id>/embed/', views.potree_viewer, {'vtype': 'unbranded'}, name="potree_embedded"),
    path('<uuid:id>/view/',  views.potree_viewer, {'vtype': 'branded'}, name="potree_standalone"),
]
