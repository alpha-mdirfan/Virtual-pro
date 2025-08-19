from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework import serializers
from .models import Profile

class RegisterSerializer(serializers.Serializer):
    first_name = serializers.CharField(max_length=150)
    last_name  = serializers.CharField(max_length=150)
    email      = serializers.EmailField()
    password   = serializers.CharField(write_only=True, min_length=8)
    confirm_password = serializers.CharField(write_only=True, min_length=8)
    user_type  = serializers.ChoiceField(choices=Profile.USER_TYPES, required=False, default='basic')

    def validate(self, attrs):
        if attrs['password'] != attrs['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        # run Django’s password validators
        try:
            validate_password(attrs['password'])
        except DjangoValidationError as e:
            raise serializers.ValidationError({"password": list(e.messages)})
        return attrs

    def create(self, validated_data):
        user_type = validated_data.pop('user_type', 'basic')
        validated_data.pop('confirm_password', None)

        email = validated_data['email'].lower()
        username = email  # simple strategy: use email as username
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError({"email": "An account with this email already exists."})

        user = User.objects.create_user(
            username=username,
            email=email,
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password'],
        )
        Profile.objects.create(user=user, user_type=user_type)
        return user

class UserOutSerializer(serializers.ModelSerializer):
    user_type = serializers.CharField(source='profile.user_type')

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'user_type']
   
class ChangePasswordSerializer(serializers.Serializer):
    current_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    confirm_password = serializers.CharField(required=True)     
    
    def validate_current_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Current password is incorrect")
        return value
    
    def validate(self, data):
        # Confirm password match
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Passwords do not match"})

        # Validate new password strength
        validate_password(data['new_password'], user=self.context['request'].user)
        
        # Optional custom rules
        if not any(c.isupper() for c in data['new_password']):
            raise serializers.ValidationError({"new_password": "Password must contain at least one uppercase letter"})
        if not any(c in "!@#$%^&*()" for c in data['new_password']):
            raise serializers.ValidationError({"new_password": "Password must contain at least one special character"})

        return data
    
    def save(self, ):
        user = self.context['request'].user
        new_password = self.validated_data['new_password']
        user.set_password(new_password)   # 🔑 updates password hash
        user.save()
        return user