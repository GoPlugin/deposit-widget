const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    return window.web3;
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
    return window.web3;
  } else {
    window.alert(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

const getTokenContract = async (web3) => {
  const data = await $.getJSON("./contracts/pliabi.json");
  console.log("Data is",data)
  const netId = await web3.eth.net.getId();
  console.log("Netid tokencontract",netId)
  const tokennetwork = new web3.eth.Contract(
    data,
    "0xff7412ea7c8445c46a8254dfb557ac1e48094391" //-Mainnet
    //"0x33f4212b027e22af7e6ba21fc572843c0d701cd1" // -Apothem
  );  
  console.log("tokennetwork",tokennetwork)
  return tokennetwork;
};
