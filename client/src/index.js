const convertTokens = async (n) => {
  b = new web3.utils.BN(web3.utils.toWei(n.toString(), 'ether'));
  return b;
}

const getInternalContract = async (web3, internalConractAddr) => {
  const data = await $.getJSON("./contracts/InternalAbi.json");
  const netId = await web3.eth.net.getId();
  const instance = new web3.eth.Contract(
    data,
    internalConractAddr
  );
  return instance;
};

const expectedBlockTime = 1000;

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const getTxnStatus = async (txHash) => {
  let transactionReceipt = null
  while (transactionReceipt == null) { // Waiting expectedBlockTime until the transaction is mined
    transactionReceipt = await web3.eth.getTransactionReceipt(txHash);
    await sleep(expectedBlockTime)
  }
  console.log("Got the transaction receipt: ", transactionReceipt, transactionReceipt.status)
  if (transactionReceipt.status) {
    return [txHash, true];
  } else {
    return [txHash, false];
  }
}

const approveInternalContractToTransfer = (tokencontract, accounts) => {
  let _tokens;
  let _caddr;
  $("#approveAmount").on("change", (e) => {
    _tokens = e.target.value;
    console.log("approveval", _tokens)
  });
  $("#caddrAppr").on("change", (e) => {
    _caddr = e.target.value;
    console.log("_caddr", _caddr)
  });
  $("#approvePLI").on("click", async (e) => {
    console.log("approveInternalContractToTransfer:::::", tokencontract._address,_caddr,_tokens)
    e.preventDefault();
    const internalInstance = await getInternalContract(web3,_caddr)
    console.log("internalInstance are ",internalInstance)
    const tokens = await convertTokens(_tokens);
    console.log("tokkens are ", tokens)
    await tokencontract.methods.approve(internalInstance._address, tokens)
      .send({ from: accounts[0] })
      .on("transactionHash", async function (transactionHash) {
        const [txhash, status] = await getTxnStatus(transactionHash);
        console.log("txhashshshs", txhash, status)
      });
  });
};

const depositPLIIntoInternalContract = ( accounts) => {
  let _amount;
  $("#depositAmount").on("change", (e) => {
    _amount = e.target.value;
    console.log("PLIAmountToDeposit", _amount)
  });
  let _caddr;
  $("#caddrDep").on("change", (e) => {
    _caddr = e.target.value;
    console.log("_caddr", _caddr)
  });
  $("#depositPLI").on("click", async (e) => {
    console.log("depositPLIIntoInternalContract", accounts[0])
    e.preventDefault();
    const internalInstance = await getInternalContract(web3,_caddr)
    console.log("internalInstance are ",internalInstance)
    const tokens = await convertTokens(_amount);
    console.log("tokkens are ", tokens)
    await internalInstance.methods.depositPLI(tokens)
      .send({ from: accounts[0], gas: 21000000 })
      .on("transactionHash", async function (transactionHash) {
        const [txhash, status] = await getTxnStatus(transactionHash);
        console.log("txhashshshs", txhash, status)
      });
  });
}

const setOracleFee = ( accounts) => {
  let _amount;
  $("#OracleFee").on("change", (e) => {
    _amount = e.target.value;
    console.log("OracleFee", _amount)
  });
  let _caddr;
  $("#caddrFee").on("change", (e) => {
    _caddr = e.target.value;
    console.log("caddrFee", _caddr)
  });
  $("#setOracleFee").on("click", async (e) => {
    console.log("set oracle fee to internal contract", accounts[0])
    e.preventDefault();
    const internalInstance = await getInternalContract(web3,_caddr)
    console.log("internalInstance are ",internalInstance)
    const tokens = await convertTokens(_amount);
    console.log("tokkens are ", tokens.toString());
    await internalInstance.methods.setOracleFee(tokens)
      .send({ from: accounts[0], gas: 21000000 })
      .on("transactionHash", async function (transactionHash) {
        const [txhash, status] = await getTxnStatus(transactionHash);
        console.log("txhashshshs", txhash, status)
      });
  });
}

async function nodeOperatorApp() {
  const web3 = await loadWeb3();
  console.log("Web3", web3);
  const accounts = await web3.eth.getAccounts();
  console.log("accounts", accounts);
  const tokencontract = await getTokenContract(web3); //token Contract
  console.log("tokencontract", tokencontract);
  approveInternalContractToTransfer(tokencontract,accounts);
  depositPLIIntoInternalContract(accounts);
  setOracleFee(accounts);
}

nodeOperatorApp();