import { useEffect, useState } from "react";

import {
  etherGetBalance,
  etherListenTransferOff,
  etherListenTransferOn,
  etherQueryTransfer,
} from "etherjs";
import "./metamask.css";

function ContractEx(props) {
  const [balance, setBalance] = useState(null);
  const [queryEvent, setQueryEvent] = useState(null);
  const [listenerEther, setListenerEther] = useState([]);

  useEffect(() => {
    etherGetBalance().then(setBalance);
    etherQueryTransfer().then(setQueryEvent);
  }, []);

  useEffect(() => {
    etherListenTransferOn((e) => {
      setListenerEther((prev) => [e, ...prev]);
    });
    return () => {
      etherListenTransferOff(setListenerEther([]));
    };
  }, []);

  return (
    <div className="">
      <h4>Ex 1:</h4>
      <div>
        <h4>Balance :</h4>
        <p>{balance} ETH</p>
      </div>
      <h4>Query event latest 100 </h4>
      <table className="w100 table ">
        <tr>
          <th>Block Number</th>
          <th>Event</th>
          <th>Data</th>
        </tr>
        {queryEvent?.map((item) => (
          <tr>
            <td>{item?.blockNumber}</td>
            <td>{item?.event}</td>
            <td>{item?.data}</td>
          </tr>
        ))}
      </table>
      <h4>Listener event transfer </h4>

      <table className="w100 table ">
        <tr>
          <th>Block Number</th>
          <th>Event</th>
          <th>Data</th>
        </tr>
        {listenerEther?.map((item) => (
          <tr>
            <td>{item?.blockNumber}</td>
            <td>{item?.event}</td>
            <td>{item?.data}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default ContractEx;
