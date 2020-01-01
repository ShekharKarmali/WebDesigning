from django.db import models

# Create your models here.
class Product(models.Model):
    product_id =models.AutoField
    product_name =models.CharField(max_length=50)
    category =models.CharField(max_length=250,default="")
    subcategory =models.CharField(max_length=250,default="")
    desc =models.CharField(max_length=300)
    price=models.IntegerField(default=0)
    pub_date =models.DateField()
    image=models.ImageField(upload_to="shop/images",default=0)

    def __str__(self):
        return self.product_name

class contact(models.Model):
    msg_id =models.AutoField(primary_key=True)
    name =models.CharField(max_length=50)
    email =models.CharField(max_length=70,default="")
    phone =models.IntegerField(default=0)
    desc =models.CharField(max_length=300,default="")

    def __str__(self):
        return self.name
