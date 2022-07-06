import type { Signer } from "@ethersproject/abstract-signer";
import type { Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import MultiCallAbi from "abi/Multicall.json";
import { getMulticallAddress } from "./addressHelpers";

export const getContract = (
  abi: any,
  address: string,
  signer?: Signer | Provider
) => {
  const signerOrProvider = signer;
  return new Contract(address, abi, signerOrProvider);
};

export const getMulticallContract = () => {
  return getContract(MultiCallAbi, getMulticallAddress()) as any;
};
