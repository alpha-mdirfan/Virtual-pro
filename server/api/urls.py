from .views import RegisterView, MeView, ProtectedView,ChangePasswordView,DeleteAccountView, AvatarUploadView
from django.urls import path
from django.conf import settings           # ✅ import settings
from django.conf.urls.static import static # ✅ import static

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path("me/", MeView.as_view(), name="me"),                 
    path("protected/", ProtectedView.as_view(), name="prot"), # sample protected
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
    path("delete-account/", DeleteAccountView.as_view(), name="delete-account"),
    path("upload-avatar/", AvatarUploadView.as_view(), name="upload-avatar"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)