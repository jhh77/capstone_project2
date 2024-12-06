from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'journals'

urlpatterns = [
    path('journal-home/', views.journal_home, name='journal_home'),
    path('journal-write/', views.journal_write, name='journal_write'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
