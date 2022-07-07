import { ethers, providers } from "ethers";
import Abi from "abi/abi.json";
import { DEFAULT_ADDRESS } from "constant/address";

declare let window: any;

export const etherProvider = () => {
  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  return provider;
};

export const etherContract = (address?: string) => {
  const provider = etherProvider();

  const signer = provider.getSigner();

  var contract = new ethers.Contract(
    address || DEFAULT_ADDRESS,
    Abi,
    signer || provider
  );
  return contract;
};

export const etherGetBalance = async (address: string = DEFAULT_ADDRESS) => {
  const provider = etherProvider();
  let balance = await provider.getBalance(address);

  let bal = ethers.utils.formatEther(balance);

  return bal;
};

export const etherQueryTransfer = async () => {
  const provider = etherProvider();
  const blockNumber = await provider.getBlockNumber();
  const contract = etherContract();
  const eventFilter = contract.filters.Transfer();
  const query = await contract.queryFilter(
    eventFilter,
    blockNumber - 100,
    "latest"
  );

  return query;
};

export const etherListenTransfer = async () => {
  const contract = etherContract();
  const eventFilter = contract.filters.Transfer();
  const listeners = await contract.listeners(eventFilter);

  return listeners;
};

export const etherListenTransferOn = async (
  callBack: (event: providers.Listener) => void
) => {
  const contract = etherContract();

  contract.on("Transfer", (from, to, value, event) => {
    callBack(event);
  });
};

export const etherListenTransferOff = async (
  callBack: (event: providers.Listener) => void
) => {
  const contract = etherContract();
  const eventFilter = contract.filters.Transfer();

  contract.off(eventFilter, callBack);
};

export const etherDeposit = async (
  value: string,
  onError: (error: any) => void
) => {
  const contract = etherContract();
  try {
    const amount = ethers.utils.parseEther(value);
    const result = await contract.deposit({ value: amount });
    return result;
  } catch (error) {
    onError(error);
    console.log(error);
  }
};

export const etherWithdraw = async (
  value: string,
  onError: (error: any) => void
) => {
  const contract = etherContract();

  try {
    const amount = ethers.utils.parseEther(value);
    const result = await contract.withdraw(amount);
    return result;
  } catch (error) {
    onError(error);

    console.log(error);
  }
};

export const etherBalanceOf = async (address: string) => {
  const contract = etherContract();
  try {
    const result = await contract.balanceOf(address);

    const amount = ethers.utils.formatEther(result);

    return amount;
  } catch (error) {
    console.log(error);
  }
};
