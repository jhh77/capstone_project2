from django.urls import path
from . import views

app_name = 'boards'

urlpatterns = [
    # path('', views.index, name='index'),
    path('petrol-board/', views.petrol_board, name='petrol_board'),
    path('petrol-board-write/', views.petrol_board_write, name='petrol_board_write'),
    path('petrol-board-detail/<int:id>/', views.petrol_board_detail, name='petrol_board_detail'),
    path('petrol-board-edit/<int:id>/', views.petrol_board_edit, name='petrol_board_edit'),
    path('board-delete/<int:id>/', views.board_delete, name='board_delete'),
    path('comment-edit/<int:id>/', views.comment_edit, name='comment_edit'),
    path('comment-delete/<int:id>/', views.comment_delete, name='comment_delete'),
    path('people-board/', views.people_board, name='people_board'),
    path('people-board-write/', views.people_board_write, name='people_board_write'),
    path('people-board-detail/<int:id>/', views.people_board_detail, name='people_board_detail'),
    path('people-board-edit/<int:id>/', views.people_board_edit, name='people_board_edit'),
    path('my-boards/', views.my_boards, name='my_boards'),
    path('commented-boards/', views.commented_boards, name='commented-boards'),
]