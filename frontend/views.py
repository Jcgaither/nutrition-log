from django.contrib.sessions.backends.db import SessionStore
from django.shortcuts import render

def nutrition_log(request):
    if not request.session.session_key:
        request.session = SessionStore()
        request.session.create()
    return render(request, 'frontend/nutrition_log_index.html')