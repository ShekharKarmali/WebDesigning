from django.urls import  path
from . import views

urlpatterns = [
    path('',views.index,name='Shop'),
    path('about/',views.about,name='AboutPro'),
    path('tracker/',views.tracker,name='Track'),
    path('Contact/',views.Contact,name='Contact Us'),
    path('search/',views.search,name='Search'),
    path('productview/<int:myid>',views.productview,name='ProductView'),
    path('checkout/',views.checkout,name='Checkout')
]