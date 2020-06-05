import json
import math
import myfitnesspal
import logging
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .serializers import NutritionLogSerializer
from .models import UserNutrition
from datetime import datetime, date, time, timezone
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS

logger = logging.getLogger(__name__)

client = myfitnesspal.Client(settings.MFP_CLIENT_USERNAME, settings.MFP_CLIENT_PASSWORD)

class IsOwner(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        session = request.session
        obj_perms = obj.session.session_key == session.session_key
        return obj_perms


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = NutritionLogSerializer
    permission_classes = [IsOwner]

    def get_queryset(self):
        date = self.request.query_params.get('date', None)
        session = self.request.session
        if date is not None:
            selected_date = datetime.fromtimestamp(math.floor(float(date)))
            return UserNutrition.objects.filter(
                session=session.session_key, date_entered__date=selected_date).order_by('date_entered')
        return UserNutrition.objects.filter(
            session=session.session_key).order_by('date_entered')

    def create(self, request):
        response = json.loads(request.data['data'])
        date = response.get('date', None)
        try:
            if date is not None:
                selected_date = datetime.fromtimestamp(math.floor(float(date)))
                response['session'] = request.session.session_key
                response['date_entered'] = selected_date
                serializer = self.serializer_class(data=response)
                if serializer.is_valid(raise_exception=True):
                    user_entry = UserNutrition.objects.create(**serializer.validated_data)
                    del serializer.validated_data['session']
                    serializer.validated_data['id'] = user_entry.id
                    return Response(
                        serializer.validated_data, status=status.HTTP_201_CREATED
                    )
        except Exception as e:
            logger.error(f'Error creating nutrition entry: {e}')
        return Response({
            'status': 'Bad request',
            'message': 'Error creating nutrition entry.'
        }, status=status.HTTP_400_BAD_REQUEST)


def get_food_list(request, query):
    query_results = []
    items = []
    response = client.get_food_search_results(query)
    for i in response:
        mfp_object = {
                'id':i.mfp_id, 
                'meal_name':"{0} - {1}".format(i.name, i.brand),
                'serving':i.serving,
                'calories':i.calories
            }
        items.append(mfp_object)
    return JsonResponse(items, safe=False)


def get_food_detail(request, id):
    food_item = client.get_food_item_details(id)
    item = {
            'meal_name':"{0} - {1}".format(food_item.name, food_item.brand),
            'calories':food_item.calories,
            'carbohydrates':food_item.carbohydrates,
            'protein':food_item.protein,
            'fat': food_item.fat
            }   
    return JsonResponse(item)
    
