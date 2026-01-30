from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import random
import pcCMD #Pc commands to run

app = Flask(__name__)
CORS(app)    

isShutdown = False
isAdmin = False
isAdmin1 = False

@app.route("/chatbot", methods=["POST"])
def chatbot():
    global isShutdown
    global isAdmin
    status = False
    def shutdown(msg):
        global isShutdown
        global isAdmin1
        if not isAdmin1:  
            isShutdown = False
            return "Please Login with admin username and password"
        if msg in ["y" , "yes"] :
            print(isShutdown)
            return "Provide the key!"
        elif msg in ["kashif!@#"]:
            pcCMD.shutdown()
            isShutdown = False
            return "Shutting the pc now in 3 sec"
        elif msg in ["n" , "no"] :
            isShutdown = False
            return "Canceling the shutdown . I am still here 😅" 
        else:
            return f"Incorrect key!"

    def adminLogin(msg):
        global isAdmin1
        global isAdmin
        if user_message in ['adminUser'] and not isAdmin1:
            isAdmin1 = True
            return "Provide pass now: "
        elif user_message in ['passforSU'] and isAdmin1:
            isAdmin = False
            return "Welcome Admin!" 
        elif user_message in ['c' , 'cancel']:
            isAdmin = False
            isAdmin1 = False
            return "Canceling the login with admin"
        else:
            return "Please provide required username or password"
    data = request.json or {}
    user_message = data.get("message", "").strip()
    
    print("Received Message:", user_message)

    # Simulate bot thinking time
    time.sleep(0.8)
    msg = user_message.lower()
    # Empty message handling
    if not user_message:
        return jsonify({
            "reply": "Please type something 🙂"
        })

    try:
        if(isShutdown):
            bot_reply = shutdown(msg)
        elif(isAdmin):
            bot_reply = adminLogin(msg)
        else:
            # Admin check
            if msg == "kashif":
                bot_reply = adminLogin(msg) if isAdmin else "Enter username"
                isAdmin = True
            # Simple command testing
            elif msg == "help":
                bot_reply = "Available commands: help, time, date, hello"

            elif msg == "time":
                bot_reply = time.strftime("Current time: %H:%M:%S")

            elif msg == "date":
                bot_reply = time.strftime("Today's date: %d-%m-%Y")

            elif "hello" in msg:
                bot_reply = random.choice([
                    "Hello there! 👋",
                    "Hi! How can I help you?",
                    "Hey! Nice to see you 😊"
                ])
            elif "shutdown" in msg:
                bot_reply =  "Realy want to shutdown the pc? (Y/N)"
                isShutdown = True
            elif "server status" in msg:
                bot_reply = "Server is running!"
            else:
                # Default echo response
                bot_reply = f"You said: {user_message}"
    except Exception as e:
        print("Unknwon Error: ",e)
        bot_reply = f"Server error: {str(e)}"
        status = True

    return jsonify({
        "reply": bot_reply, "shutdownState": isShutdown , "status": status , "isAdmin" : isAdmin1
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5100, debug=True)
