import Web3 from "web3";
import { AbiItem } from "web3-utils";
import Contract from "web3-eth-contract";
import Abi from "abi/abi.json";
import { DEFAULT_ADDRESS } from "constant/address";

export const web3Instance = () => {
  var web3 = new Web3(
    Web3.givenProvider || "ws://some.local-or-remote.node:8546"
  );
  return web3;
};

export const web3Contract = (
  jsonInterface?: AbiItem | AbiItem[],
  address?: string,
  option?: Contract.ContractOptions
) => {
  const web3 = web3Instance();
  if (web3) {
    var contract = new web3.eth.Contract(
      jsonInterface || (Abi as AbiItem[]),
      address || DEFAULT_ADDRESS,
      option
    );
    return contract;
  }
  return null;
};
export const web3GetBalance = async (address: string = DEFAULT_ADDRESS) => {
  const web3 = web3Instance();
  if (web3) {
    return await web3.eth.getBalance(address);
  }
  return null;
};

export const web3QueryTransfer = async () => {
  const web3 = web3Instance();

  const blockNumber = await web3.eth.getBlockNumber();

  const contract = web3Contract();
  if (contract) {
    return await contract
      .getPastEvents("Transfer", {
        fromBlock: blockNumber - 100,
        toBlock: "latest",
      })
      .then((res) => res);
  }
  return null;
};

export const web3ListenTransferOn = async (callBack: (event: any) => void) => {
  const contract = web3Contract();
  if (contract) {
    contract.events.Transfer().on("data", callBack);
  }
};
