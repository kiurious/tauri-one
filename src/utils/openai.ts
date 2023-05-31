import { Configuration, OpenAIApi } from "openai";

const configuration: Configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getAgentResponse = async (
  chatHistory: { role: "assistant" | "user" | "system"; message: string }[]
): Promise<string> => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chatHistory.map((chatMessage) => ({
        role: chatMessage.role,
        content: chatMessage.message,
      })),
      max_tokens: 100,
    });

    if (response.data.choices[0]?.message) {
      const agentMessage = response.data.choices[0].message;
      return agentMessage.content.trim();
    } else {
      return "I'm sorry, I cannot generate a response at this time.";
    }
  } catch (error: unknown) {
    console.error("Error fetching agent response:", error);

    if (error instanceof Error) {
      return error.message;
    }
    return "I'm sorry, I cannot generate a response at this time.";
  }
};
