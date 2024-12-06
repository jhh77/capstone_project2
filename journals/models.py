from django.db import models
from accounts.models import *
from config import settings


# Create your models here.
class Journal(models.Model):
    date = models.DateField(null=False, blank=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    region_sido = models.CharField(null=False, max_length=30, blank=False)
    region_sigungu = models.CharField(null=False, max_length=30, blank=False)
    region_dong = models.CharField(null=False, max_length=30, blank=False)
    start_time = models.TimeField(null=False, blank=False)
    end_time = models.TimeField(null=False, blank=False)
    content = models.TextField(null=False, blank=False)


class JournalImage(models.Model):
    journal = models.ForeignKey(Journal, on_delete=models.CASCADE)
    image_path = models.ImageField(null=False, blank=False, upload_to='journal_images/')
