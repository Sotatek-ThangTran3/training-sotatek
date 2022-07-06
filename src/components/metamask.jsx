import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import {
  etherGetBalance,
  etherQueryTransfer,
  // etherListenTransfer,
  etherListenTransferOn,
  etherListenTransferOff,
} from "etherjs";

import logo from "../logo.svg";
import "./metamask.css";
import { injected } from "wallet/connector";

function Metamask() {
  const { active, activate, deactivate, account } = useWeb3React();

  const [haveMetamask, setHaveMetamask] = useState(true);
  const [balance, setBalance] = useState(null);
  const [queryEvent, setQueryEvent] = useState(null);
  // const [listener, setListener] = useState([]);
  const [listenerEther, setListenerEther] = useState([]);

  const disconnectWallet = async () => {
    try {
      deactivate();
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      // let balance = await provider.getBalance(accounts[0]);
      // let bal = ethers.utils.formatEther(balance);
      await activate(injected);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const { ethereum } = window;
    const checkMetamaskAvailability = async () => {
      if (!ethereum) {
        setHaveMetamask(false);
      }
      setHaveMetamask(true);
    };
    checkMetamaskAvailability();
  }, []);

  useEffect(() => {
    etherGetBalance().then(setBalance);
    etherQueryTransfer().then(setQueryEvent);
  }, []);

  // useEffect(() => {
  //   web3ListenTransferOn((e) => {
  //     setListener((prev) => [e, ...prev]);
  //   });
  // }, []);
  useEffect(() => {
    etherListenTransferOn((e) => {
      setListenerEther((prev) => [e, ...prev]);
    });
    return () => {
      etherListenTransferOff(setListenerEther([]));
    };
  }, []);

  // console.log("listener", listenerEther);
  return (
    <div className="">
      {haveMetamask ? (
        <div className="App-header">
          {active ? (
            <div className="card">
              <h4>Wallet Address:</h4>
              <p>
                {account.slice(0, 4)}...
                {account.slice(38, 42)}
              </p>
              {/* <h4>Wallet Balance:</h4> */}
              {/* <p>{accountBalance}</p> */}
            </div>
          ) : (
            <img src={logo} className="App-logo" alt="logo" />
          )}

          {active ? (
            <div>
              <p className="info">🎉 Connected Successfully</p>
              <button className="btn" onClick={disconnectWallet}>
                Disconnect
              </button>
            </div>
          ) : (
            <button className="btn" onClick={connectWallet}>
              Connect
            </button>
          )}
          <div className="card-row">
            <h4>Balance :</h4>
            <p>{balance}</p>
          </div>
        </div>
      ) : (
        <p>Please Install MetaMask</p>
      )}
    </div>
  );
}

export default Metamask;
