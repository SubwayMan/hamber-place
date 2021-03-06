# Generated by Django 4.0.4 on 2022-04-12 03:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    replaces = [('testing', '0001_initial'), ('testing', '0002_canvas_title'), ('testing', '0003_pixel'), ('testing', '0004_remove_pixel_x_remove_pixel_y_pixel_position_and_more'), ('testing', '0005_auto_20220411_1723'), ('testing', '0006_alter_canvas_id_alter_pixel_id')]

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Canvas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=200)),
                ('data', models.TextField()),
                ('title', models.CharField(default='no title', max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Pixel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('color', models.PositiveSmallIntegerField()),
                ('canvas', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pixels', to='testing.canvas')),
                ('position', models.PositiveIntegerField(default=0)),
            ],
        ),
    ]
