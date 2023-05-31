interface ChatAgentProps {
  message: string;
}

const ChatAgent = ({message}: ChatAgentProps) => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-16 rounded-full">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div className="chat-bubble">
        {message}
      </div>
    </div>
  );
};

export default ChatAgent;
