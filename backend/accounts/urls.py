from django.urls import path, include
from django.conf.urls import url
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views
from accounts import views

urlpatterns = [
    url(r'api/auth', include('knox.urls')),
    path('api/auth/register', RegisterAPI.as_view()),
    path('api/auth/login', LoginAPI.as_view()),
    path('api/auth/user', UserAPI.as_view()),
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]