from django.db.models.query import QuerySet
from rest_framework import generics, views, viewsets, permissions
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from ..serializers import ScalesSerializer
from ..models import CertificationScales


class ScaleList(generics.ListCreateAPIView):
     queryset = CertificationScales.objects.all()
     permission_classes = [permissions.AllowAny]
     serializer_class = ScalesSerializer
     filter_fields = ['scale_name']

class ScaleDetail(generics.RetrieveUpdateDestroyAPIView):
     queryset = CertificationScales.objects.all()
     permission_classes = [permissions.AllowAny]
     serializer_class = ScalesSerializer