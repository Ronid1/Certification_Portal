# Generated by Django 3.2.8 on 2021-12-30 18:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0020_auto_20211229_2053'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trainingmodule',
            name='certification_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='trainings', to='api.certification'),
        ),
        migrations.AlterField(
            model_name='usercertifications',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='certifications', to=settings.AUTH_USER_MODEL),
        ),
    ]
