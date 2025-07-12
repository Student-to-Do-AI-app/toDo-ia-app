# masive.py
import requests

tasks = [
    {
        "title": "Configurar entorno de desarrollo",
        "description": "Instalar dependencias y preparar proyecto",
        "completed": True,
        "time_spent": 40,
    },
    {
        "title": "Diseñar base de datos",
        "description": "Modelo ER inicial",
        "completed": False,
        "time_spent": 0,
    },
    {
        "title": "Implementar login de usuarios",
        "description": "Pantalla y backend",
        "completed": True,
        "time_spent": 60,
    },
    {
        "title": "Crear landing page",
        "description": "HTML, CSS y React",
        "completed": True,
        "time_spent": 30,
    },
    {
        "title": "Diseño de dashboard",
        "description": "Mockups en Figma",
        "completed": False,
        "time_spent": 0,
    },
    {
        "title": "Optimizar bundle Webpack",
        "description": "Reducir tamaño final",
        "completed": True,
        "time_spent": 25,
    },
    {
        "title": "Implementar Dark Mode",
        "description": "Tema claro/oscuro",
        "completed": False,
        "time_spent": 0,
    },
    {
        "title": "Crear endpoint de métricas",
        "description": "API REST",
        "completed": True,
        "time_spent": 20,
    },
    {
        "title": "Configurar ESLint",
        "description": "Reglas para mantener el código limpio",
        "completed": True,
        "time_spent": 10,
    },
    {
        "title": "Configurar CI con GitHub Actions",
        "description": "Deploy automático",
        "completed": False,
        "time_spent": 0,
    },
    {
        "title": "Agregar validación en formularios",
        "description": "Frontend y backend",
        "completed": True,
        "time_spent": 35,
    },
    {
        "title": "Crear footer responsivo",
        "description": "",
        "completed": True,
        "time_spent": 15,
    },
    {
        "title": "Conectar frontend con API",
        "description": "Llamadas con fetch/axios",
        "completed": False,
        "time_spent": 0,
    },
    {
        "title": "Revisión de pull requests",
        "description": "Feedback del equipo",
        "completed": True,
        "time_spent": 25,
    },
    {
        "title": "Documentación del proyecto",
        "description": "README detallado",
        "completed": True,
        "time_spent": 20,
    },
    {
        "title": "Agregar tests unitarios",
        "description": "Usando Jest y Testing Library",
        "completed": False,
        "time_spent": 0,
    },
    {
        "title": "Optimizar imágenes",
        "description": "WebP y compresión",
        "completed": True,
        "time_spent": 10,
    },
    {
        "title": "Crear componente de tarjetas",
        "description": "Reusable en React",
        "completed": True,
        "time_spent": 18,
    },
    {
        "title": "Actualizar dependencias npm",
        "description": "npm audit fix",
        "completed": True,
        "time_spent": 8,
    },
    {
        "title": "Preparar presentación para demo",
        "description": "Slides y guión",
        "completed": False,
        "time_spent": 0,
    },
]

url = "http://localhost:8000/tasks"

for task in tasks:
    response = requests.post(url, json=task)
    print(f"Status: {response.status_code}, Response: {response.json()}")
