import useStore from "../utils/store";

const NavBar = () => {
  const settingsVisible = useStore((state) => state.settingsVisible);
  const changeSettingsVisibility = useStore((state) => state.changeSettingsVisible)

  const toggleSettings = () => {
    changeSettingsVisibility(!settingsVisible)
  }

  return (
    <div className="navbar fixed top-0 z-10 min-w-screen">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">ChatBot</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
              ></path>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 menu menu-sm dropdown-content rounded-box w-52 bg-slate-900/90 shadow-lg shadow-slate-900"
          >
            <li>
              <a className="justify-between">
                Profile
              </a>
            </li>
            <li>
              <a onClick={toggleSettings}>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
