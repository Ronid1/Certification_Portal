# Generated by Django 3.2.8 on 2021-12-30 19:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0024_alter_usercertifications_user_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usertraining',
            name='user_id',
        ),
        migrations.AddField(
            model_name='usertraining',
            name='user_certification',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='api.usercertifications'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='instructors',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='instructor_for', to='api.profile'),
        ),
        migrations.AlterField(
            model_name='usercertifications',
            name='certification_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='users', to='api.certification'),
        ),
    ]
