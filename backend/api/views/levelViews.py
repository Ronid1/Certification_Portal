from django.db.models.query import QuerySet
from rest_framework import generics, views, viewsets, permissions
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from ..serializers import LevelsSerializer
from ..models import CertificationLevels


class LevelList(generics.ListCreateAPIView):
     queryset = CertificationLevels.objects.all()
     permission_classes = [permissions.AllowAny]
     serializer_class = LevelsSerializer
     filter_fields = ('scale', 'level')

class LevelDetail(generics.RetrieveUpdateDestroyAPIView):
     queryset = CertificationLevels.objects.all()
     permission_classes = [permissions.AllowAny]
     serializer_class = LevelsSerializer