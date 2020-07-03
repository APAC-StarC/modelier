from django.shortcuts import render, Http404
from .models import PotreeVisualization


def potree_viewer(request, id, vtype):
    if vtype == 'unbranded':
        template_name = 'pointclouds/unbranded_viewer.html'
    else:
        template_name = 'pointclouds/branded_viewer.html'
    try:
        vis = PotreeVisualization.objects.get(pk=id)
        return render(request, template_name, {'vis': vis})
    except PotreeVisualization.DoesNotExist:
        return Http404("Visualization does not exist")
