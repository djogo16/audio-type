from django.urls import path
from . import views


urlpatterns = [
    path('chapter', views.ListAudio.as_view()),
    path('<int:pk>/', views.DetailAudio.as_view()),
    path('book/', views.SelectedBook.as_view()),
    path('results/', views.ServeResult)
]



