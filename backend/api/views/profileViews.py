from django.db.models.query import QuerySet
#from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics, views, viewsets, permissions
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from ..serializers import ProfileSerializer
from ..models import Profile

class ProfileList(generics.ListCreateAPIView):
     queryset = Profile.objects.all()
     permission_classes = [permissions.AllowAny]
     serializer_class = ProfileSerializer
     filter_fields = ('user_name', 'role')

class ProfileDetail(generics.RetrieveUpdateDestroyAPIView):
     queryset = Profile.objects.all()
     permission_classes = [permissions.AllowAny]
     serializer_class = ProfileSerializer
     lookup_field = 'user_id'
     lookup_url_kwarg = 'user_id'