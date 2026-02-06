"""Tests for the users app registration endpoint."""
from django.urls import reverse
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status

User = get_user_model()

class RegistrationTests(APITestCase):
    """Test registration API endpoint."""

    def test_register_success(self):
        """Test successful registration with valid data."""
        url = reverse('register')
        data = {'email': 'test@example.com', 'password': 'StrongPassword1!'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email='test@example.com').exists())

    def test_register_missing_email(self):
        """Test registration fails if email is missing."""
        url = reverse('register')
        data = {'password': 'strongpassword123'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_missing_password(self):
        """Test registration fails if password is missing."""
        url = reverse('register')
        data = {'email': 'test2@example.com'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_duplicate_email(self):
        """Test registration fails if email already exists."""
        User.objects.create_user(email='dupe@example.com', password='pw123456')
        url = reverse('register')
        data = {'email': 'dupe@example.com', 'password': 'anotherpw123'}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
