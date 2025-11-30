from rest_framework import viewsets, permissions

from .models import User
from user.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializers_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
