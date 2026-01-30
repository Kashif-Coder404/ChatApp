export default function BotMessage({ text, status }) {
  const style = {
    color: status ? "red" : "black",
  };
  return (
    <div className="msgRow bot">
      <div className="icon">🤖</div>
      <div className="bubble" style={style}>
        {text}
      </div>
    </div>
  );
}
