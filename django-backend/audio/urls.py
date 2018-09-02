from django.urls import path
from . import views


urlpatterns = [
    path('', views.ListAudio.as_view()),
    path('<int:pk>/', views.DetailAudio.as_view()),
]



