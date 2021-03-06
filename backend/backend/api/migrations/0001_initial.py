# Generated by Django 2.1.1 on 2019-12-02 17:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Athlete',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstName', models.CharField(blank=True, max_length=200)),
                ('lastName', models.CharField(blank=True, max_length=200)),
                ('gradYear', models.IntegerField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='Roster',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('captain', models.IntegerField(blank=True)),
                ('athlete', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Athlete')),
            ],
        ),
        migrations.CreateModel(
            name='School',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('town', models.CharField(blank=True, max_length=100)),
                ('mascot', models.CharField(blank=True, max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sport', models.CharField(blank=True, max_length=100)),
                ('year', models.IntegerField(blank=True)),
                ('sex', models.CharField(blank=True, max_length=50)),
                ('level', models.CharField(blank=True, max_length=50)),
                ('school', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.School')),
            ],
        ),
        migrations.AddField(
            model_name='roster',
            name='team',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.Team'),
        ),
        migrations.AddField(
            model_name='athlete',
            name='school',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.School'),
        ),
    ]
