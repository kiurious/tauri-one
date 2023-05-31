const Landing = () => {
  return (
    <div
      className="hero min-h-screen min-w-full bg-cover bg-center"
      style={{
        backgroundImage: `url("bg-hero.jpg")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
    </div>
  );
};

export default Landing;