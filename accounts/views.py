from django.contrib.auth import authenticate
from django.http import JsonResponse
from django.shortcuts import render, redirect

from accounts.forms import SignupForm
from accounts.models import Member


# Create your views here.
def login(request):
    return render(request, 'accounts/login.html')


# 회원가입 메서드
def sign_up(request):
    member_type = request.GET.get('member_type')
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
    return render(request, 'accounts/sign_up.html', {'form': form, 'member_type': member_type})


def sign_up_select(request):
    return render(request, 'accounts/sign_up_select.html')


# 아이디 중복체크 (ajax) 메서드
def id_check(request):
    user_id = request.POST.get('user_id')
    is_taken = Member.objects.filter(user_id=user_id).exists()
    return JsonResponse({'is_taken': is_taken})


def sign_up_done(request):
    return render(request, 'accounts/sign_up_complete.html')