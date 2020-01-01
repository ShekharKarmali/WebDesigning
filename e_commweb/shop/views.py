from django.shortcuts import render
from django.http import HttpResponse
from . models import Product
from . models import contact
from math import ceil

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
    return render(request,'shop/tracker.html') 

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

def checkout(request):
    return render(request,'shop/checkout.html')