from django.urls import path
from .views import RegisterView, MeView, ProtectedView,ChangePasswordView,DeleteAccountView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path("me/", MeView.as_view(), name="me"),                 
    path("protected/", ProtectedView.as_view(), name="prot"), # sample protected
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
    path("delete-account/", DeleteAccountView.as_view(), name="delete-account"),
]