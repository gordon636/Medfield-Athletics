"""
REST FRAMEWORK VIEWS

These classes define a standard set of views which take and interpret REST endpoints such as GET and POST.


Author: Gordon White
Date: 09/10/19
"""
import logging

from django.contrib.auth.models import User
from backend.api.base_models import School, Athlete, Team, Roster
from backend.api.base_serializers import SchoolSerializer, AthleteSerializer, TeamSerializer, RosterSerializer
from rest_framework import viewsets, permissions, filters
from rest_framework.response import Response

from backend.api.base_serializers import UserSerializer

from django.http import HttpResponseForbidden


log = logging.getLogger('logger')

"""
USERS

API endpoint that allows users to be viewed or edited.
"""


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]



"""
SCHOOLS

API endpoint that allows users to be viewed or edited.
"""


class SchoolViewSet(viewsets.ModelViewSet):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]

"""
ATHLETE FILTER

If asking for a specific school
"""
class AthleteFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):

        # team_id
        if 'school_id' in request.query_params:
            return queryset.filter(school_id=request.query_params['school_id'])

        return queryset

"""
ATHLETES

API endpoint that allows users to be viewed or edited.
"""


class AthleteViewSet(viewsets.ModelViewSet):
    queryset = Athlete.objects.all()
    serializer_class = AthleteSerializer
    filter_backends = (AthleteFilter,)

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]


"""
TEAMS

API endpoint that allows users to be viewed or edited.
"""


class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]

"""
ROSTER FILTER

If asking for a specific team
"""
class RosterFilter(filters.BaseFilterBackend):
    def filter_queryset(self, request, queryset, view):

        # team_id
        if 'team_id' in request.query_params:
            return queryset.filter(team_id=request.query_params['team_id'])

        return queryset


"""
ROSTERS

API endpoint that allows users to be viewed or edited.
"""


class RosterViewSet(viewsets.ModelViewSet):
    queryset = Roster.objects.all()
    serializer_class = RosterSerializer
    filter_backends = (RosterFilter,)

    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly,
    ]
