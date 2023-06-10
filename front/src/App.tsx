import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-col w-full bg-drkGreen items-center py-2">
        <div className="flex flex-row w-8/12 justify-between">
          <div className="text-3xl text-ltGreen justify-left">green cash</div>
          <div className="flex flex-row justify-between">
            <ConnectButton />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
