from rest_framework import serializers
from .models import Post
from user.serializers import UserSerializer


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    likes = serializers.IntegerField(source="likes.count", read_only=True)
    liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ["id", "user", "content", "image", "likes", "liked"]

    def get_liked(self, obj):
        user = self.context.get("request").user
        if user.is_authenticated:
            return obj.likes.filter(user=user).exists()
        return False
