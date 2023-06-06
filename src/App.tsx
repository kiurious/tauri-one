import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import NavBar from "./components/Navbar";
import Landing from "./components/Landing";
import ChatBox from "./components/Chatbox";
import Settings from "./components/Settings";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="bg-slate-800 flex flex-col content-center justify-center w-full h-full">

      <NavBar />
      <Landing />
      <ChatBox />
      {/* <form
        className="row p-2"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form> */}

      {/* <p>{greetMsg}</p> */}
    </div>
  );
}

export default App;
