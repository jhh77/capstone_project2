from .models import Member
from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import ReadOnlyPasswordHashField


# 유저 생성 시 입력 데이터 처리와 유효성 검사 역할
class SignupForm(UserCreationForm):
    # 폼이 사용할 모델과 필드 목록들 정의
    class Meta(UserCreationForm.Meta):
        model = Member # 폼이 사용할 모델
        fields = ['user_id', 'email', 'nickname', 'region_sido', 'region_sigungu', 'region_dong', 'member_type']

    #지역 여백 없애기
    def clean_region_sido(self):
        return self.cleaned_data['region_sido'].replace(" ", "")

    def clean_region_sigungu(self):
        return self.cleaned_data['region_sigungu'].replace(" ", "")

    def clean_region_dong(self):
        return self.cleaned_data['region_dong'].replace(" ", "")

    # 유효성 검사 메서드들 정의
    # 비밀번호 일치 검사
    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("비밀번호가 다릅니다.")
        return password2

    # 사용자 저장 메서드
    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user

    def clean_email(self):
        email = self.cleaned_data.get('email')

        if email:
            qs = Member.objects.filter(email=email)
            if qs.exists():
                raise forms.ValidationError('이미 등록된 이메일입니다.')
            return email

    def clean_user_id(self):
        user_id = self.cleaned_data.get('user_id')

        if user_id:
            qs = Member.objects.filter(user_id=user_id)
            if qs.exists():
                raise forms.ValidationError('이미 등록된 아이디입니다.')
            return user_id
