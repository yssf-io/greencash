import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BsArrowDownUp } from "react-icons/bs";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
import GreenWrapperAbi from "./abi/GreenWrapper.json";
import { formatEther, formatUnits, parseUnits } from "viem";

import "./App.css";

function App() {
  const { address: userAddress, isConnecting, isDisconnected } = useAccount();

  const [tabIndex, setTabIndex] = useState(0);
  const [token, setToken] = useState<string>("USDC");
  const [amount, setAmount] = useState<string>("0");
  const [tokenTo, setTokenTo] = useState<string>("GUSDC");
  const [destAddress, setDestAddress] = useState<string>("");
  // const [balance, setBalance] = useState<number>(0);
  const contractAddress = "0xb2cE45f75bD80d776CB720ac20d8A00Eb3f9A881";

  function handleTokenChange() {
    if (token === "USDC") {
      setToken("GUSDC");
      document.getElementById("wrapBtn")!.innerHTML = "Greenify";
    } else {
      setToken("USDC");
      document.getElementById("wrapBtn")!.innerHTML = "UnGreenify";
    }
    if (tokenTo === "USDC") {
      setTokenTo("GUSDC");
      document.getElementById("wrapBtn")!.innerHTML = "Greenify";
    } else {
      setTokenTo("USDC");
      document.getElementById("wrapBtn")!.innerHTML = "UnGreenify";
    }
  }

  function handleTabChange(index: number) {
    setTabIndex(index);
  }

  const { data: balance } = useContractRead({
    address: "0x69305b943C6F55743b2Ece5c0b20507300a39FC3",
    abi: GreenWrapperAbi.abi,
    functionName: "balanceOf",
    args: [userAddress || "0x72665Eec957e61DEF423E4CbAf3a49002E3dabc9"],
    // args: ["0x72665Eec957e61DEF423E4CbAf3a49002E3dabc9"],
    watch: true,
  });

  const { data: gBalance } = useContractRead({
    address: contractAddress,
    abi: GreenWrapperAbi.abi,
    functionName: "balanceOf",
    args: [userAddress || "0x72665Eec957e61DEF423E4CbAf3a49002E3dabc9"],
    // args: ["0x72665Eec957e61DEF423E4CbAf3a49002E3dabc9"],
    watch: true,
  });

  const { write: wrap } = useContractWrite({
    address: contractAddress,
    abi: GreenWrapperAbi.abi,
    functionName: "deposit",
  });

  const { write: unwrap } = useContractWrite({
    address: contractAddress,
    abi: GreenWrapperAbi.abi,
    functionName: "withdraw",
  });

  const { write: send } = useContractWrite({
    address: contractAddress,
    abi: GreenWrapperAbi.abi,
    functionName: "transfer",
  });

  useEffect(() => {
    // if (!balance) return;
    console.log("userAddr", userAddress);
    console.log("balance", balance);
  }, [balance]);

  useEffect(() => {
    // if (!balance) return;
    console.log("userAddr", userAddress);
    console.log("gbalance", gBalance);
  }, [gBalance]);

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
                      setAmount(e.target.value);
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
                    onChange={(e) => setAmount(e.target.value)}
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
                  <button
                    id="wrapBtn"
                    className="btn btn-accent"
                    onClick={() => {
                      token === "USDC"
                        ? wrap({ args: [parseUnits(amount as `${number}`, 6)] })
                        : unwrap({
                            args: [parseUnits(amount as `${number}`, 6)],
                          });
                    }}
                  >
                    Greenify
                  </button>
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
                  <div className="text-xl text-ltGreen mr-2">
                    {gBalance ? formatUnits(gBalance as bigint, 6) : 0}
                  </div>
                  <div className="text-xl text-ltGreen mr-2">GUSDC</div>
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
                      setAmount(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-row mt-4">
                  <input
                    id="to"
                    type="text"
                    placeholder="Enter destination address"
                    className="input input-bordered input-accent w-10/11 max-w-xs"
                    onChange={(e) => {
                      setDestAddress(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-row justify-center items-center mt-4">
                  <button
                    className="btn btn-accent"
                    onClick={() => {
                      send({ args: [destAddress, parseUnits(amount as `${number}`, 6)] });
                    }}
                  >
                    Send
                  </button>
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
