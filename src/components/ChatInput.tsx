import { useState } from "react";

interface ChatInputProps {
  onMessageSend: (message: string) => void;
}

const ChatInput = ({ onMessageSend }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onMessageSend(message);
    setMessage("");
  };

  return (
    <div className="chat chat-end sticky bottom-0">
      <form onSubmit={handleSubmit} className="chat chat-end">
        <input
          type="text"
          placeholder="Type here"
          className="input w-full max-w-xs"
          value={message}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
