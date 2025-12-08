from rest_framework import viewsets, permissions, status

from .models import User
from .serializers import UserSerializer, SimpleUserSerializer
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
        permission_classes=[permissions.IsAuthenticated],
    )
    def me(self, request):
        serializer = self.get_serializer(request.user)

        return Response(serializer.data)

    @action(
        detail=False,
        methods=["get"],
        url_path="by-username/(?P<username>[^/.]+)",  # safer regex
        permission_classes=[permissions.IsAuthenticated],
    )
    def by_username(self, request, username=None):
        user = get_object_or_404(User, username=username)
        serializer = self.get_serializer(user)

        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def follow(self, request, pk=None):
        target = self.get_object()

        if target == request.user:
            return Response({"detail": "you cant follow yourself"}, status=400)

        request.user.following.add(target)
        return Response({"detail": "followed"}, status=status.HTTP_201_CREATED)

    @action(
        detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated]
    )
    def unfollow(self, request, pk=None):
        target = self.get_object()
        # safe remove (no-op if not following)
        request.user.following.remove(target)

        return Response({"detail": "Unfollowed."}, status=status.HTTP_200_OK)

    @action(
        detail=True, methods=["get"], permission_classes=[permissions.IsAuthenticated]
    )
    def followers(self, request, pk=None):
        user = self.get_object()
        qs = user.followers.all()
        serializer = SimpleUserSerializer(qs, many=True, context={"request": request})

        return Response(serializer.data)

    @action(
        detail=True, methods=["get"], permission_classes=[permissions.IsAuthenticated]
    )
    def following(self, request, pk=None):
        user = self.get_object()
        qs = user.following.all()
        serializer = SimpleUserSerializer(qs, many=True, context={"request": request})

        return Response(serializer.data)
