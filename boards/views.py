import json
from urllib.parse import unquote

from django.shortcuts import render, redirect, get_object_or_404

from boards.forms import *
from .models import *


# Create your views here.


# 게시판 메인 페이지
def petrol_board(request):
    sido = ''
    if request.method == 'POST':
        sido = request.POST.get('sido')
        sigungu = request.POST.get('sigungu')
        dong = request.POST.get('dong')
        boards = Board.objects.filter(region_sido=sido, region_sigungu=sigungu, region_dong=dong).order_by('-created_at')
    else:
        boards = Board.objects.all().order_by('-created_at')

    user = Member.objects.get(user_id=request.user)
    comments = Comment.objects.all()

    # 댓글 수를 각 게시물에 추가
    for board in boards:
        # 각 게시물에 대한 댓글 수 계산
        board.comment_count = Comment.objects.filter(board=board).count()

    # 게시물 내용을 자르기
    for board in boards:
        if len(board.content) > 150:
            board.short_content = board.content[:150]
        else:
            board.short_content = board.content

    context = {
        'boards': boards,
        'user': user,
        'comments': comments,
        'sido': sido,
    }
    return render(request, 'boards/petrol_board_main.html', context)


# 지역 게시글 검색
# def region_select(request):
#     sido = request.POST.get('sido')
#     sigungu = request.POST.get('sigungu')
#     dong = request.POST.get('dong')
#     boards = Board.objects.filter(region_sido=sido, region_sigungu=sigungu, region_dong=dong).order_by('-created_at')
#
#     # 게시물 내용을 자르기
#     for board in boards:
#         if len(board.content) > 150:
#             board.short_content = board.content[:150]
#         else:
#             board.short_content = board.content
#
#     context = {
#         'boards': boards,
#     }
#     return render(request, 'boards/petrol_board_main.html', context)


# 게시글 등록하기
def petrol_board_write(request):
    if request.method == 'POST':
        member = Member.objects.get(user_id=request.user)
        form = BoardForm(request.POST, request.FILES)
        if form.is_valid() :
            board = form.save(commit=False)
            board.user = request.user
            board.region_sido = member.region_sido
            board.region_sigungu = member.region_sigungu
            board.region_dong = member.region_dong
            board.save()

            location = BoardLocation(board=board)
            location.lat = request.POST['lat']
            location.lon = request.POST['lon']
            location.save()

            return redirect('boards:petrol_board')

    form = BoardForm()
    return render(request, 'boards/petrol_board_write.html', {'form': form})


# 글 상세보기
def petrol_board_detail(request, id):
    board = Board.objects.get(id=id)
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.board = board
            comment.user = request.user
            comment.save()
            return redirect('boards:petrol_board_detail', id=id)
    else:
        form = CommentForm()

    location = BoardLocation.objects.get(board=board)
    comments = Comment.objects.filter(board=board)
    context = {
        'board': board,
        'location': location,
        'comments': comments,
        'comment_count': comments.count(),
    }
    return render(request, 'boards/petrol_board_detail.html', context)


# 신고 게시글 수정
def petrol_board_edit(request, id):
    board = Board.objects.get(id=id)
    short_name = ''
    delete_value = request.POST.get('delete')
    if request.method == 'POST':
        # 폼 데이터 처리
        content = request.POST.get('content')
        image_path = request.FILES.get('image_path')  # 새 이미지 파일
        print(image_path == None)
        print(delete_value)

        # 게시물 업데이트
        board.content = content

        if delete_value == '1':
            if image_path:
                # image_path가 있을 경우, 업데이트 로직
                board.image_path.delete(save=False)
                board.image_path = image_path  # 새 이미지 경로 가져오기
                board.save()
            else:
                # image_path가 None인 경우, 모든 image_path 지우기
                board.image_path.delete(save=False)  # 파일 삭제
                board.image_path = None  # 모델 필드 업데이트
                board.save()
        #
        # # delete 값이 0일 때는 아무것도 하지 않음
        # elif delete_value == '0':
        #     return  # 아무 응답도 하지 않음
        #
        # if image_path is not None and delete != 0:
        #     board.image_path = image_path  # 새 이미지로 업데이트
        # else:
        #     board.image_path = None
        # board.save()  # 변경 사항 저장

        return redirect('boards:petrol_board_detail', id=id)

    if board.image_path:
        image_url = board.image_path.url
        file_name = unquote(image_url.split('/')[-1])
        base_name, extension = file_name.rsplit('.', 1)  # 기본 이름과 확장자를 분리

        if len(base_name) > 10:
            short_name = base_name[:10] + '...' + '.' + extension
        else:
            short_name = file_name  # 기본 이름이 10자 이하일 경우

    #     # 삭제된 파일 ID를 받기
    #     deleted_files = request.POST.get('deleted_files')
    #     if deleted_files:
    #         deleted_files = json.loads(deleted_files)
    #         print(deleted_files)
    #
    #         # 빈 배열이 아닐 때만 작업 수행
    #         if deleted_files:  # deleted_files가 비어있지 않을 때
    #             print(deleted_files)
    #
    #             if board.image_path:  # board.image_path가 None이 아닐 때만 접근
    #                 current_file_name = board.image_path.name.split('/')[-1]  # 파일 이름만 추출
    #                 print(current_file_name)  # 파일 이름 확인
    #
    #                 # 삭제할 파일 이름 가져오기
    #                 deleted_file_name = deleted_files[0].split('/')[-1]  # 첫 번째 요소에서 파일 이름 추출
    #                 print(deleted_file_name)  # 삭제할 파일 이름 확인
    #
    #                 # 기존 이미지 삭제
    #                 if current_file_name == deleted_file_name:  # 이름이 같을 때 삭제
    #                     board.image_path.delete()  # 기존 이미지를 삭제
    #                     board.image_path = None  # 이미지 필드를 None으로 설정
    #
    #     # 게시물 업데이트
    #     board.content = content
    #
    #     if image_path:
    #         board.image_path = image_path  # 새 이미지로 업데이트
    #     board.save()  # 변경 사항 저장
    #
    #     return redirect('boards:petrol_board_detail', id=board.id)
    #
    # if board.image_path:
    #     image_url = board.image_path.url
    #     file_name = unquote(image_url.split('/')[-1])
    #     base_name, extension = file_name.rsplit('.', 1)  # 기본 이름과 확장자를 분리
    #
    #     if len(base_name) > 10:
    #         short_name = base_name[:10] + '...' + '.' + extension
    #     else:
    #         short_name = file_name  # 기본 이름이 10자 이하일 경우

    context = {
        'board': board,
        'short_name': short_name if board.image_path else None,
    }
    return render(request, 'boards/petrol_board_edit.html', context)


# 신고글 삭제하기
def petrol_board_delete(request, id):
    if request.method == 'POST':
        board = Board.objects.get(id=id)
        board.image_path.delete(save=False)
        board.delete()
        return redirect('boards:petrol_board')


# 댓글 수정하기
def comment_edit(request, id):
    comment = get_object_or_404(Comment, id=id)

    if request.method == 'POST':
        content = request.POST.get('content')
        comment.content = content
        comment.save()
        return redirect('boards:petrol_board_detail', id=comment.board.id)

    else:
        form = CommentForm()

    context = {
        'form': form,
        'comment': comment,
    }

    return render(request, 'boards/comment_edit.html', context)


# 댓글 삭제
def comment_delete(request, id):
    if request.method == 'POST':
        comment = get_object_or_404(Comment, id=id)
        comment.delete()
        return redirect('boards:petrol_board_detail', id=comment.board.id)



