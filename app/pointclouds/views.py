import json
from django.shortcuts import render, Http404
from django.views.decorators.clickjacking import xframe_options_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from .models import PotreeVisualization, PotreeModel, Visualization

@xframe_options_exempt
def potree_viewer(request, id, vtype):
    if vtype == 'unbranded':
        template_name = 'pointclouds/unbranded_viewer.html'
    else:
        template_name = 'pointclouds/branded_viewer.html'
    try:
        vis = PotreeVisualization.objects.get(pk=id)
        return render(request, template_name, {'vis': vis, 'pointclouds': vis.pointclouds.all()})
    except PotreeVisualization.DoesNotExist:
        return Http404("Visualization does not exist")

@login_required
def admin_model_preview(request,id):
    original = PotreeModel.objects.get(pk=id)
    pointclouds = [original]
    vis = PotreeVisualization(title="Model Preview", tools_enabled=True, pointclouds_override=pointclouds)
    return render(request, 'admin/pointclouds/potreemodel/potree_preview.html', {'vis':vis,'pointclouds': pointclouds})



@staff_member_required
def admin_vis_save_config(request, id):
    original = PotreeVisualization.objects.get(pk=id)
    pointclouds = [original]
    vis = PotreeVisualization(title="Model Preview", tools_enabled=True, pointclouds_override=pointclouds)
    return render(request, 'admin/pointclouds/potreemodel/potree_preview.html', {'vis':vis,'pointclouds': pointclouds})

@staff_member_required
def admin_visualization_management(request,id):
    vis = Visualization.objects.get(pk=id)
    return render(request, 'admin/pointclouds/visualization/admin_management.html', {'vis':vis})

from django.http import JsonResponse
@staff_member_required
def admin_update_potree_config(request,id):
    vis = Visualization.objects.get(pk=id)
    potree_config = json.loads(request.body)
    if not vis.json_config:
        vis.json_config = {}
    vis.json_config.potree_config = potree_config
    # JsonResponse()





