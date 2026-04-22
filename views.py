from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.hashers import check_password
import json
from .models import Usuario  # Certifique-se de que está importando o modelo

@csrf_exempt
def login_usuario(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")
            senha = data.get("senha")

            # Buscar usuário pelo e-mail
            usuario = Usuario.objects.filter(email=email).first()

            if usuario and check_password(senha, usuario.senha):
                return JsonResponse({"message": "Login bem-sucedido!"})
            else:
                return JsonResponse({"error": "E-mail ou senha incorretos!"}, status=400)

        except Exception as e:
            return JsonResponse({"error": f"Erro interno: {str(e)}"}, status=500)

    return JsonResponse({"error": "Método não permitido"}, status=405)

