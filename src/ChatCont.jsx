import UserMessage from "./User";
import OtherUserMessage from "./otherUser";
import { useEffect, useRef } from "react";

export default function Chats({ messages, username: currentUser }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatContainer">
      {messages.map((msg, index) => {
        const isCurrentUser = msg.sender === currentUser;

        return isCurrentUser ? (
          <UserMessage
            key={index}
            username={currentUser}
            text={msg.text}
            time={msg.time}
          />
        ) : (
          <OtherUserMessage
            key={index}
            username={msg.sender}
            text={msg.text}
            time={msg.time}
          />
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
}
