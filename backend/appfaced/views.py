from django.db.models.query import QuerySet
from django.shortcuts import render

# Page views
def index (request, *args, **kwargs):
    return render (request, 'static/index.html')
