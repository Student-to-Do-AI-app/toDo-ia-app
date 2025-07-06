from sqlmodel import SQLModel, create_engine, Session

# Nombre del archivo SQLite
sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

# Crear el engine para conectar a SQLite
engine = create_engine(
    sqlite_url, echo=True
)  # Puedes poner echo=False para no ver las queries


# Función que se ejecuta al iniciar la app para crear tablas
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


# Dependencia de FastAPI para obtener la sesión de base de datos
def get_session():
    with Session(engine) as session:
        yield session
