import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BsArrowDownUp } from "react-icons/bs";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import "./App.css";

function App() {
  const [tabIndex, setTabIndex] = useState(0);
  const [token, setToken] = useState<string>("GHO");
  const [amount, setAmount] = useState<number>(0);
  const [tokenTo, setTokenTo] = useState<string>("GGHO");
  const [balance, setBalance] = useState<number>(0);

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

  function handleTabChange(index: number) {
    setTabIndex(index);
  }

  return (
    <>
      <div className="flex flex-col w-full  items-center min-h-screen bg-ltBrown">
        <div className="flex flex-col w-full bg-drkGreen items-center py-2">
          <div className="flex flex-row w-8/12 justify-between">
            <div className="text-3xl text-ltGreen justify-left">green cash</div>
            <div className="flex flex-row justify-center items-center">
              <div
                className="text-xl text-ltGreen hover:cursor-pointer hover:opacity-60 mx-4"
                onClick={() => handleTabChange(0)}
              >
                Greenify
              </div>
              <div
                className="text-xl text-ltGreen hover:cursor-pointer hover:opacity-60 mx-4"
                onClick={() => handleTabChange(1)}
              >
                Send
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <ConnectButton />
            </div>
          </div>
        </div>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabPanel>
            <div className="flex flex-row w-8/12 justify-center items-center mt-8 ">
              {/* swap form */}
              <div className="flex flex-col border border-ltGreen p-6 rounded-lg bg-vvltGreen">
                <div className="flex flex-row justify-center items-center mb-2">
                  Greenify your tokens !
                </div>
                <div className="flex flex-row ">
                  <input
                    id="amount"
                    type="number"
                    step="any"
                    placeholder="Type here"
                    className="input input-bordered input-accent w-10/11 max-w-xs"
                    value={amount}
                    onChange={(e) => {
                      setAmount(parseInt(e.target.value));
                    }}
                  />
                  <div
                    className="flex flex-row justify-center items-center ml-4  hover:cursor-pointer hover:opacity-60 bg-vltGreen rounded-lg px-6"
                    onClick={handleTokenChange}
                  >
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
                    className="input input-bordered input-accent w-10/11 max-w-xs"
                    value={amount}
                    onChange={(e) => setAmount(parseInt(e.target.value))}
                  />
                  <div
                    className="flex flex-row justify-center items-center ml-4 hover:cursor-pointer hover:opacity-60 bg-vltGreen rounded-lg px-6"
                    onClick={handleTokenChange}
                  >
                    <img src={reactLogo} className="w-8 h-8" alt="react logo" />
                    <div className="text-xl text-ltGreen ml-2">{tokenTo}</div>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center mt-4">
                  <button className="btn btn-accent">Greenify</button>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-row w-8/12 justify-center items-center mt-8 ">
              {/* send form */}
              <div className="flex flex-col border border-ltGreen p-6 rounded-lg bg-vvltGreen">
                <div className="flex flex-row justify-center items-center mb-2">
                  Send green tokens !
                </div>
                {/* balance */}
                <div className="flex flex-row justify-center items-center mb-2">
                  <div className="text-xl text-ltGreen mr-2">Balance:</div>
                  <div className="text-xl text-ltGreen mr-2">{balance}</div>
                  <div className="text-xl text-ltGreen mr-2">GGHO</div>
                </div>
                <div className="flex flex-row ">
                  <input
                    id="amount"
                    type="number"
                    step="any"
                    placeholder="0.0"
                    className="input input-bordered input-accent w-10/11 max-w-xs"
                    value={amount}
                    onChange={(e) => {
                      setAmount(parseInt(e.target.value));
                    }}
                  />
                </div>
                <div className="flex flex-row mt-4">
                  <input
                    id="to"
                    type="text"
                    placeholder="Enter destination address"
                    className="input input-bordered input-accent w-10/11 max-w-xs"
                  />
                </div>
                <div className="flex flex-row justify-center items-center mt-4">
                  <button className="btn btn-accent">Send</button>
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
}

export default App;
