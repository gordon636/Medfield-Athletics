from django.conf.urls import url, include
from django.urls import path
from rest_framework import routers
from backend.api import views

router = routers.DefaultRouter()

#  USER URL
router.register(r'user', views.UserViewSet)

# SCHOOL URL
router.register(r'school', views.SchoolViewSet)

# ATHLETE URL
router.register(r'athlete', views.AthleteViewSet)

# TEAM URL
router.register(r'team', views.TeamViewSet)

# ROSTER URL
router.register(r'roster', views.RosterViewSet)

urlpatterns = [
    url(r'^', include(router.urls))
]
