from django.db.models.query import QuerySet
from rest_framework import generics, views, viewsets, permissions, filters
from rest_framework.decorators import permission_classes
from rest_framework.response import Response
from ..serializers import UserSerializer
from ..models import User

# class UserView(viewsets.ModelViewSet):
#     queryset = User.objects.all()
#     permission_classes = [permissions.AllowAny]  #permissions.IsAuthenticated
#     serializer_class = UserSerializer
#     #filter_backends = [django_filters.rest_framework.DjangoFilterBackend]

#     #https://www.django-rest-framework.org/api-guide/filtering/
#     #search by specific fields
#     #filter_backends = {filters.SearchFilter}
#     #search_fields = ['email', 'password']

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]  #permissions.IsAuthenticated
    serializer_class = UserSerializer
    filter_fields = ('id', 'email', 'password')

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]  #permissions.IsAuthenticated
    serializer_class = UserSerializer


    #https://www.django-rest-framework.org/api-guide/filtering/
    #search by specific fields
    #filter_backends = {filters.SearchFilter}
    #search_fields = ['email', 'password']