from rest_framework import viewsets, permissions
from .models import Post, PostLike, Comment, CommentLike
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

        like, created = PostLike.objects.get_or_create(
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

    def get_queryset(self):
        queryset = Comment.objects.all()
        post_id = self.request.query_params.get("post")

        if post_id is not None:
            queryset = queryset.filter(post_id=post_id)
        return queryset

    @action(detail=True, methods=["POST"])
    def like(self, request, pk=None):
        comment = self.get_object()

        like, created = CommentLike.objects.get_or_create(
            user=request.user,
            comment=comment,
        )
        if not created:
            like.delete()
            return Response({"liked": False}, status=200)
        return Response({"liked": True}, status=201)
