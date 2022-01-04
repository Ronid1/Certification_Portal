from django.db.models.query import QuerySet
from rest_framework import generics, views, viewsets, permissions
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from ..serializers import CertificationSerializer
from ..models import Certification

class CertificationList(generics.ListCreateAPIView):
     queryset = Certification.objects.all()
     permission_classes = [permissions.AllowAny]
     serializer_class = CertificationSerializer
     filter_fields = ()

class CertificationDetail(generics.RetrieveUpdateDestroyAPIView):
     queryset = Certification.objects.all()
     permission_classes = [permissions.AllowAny]
     serializer_class = CertificationSerializer