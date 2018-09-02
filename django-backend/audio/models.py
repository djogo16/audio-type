from django.db import models

# Create your models here.

class Chapter(models.Model):

	"""Model representing the chapters of books from LibriSpeech"""

	id = models.IntegerField(primary_key = True)
	minutes = models.IntegerField()
	title = models.CharField(max_length = 250)
	book_title = models.CharField(max_length = 250)

	# Method
	def get_absolute_url(self):
		"""Returns the url to access a particular instance of MyModelName."""
		return reverse('chapter-detail-view', args=[str(self.id)])
    
	def __str__(self):
		"""String for representing the MyModelName object (in Admin site etc.)."""
		return self.title

class Audio(models.Model):

	"""model representing the audios"""

	id = models.AutoField(primary_key = True)
	chapter_order = models.IntegerField()
	chapter_id = models.IntegerField()
	name = models.CharField(max_length = 250)
	length = models.IntegerField()
	path = models.CharField(max_length = 300)
	audio = models.FileField(upload_to = 'audiofiles')

	# Methods
	def get_absolute_url(self):
		"""Returns the url to access a particular instance of MyModelName."""
		return reverse('audio-detail-view', args=[str(self.id)])
    
	def __str__(self):
		"""String for representing the MyModelName object (in Admin site etc.)."""
		return self.name

class Transcription(models.Model):

	"""Model representing the transcrption of the audio"""

	id = models.AutoField(primary_key = True)
	chapter_id = models.IntegerField()
	name = models.CharField(max_length = 250)

	# Methods
	def get_absolute_url(self):
		"""Returns the url to access a particular instance of MyModelName."""
		return reverse('transcription-detail-view', args=[str(self.id)])
    
	def __str__(self):
		"""String for representing the MyModelName object (in Admin site etc.)."""
		return self.name

	
