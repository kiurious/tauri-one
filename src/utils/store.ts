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
  systemMessage: "",
  changeSystemMessage: (newMessage) => {
    set({ systemMessage: newMessage });
    tauriStore.set("systemMessage", newMessage);
    tauriStore.save();
  },
  userName: "Kiurious",
  changeUserName: (newName) => set({ userName: newName }),
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}));

// loads settings from disk
async function hydrateStore() {
  const apiKey = await tauriStore.get("apiKey");
  const systemMessage = await tauriStore.get("systemMessage");
  const userName = await tauriStore.get("userName");

  const parsedApiKey = z.string().safeParse(apiKey);
  const parsedSystemMessage = z.string().safeParse(systemMessage);
  const parsedUserName = z.string().safeParse(userName);

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

  useStore.setState({ settingsLoaded: true }); // check for usefullness
};


export default useStore;
