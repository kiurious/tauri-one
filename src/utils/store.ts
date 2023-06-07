import { create } from "zustand";
import { Store } from "tauri-plugin-store-api";
import { z } from "zod";

const tauriStore = new Store(".settings.dat");

interface State {
  apiKey: string;
  changeApiKey: (newKey: string) => void;
  settingsVisible: boolean;
  changeSettingsVisible: (newVisible: boolean) => void;
  bears: number;
  increase: (by: number) => void;
}

const useStore = create<State>()(
  (set) => ({
    apiKey: "ABCDEF-123456",
    changeApiKey: async (newKey) => {
      set({ apiKey: newKey });
      await tauriStore.set("apiKey", newKey);
      tauriStore.save();
    },
    settingsVisible: false,
    changeSettingsVisible: (newVisible) => set({ settingsVisible: newVisible }),
    bears: 0,
    increase: (by) => set((state) => ({ bears: state.bears + by })),
  })
);

// loads settings from disk
const hydrateStore = async () => {
  const apiKey = await tauriStore.get("apiKey");

  const parsedApiKey = z.string().safeParse(apiKey);

  if (
    parsedApiKey.success &&
    parsedApiKey.data !== useStore.getState().apiKey
  ) {
    useStore.setState({ apiKey: parsedApiKey.data });
  }
  useStore.setState({ settingsVisible: false });
};

hydrateStore();

export default useStore;
