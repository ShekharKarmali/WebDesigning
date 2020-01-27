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

class Orders(models.Model):
    order_id=models.AutoField(primary_key=True)
    items_json=models.CharField(max_length=1000)
    name =models.CharField(max_length=100)
    email =models.CharField(max_length=50)
    address =models.CharField(max_length=200)
    city =models.CharField(max_length=50)
    state =models.CharField(max_length=50)
    phone =models.IntegerField(default=0)
    zip_code =models.IntegerField(default=0)

    def __str__(self):
        return self.name


class OrderUpdate(models.Model):
    update_id=models.AutoField(primary_key=True)
    order_id=models.IntegerField(default=0)
    update_desc=models.CharField(max_length=500)
    timestamp=models.DateField(auto_now_add=True)
     
    def __str__(self):
        return self.update_desc[0:7] + "....."



