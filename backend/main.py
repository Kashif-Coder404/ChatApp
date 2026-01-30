from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os , json

origins = [
    "http://localhost:5173","http://192.168.31.116:5173" , "https://KashifCoder.pythonanywhere.com"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,         # Allows specific origins
    allow_credentials=True,        # Allows cookies/authorization headers
    allow_methods=["*"],           # Allows all methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],           # Allows all headers
)


class Data(BaseModel):
    username: str
    password: str
    email: str

class chatData(BaseModel):
    message: str
    user: str
    time: str | None = None

class msgData(BaseModel):
    user: str
    last_id: int


usersFile = "./users.json"

def createFile():
    with open(usersFile,"w") as file:
        json.dump({},file)
def load_users():
    if not os.path.exists(usersFile):
        createFile()
    with open(usersFile,"r") as file:
        return json.load(file)

def save_user(userName,password,email):
    users = load_users()
    def emailCheck(mail):
        for key in users:
            if users.get(key).get("email") == mail:
                return True
        return False
    
    if (userName in users):
        return "Username already taken!"
    elif emailCheck(email):
        return "Email is already registered"
    
    users[userName] = {"email": email , "password" : password}
    
    with open(usersFile,"w") as file:
        json.dump(users,file,indent=4)
        return "Successfully Signed UP"


@app.post("/signup")
async def signup(data: Data):
    result = save_user(data.username,data.password,data.email)
    return {"message" : result , "status" : result == "Successfully Signed UP"}

@app.post("/login")
async def login(data: Data):
    users = load_users()

    def findUserByEmail():
        for username, info in users.items():
            if info["email"] == data.email:
                return username
        return None

    def checkPassword(username):
        return users[username]["password"] == data.password

    username = data.username if data.username in users else findUserByEmail()

    if username and checkPassword(username):
        return {
            "message": "Login successful",
            "status": True,
            "user": username     # ✅ ALWAYS STRING
        }

    return {"message": "Invalid Credentials", "status": False}



@app.post("/chats")
async def chats(data: msgData):
    messages = load_message()

    if not messages:
        return {"messages": []}

    new_messages = []

    for msg in messages.values():
        # skip old messages
        if msg["id"] <= data.last_id:
            continue

        # skip current user's own messages
        if msg["user"] == data.user:
            continue

        new_messages.append(msg)

    return {"messages": new_messages}

        

def load_message():
    if not os.path.exists("./chats.json"):
        with open("./chats.json", "w") as f:
            json.dump({}, f)

    with open("./chats.json", "r") as file:
        return json.load(file)

def addInJson(msg, user, time):
    print(user)
    messages = load_message()

    new_id = str(max(map(int, messages.keys()), default=-1) + 1)

    messages[new_id] = {
        "id": int(new_id),
        "message": msg,
        "user": user,
        "time": time
    }

    with open("./chats.json", "w") as file:
        json.dump(messages, file, indent=4)

@app.get("/history")
async def history():
    # ensure file exists
    if not os.path.exists("./chats.json"):
        with open("./chats.json", "w") as f:
            json.dump({}, f)

    messages = load_message()

    # return messages in correct order
    ordered = sorted(
        messages.values(),
        key=lambda x: x["id"]
    )

    return {"messages": ordered}


@app.post("/msg")
async def msg(data: chatData):
    addInJson(msg=data.message,user=data.user,time=data.time)
    return {"message" : "Message saved to the database"}
    