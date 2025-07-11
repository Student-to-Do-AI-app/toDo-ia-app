from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import create_db_and_tables
from app.routes import router  # Importa el router

app = FastAPI(
    title="Todo List con Resumen IA",
    description="API para gestionar tareas y generar resúmenes con IA",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/ping")
def ping():
    return {"message": "pong"}
