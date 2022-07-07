import { useEffect, useState } from "react";

import "./metamask.css";
import ConnectWallet from "./ConnectWallet";
import ContractEx from "./ContractEx";

function Metamask() {
  const [haveMetamask, setHaveMetamask] = useState(true);

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

  return (
    <div className="">
      {haveMetamask ? (
        <div className="App-header">
          <ConnectWallet haveMetamask={haveMetamask} />
          <ContractEx haveMetamask={haveMetamask} />
        </div>
      ) : (
        <p>Please Install MetaMask</p>
      )}
    </div>
  );
}

export default Metamask;
