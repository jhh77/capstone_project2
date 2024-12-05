from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.db import models

# Create your models here.


class MemberType(models.Model):
    type_name = models.CharField(max_length=10)

    def __str__(self):
        return self.type_name


# 커스터마이징 한 회원 모델이 생성될 때 어떤 동작을 할 지 명시
class UserManager(BaseUserManager):
    def create_user(self, user_id, email, nickname, region_sido, region_sigungu, region_dong, member_type, password=None):
        if not user_id:
            raise ValueError('아이디는 필수 입력입니다.')

        if not email:
            raise ValueError('이메일은 필수 입력입니다.')

        if not nickname:
            raise ValueError('닉네임은 필수 입력입니다.')

        if not region_sido:
            raise ValueError('시/도는 필수 입력입니다.')

        if not region_sigungu:
            raise ValueError('시/군/구는 필수 입력입니다.')

        if not region_dong:
            raise ValueError('읍/면/동은 필수 입력입니다.')

        if member_type:
            member_type = MemberType.objects.get(id=member_type)

        user = self.model(
            user_id=user_id,
            email=email,
            nickname=nickname,
            region_sido=region_sido,
            region_sigungu=region_sigungu,
            region_dong=region_dong,
            member_type=member_type,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user


    def create_superuser(self, user_id, email, nickname, region_sido, region_sigungu, region_dong, member_type, password):
        user = self.create_user(
            user_id=user_id,
            email=email,
            nickname=nickname,
            region_sido=region_sido,
            region_sigungu=region_sigungu,
            region_dong=region_dong,
            member_type=member_type,
            password=password
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class Member(AbstractBaseUser):
    user_id = models.CharField(primary_key=True, max_length=15, null=False, blank=False, unique=True)
    email = models.EmailField(max_length=100, null=False, blank=False, unique=True)
    nickname = models.CharField(null=False, max_length=8, blank=False)
    region_sido = models.CharField(null=False, max_length=30, blank=False)
    region_sigungu = models.CharField(null=False, max_length=30, blank=False)
    region_dong = models.CharField(null=False, max_length=30, blank=False)
    member_type = models.ForeignKey(MemberType, on_delete=models.CASCADE, null=False, blank=False)

    # user 모델의 필수 field
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    # 헬퍼 클래스 사용
    objects = UserManager()

    USERNAME_FIELD = 'user_id'
    # superuser만들때도 필수로 작성해야하는 field, 일반유저도 o
    REQUIRED_FIELDS = ['email', 'nickname', 'region_sido', 'region_sigungu', 'region_dong', 'member_type']

    def __str__(self):
        return self.user_id

    #아래 함수는 admin 페이지 오류 발생을 막기 위해
    @property
    def is_staff(self):
        return self.is_admin

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True