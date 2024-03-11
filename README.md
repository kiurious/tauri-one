# Tauri One (Chatbot) - An AI digital assistant app for desktop/mobile which uses OpenAI's API and custom prompts for business use cases.

## What is Tauri? 
A toolkit to make multi-platform applications using a framework on the frontend and Rust on the backend.

## What's this project about?
I decided to try it out and make a simple chatbot app using Vite, React and Typescript for the frontend and Rust for the backend. It also uses Zustand as state-management solution, and TailwindCSS for styling. The app uses OpenAI's API to generate responses to user prompts. The user can tweak the settings, including adding their own api key, define default prompt and amount of tokens. The app is responsive and works on both mobile and desktop. It also stores the data locally using the Tauri plugin store. As for the UI and design it is based on DaisyUI, a TailwindCSS component library. It also uses WebGL-Fluid-Simulation for the background effect.

## Screenshots

![](/public/demogif.gif)
![](/public/screenshot.png)

## Getting Started

1. Clone the repository from Github using the following command:

```bash
git clone https://github.com/kiurious/tauri-one
```

2. Change directory to the project folder:

```bash
cd tauri-one
```

3. Install the dependencies:

```bash
npm install
```

4. Start the app in development mode:

```bash
npm run tauri dev
```

## Features
- Data is stored locally
- User can tweak the settings, including adding their own api key, define default prompt and amount of tokens
- Responsive design for mobile and desktop out of the box

## Tauri + React + Typescript Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
