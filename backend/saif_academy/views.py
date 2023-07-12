from django.http import JsonResponse,HttpResponse
def batches(request):

    data = [   ]
    for i in range(1,10):
        data.append({"imgUrl": "https://unmesh.com/media/Images/Unmesh/Program/MAP23F.png", "title": "HSC "+str(i) ,"desc": "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"})
    return JsonResponse(data,safe=False)


def batch(request,id):
    data = {"imgUrl": "https://unmesh.com/media/Images/Unmesh/Program/MAP23F.png", "title": "HSC "+str(id) ,"desc": "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud"}
    return JsonResponse(data,safe=False)

def signUp(request):
    print(request)
    a = request.POST
    print(a)
    return HttpResponse(request)