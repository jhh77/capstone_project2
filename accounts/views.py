from django.contrib.auth import authenticate, logout
from django.http import JsonResponse
from django.shortcuts import render, redirect

from accounts.forms import SignupForm
from accounts.models import *
from boards.models import *
from journals.models import Journal


# Create your views here.
# 시작 시 페이지 (루트 페이지)
def home(request):
    if request.user.is_authenticated:
        info1_count = 0
        info2_count = 0

        member = Member.objects.get(user_id=request.user) # 현재 로그인 한 유저 정보 저장

        if member.member_type.type_name == '주민':
            info1_count = Board.objects.filter(user_id=request.user, board_type=3).count()
            info2_count = Board.objects.filter(user_id=request.user, board_type=2).count()
        else:
            info1_count = Board.objects.filter(user_id=request.user).count()
            info2_count = Journal.objects.filter(user_id=request.user).count()

        context = {
            'member': member,
            'member_type': member.member_type.type_name,
            'info1_count': info1_count,
            'info2_count': info2_count,
        }
        return render(request, 'accounts/home.html', context)
    else:
        return render(request, 'accounts/login.html')

def login(request):
    return render(request, 'accounts/login.html')


# 회원가입 메서드
def sign_up(request):
    current_path = request.path
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            form.save()
            user_id = form.cleaned_data.get('user_id')
            password = form.cleaned_data.get('password1')
            user = authenticate(username=user_id, password=password)
            if user is not None:
                return redirect('accounts:sign-up-done')
            else:
                print("회원가입 실패")
    else:
        form = SignupForm()
    if 'sign-up-petrol' in current_path:
        return render(request, 'accounts/sign_up_petrol.html', {'form': form})
    else:
        return render(request, 'accounts/sign_up_people.html', {'form': form})


def sign_up_select(request):
    return render(request, 'accounts/sign_up_select.html')


# 아이디 중복체크 (ajax) 메서드
def id_check(request):
    user_id = request.POST.get('user_id')
    is_taken = Member.objects.filter(user_id=user_id).exists()
    return JsonResponse({'is_taken': is_taken})


def sign_up_done(request):
    return render(request, 'accounts/sign_up_complete.html')


# 로그아웃 메서드
def logout_view(request):
    logout(request)
    return redirect('accounts:login')


# 마이 페이지
def my_page(request):
    member = Member.objects.get(user_id=request.user)  # 현재 로그인 한 유저 정보 저장
    context = {
        'member': member,
        'member_type': member.member_type.type_name,
    }
    return render(request, 'accounts/my_page.html', context)


# 회원 정보 보기
def my_profile(request):
    member = Member.objects.get(user_id=request.user)
    member_type = member.member_type.type_name
    context = {
        'member': member,
        'member_type': member_type,
    }
    return render(request, 'accounts/my_profile.html', context)


# 닉네임 변경
def nickname_change(request):
    member = Member.objects.get(user_id=request.user)
    if request.method == 'POST':
        nickname = request.POST.get('nickname')
        member.nickname = nickname
        member.save()
        return redirect('accounts:nickname_change')
    context = {
        'member': member,
    }
    return render(request, 'accounts/nickname_change.html', context)


# 지역 변경
def region_change(request):
    member = Member.objects.get(user_id=request.user)
    if request.method == 'POST':
        sido = request.POST.get('sido')
        sigungu = request.POST.get('sigungu')
        dong = request.POST.get('dong')
        member.region_sido = sido
        member.region_sigungu = sigungu
        member.region_dong = dong
        member.save()
        return redirect('accounts:region_change')

    context = {
        'member': member,
    }
    return render(request, 'accounts/region_change.html', context)


def menubar(request):
    return render(request, 'menubar.html')