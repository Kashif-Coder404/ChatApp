import { useState } from "react";
import "./prompt.css";

export default function Prompt({ onSend, placeholder }) {
  const [value, setValue] = useState("");

  function handleSend() {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  }

  return (
    <div className="prompt">
      <input
        id="promptMessage"
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}
