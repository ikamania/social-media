from rest_framework import serializers
from .models import Comment, Post
from user.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    likes = serializers.IntegerField(source="likes.count", read_only=True)
    liked = serializers.SerializerMethodField()
    comments_count = serializers.IntegerField(source="comments.count", read_only=True)

    class Meta:
        model = Post
        fields = [
            "id",
            "user",
            "content",
            "image",
            "likes",
            "liked",
            "comments_count",
            "created_at",
        ]

    def get_liked(self, obj):
        user = self.context.get("request").user
        if user.is_authenticated:
            return obj.likes.filter(user=user).exists()
        return False


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    likes = serializers.IntegerField(source="likes.count", read_only=True)
    liked = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            "id",
            "user",
            "post",
            "content",
            "image",
            "likes",
            "liked",
            "created_at",
        ]
        read_only_fields = ["user", "created_at"]

    def get_liked(self, obj):
        user = self.context.get("request").user
        if user.is_authenticated:
            return obj.likes.filter(user=user).exists()
        return False
