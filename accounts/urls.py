from django.urls import path
from django.contrib.auth import views as auth_views

from . import views

app_name = 'accounts'

urlpatterns = [
    path('login/', auth_views.LoginView.as_view(template_name='accounts/login.html'), name='login'),
    path('sign-up-petrol/', views.sign_up, name='sign-up-petrol'),
    path('sign-up-people/', views.sign_up, name='sign-up-people'),
    path('sign-up-select', views.sign_up_select, name='sign-up-select'),
    path('id-check/', views.id_check, name='id-check'),
    path('sign-up-done/', views.sign_up_done, name='sign-up-done'),
    path('logout/', views.logout_view, name='logout'),
    path('mypage/', views.my_page, name='mypage'),
    path('my-profile/', views.my_profile, name='my_profile'),
    path('nickname-change/', views.nickname_change, name='nickname_change'),
    path('region-change/', views.region_change, name='region_change'),
    path('menubar/', views.menubar, name='menubar'),

]