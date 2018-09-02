# audio/views.py
from rest_framework import generics

from .models import Audio
from .serializers import AudioSerializer


class ListAudio(generics.ListCreateAPIView):
    queryset = Audio.objects.all()
    serializer_class = AudioSerializer


class DetailAudio(generics.RetrieveUpdateDestroyAPIView):
    queryset = Audio.objects.all()
    serializer_class = AudioSerializer
