from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import crud
from app.database import create_db_and_tables

app = FastAPI(
    title="Todo List con Resumen IA",
    description="API para gestionar tareas y generar resúmenes con IA",
    version="1.0.0",
)

# CORS: permite que el frontend (React) se comunique con esta API sin bloqueos
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # en producción deberías especificar el dominio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir los endpoints definidos en crud.py
app.include_router(crud.router)


# Crear base de datos automáticamente al iniciar el servidor
@app.on_event("startup")
def on_startup():
    create_db_and_tables()
