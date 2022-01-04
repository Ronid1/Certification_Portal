from django.urls import path
from . import views

urlpatterns = [
    path ('', views.index),
    path ('certifications/', views.index),
    path ('get-certified/', views.index),
    path ('train/', views.index),
    path ('team/', views.index),
    path ('login/', views.index),

]