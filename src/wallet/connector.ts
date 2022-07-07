import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42],
});

export const walletconnect = new WalletConnectConnector({
  rpc: `https://mainnet.infura.io/v3/b0d7680210cc4600b271066be2400c82`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});
