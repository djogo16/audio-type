# audio/serializers.py
from rest_framework import serializers
from .models import Audio, Book


class AudioSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
	    'length',
	    'audio_file',
	    'text',
        )
        model = Audio

class BookSerializer(serializers.ModelSerializer):
	chapters = serializers.SlugRelatedField(many=True, read_only = True, slug_field = 'title')
	class Meta:
		fields = (
		    'id',
		    'title',
		    'chapters',
		)
		model = Book
