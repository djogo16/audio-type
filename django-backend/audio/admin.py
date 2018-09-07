from django.contrib import admin
from .models import Book, Chapter, Audio



# Register your models here.

class AudioAdmin(admin.ModelAdmin):

#	def get_queryset(self, request):
#       	qs = super(AudioAdmin, self).get_queryset(request)
#        	return qs[:500]

					
	list_display = ('id', 'chapter_order', 'chapter_id', 'name','audio_file','text')
	list_filter = ('id', 'chapter_id')

admin.site.register(Book)
admin.site.register(Chapter)
admin.site.register(Audio, AudioAdmin)




