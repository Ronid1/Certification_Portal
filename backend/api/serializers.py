from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "password", "email"]

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["user_id", "user_name", "is_admin", "role", "image", "certifications"]
        #add fields that are not requierd on post??
        #https://www.youtube.com/watch?v=PqkvRz1sLF8 (26:30)
        # extra_kwargs = {
        #     "id": {"required": False}
        # }

# class PartSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Part
#         #fields = ('id', 'part_number', 'revision', 'aircraft_model')
#         fields = '__all__'

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
        fields = '__all__'

class InstructorsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instructors
        fields = '__all__'

class UserCertificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCertifications
        fields = ["id", "certification_id", "user_id", "level", "created_on_date", "expiration_date", "days_until_expires"]

class TrainingModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingModule
        fields = ["id", "certification_id", "name", "link"]

class UserTrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserTraining
        fields = '__all__'
