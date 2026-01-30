import "./chatMessage.css";

export default function OtherUserMessage({ username, text, time }) {
  return (
    <div className="message other">
      <div className="messageHeader">
        <span className="username">{username}</span>
        {time && <span className="time">{time}</span>}
      </div>

      <div className="messageBubble">{text}</div>
    </div>
  );
}
