# Generated by Django 3.2.8 on 2021-12-13 02:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20211207_2014'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='user_name',
            field=models.CharField(default=0, max_length=80),
            preserve_default=False,
        ),
    ]
