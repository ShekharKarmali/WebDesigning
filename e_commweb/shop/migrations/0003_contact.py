# Generated by Django 3.0 on 2019-12-30 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0002_auto_20191222_0311'),
    ]

    operations = [
        migrations.CreateModel(
            name='contact',
            fields=[
                ('msg_id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('email', models.CharField(default='', max_length=70)),
                ('phone', models.IntegerField(default=0)),
                ('desc', models.CharField(default='', max_length=300)),
            ],
        ),
    ]
