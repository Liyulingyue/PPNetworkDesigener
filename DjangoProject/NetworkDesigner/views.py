import paddle
from django.http import JsonResponse
from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def get_navigation_items(request):
    nav_items = [name for name, _ in paddle.__dict__.items() if callable(_)]
    return JsonResponse(nav_items, safe=False)