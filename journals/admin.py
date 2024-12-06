from django.contrib import admin

from .models import *


# Register your models here.
@admin.register(Journal)
class JournalAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'date', 'user', 'start_time', 'end_time', 'content'
    ]


@admin.register(JournalImage)
class JournalImageAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'journal', 'image_path'
    ]