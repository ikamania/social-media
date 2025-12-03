from rest_framework import viewsets, permissions
from .models import Post, Like, Comment
from .serializers import CommentSerializer, PostSerializer
from rest_framework.decorators import action
from rest_framework.response import Response


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=["POST"])
    def like(self, request, pk=None):
        post = self.get_object()

        like, created = Like.objects.get_or_create(
            user=request.user,
            post=post,
        )
        if not created:
            like.delete()
            return Response({"liked": False}, status=200)
        return Response({"liked": True}, status=201)


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
