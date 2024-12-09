from django.urls import path
from . import views

app_name = 'boards'

urlpatterns = [
    # path('', views.index, name='index'),
    path('petrol-board/', views.petrol_board, name='petrol_board'),
    path('petrol-board-write/', views.petrol_board_write, name='petrol_board_write'),
    path('petrol-board-detail/<int:id>/', views.petrol_board_detail, name='petrol_board_detail'),
    path('petrol-board-edit/<int:id>/', views.petrol_board_edit, name='petrol_board_edit'),
    path('petrol-board-delete/<int:id>/', views.petrol_board_delete, name='petrol_board_delete'),
    path('comment-edit/<int:id>/', views.comment_edit, name='comment_edit'),
]