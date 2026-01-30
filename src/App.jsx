import Chats from "./ChatCont";
import Prompt from "./Prompt";
import Login from "./LoginPage";
import Signup from "./Signup";
import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL;
// const API = "http://192.168.31.116:5100";

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mode, setMode] = useState("login");
  const [reply, setReply] = useState("");
  const [user, setUser] = useState("");
  const [lastId, setLastId] = useState(-1);

  /* ---------------- HELPERS ---------------- */

  function addMessage(text, sender, time) {
    setMessages((prev) => [...prev, { sender, text, time }]);
  }

  /* ---------------- SEND MESSAGE ---------------- */

  async function sendMessage(text) {
    const now = new Date();
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    // show instantly
    addMessage(text, user, time);

    try {
      await fetch(`${API}/msg`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          message: text,
          time,
        }),
      });
    } catch (err) {
      console.error(err);
    }
  }

  /* ---------------- LOAD CHAT HISTORY ---------------- */

  async function loadMessages() {
    try {
      const res = await fetch(`${API}/history`);
      const data = await res.json();

      setMessages(
        data.messages.map((msg) => ({
          sender: msg.user,
          text: msg.message,
          time: msg.time,
        })),
      );

      if (data.messages.length) {
        setLastId(data.messages[data.messages.length - 1].id);
      }
    } catch (err) {
      console.error(err);
    }
  }

  /* ---------------- FETCH NEW MESSAGES (POLLING) ---------------- */

  async function fetchNewMessages() {
    try {
      const res = await fetch(`${API}/chats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user,
          last_id: lastId,
        }),
      });

      const data = await res.json();

      if (data.messages?.length) {
        data.messages.forEach((msg) => {
          addMessage(msg.message, msg.user, msg.time);
          setLastId(msg.id);
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  /* ---------------- AUTH ---------------- */

  async function authRequest(username, password, email, route) {
    try {
      const res = await fetch(`${API}/${route}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email }),
      });

      const data = await res.json();
      setReply(data.message);
      setIsLoggedIn(data.status);

      if (data.status && data.user) {
        setUser(data.user);
      }
    } catch (err) {
      setReply("Server error");
      setIsLoggedIn(false);
    }
  }

  /* ---------------- EFFECTS ---------------- */

  // load chat history after login
  useEffect(() => {
    if (isLoggedIn) {
      loadMessages();
    }
  }, [isLoggedIn]);

  // polling for new messages
  useEffect(() => {
    if (!user) return;

    const interval = setInterval(fetchNewMessages, 2000);
    return () => clearInterval(interval);
  }, [user, lastId]);

  /* ---------------- AUTH UI ---------------- */

  if (!isLoggedIn) {
    return mode === "login" ? (
      <Login onLogin={authRequest} mode={setMode} replyMsg={reply} />
    ) : (
      <Signup onSignup={authRequest} mode={setMode} replyMsg={reply} />
    );
  }

  /* ---------------- CHAT UI ---------------- */

  return (
    <div className="chatCont">
      <Chats username={user} messages={messages} />
      <Prompt onSend={sendMessage} placeholder="Type a message..." />
    </div>
  );
}

export default App;
