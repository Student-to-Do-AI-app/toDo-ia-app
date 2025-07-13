# 📝 ToDo IA App

Aplicación full-stack para la gestión de tareas, construida con:
- **Backend:** FastAPI + SQLAlchemy
- **Frontend:** React + Redux-Saga + Vite
- **CI/CD:** GitHub Actions para ejecutar pruebas automáticas en cada push o pull request

## 🧠 ✨ Integración de IA con Llama o3 (local)

El backend de esta app puede enriquecerse usando **Llama o3** corriendo en local a través de [Ollama](https://ollama.com).  
Esta integración permite analizar las tareas y generar insights, como:

✅ Resúmenes  
✅ Sugerencias de prioridades  
✅ Estadísticas de productividad  

---

### ⚙️ Requisitos previos

- Instalar **Ollama** en tu máquina:  
  [https://ollama.com/download](https://ollama.com/download)

- Descargar el modelo Llama o3:
  
  ollama pull llama3
  
---

## 📦 Estructura del proyecto

toDo-ia-app-master/
├── .github/workflows/ci.yml       # CI configurado para ejecutar pruebas

├── backend/                       # API en FastAPI + SQLAlchemy

│   ├── app/

│   │   ├── crud.py                # Lógica CRUD

│   │   ├── database.py            # Configuración de base de datos

│   │   ├── main.py                # Entry point y configuración de rutas

│   │   ├── models.py              # Definición de modelos ORM

│   │   ├── routes.py              # Endpoints de la API

│   │   └── schemas.py             # Esquemas Pydantic

│   ├── tests/test_crud.py         # Pruebas unitarias de backend

│   ├── masive.py                  # Script para registrar tareas masivas

│   └── requirements.txt           # Dependencias de Python

└── frontend/                      # Frontend en React + Redux-Saga + Vite

    ├── src/
    
    │   ├── components/tasks/      # Componentes UI
    
    │   ├── actions/               # Acciones Redux
    
    │   ├── reducers/              # Reducers y store
    
    │   ├── effects/               # Lógica de efectos con Redux-Saga
    
    │   ├── pages/                 # Páginas principales
    
    │   ├── services/              # Llamadas HTTP
    
    │   └── models/                # Tipos y modelos
    
    ├── package.json               # Dependencias y scripts
    
    └── vite.config.ts             # Configuración de Vite

    
---



### 🔧 Backend

## 🚀 Instalación
bash
-cd backend
-python -m venv venv
-source venv/bin/activate     # Linux/Mac
-venv\Scripts\activate        # Windows
-pip install -r requirements.txt

## ▶️ Ejecución

-uvicorn app.main:app --reload
Levanta servidor en: http://127.0.0.1:8000

## 🧪 Pruebas

-pytest

## 🛠 Tecnologías usadas

- FastAPI

- SQLAlchemy

- Pydantic

- Uvicorn

- Pytest


### 🌐 Frontend

## 🚀 Instalación
-cd frontend
-npm install

## ▶️ Ejecución
Levanta servidor en: http://localhost:5173
## 🧪 Pruebas

-npm run test

## 🛠 Tecnologías usadas
- React

- Redux

- Redux-Saga

- Axios

- Vite

- Jest (pruebas)


## ✨ Funcionalidades destacadas

✅ CRUD completo de tareas

✅ Carga de tareas masivas (masive.py)

✅ Resúmenes e insights usando IA (próximamente o integrable)

✅ Componentes reutilizables (Mask para loading, entre otros)

✅ Estado global centralizado (Redux + Saga)

✅ CI/CD con GitHub Actions

✅ Separación clara entre backend y frontend

## 📂 Detalles técnicos importantes

  backend/app: contiene la lógica principal de la API (endpoints, modelos y base de datos)

  frontend/src: se organiza por funcionalidad:

  components/: componentes UI

  actions/ y reducers/: manejo del estado con Redux

  effects/: side effects con Redux-Saga

  services/: llamadas HTTP al backend

  Máscaras de carga: Mask.tsx para indicar cuando la app está esperando respuesta

  Test Coverage: el backend tiene pruebas que validan el CRUD, y el frontend incluye pruebas unitarias para lógica de estado y componentes
