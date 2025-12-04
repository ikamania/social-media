from rest_framework import viewsets, permissions

from .models import User
from .serializers import UserSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        else:
            return [permissions.IsAuthenticated()]

    @action(
        detail=False,
        methods=["get"],
        permission_classes=[permissions.IsAuthenticated()],
    )
    def me(self, request):
        serializer = self.get_serializer(request.user)

        return Response(serializer.data)

    @action(
        detail=False,
        methods=["get"],
        url_path="by-username/(?P<username>[^/.]+)",  # safer regex
        permission_classes=[permissions.AllowAny()],
    )
    def by_username(self, request, username=None):
        user = get_object_or_404(User, username=username)
        serializer = self.get_serializer(user)

        return Response(serializer.data)
