import { useCallback, useEffect, useState } from "react";
import logo from "../logo.svg";
import {
  etherBalanceOf,
  etherDeposit,
  etherGetBalance,
  etherWithdraw,
} from "etherjs";
import { useWeb3React } from "@web3-react/core";
import { injected, walletconnect } from "wallet/connector";
import "./metamask.css";

function ConnectWallet(props) {
  const { active, activate, deactivate, account, chainId } = useWeb3React();
  const [deposit, setDeposit] = useState("");
  const [depositMsg, setDepositMsg] = useState("");
  const [hashUrl, setHashUrl] = useState("");

  const [withdraw, setWithdraw] = useState("");
  const [withdrawMsg, setWithdrawMsg] = useState("");
  const [hashUrlWithdraw, setHashUrlWithdraw] = useState("");

  const [balanceOff, setBalanceOff] = useState();
  const [balanceAccount, setBalanceAccount] = useState(null);

  const disconnectWallet = useCallback(async () => {
    try {
      deactivate();
    } catch (error) {
      console.log(error);
    }
  }, [deactivate]);

  const connectWalletMetamask = useCallback(async () => {
    try {
      await activate(injected);
    } catch (error) {
      console.log(error);
    }
  }, [activate]);

  const connectWalletConnect = useCallback(async () => {
    try {
      await activate(walletconnect);
    } catch (error) {
      console.log(error);
    }
  }, [activate]);

  const handleDeposit = useCallback(async (value) => {
    const result = await etherDeposit(value, (error) => {
      if (error?.code === 4001) {
        setDepositMsg(error?.message);
      }
    });
    if (result) {
      setDepositMsg("");
      setHashUrl(result?.hash);
    }
  }, []);

  const handleWithdraw = useCallback(async (value) => {
    const result = await etherWithdraw(value, (error) => {
      if (error?.code === 4001) {
        setWithdrawMsg(error?.message);
      }
    });
    console.log(result, "res");
    if (result) {
      setWithdrawMsg("");
      setHashUrlWithdraw(result?.hash);
    }
  }, []);

  useEffect(() => {
    if (account) {
      etherBalanceOf(account).then(setBalanceOff);
    }
  }, [account]);
  useEffect(() => {
    if (account) {
      etherGetBalance(account).then(setBalanceAccount);
    }
  }, [account]);

  return (
    <div className="App-header">
      <h4>Ex 2:</h4>
      {active ? (
        <div className="card">
          <h4>Wallet Address:</h4>
          <p>{account}</p>
          <p>Balance Off : {balanceOff} WETH</p>

          <p>Balance : {balanceAccount} ETH</p>

          <p>{`Network ID: ${chainId ? chainId : "No Network"}`}</p>
        </div>
      ) : (
        <img src={logo} className="App-logo" alt="logo" />
      )}

      {active ? (
        <div>
          <div className="p-10">
            <input
              className="p-10 m-10"
              value={deposit}
              onChange={(e) => {
                setDeposit(e.target.value);
                setDepositMsg("");
                setHashUrl("");
              }}
            />
            <button
              className="btn"
              onClick={() => {
                handleDeposit(deposit);
              }}
            >
              Deposit
            </button>
            <p>{depositMsg}</p>
            {hashUrl && (
              <a
                href={`https://rinkeby.etherscan.io/tx/${hashUrl}`}
                target="_blank"
                rel="noreferrer"
              >
                View Transaction
              </a>
            )}
          </div>
          <div className="p-10">
            <input
              className="p-10 m-10"
              value={withdraw}
              onChange={(e) => setWithdraw(e.target.value)}
            />
            <button className="btn" onClick={() => handleWithdraw(withdraw)}>
              With draw
            </button>
            <p>{withdrawMsg}</p>
            {hashUrlWithdraw && (
              <a
                href={`https://rinkeby.etherscan.io/tx/${hashUrlWithdraw}`}
                target="_blank"
                rel="noreferrer"
              >
                View Transaction
              </a>
            )}
          </div>
          <p className="info">🎉 Connected Successfully</p>
          <button className="btn" onClick={disconnectWallet}>
            Disconnect
          </button>
        </div>
      ) : (
        <div>
          <button className="btn" onClick={connectWalletMetamask}>
            Connect Metamask
          </button>
          <button className="m-10 btn" onClick={connectWalletConnect}>
            Connect Wallet Connect
          </button>
        </div>
      )}
    </div>
  );
}

export default ConnectWallet;
