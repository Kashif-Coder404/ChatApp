import { useState } from "react";

export default function Login({ onLogin, mode, replyMsg, reply }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  function handleSubmit(e) {
    e.preventDefault();

    if (!username.trim()) {
      alert("Enter username");
      return;
    }

    // temporary storage
    localStorage.setItem("username", username);
    onLogin(username.toLowerCase(), password, email, "login");
  }

  return (
    <>
      <div className="loginCont">
        <form className="loginBox" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <input
            type="text"
            placeholder="Username or Email"
            value={username}
            onChange={(e) => {
              (setUsername(e.target.value), setEmail(e.target.value));
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Join Chat</button>
        </form>
        <div>
          <h3 id="replyMSG">
            {replyMsg}{" "}
            <button
              id="crossBtn"
              className={replyMsg ? "active" : ""}
              onClick={() => reply("")}
            >
              X
            </button>
          </h3>
        </div>

        <button
          onClick={() => {
            (mode("signup"), reply(""));
          }}
        >
          SignUp
        </button>
      </div>
    </>
  );
}
