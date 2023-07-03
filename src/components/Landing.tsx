import Settings from "./Settings";
import useStore from "../utils/store";
import Lottie from "lottie-react";
import designcoLottie from "../../src/designco-master.json";

const Landing = () => {
  const settingsVisible = useStore((state) => state.settingsVisible);
  return (
    <div className="hero min-h-screen min-w-full bg-cover bg-center bg-black">
      <div className="hero-overlay bg-opacity-60 flex flex-column items-center justify-center">
        {settingsVisible && <Settings />}
        {!settingsVisible && (
          <Lottie animationData={designcoLottie} style={{ width: "75vw" }} />
        )}
      </div>
    </div>
  );
};

export default Landing;
