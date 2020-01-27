from django.shortcuts import render
from django.http import HttpResponse
from . models import Product
from . models import contact
from . models import Orders
from . models import OrderUpdate
from math import ceil
import json

# Create your views here.
def index(request):
    #products = Product.objects.all()
    #n = len(products)
    #nSlides = n//4 + ceil((n/4)-(n//4))
    #params = {'no_of_slides':nSlides, 'range': range(1,nSlides),'product': products}
    #allProds= [[products,range(1,nSlides),nSlides],
              #[products,range(1,nSlides),nSlides],
              #[products,range(1,nSlides),nSlides]];
    allProds=[];
    catProds=Product.objects.values('category','id');
    cats ={Item['category'] for Item in catProds};
    for cat in cats:
        Prod=Product.objects .filter(category=cat)
        n=len(Prod)
        nSlides = n//4 + ceil((n/4)-(n//4))
        allProds.append([Prod,range(1,nSlides),nSlides])
    
    params={'allProds':allProds};
    return render(request,'shop/Home.html',params)

def about(request):
    return render(request,'shop/About.html')

def tracker(request):
    if request.method=="POST":
        orderId = request.POST.get('orderId', '')
        email = request.POST.get('email', '')
        try:
            order = Orders.objects.filter(order_id=orderId, email=email)
            if len(order)>0:
                update = OrderUpdate.objects.filter(order_id=orderId)
                updates = []
                for item in update:
                    updates.append({'text': item.update_desc, 'time': item.timestamp})
                    response = json.dumps(updates, default=str)
                return HttpResponse(response)
            else:
                return HttpResponse('{}')
        except Exception as e:
            return HttpResponse('{}')

    return render(request, 'shop/tracker.html')
def Contact(request):
    if request.method=="POST":
        name=request.POST.get('name','')
        #print(name)
        email=request.POST.get('email','')
        phone=request.POST.get('phone','')
        desc=request.POST.get('desc','')
        #print(name,email,phone,desc)
        Contact= contact(name=name,email=email,phone=phone,desc=desc)
        Contact.save()
    return render(request,'shop/contact.html')

def search(request):
    return render(request,'shop/search.html')

def productview(request,myid):
    #fetch using id

    product = Product.objects.filter(id=myid)
    return render(request, 'shop/prodView.html', {'product':product[0]})

# def checkout(request):
#     if request.method=="POST":
#         items_json=request.POST.get('itemsJson','')
#         name=request.POST.get('name','')
#         email=request.POST.get('email','')
#         phone=request.POST.get('phone','')
#         address=request.POST.get('address','') + " " + request.POST.get('landmark','') 
#         city=request.POST.get('city','')
#         state=request.POST.get('state','')
#         zip_code=request.POST.get('zip_code','')
#         order= Orders(items_Json=items_Json,name=name,email=email,phone=phone,address=address,
#                        city=city,state=state,zip_code=zip_code)
#         order.save()
#         # thank=True
#         # id=order.order_id
#        #return render(request,'shop/checkout.html',{'thank':thank, 'id':id})
#     return render(request,'shop/checkout.html')

def checkout(request):
    if request.method=="POST":
        items_json = request.POST.get('itemsJson', '')
        name = request.POST.get('name', '')
        email = request.POST.get('email', '')
        address = request.POST.get('address', '') + " " + request.POST.get('landmark', '')
        city = request.POST.get('city', '')
        state = request.POST.get('state', '')
        zip_code = request.POST.get('zip_code', '')
        phone = request.POST.get('phone', '')
        order = Orders(items_json=items_json, name=name, email=email, address=address, city=city,
                       state=state, zip_code=zip_code, phone=phone)
        order.save()
        update=OrderUpdate(order_id=order.order_id,update_desc="The Order has been placed")
        update.save()
        thank = True
        id = order.order_id
        return render(request, 'shop/checkout.html', {'thank':thank, 'id': id})
    return render(request, 'shop/checkout.html')




    