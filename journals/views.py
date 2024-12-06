from django.http import JsonResponse
from django.shortcuts import render, redirect
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
        journals = Journal.objects.filter(date=date_str, user=request.user)  # 현재 로그인한 사용자에 대한 일지

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
