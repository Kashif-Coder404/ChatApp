import json
def loadFile():
    with open("./chats.json", "r") as file:
        return json.load(file)
    
def addInJson(msg,user):
    messages = loadFile()
    print(messages)
    id = 0
    for key in messages:
         id = int(key) + 1
    with open("./chats.json", "w") as file:
         messages[str(id)] = {"message": msg, "user": user}
         json.dump(messages,file,indent=4)
addInJson("kashif message 3", "username")