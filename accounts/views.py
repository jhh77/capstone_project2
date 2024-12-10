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
            print('주민')
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
    # member_type = request.GET.get('member_type')
    # print(member_type)
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

