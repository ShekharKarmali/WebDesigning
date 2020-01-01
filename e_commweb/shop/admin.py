from django.contrib import admin

# Register your models here.
from .models import Product,contact

admin.site.register(Product)
admin.site.register(contact)