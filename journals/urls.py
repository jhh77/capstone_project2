from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

app_name = 'journals'

urlpatterns = [
    path('', views.journal_home, name='journal_home'),
    path('journal-write/', views.journal_write, name='journal_write'),
    path('get-journal/', views.get_journal, name='get_journal'),
    path('journal-detail/<int:id>/', views.journal_detail, name='journal_detail'),
    path('journal-edit/<int:id>/', views.journal_edit, name='journal_edit'),
    path('journal-delete/<int:id>/', views.journal_delete, name='journal_delete'),
]
