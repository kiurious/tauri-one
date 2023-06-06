import settings from "../../settings.json";
import useStore from "../utils/store";

const Settings = () => {
  const apiKey = useStore((state) => state.apiKey);
  const changeKey = useStore((state) => state.changeApiKey)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeKey(e.target.value)
    settings["api-key"] = e.target.value;
  };
  return (
    <div className="p-2">
      <h1 className="text-center text-3xl font-bold font-mono">Settings</h1>

      <div className="p-2">
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
        <h2 className="text-lg font-mono">API Key:</h2>
        <input
          type="text"
          className="input input-bordered"
          value={apiKey}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Settings;
