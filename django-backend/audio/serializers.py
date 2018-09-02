# audio/serializers.py
from rest_framework import serializers
from .models import Audio


class AudioSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
	    'length',
            'path',
	    'audio',
        )
        model = Audio
