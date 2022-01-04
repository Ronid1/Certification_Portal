from django.db.models.query import QuerySet
from rest_framework import generics, views, viewsets, permissions
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from ..serializers import UserCertificationsSerializer
from ..models import UserCertifications

class UserCertificationsList(generics.ListCreateAPIView):
     queryset = UserCertifications.objects.all()
     permission_classes = [permissions.AllowAny]
     serializer_class = UserCertificationsSerializer
     filter_fields = ('user_id', 'certification_id')

class UserCertificationsDetail(generics.RetrieveUpdateDestroyAPIView):
     queryset = UserCertifications.objects.all()
     permission_classes = [permissions.AllowAny]
     serializer_class = UserCertificationsSerializer