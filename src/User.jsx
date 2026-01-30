import "./chatMessage.css";

export default function UserMessage({ username, text, time }) {
  return (
    <div className="message me">
      <div className="messageHeader">
        <span className="username">You</span>
        {time && <span className="time">{time}</span>}
      </div>

      <div className="messageBubble">{text}</div>
    </div>
  );
}
