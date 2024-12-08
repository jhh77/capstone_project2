from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(BoardType)
class BoardTypeAdmin(admin.ModelAdmin):
    list_display = ['id', 'type_name']


@admin.register(Board)
class BoardAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'region_sido', 'region_sigungu', 'region_dong',
                    'created_at', 'image_path', 'content', 'board_type']


@admin.register(BoardLocation)
class BoardLocationAdmin(admin.ModelAdmin):
    list_display = ['id', 'board', 'lat', 'lon']


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['id', 'board', 'user', 'content', 'created_at']