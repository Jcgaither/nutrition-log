from django.contrib import admin
from django.db import models
from .models import UserNutrition

class UserNutritionAdmin(admin.ModelAdmin):
    list_display = ('session', 'meal_name', 'calories','date_entered')


admin.site.register(UserNutrition, UserNutritionAdmin)