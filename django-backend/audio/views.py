# audio/views.py
from rest_framework import generics

from .models import Audio, Book, Chapter
from .serializers import AudioSerializer, BookSerializer


class ListAudio(generics.ListCreateAPIView):
	serializer_class = AudioSerializer
	def get_queryset(self):
		chapter_id = int(self.request.query_params.get('chapter_id', None))
		chapter = Chapter.objects.get(pk = chapter_id)	
		queryset = Audio.objects.filter(chapter_id = chapter)
		return queryset


class DetailAudio(generics.RetrieveUpdateDestroyAPIView):
	queryset = Audio.objects.all()
	serializer_class = AudioSerializer

class SelectedBook(generics.ListCreateAPIView):
	serializer_class = BookSerializer
	def get_queryset(self):
		#book_tile = self.request.query_params.get('title', None)
		queryset = Book.objects.filter(pk=28054)
		return queryset
