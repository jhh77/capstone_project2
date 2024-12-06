from django import forms
from .models import *

class JournalForm(forms.ModelForm):
    class Meta:
        model = Journal
        fields = ['date', 'start_time', 'end_time', 'content']


class JournalImageForm(forms.ModelForm):
    class Meta:
        model = JournalImage
        fields = ['image_path']