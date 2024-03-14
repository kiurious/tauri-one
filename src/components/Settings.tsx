import settings from "../../settings-default.json";
import useStore from "../utils/store";
import { listen } from "@tauri-apps/api/event";

const Settings = () => {
  const apiKey = useStore((state) => state.apiKey);
  const changeKey = useStore((state) => state.changeApiKey);
  const systemMessage = useStore((state) => state.systemMessage);
  const changeSystemMessage = useStore((state) => state.changeSystemMessage);
  const userName = useStore((state) => state.userName);
  const changeUserName = useStore((state) => state.changeUserName);
  const maxTokens = useStore((state) => state.maxTokens);
  const changeMaxTokens = useStore((state) => state.changeMaxTokens);
  const temperature = useStore((state) => state.temperature);
  const changeTemperature = useStore((state) => state.changeTemperature);

  const handleAPIKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeKey(e.target.value);
    settings["api-key"] = e.target.value;
  };

  const settingsVisible = useStore((state) => state.settingsVisible);
  const changeSettingsVisibility = useStore(
    (state) => state.changeSettingsVisible
  );

  const toggleSettings = async () => {
    changeSettingsVisibility(!settingsVisible);
  };

  listen("open_settings", () => {
    toggleSettings();
  });

  return (
    <div className="p-4 shadow-lg bg-slate-900/90 w-full z-50 md:z-0">
      <h1 className="text-center text-3xl font-bold font-mono">Settings</h1>
      <div className="flex justify-end">
        <button
          onClick={() => toggleSettings()}
          className="flex-none btn btn-circle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="p-2 flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-mono">API Key:</h2>
          <input
            type="password"
            className="input input-bordered w-full font-mono"
            value={apiKey}
            onChange={handleAPIKeyChange}
          />
        </div>
        <div>
          <h2 className="text-lg font-mono">Temperature: {temperature}</h2>
          <input
            type="range"
            min="0"
            max="1"
            step={0.01}
            value={temperature}
            className="range range-xs"
            onChange={(e) => {
              changeTemperature(e.target.valueAsNumber);
            }}
          />
        </div>
        <div>
          <h2 className="text-lg font-mono">Max Tokens: {maxTokens}</h2>
          <input
            type="range"
            min="0"
            max="500"
            value={maxTokens}
            className="range range-xs"
            onChange={(e) => {
              changeMaxTokens(e.target.valueAsNumber);
            }}
          />
        </div>
        <div>
          <h2 className="text-lg font-mono">Name:</h2>
          <input
            type="text"
            className="input input-bordered w-full font-mono"
            value={userName || settings.chatbox["user-name"]}
            onChange={(e) => {
              changeUserName(e.target.value);
            }}
          />
        </div>
        <div>
          <h2 className="text-lg font-mono">System Message:</h2>
          <textarea
            className="textarea textarea-bordered w-full h-64 font-mono"
            placeholder="Bio"
            value={systemMessage || settings.chatbox["system-message"]}
            onChange={(e) => {
              changeSystemMessage(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Settings;
