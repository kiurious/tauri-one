import useStore from "../utils/store";
import { listen } from "@tauri-apps/api/event";
import Lottie from "lottie-react";
import designcoLottie from "../../src/designco-logo.json";

const NavBar = () => {
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
    <div className="navbar fixed top-0 z-10 min-w-screen">
      <div className="flex-1">
        <a
          className="btn btn-ghost normal-case text-xl"
          onClick={() => changeSettingsVisibility(false)}
        >
          <Lottie animationData={designcoLottie} style={{ width: "2rem" }} />{" "}
          ChatBot
        </a>
      </div>
    </div>
  );
};

export default NavBar;
