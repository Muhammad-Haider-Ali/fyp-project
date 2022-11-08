const Web3 = require("web3");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const CampaignFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider({
  mnemonic: {
    phrase:
      "gravity cargo cloud extend adult parrot ivory pepper sustain sign interest bench",
  },
  provider: "https://rinkeby.infura.io/v3/f503264cf0c448c49b418b3889bcae12",
});

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Accounts: ", accounts);
  const factory = await new web3.eth
    .Contract(CampaignFactory.abi)
    .deploy({ data: CampaignFactory.evm.bytecode.object })
    .send({ from: accounts[0], gas: 1500000 });
  console.log("Contract Address: ", factory.options.address);
};

deploy();
