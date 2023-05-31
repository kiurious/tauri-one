interface ChatUserProps {
  message: string;
}

const ChatUser = ({ message }: ChatUserProps) => {
  return (
    <div className="chat chat-end">
      <div className="chat-bubble">{message}</div>
      <div className="chat-image avatar placeholder">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-14">
          <span className="text-3xl">K</span>
        </div>
      </div>
    </div>
  );
};

export default ChatUser;
