import { Configuration, OpenAIApi } from "openai";
import useStore from "../utils/store";

export const getAgentResponse = async (
  chatHistory: { role: "assistant" | "user" | "system"; message: string }[]
): Promise<string> => {
  try {
    const configuration: Configuration = new Configuration({
      apiKey: useStore.getState().apiKey,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chatHistory.map((chatMessage) => ({
        role: chatMessage.role,
        content: chatMessage.message,
      })),
      max_tokens: 200,
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
