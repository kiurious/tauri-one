import { useState, useEffect, useRef } from "react";
import ChatAgent from "./ChatAgent";
import ChatInput from "./ChatInput";
import ChatUser from "./ChatUser";
import { getAgentResponse } from "../utils/openai";
import LoadingMessage from "./LoadingMessage";
import settings from "../../settings.json";	

const ChatBox = () => {
  const systemMessage = {
    role: "system" as const,
    message:
      settings.chatbox["system-message"],
  };

  const [chatHistory, setChatHistory] = useState<
    { role: "assistant" | "user" | "system"; message: string }[]
  >([systemMessage]);

  const [chatStatus, setChatStatus] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [currentValue, setCurrentValue] = useState(1);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading) {
      const intervalId = setInterval(() => {
        setCurrentValue((prevValue) => (prevValue === 99 ? 1 : prevValue + 1));
      }, 20); // update the value every 20ms to complete a loop in 2 seconds (20ms * 100 = 2000ms)

      return () => clearInterval(intervalId); // clean up the interval when the component is unmounted
    }
  }, [loading]);

  const handleMessageSend = async (message: string) => {
    setLoading(true);
    const newUserMessage = {
      role: "user" as const,
      message: message,
    };
    const updatedChatHistory = [...chatHistory, newUserMessage];
    setChatHistory(updatedChatHistory);

    try {
      const agentResponse = await getAgentResponse(updatedChatHistory);
      const newAgentMessage = {
        role: "assistant" as const,
        message: agentResponse,
      };
      setChatHistory((prevChatHistory) => [
        ...prevChatHistory,
        newAgentMessage,
      ]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching agent response:", error);
    }
  };

  const handleChatStatusChange = () => {
    setChatStatus(!chatStatus);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, chatStatus]);

  return !chatStatus ? (
    <div
      onClick={handleChatStatusChange}
      className="chat-image avatar shadow-slate-900 rounded-xl fixed bottom-4 right-4 cursor-pointer"
    >
      <div className="w-16 rounded-full">
        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
      </div>
    </div>
  ) : (
    <div className="scrollbar-hide z-20 font-mono bg-slate-900/90 shadow-lg shadow-slate-900 p-6 rounded-md min-w-full sm:min-w-0 sm:max-w-sm min-h-fit sm:min-h-0 max-h-full fixed bottom-4 sm:right-4">
      <div
        className="flex sticky justify-end top-1 z-10 p-1 cursor-pointer"
        onClick={handleChatStatusChange}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="
          w-4 h-4 stroke-current"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </div>
      <div className="prompt pb-8 max-h-[calc(100vh-9rem)] overflow-y-auto">
        <ChatAgent key={"assistant"} message={"Hi, how can I help you?"} />
        {chatHistory.map((chatMessage, index) => {
          if (chatMessage.role === "assistant") {
            return <ChatAgent key={index} message={chatMessage.message} />;
          } else if (chatMessage.role === "user") {
            return <ChatUser key={index} message={chatMessage.message} />;
          }
        })}
        {loading && <LoadingMessage value={currentValue} />}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onMessageSend={handleMessageSend} />
    </div>
  );
};

export default ChatBox;
