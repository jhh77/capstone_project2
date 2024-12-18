import json
from urllib.parse import unquote

from django.http import JsonResponse
from django.shortcuts import render, redirect, get_object_or_404
from .forms import *
from accounts.models import *

# Create your views here.


# 순찰 일지 메인 페이지
def journal_home(request):
    return render(request, 'journals/journal_home.html')

# 순찰 일지 보내주기
def get_journal(request):
    if request.method == 'GET':
        date_str = request.GET.get('date')
        # 해당 날짜에 대한 일지 조회
        journals = Journal.objects.filter(date=date_str, user=request.user).order_by('start_time')  # 현재 로그인한 사용자에 대한 일지

        # 일지 데이터를 직렬화하여 반환
        journal_data = []
        for journal in journals:
            journal_data.append({
                'id': journal.id,
                'date': journal.date.strftime('%Y-%m-%d'),
                'start_time': journal.start_time.strftime('%H:%M'),
                'end_time': journal.end_time.strftime('%H:%M'),
                'content': journal.content,
            })

        return JsonResponse(journal_data, safe=False)


# 일지 작성
def journal_write(request):
    member = Member.objects.get(user_id=request.user)
    if request.method == 'POST':
        form = JournalForm(request.POST)
        if form.is_valid():
            journal = form.save(commit=False)
            journal.user = request.user
            journal.region_sido = member.region_sido
            journal.region_sigungu = member.region_sigungu
            journal.region_dong = member.region_dong
            journal.save()

            # 이미지 처리
            images = request.FILES.getlist('image_path') # 여러 개 사진 가져오기
            for image in images:
                journal_image = JournalImage(journal=journal, image_path=image)
                journal_image.save()
            return redirect('journals:journal_home')
    else:
        form = JournalForm()

    context = {
        'member': member,
        'form': form
    }

    return render(request, 'journals/journal_write.html', context)


# 일지 상세보기
def journal_detail(request, id):
    journal = Journal.objects.get(id=id)
    images = JournalImage.objects.filter(journal=journal)
    context = {
        'journal': journal,
        'images': images,
    }
    return render(request, 'journals/journal_detail.html', context)


# 일지 수정하기 (변경코드)
def journal_edit(request, id):
    journal = get_object_or_404(Journal, id=id)
    images = JournalImage.objects.filter(journal=journal) # 기존 이미지들

    if request.method == 'POST':
        image_path = request.FILES.getlist('image_path') # 새 이미지들
        delete_value = request.POST.get('delete')

        # 내용 변경
        journal.date = request.POST['date']
        journal.start_time = request.POST['start_time']
        journal.end_time = request.POST['end_time']
        journal.content = request.POST['content']
        journal.save()

        # 이미지 처리
        if delete_value == '1':
            # 기존 이미지를 삭제
            for image in images:
                image.image_path.delete(save=False)
                image.delete()

        # 새 이미지가 있는 경우
        for image in image_path:
            journal_image = JournalImage(journal=journal, image_path=image)  # 새 이미지 추가
            journal_image.save()

        return redirect('journals:journal_detail', id=journal.id)

    # 이미지 파일 이름 처리
    processed_images = []
    for image in images:
        image_url = image.image_path.url
        file_name = unquote(image_url.split('/')[-1])
        base_name, extension = file_name.rsplit('.', 1)  # 기본 이름과 확장자를 분리

        # 짧은 이름 처리
        if len(base_name) > 10:
            short_name = base_name[:10] + '...' + '.' + extension  # 확장자 붙이기
        else:
            short_name = file_name  # 기본 이름이 10자 이하일 경우

        processed_images.append({'short_name': short_name, 'full_name': file_name, 'id': image.id})  # ID 추가

    context = {
        'journal': journal,
        'images': processed_images,
    }
    return render(request, 'journals/journal_edit.html', context)


# 일지 삭제하기
def journal_delete(request, id):
    if request.method == 'POST':
        journal = get_object_or_404(Journal, id=id)
        journal.delete()
        return redirect('journals:journal_home')
    else:
        return render(request, 'journals/journal_home.html')
