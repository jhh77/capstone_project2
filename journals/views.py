from django.shortcuts import render

# Create your views here.


# 순찰 일지 메인 페이지
def journal_home(request):
    return render(request, 'journals/journal_home.html')


# 일지 작성 페이지
def journal_write(request):
    return render(request, 'journals/journal_write.html')
