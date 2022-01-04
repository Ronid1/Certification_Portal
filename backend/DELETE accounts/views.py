from django.contrib.auth.models import User
from rest_framework import permissions, viewsets
from .serializers import UserSerializer

#user view
class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    #permission_classes = [
    #    permissions.IsAuthenticated,
    #]
    serializer_class = UserSerializer


#update token - after timeout (frontend) send new token if user is logged in
#class UpdateTokenView(generics.GenericAPIView):

#add user
#login user (email, password) -> return id, token
#set password(id, password_old, password_new)