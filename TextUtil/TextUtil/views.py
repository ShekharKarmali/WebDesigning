# I have created this file - Shekhar Kumar Karmali
from django.http import HttpResponse
from django.shortcuts import render
#code for video 6
'''
def index(request):
    file=open("E:\programs\Web\one.txt",'r')
    return HttpResponse(file.readlines())
'''

#code for video 7
def index(request):
  #pratham={'Name':'Shekhar Karmali','Place':'Venus'}
  return render(request,'index2.html')
  #return HttpResponse("Remove Puctionuation")

def Analyze(request):
  djtext=request.POST.get('text','default')
  print(djtext)
  removepunc=request.POST.get('removepunc')
  capitalfic=request.POST.get('capitalfic')
  newlineremover=request.POST.get('newlineremover')
  extraspaceremover=request.POST.get('extraspaceremover')

  #function for remove puctuation
  puctuation='''"';:,./?\|~`!@#$%^&*'''
  if removepunc=="on":
    Analyzed= ""
    for char in djtext :
      if char not in puctuation :
        Analyzed=Analyzed+char

    param={'purpose':'Remove Punctuation','Analyzed_Text':Analyzed}
    return render(request,'Analyze2.html',param)

    #function for capitaliazation of letter
  if(capitalfic=="on"):
      Analyzed= ""
      for char in djtext :
           Analyzed=Analyzed + char.upper()

      param={'purpose':'Capitalize Letter','Analyzed_Text':Analyzed}
      return render(request,'Analyze2.html',param)

    #function for new line remover
  if (newlineremover == "on"):
        Analyzed = ""
        for char in djtext:
            if char != "\n" and char!="\r":
                Analyzed = Analyzed + char
            else:
                print("no")
        print("pre", Analyzed)
        param = {'purpose': 'Removed NewLines', 'Analyzed_text': Analyzed}
        return render(request, 'Analyze2.html', param)

    #function for Extra Space Remover
  if(extraspaceremover=="on"):
      Analyzed= ""
      for index, char in enumerate(djtext):
          if not(djtext[index]==" " and djtext[index+1]==" "):
                 Analyzed=Analyzed + char

      param={'purpose':'Extra Space Removed','Analyzed_Text':Analyzed}
      return render(request,'Analyze2.html',param)

  else:
      return HttpResponse("Error")