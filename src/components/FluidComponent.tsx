import { useEffect, useRef } from "react";
import webGLFluidEnhanced from "webgl-fluid-enhanced";
import Lottie from "lottie-react";
import designcoLottie from "../../src/designco-master.json";

const FluidComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const defaultSettings = {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1024,
      CAPTURE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 1,
      VELOCITY_DISSIPATION: 0.2,
      PRESSURE: 0.8,
      PRESSURE_ITERATIONS: 20,
      CURL: 30,
      SPLAT_RADIUS: 0.25,
      SPLAT_FORCE: 6000,
      SPLAT_KEY: "  ",
      SHADING: true,
      COLORFUL: true,
      COLOR_UPDATE_SPEED: 10,
      PAUSED: false,
      TRANSPARENT: false,
      BLOOM: true,
      BLOOM_ITERATIONS: 8,
      BLOOM_RESOLUTION: 256,
      BLOOM_INTENSITY: 0.8,
      BLOOM_THRESHOLD: 0.6,
      BLOOM_SOFT_KNEE: 0.7,
      SUNRAYS: true,
      SUNRAYS_RESOLUTION: 196,
      SUNRAYS_WEIGHT: 1,
      INITIAL: true,
      BACK_COLOR: "#000000",
      HOVER: true,
      COLOR_PALETTE: [
        "rgb(88, 60, 88)",
        "rgb(0, 60, 88)",
        "rgb(78, 60, 255)",
        "rgb(88, 60, 88)",
        "rgb(30, 10, 88)",
      ],
    };

    const newColorPalette = defaultSettings.COLOR_PALETTE.map(convertRGBAToHex);
    const simulationSettings = {
      ...defaultSettings,
      COLOR_PALETTE: newColorPalette,
    };

    if (canvasRef.current !== null) {
      webGLFluidEnhanced.simulation(canvasRef.current, simulationSettings);
    }
  }, []);

  const convertRGBAToHex = (color: string) => {
    const rgba = color.replace(/^rgba?\(|\s+|\)$/g, "").split(",");
    const hex = `#${(
      (1 << 24) +
      (parseInt(rgba[0]) << 16) +
      (parseInt(rgba[1]) << 8) +
      parseInt(rgba[2])
    )
      .toString(16)
      .slice(1)}`;
    return hex;
  };

  return (
    <canvas
      ref={canvasRef}
      className="bg-slate-800/90"
      style={containerStyle}
    />
  );
};

const containerStyle = {
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  border: "0px",
  // adding as "absolute" because typescript is complaining about the type
  position: "absolute" as "absolute",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  opacity: "0.8",
};

export default FluidComponent;
