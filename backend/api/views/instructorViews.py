from django.db.models.query import QuerySet
from rest_framework import generics, views, viewsets, permissions
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from ..serializers import InstructorsSerializer
from ..models import Instructors

class InstructorsList(generics.ListCreateAPIView):
     queryset = Instructors.objects.all()
     permission_classes = [permissions.AllowAny]
     serializer_class = InstructorsSerializer
     filter_fields = ('user_id', 'certification_id')

class InstructorsDetail(generics.RetrieveUpdateDestroyAPIView):
     queryset = Instructors.objects.all()
     permission_classes = [permissions.AllowAny]
     serializer_class = InstructorsSerializer