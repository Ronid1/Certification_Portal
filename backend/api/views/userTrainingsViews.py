from django.db.models.query import QuerySet
from rest_framework import generics, views, viewsets, permissions
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from ..serializers import UserTrainingSerializer
from ..models import UserTraining


class UserTrainingList(generics.ListCreateAPIView):
     queryset = UserTraining.objects.all()
     permission_classes = [permissions.AllowAny]
     serializer_class = UserTrainingSerializer
     #filter_fields = ['training_id']

class UserTrainingDetail(generics.RetrieveUpdateDestroyAPIView):
     queryset = UserTraining.objects.all()
     permission_classes = [permissions.AllowAny]
     serializer_class = UserTrainingSerializer