import settings from "../../settings-default.json";
import useStore from "../utils/store";

const Settings = () => {
  const apiKey = useStore((state) => state.apiKey);
  const changeKey = useStore((state) => state.changeApiKey);
  const systemMessage = useStore((state) => state.systemMessage);
  const changeSystemMessage = useStore((state) => state.changeSystemMessage);
  const userName = useStore((state) => state.userName);
  const changeUserName = useStore((state) => state.changeUserName);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeKey(e.target.value);
    settings["api-key"] = e.target.value;
  };

  return (
    <div className="p-4 shadow-lg bg-slate-900/90">
      <h1 className="text-center text-3xl font-bold font-mono">Settings</h1>

      <div className="p-2 flex flex-col gap-4">
        <div>
          <h2 className="text-lg font-mono">Volume:</h2>
          <input
            type="range"
            min="0"
            max="100"
            // value={volume}
            className="range range-xs"
            // onChange={(e) => {
            //   setVolume(e.target.valueAsNumber);
            // }}
          />
        </div>
        <div>
          <h2 className="text-lg font-mono">API Key:</h2>
          <input
            type="text"
            className="input input-bordered w-full font-mono"
            value={apiKey}
            onChange={handleChange}
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
            className="textarea textarea-bordered w-full md:h-64 font-mono"
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
