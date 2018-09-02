from django.contrib import admin
from .models import Chapter, Audio, Transcription



# Register your models here.

class AudioAdmin(admin.ModelAdmin):
	list_display = ('id', 'chapter_order', 'chapter_id', 'name','path')
	list_filter = ('id', 'chapter_id')

admin.site.register(Chapter)
admin.site.register(Audio, AudioAdmin)
admin.site.register(Transcription)



