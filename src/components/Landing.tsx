import Settings from "./Settings";
import useStore from "../utils/store";
import Lottie from "lottie-react";
import designcoLottie from "../../src/designco-master.json";
import FluidComponent from "./FluidComponent";

const Landing = () => {
  const settingsVisible = useStore((state) => state.settingsVisible);
  return (
    <div className="hero max-h-screen min-w-full bg-cover bg-center">
      <div className="flex flex-column justify-center w-full h-screen">
        {settingsVisible && <Settings />}
        {!settingsVisible && (
          <div>
            <Lottie animationData={designcoLottie} style={{ height: "100%" }} />
            <FluidComponent />
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
