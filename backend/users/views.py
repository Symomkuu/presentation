"""Views for the users app."""
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from users.serializers import RegisterSerializer, CustomTokenObtainPairSerializer, UserInfoSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db import IntegrityError

class RegisterView(APIView):
    """API view for user registration."""
    def post(self, request):
        """Handle POST request for user registration."""
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
            except IntegrityError:
                return Response({"email": ["An account with this email already exists."]}, status=status.HTTP_400_BAD_REQUEST)
            return Response(
                {'message': 'User registered successfully'},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomTokenObtainPairView(TokenObtainPairView):
    """Custom token obtain pair view."""
    serializer_class = CustomTokenObtainPairSerializer

class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserInfoSerializer(request.user)
        return Response(serializer.data)