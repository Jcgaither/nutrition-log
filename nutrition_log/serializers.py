from rest_framework import serializers
from .models import UserNutrition

class NutritionLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserNutrition
        fields = ('id', 'session', 'meal_name', 'servings',
        'calories', 'protein', 'carbohydrates', 'fat', 'date_entered')
    
    
  