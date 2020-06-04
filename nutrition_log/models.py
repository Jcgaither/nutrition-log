from django.conf import settings
from django.db import models

from django.contrib.auth.models import User
from django.contrib.sessions.models import Session



class UserNutrition(models.Model):
	session = models.ForeignKey(Session, blank=True, on_delete=models.CASCADE)
	meal_name = models.CharField(max_length=225)
	servings = models.IntegerField()
	calories = models.DecimalField(max_digits=6, decimal_places=1)
	protein = models.DecimalField(max_digits=6, decimal_places=1)
	carbohydrates = models.DecimalField(max_digits=6, decimal_places=1)
	fat = models.DecimalField(max_digits=6, decimal_places=1)
	date_entered = models.DateTimeField()
	
	def __str__(self):
		return str(self.session)