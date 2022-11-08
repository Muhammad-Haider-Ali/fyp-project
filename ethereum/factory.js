import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x9757bbe83b3f5b2985dD303DcbD76891254D6036"
);

export default instance;
