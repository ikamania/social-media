from rest_framework import viewsets, permissions

from .models import User
from .serializers import UserSerializer
from rest_framework.decorators import action
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action == "create":
            return [permissions.AllowAny()]
        elif self.action == "me":
            return [permissions.IsAuthenticated()]
        else:
            return [permissions.IsAdminUser()]

    @action(
        detail=False,
        methods=["get"],
        permission_classes=[permissions.IsAuthenticated()],
    )
    def me(self, request):
        serializer = self.get_serializer(request.user)

        return Response(serializer.data)
