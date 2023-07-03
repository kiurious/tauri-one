import { create } from "zustand";
import { Store } from "tauri-plugin-store-api";
import { z } from "zod";

const tauriStore = new Store(".settings.dat");

hydrateStore();

interface State {
  settingsLoaded: boolean; // check for usefullness still to be implemented properly
  apiKey: string;
  changeApiKey: (newKey: string) => void;
  settingsVisible: boolean;
  changeSettingsVisible: (newVisible: boolean) => void;
  systemMessage: string;
  changeSystemMessage: (newMessage: string) => void;
  userName: string;
  changeUserName: (newName: string) => void;
  bears: number;
  increase: (by: number) => void;
  maxTokens: number;
  changeMaxTokens: (newMax: number) => void;
}

const useStore = create<State>()((set) => ({
  settingsLoaded: false,
  apiKey: "",
  changeApiKey: async (newKey) => {
    set({ apiKey: newKey });
    await tauriStore.set("apiKey", newKey);
    tauriStore.save();
  },
  settingsVisible: false,
  changeSettingsVisible: (newVisible) => set({ settingsVisible: newVisible }),
  systemMessage:
    "You are an assistant for Designco, a digital agency specializing in UX/UI, branding, and design. Your purpose is to help users with their inquiries. Do not answer questions unrelated to designco. Do not engage in off-topic chats, only conversations related to designco, no coding is allowed as well. Keep your answers short and concise. You should always refer to yourself as a member of designco and say 'we' instead of 'they'. Remember that Designco has a team of 10, including developers, designers, strategists, and a media production crew. They excel in functional prototypes, design thinking, social media campaigns, and advanced online systems across industries such as automotive, media, airlines, and e-banking. They create e-shops, corporate websites, and React applications for web and mobile, following a process that includes discovery, planning, design, implementation, and evaluation. Designco is a boutique agency with premium pricing, but offers solutions for various clients. Located in Greece, they serve clients worldwide. Their address is 322 Syggrou Avenue and their website is https://designco.agency. Avoid mentioning competitor names directly.",
  changeSystemMessage: (newMessage) => {
    set({ systemMessage: newMessage });
    tauriStore.set("systemMessage", newMessage);
    tauriStore.save();
  },
  userName: "Kiurious",
  changeUserName: (newName) => set({ userName: newName }),
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
  maxTokens: 200,
  changeMaxTokens: async (newMax) => {
    set({ maxTokens: newMax });
    await tauriStore.set("maxTokens", newMax);
    tauriStore.save();
  },
}));

// loads settings from disk
async function hydrateStore() {
  const apiKey = await tauriStore.get("apiKey");
  const systemMessage = await tauriStore.get("systemMessage");
  const userName = await tauriStore.get("userName");
  const maxTokens = await tauriStore.get("maxTokens");

  const parsedApiKey = z.string().safeParse(apiKey);
  const parsedSystemMessage = z.string().safeParse(systemMessage);
  const parsedUserName = z.string().safeParse(userName);
  const parsedMaxTokens = z.number().safeParse(maxTokens);

  if (
    parsedApiKey.success &&
    parsedApiKey.data !== useStore.getState().apiKey
  ) {
    useStore.setState({ apiKey: parsedApiKey.data });
  }
  useStore.setState({ settingsVisible: false });
  if (
    parsedSystemMessage.success &&
    parsedSystemMessage.data !== useStore.getState().systemMessage
  ) {
    useStore.setState({ systemMessage: parsedSystemMessage.data });
  }
  if (
    parsedUserName.success &&
    parsedUserName.data !== useStore.getState().userName
  ) {
    useStore.setState({ userName: parsedUserName.data });
  }
  if (
    parsedMaxTokens.success &&
    parsedMaxTokens.data !== useStore.getState().maxTokens
  ) {
    useStore.setState({ maxTokens: parsedMaxTokens.data });
  }

  useStore.setState({ settingsLoaded: true }); // check for usefullness
  console.log("Settings loaded: ", useStore.getState().settingsLoaded);
}

export default useStore;
