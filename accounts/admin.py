from django.contrib import admin
from .models import *

# Register your models here.
@admin.register(Member)
class MemberAdmin(admin.ModelAdmin):
    list_display = [
        'user_id', 'email', 'nickname', 'region_sido', 'region_sigungu', 'region_dong', 'member_type', 'is_active', 'is_admin'
    ]


@admin.register(MemberType)
class MemberTypeAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'type_name'
    ]