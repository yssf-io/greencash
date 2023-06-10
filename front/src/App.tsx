import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BsArrowDownUp } from "react-icons/bs";

import "./App.css";

function App() {
  const [token, setToken] = useState<string>("GHO");
  const [amount, setAmount] = useState<number>(0);
  const [tokenTo, setTokenTo] = useState<string>("GGHO");

  function handleTokenChange() {
    if (token === "GHO") {
      setToken("GGHO");
    } else {
      setToken("GHO");
    }
    if (tokenTo === "GHO") {
      setTokenTo("GGHO");
    } else {
      setTokenTo("GHO");
    }
  }

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
        <div className="flex flex-row w-8/12 justify-center items-center mt-8 ">
          {/* swap form */}
          <div className="flex flex-col border border-ltGreen p-6 rounded-lg">
            <div className="flex flex-row justify-center items-center mb-2">
              Greenify your tokens !
            </div>
            <div className="flex flex-row ">
              <input
                id="amount"
                type="number"
                placeholder="Type here"
                className="input input-bordered input-accent w-full max-w-xs"
                value={amount}
                onChange={(e) => {
                  setAmount(parseInt(e.target.value));
                }}
              />
              <div className="flex flex-row justify-center items-center ml-4">
                <img src={reactLogo} className="w-8 h-8" alt="react logo" />
                <div className="text-xl text-ltGreen ml-2">{token}</div>
              </div>
            </div>
            <div className="flex justify-center mr-8 mt-4 ">
              <BsArrowDownUp
                className="text-3xl text-ltGreen hover:cursor-pointer hover:opacity-60"
                onClick={handleTokenChange}
              />
            </div>
            <div className="flex flex-row mt-4">
              <input
                id="toAmount"
                type="number"
                placeholder="Type here"
                className="input input-bordered input-accent w-full max-w-xs"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
              />
              <div className="flex flex-row justify-center items-center ml-4">
                <img src={reactLogo} className="w-8 h-8" alt="react logo" />
                <div className="text-xl text-ltGreen ml-2">{tokenTo}</div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center mt-4">
              <button className="btn btn-accent">Greenify</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
