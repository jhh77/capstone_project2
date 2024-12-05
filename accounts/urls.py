from django.urls import path

from . import views

app_name = 'accounts'

urlpatterns = [
    path('login/', views.login, name='login'),
    path('sign-up/', views.sign_up, name='sign-up'),
    path('sign-up-select', views.sign_up_select, name='sign-up-select'),
    path('id-check/', views.id_check, name='id-check'),
    path('sign-up-done', views.sign_up_done, name='sign-up-done'),
]