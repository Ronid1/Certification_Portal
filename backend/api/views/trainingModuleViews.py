from django.db.models.query import QuerySet
from rest_framework import generics, views, viewsets, permissions
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from ..serializers import TrainingModuleSerializer
from ..models import TrainingModule

class TrainingModuleList(generics.ListCreateAPIView):
     queryset = TrainingModule.objects.all()
     permission_classes = [permissions.AllowAny]
     serializer_class = TrainingModuleSerializer
     filter_fields = ["certification_id"]

class TrainingModuleDetail(generics.RetrieveUpdateDestroyAPIView):
     queryset = TrainingModule.objects.all()
     permission_classes = [permissions.AllowAny]
     serializer_class = TrainingModuleSerializer