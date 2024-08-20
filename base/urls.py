from django.contrib import admin
from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('', views.index),
    path('login/', TokenObtainPairView.as_view()),
    path('product/', views.product),
    path('product/<int:id>',views.product),


]
