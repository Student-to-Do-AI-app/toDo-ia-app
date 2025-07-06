from sqlmodel import SQLModel, create_engine

# Nombre del archivo SQLite
DATABASE_URL = "sqlite:///./todo.db"

# Creamos el engine de SQLAlchemy
engine = create_engine(DATABASE_URL, echo=True)


# Función para crear las tablas cuando inicia la app
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
