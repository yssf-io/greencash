import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BsArrowDownUp } from 'react-icons/bs';

import "./App.css";

function App() {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center">
        <div className="flex flex-col w-full bg-drkGreen items-center py-2">
          <div className="flex flex-row w-8/12 justify-between">
            <div className="text-3xl text-ltGreen justify-left">green cash</div>
            <div className="flex flex-row justify-between">
              <ConnectButton />
            </div>
          </div>
        </div>
        <div className="flex flex-row w-8/12 justify-center items-center mt-8">
          {/* swap form */}
          <div className="flex flex-col border border-ltGreen p-8 rounded-lg">
            <div className="flex flex-row ">
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered input-accent w-full max-w-xs"
              />
              <div className="flex flex-row justify-center items-center ml-4">
                <img src={reactLogo} className="w-8 h-8" alt="react logo" />
                <div className="text-xl text-ltGreen ml-2">GHO</div>
              </div>
            </div>
            <div className="flex justify-center mr-8 mt-4 ">
              <BsArrowDownUp className="text-3xl text-ltGreen hover:cursor-pointer hover:opacity-60" />
            </div>
            <div className="flex flex-row mt-4">
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered input-accent w-full max-w-xs"
              />
              <div className="flex flex-row justify-center items-center ml-4">
                <img src={reactLogo} className="w-8 h-8" alt="react logo" />
                <div className="text-xl text-ltGreen ml-2">GGHO</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
