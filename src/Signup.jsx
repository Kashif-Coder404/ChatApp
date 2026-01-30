import { useState } from "react";

export default function Signup({ onSignup, mode, replyMsg, reply }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!username.trim()) {
      alert("Enter username");
      return;
    }
    onSignup(username.toLowerCase(), password, email, "signup");
  }
  
  return (
    <>
      <div className="loginCont">
        <form className="loginBox" onSubmit={handleSubmit}>
          <h2>SignUP</h2>

          <input
            type="text"
            placeholder="Username"
            value={username.toLowerCase()}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Sign up</button>
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
            (mode("login"), reply(""));
          }}
        >
          Login
        </button>
      </div>
    </>
  );
}
