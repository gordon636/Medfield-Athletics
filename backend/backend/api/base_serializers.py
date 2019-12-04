"""
This is a serializer class which takes incomming data (JSON,XML) and converts it into a python based model which we can use.
The same works in the reverse for this class.

Author: Gordon White
Date: 09/10/19
"""

from django.contrib.auth.models import User
from backend.api.base_models import School, Athlete, Team, Roster
from rest_framework import serializers

from backend.api.utils import Utils


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'first_name', 'last_name', 'username', 'email')


class SchoolSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = School
        fields = ('url', 'town', 'mascot')


class AthleteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Athlete
        fields = ('url', 'firstName', 'lastName', 'gradYear', 'school')


class TeamSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Team
        fields = ('url', 'sport', 'school', 'year', 'sex', 'level')

    def to_representation(self, instance):
        data = super(TeamSerializer, self).to_representation(instance)  # base data representation

        # GET FAKE CONTEXT TO RESOLVE URLS
        serializer_context = Utils.get_serializer_context()

        # pull ids from URLS
        school_id = data['school'].split("/")[-2]

        # pull objects from db
        school = School.objects.get(id=school_id)

        # serialize them
        school_serialized = SchoolSerializer(school, context=serializer_context).data

        # fix URLS (bad context)
        school_serialized['url'] = Utils.fix_url(school_serialized['url'])

        # update our data object with our new data
        data['school'] = school_serialized

        return data


class RosterSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Roster
        fields = ('url', 'team', 'athlete', 'captain')

    def to_representation(self, instance):
        data = super(RosterSerializer, self).to_representation(instance)  # base data representation

        # GET FAKE CONTEXT TO RESOLVE URLS
        serializer_context = Utils.get_serializer_context()

        # pull ids from URLS
        team_id = data['team'].split("/")[-2]
        athlete_id = data['athlete'].split("/")[-2]

        # pull objects from db
        team = Team.objects.get(id=team_id)
        athlete = Athlete.objects.get(id=athlete_id)

        # serialize them
        team_serialized = TeamSerializer(team, context=serializer_context).data
        athlete_serialized = AthleteSerializer(athlete, context=serializer_context).data

        # fix URLS (bad context)
        team_serialized['url'] = Utils.fix_url(team_serialized['url'])
        athlete_serialized['url'] = Utils.fix_url(athlete_serialized['url'])

        # update our data object with our new data
        data['team'] = team_serialized
        data['athlete'] = athlete_serialized

        # Fix nested url
        data['athlete']['school'] = Utils.fix_url(data['athlete']['school'])

        return data