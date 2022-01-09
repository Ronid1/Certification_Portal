from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        #fields = '__all__'
        fields = ["id", "password", "email", "username"]
        # extra_kwargs = {
        #     "username": {User.objects}
        # }

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["user_id", "user_name", "is_admin", "role", "image", "certifications"]

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ["id", "name", "practical", "level_scale", "days_valid", "trainings"]

class LevelsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificationLevels
        fields = '__all__'

class ScalesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CertificationScales
        fields = ["id", "scale_name", "levels"]

class InstructorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructors
        fields = '__all__'

class UserCertificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCertifications
        fields = ["id", "certification_id", "user_id", "level", "created_on_date", "expiration_date", "days_until_expires", "entered_level"]

class TrainingModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingModule
        fields = ["id", "certification_id", "name", "link"]

class UserTrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTraining
        fields = '__all__'
