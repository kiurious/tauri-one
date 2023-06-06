import Settings from "./Settings";
import useStore from "../utils/store";

const Landing = () => {
  const settingsVisible = useStore((state) => state.settingsVisible);
  return (
    <div
      className="hero min-h-screen min-w-full bg-cover bg-center"
      style={{
        backgroundImage: `url("bg-hero.jpg")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60">
        {settingsVisible && <Settings />}
      </div>
    </div>
  );
};

export default Landing;
