#Module that return models fields for audioType database
from pydub import AudioSegment

def chapter_fields():
	
	with open ("/home/osboxes/chapters_data.txt", "r") as f:
		fields = []		
		for line in f:
			fields.append(line.split("|"))
		return fields	
	
def audio_fields():
	
	with open("/home/osboxes/audios.txt", "r") as f:
		fields = []
		for line in f:
			llist = line.split("|")
			audio_path = "/home/osboxes/" + llist[3][:-1]
			song = AudioSegment.from_file(audio_path,"flac")
			length = song.duration_seconds
			fields.append(llist + [length, audio_path])
		
		return fields	
	
def transcription_fields():
	
	with open("/home/osboxes/texts.txt", "r") as f:
		fields = []
		for line in f:
			fields.append(line.split("|"))
		return fields		
audio_fields()
