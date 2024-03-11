import "./App.css";
import NavBar from "./components/Navbar";
import Landing from "./components/Landing";
import ChatBox from "./components/Chatbox";

function App() {
  return (
    <div className="bg-slate-800 flex flex-col content-center justify-center w-full h-full">
      <NavBar />
      <Landing />
      <ChatBox />
    </div>
  );
}

export default App;
