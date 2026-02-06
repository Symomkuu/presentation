"""Serializers for the users app."""
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError as DjangoValidationError
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for registering a new user with email and password."""

    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(),
                message="Email is already in use."
            )
        ]
    )
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        """Meta options for RegisterSerializer."""
        model = User
        fields = ("email", "password")

    def validate_email(self, value):
        """Normalize email to lowercase."""
        return value.lower()

    def validate_password(self, value):
        """Validate password using Django's built-in validators."""
        try:
            validate_password(value)
        except DjangoValidationError as exc:
            raise serializers.ValidationError(exc.messages) from exc
        return value

    def create(self, validated_data):
        """Create and return a new user."""
        return User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"]
        )

    def update(self, instance, validated_data):
        """Not implemented: updating users via this serializer is not supported."""
        raise NotImplementedError(
            "Update method is not implemented for RegisterSerializer."
        )

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom JWT login serializer with specific error messages."""

    def update(self, instance, validated_data):
        """Not implemented: token serializer does not support update."""
        raise NotImplementedError(
            "Update method is not implemented for CustomTokenObtainPairSerializer."
        )

    def validate(self, attrs):
        """
        Validate user credentials for JWT authentication.
        Checks if the provided email and password match a user.
        Raises a validation error if authentication fails.
        Returns token data if successful.
        """
        email = attrs.get("email")
        password = attrs.get("password")

        user = authenticate(email=email, password=password)
        if user is None:
            raise serializers.ValidationError(
                {"detail": "Incorrect email or password"}
            )

        data = super().validate(attrs)
        return data

class UserInfoSerializer(serializers.ModelSerializer):
    """
    Serializer for returning basic user information (id and email).
    Used for authenticated user info endpoints.
    """
    class Meta:
        model = User
        fields = ("id", "email")