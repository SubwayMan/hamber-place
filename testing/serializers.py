from rest_framework import serializers
from .models import Pixel

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pixel
        fields = (
            "position",
        )
