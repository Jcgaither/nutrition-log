from django.urls import path

from rest_framework import routers
from .views import UserViewSet, get_food_list, get_food_detail

router = routers.DefaultRouter()
router.register('nutrition', UserViewSet, 'user_nutrition')

urlpatterns = [
    path('get_food_list/<str:query>/', get_food_list, name="get_food_list"),
    path('get_food_detail/<int:id>/', get_food_detail, name="get_food_detail")
]
urlpatterns += router.urls
