# Generated by Django 4.0.3 on 2022-04-10 23:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('testing', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='canvas',
            name='title',
            field=models.CharField(default='no title', max_length=200),
            preserve_default=False,
        ),
    ]
