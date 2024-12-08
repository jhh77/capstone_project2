from django import forms
from .models import *

# 게시글 폼
class BoardForm(forms.ModelForm):
    class Meta:
        model = Board
        fields = ['content', 'image_path', 'board_type']


# 댓글 폼
class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ['content']


# 게시글 위치 폼
class BoardLocationForm(forms.ModelForm):
    class Meta:
        model = BoardLocation
        fields = ['lat', 'lon']

