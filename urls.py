from django.urls import path
from .views import login_usuario  # Importe a função de login

urlpatterns = [
    path('login/', login_usuario, name='login_usuario'),  # Rota para login
]
