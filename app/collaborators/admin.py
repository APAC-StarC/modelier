from django.contrib import admin
from.models import Collaborator

@admin.register(Collaborator)
class CollaboratorAdmin(admin.ModelAdmin):
    list_display = ['name', 'url', 'logo_img']
    search_fields = ['name']