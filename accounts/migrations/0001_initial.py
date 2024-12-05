# Generated by Django 5.1.3 on 2024-12-05 11:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MemberType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type_name', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('user_id', models.CharField(max_length=15, primary_key=True, serialize=False, unique=True)),
                ('email', models.EmailField(max_length=100, unique=True)),
                ('nickname', models.CharField(max_length=8)),
                ('region_sido', models.CharField(max_length=30)),
                ('region_sigungo', models.CharField(max_length=30)),
                ('region_dong', models.CharField(max_length=30)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('member_type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.membertype')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
