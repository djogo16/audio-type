# audio/views.py
from rest_framework import generics
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
import re
from serve_correct import compareText
from .models import Audio, Book, Chapter, Audio_twenty, Audio_forty, Audio_sixty
from .serializers import AudioTwentySerializer, BookSerializer


class ListAudio(generics.ListCreateAPIView):
	#serializer_class = AudioSerializer
	length = 0
	def get_queryset(self):
		chapter_id = int(self.request.query_params.get('chapter_id', None))
		length = int(self.request.query_params.get('length', None))
		chapter = Chapter.objects.get(pk = chapter_id)
		if(length == 20):	
			queryset = Audio_twenty.objects.filter(chapter_id = chapter.id)
			serializer_class = AudioTwentySerializer
		elif (length == 40):
			queryset = Audio_forty.objects.filter(chapter_id = chapter.id)
		else:
			queryset = Audio_sixty.objects.filter(chapter_id = chapter.id)
		return queryset
	def get_serializer_class(self):
		length = int(self.request.query_params.get('length', None))
		if(length == 20):	
			serializer_class = AudioTwentySerializer
		elif (length == 40):
			serializer_class = AudioFortySerializer
		else:
			serializer_class = AudioSixtySerializer
		return serializer_class

class DetailAudio(generics.RetrieveUpdateDestroyAPIView):
	queryset = Audio.objects.all()
	serializer_class = AudioTwentySerializer

class SelectedBook(generics.ListCreateAPIView):
	serializer_class = BookSerializer
	def get_queryset(self):
		#book_tile = self.request.query_params.get('title', None)
		queryset = Book.objects.filter(pk=28054)
		return queryset

class ServeResult(APIView):
	renderer_classes = (JSONRenderer, )
	
	def get(self,request,format = None):
		text = request.GET.get('text', '')
		path = request.GET.get('path', '')
		audio = re.search(r'audiofiles.*', path).group()
		queryset = Audio.objects.filter(audio = audio)
		result_tuple = compareText(text, queryset[0].text)
		result = {"user_answer":result_tuple[1], "correct_answer": result_tuple[0]}
		
		return Response(result)
