from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from passlib.context import CryptContext
from jose import jwt, JWTError
from datetime import datetime, timedelta
from typing import List

from db import database, engine, metadata
from models import users, todos
from schema import UserCreate, UserLogin, TodoCreate, TodoOut

# --- CONFIGURATION (The Superkey & Right Algo) ---
SECRET_KEY = "d9a8f3b2c1e0a9d8c7b6a5f4e3d2c1b0" 
ALGORITHM = "HS256"
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

app = FastAPI(title="Lab 5 Backend")

# --- CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Connects to your React App
    allow_methods=["*"],
    allow_headers=["*"],
)

metadata.create_all(engine)

@app.on_event("startup")
async def startup(): await database.connect()

@app.on_event("shutdown")
async def shutdown(): await database.disconnect()

# --- AUTH LOGIC ---
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=60)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        query = users.select().where(users.c.username == username)
        user = await database.fetch_one(query)
        if user is None: raise HTTPException(status_code=401)
        return user
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid Session")

# --- ROUTES ---

@app.post("/register")
async def register(user: UserCreate):
    hashed = pwd_context.hash(user.password)
    query = users.insert().values(username=user.username, password=hashed)
    try:
        await database.execute(query)
        return {"message": "User registered"}
    except:
        raise HTTPException(status_code=400, detail="Username taken")

@app.post("/login")
async def login(user: UserLogin):
    query = users.select().where(users.c.username == user.username)
    db_user = await database.fetch_one(query)
    if not db_user or not pwd_context.verify(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    token = create_access_token(data={"sub": db_user.username})
    return {"access_token": token, "token_type": "bearer"}

@app.get("/todos", response_model=List[TodoOut])
async def get_todos(current_user = Depends(get_current_user)):
    query = todos.select().where(todos.c.owner_id == current_user.id)
    return await database.fetch_all(query)

@app.post("/todos")
async def add_todo(todo: TodoCreate, current_user = Depends(get_current_user)):
    query = todos.insert().values(
        title=todo.title, 
        priority=todo.priority, 
        owner_id=current_user.id
    )
    await database.execute(query)
    return {"message": "Todo added"}

@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int, current_user = Depends(get_current_user)):
    query = todos.delete().where(
        (todos.c.id == todo_id) & (todos.c.owner_id == current_user.id)
    )
    await database.execute(query)
    return {"message": "Deleted"}