from django.db import models
from accounts.models import *
from config import settings

# 게시글 종류 모델
class BoardType(models.Model):
    type_name = models.CharField(max_length=10, null=False, blank=False)


# 게시글 모델
class Board(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    region_sido = models.CharField(null=False, max_length=30, blank=False)
    region_sigungu = models.CharField(null=False, max_length=30, blank=False)
    region_dong = models.CharField(null=False, max_length=30, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    image_path = models.ImageField(upload_to='boards/', null=True, blank=True)
    content = models.TextField(null=False, blank=False)
    board_type = models.ForeignKey(BoardType, on_delete=models.CASCADE, null=False, blank=False)


# 게시글 위치 모델
class BoardLocation(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    lat = models.FloatField(null=False, blank=False)
    lon = models.FloatField(null=False, blank=False)


# 댓글 모델
class Comment(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)


