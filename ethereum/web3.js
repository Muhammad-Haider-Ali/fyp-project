import Web3 from "web3";

let web3;
if (typeof window !== "undefined" && window.ethereum !== "undefined") {
  // we are in brower and metamask is runing
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // we are in next server or user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/f503264cf0c448c49b418b3889bcae12"
  );
  web3 = new Web3(provider);
}

export default web3;
