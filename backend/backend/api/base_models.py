from django.db import models


class School(models.Model):
    town = models.CharField(blank=True, max_length=100)
    mascot = models.CharField(blank=True, max_length=100)

    def __str__(self):
        return '%s %s' % (self.town, self.mascot)


class Athlete(models.Model):
    firstName = models.CharField(blank=True, max_length=200)
    lastName = models.CharField(blank=True, max_length=200)
    gradYear = models.IntegerField(blank=True)
    school = models.ForeignKey(School, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return '%s %s (%s)' % (self.firstName, self.lastName, self.gradYear)


class Team(models.Model):
    sport = models.CharField(blank=True, max_length=100)
    school = models.ForeignKey(School, null=True, on_delete=models.CASCADE)
    year = models.IntegerField(blank=True)
    sex = models.CharField(blank=True, max_length=50)
    level = models.CharField(blank=True, max_length=50)

    def __str__(self):
        return '%s %s (%s, %s - %s)' % (self.school, self.sport, self.year, self.level, self.sex)


class Roster(models.Model):
    team = models.ForeignKey(Team, null=True, on_delete=models.CASCADE)
    athlete = models.ForeignKey(Athlete, null=True, on_delete=models.CASCADE)
    captain = models.IntegerField(blank=True)
