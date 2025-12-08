from .models import User
from rest_framework import serializers


class SimpleUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "image"]


class UserSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "name",
            "surname",
            "email",
            "image",
            "password",
            "date_joined",
            "followers_count",
            "following_count",
            "is_following",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def get_followers_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()

    def get_is_following(self, obj):
        request = self.context.get("request")
        if not request or request.user.is_anonymous:
            return False
        return request.user.following.filter(pk=obj.pk).exists()
