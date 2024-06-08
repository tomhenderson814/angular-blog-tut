const SHA256 = require('crypto-js/sha256');
//const { start } = require('repl');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const { peopleDatabase } = require('./adapter.js');


class Transaction {
  /**
   * @param {string} fromAddress
   * @param {string} toAddress
   * @param {number} amount
   * @param {number} amountEnergy
   * @param {number} pricePerEnergy
   * @param {number} gasPrice
   * @param {TimeBasedEnergyTradeContract} contract
   */
  constructor(fromAddress, toAddress, amount, amountEnergy, pricePerEnergy, gasPrice, contract = null) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.amountEnergy = amountEnergy;
    this.pricePerEnergy = pricePerEnergy;
    this.gasPrice = gasPrice;
    this.contract = contract;
    this.timestamp = Date.now();
  }

  /**
   * Creates a SHA256 hash of the transaction
   *
   * @returns {string}
   */
  calculateHash() {
    return SHA256(this.fromAddress + this.toAddress + this.amount + this.amountEnergy + this.pricePerEnergy + this.gasPrice + this.contract + this.timestamp)
      .toString();
  }

  /**
   * Signs a transaction with the given signingKey (which is an Elliptic keypair
   * object that contains a private key). The signature is then stored inside the
   * transaction object and later stored on the blockchain.
   *
   * @param {string} signingKey
   */
  signTransaction(signingKey) {
    // You can only send a transaction from the wallet that is linked to your
    // key. So here we check if the fromAddress matches your publicKey
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      throw new Error('You cannot sign transactions for other wallets!');
    }
    

    // Calculate the hash of this transaction, sign it with the key
    // and store it inside the transaction obect
    const hashTx = this.calculateHash();
    const sig = signingKey.sign(hashTx, 'base64');

    this.signature = sig.toDER('hex');
  }

  /**
   * Checks if the signature is valid (transaction has not been tampered with).
   * It uses the fromAddress as the public key.
   *
   * @returns {boolean}
   */
  isValid() {
    // If the transaction doesn't have a from address we assume it's a
    // mining reward and that it's valid. You could verify this in a
    // different way (special field for instance)
    if (this.fromAddress === null) return true;

    if (!this.signature || this.signature.length === 0) {
      throw new Error('No signature in this transaction');
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature);
  }

  process() {
    if (this.contract) {
      this.contract.execute(this);
    }

    // Transfer the amount from the sender to the receiver...
  }


}

class Block {
  /**
   * @param {number} timestamp
   * @param {Transaction[]} transactions
   * @param {string} previousHash
   */
  constructor(timestamp, transactions, previousHash = '') {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.nonce = 0;
    this.hash = this.calculateHash();
    this.contracts = new Map();
  }

  /**
   * Returns the SHA256 of this block (by processing all the data stored
   * inside this block)
   *
   * @returns {string}
   */
  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  /**
   * Starts the mining process on the block. It changes the 'nonce' until the hash
   * of the block starts with enough zeros (= difficulty)
   *
   * @param {number} difficulty
   */
  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log(`Block mined: ${this.hash}`);
  }

  /**
   * Validates all the transactions inside this block (signature + hash) and
   * returns true if everything checks out. False if the block is invalid.
   *
   * @returns {boolean}
   */
  hasValidTransactions() {
    for (const tx of this.transactions) {
      if (!tx.isValid()) {
        return false;
      }
    }

    return true;
  }
}

class Blockchain {
  constructor(initialT, initialTB) {
    this.chain = [this.createGenesisBlock(initialT, initialTB)];
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;
    this.currentSD = []; //an array of each contract which is an object containing supply, demand and hash
    }

  /**
   * @returns {Block}
   */
  createGenesisBlock(initialTransactionA, initialTransactionB) {
    return new Block(Date.parse('2017-01-01'), [initialTransactionA, initialTransactionB], '0');
  }

  /**
   * Returns the latest block on our chain. Useful when you want to create a
   * new Block and you need the hash of the previous Block.
   *
   * @returns {Block[]}
   */
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Takes all the pending transactions, puts them in a Block and starts the
   * mining process. It also adds a transaction to send the mining reward to
   * the given address.
   *
   * @param {string} miningRewardAddress
   */
  minePendingTransactions(miningRewardAddress) {
    const rewardTx = new Transaction(null, miningRewardAddress, this.miningReward, 0, 0, 0, null);
    this.pendingTransactions.push(rewardTx);

    let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
    block.mineBlock(this.difficulty);

    console.log('Block successfully mined!');
    this.chain.push(block);

    this.pendingTransactions = [];

    for (const transaction of this.pendingTransactions) {
      if (transaction.contract) {
        const contractAddress = SHA256(transaction.fromAddress + transaction.contract.code + Date.now()).toString();
        this.getLatestBlock().contracts.set(contractAddress, transaction.contract);
      }
    }

  }

  /**
   * Add a new transaction to the list of pending transactions (to be added
   * next time the mining process starts). This verifies that the given
   * transaction is properly signed.
   *
   * @param {Transaction} transaction
   */
  addTransaction(transaction) {
    if (!transaction.fromAddress || !transaction.toAddress || transaction.fromAddress === "" || transaction.toAddress === "") {
      throw new Error('Transaction must include from and to address');
    }

    // Verify the transactiion
    if (!transaction.isValid()) {
      throw new Error('Cannot add invalid transaction to chain');
    }
    
    if (transaction.amount <= 0) {
      throw new Error('Transaction amount should be higher than 0');
    }

    // Check if the sender has enough balance to pay for the gas
    const senderBalance = this.getBalanceOfAddress(transaction.fromAddress);
    if (senderBalance < transaction.gasPrice + transaction.amount) {
      throw new Error('Not enough balance to pay for transaction gas and amount');
    }



    this.pendingTransactions.push(transaction);
  }

  /**
   * Returns the balance of a given wallet address.
   *
   * @param {string} address
   * @returns {number} The balance of the wallet
   */
  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
          balance -= trans.gasPrice;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  /**
   * Returns a list of all transactions that happened
   * to and from the given wallet address.
   *
   * @param  {string} address
   * @return {Transaction[]}
   */
  getAllTransactionsForWallet(address) {
    const txs = [];

    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.fromAddress === address || tx.toAddress === address) {
          txs.push(tx);
        }
      }
    }

    return txs;
  }

  /**
   * Loops over all the blocks in the chain and verify if they are properly
   * linked together and nobody has tampered with the hashes. By checking
   * the blocks it also verifies the (signed) transactions inside of them.
   *
   * @returns {boolean}
   */
  isChainValid() {
    // Check if the Genesis block hasn't been tampered with by comparing
    // the output of createGenesisBlock with the first block on our chain
    const realGenesis = JSON.stringify(this.createGenesisBlock());

    if (realGenesis !== JSON.stringify(this.chain[0])) {
      return false;
    }

    // Check the remaining blocks on the chain to see if there hashes and
    // signatures are correct
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];

      if (!currentBlock.hasValidTransactions()) {
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
    }

    return true;
  }
}


class SmartContract {
  constructor(code, state) {
    this.code = code;
    this.state = state;
  }

  execute(transactionData) {
    // The contract code is a function that takes the current state and a transaction,
    // and returns the new state.
    this.state = this.code(this.state, transactionData);
  }
}



class TimeBasedEnergyTradeContract {

  /**
    * @param {number} transactionTime
   * @param {number} conclusion
   */
   

  constructor(transactionTime, conclusion) {
    this.state = {
      energyTransferred: 0,
      totalCost: 0,
      tariff: 0.2
      };
    this.intervalId = null;
    this.transactionTime = transactionTime; //The time it takes to submit a transaction
    this.conclusion = conclusion; //The total duration of the contract
    this.startTimeTotal = Date.now();
    this.hash = this.calculateHash();
    // this.SDObject = {
    //   hash: this.hash,
    //   supply: getCurrentEnergyUsage(),
    //   demand: inputEnergyUsage(),
    // }
  }

  /**
   * Returns the SHA256 of this block (by processing all the data stored
   * inside this block)
   *
   * @returns {string}
   */
  calculateHash() {
    return SHA256(this.transactionTime + this.conclusion + this.startTimeTotal).toString();
  }

  activateContract(trans, blockc, signed){
    //this.blockchain.currentSD.push(this.hash);
    this.startEnergyTransfer(trans, blockc, signed);
   }

  startEnergyTransfer(transaction, blockchain, sign) {
    this.startTime = Date.now();
    //this.blockchain.currentSupplies.push(this.hash);
    

    // if (transaction.amount !== transaction.amountEnergy * this.state.tariff) {
    //   throw new Error('Transaction amount does not match the current tariff per energy unit');
    // }

    console.log(`Started transferring energy from ${transaction.fromAddress} to ${transaction.toAddress}`);

    this.intervalId = setInterval(() => {

      const currentEnergyUsage = this.getCurrentEnergyUsage();
      const cost = currentEnergyUsage * this.state.tariff;
      this.state.energyTransferred += currentEnergyUsage;
      this.state.totalCost += cost;
  
        console.log(`Transferred ${currentEnergyUsage} units of energy from ${transaction.fromAddress} to ${transaction.toAddress}`);
        console.log(`Charged ${cost} from ${transaction.fromAddress}`);
        console.log(this.state.totalCost);
  
      if (Date.now() - this.startTimeTotal >= this.conclusion) {
      //this.blockchain.currentContracts = this.blockchain.currentContracts.filter(contract => contract !== this.hash);
      this.stopEnergyTransfer(transaction, blockchain, sign);
      }
    
      // If five minutes have passed, stop the current energy transfer and start a new one
    else if (Date.now() - this.startTime >= this.transactionTime) {
      console.log(Date.now() - this.startTimeTotal);
      console.log(this.conclusion);
      this.startTime = Date.now()
      this.stopEnergyTransfer(transaction, blockchain, sign);
      this.startEnergyTransfer(transaction, blockchain, sign); }}, 1000); // check every second

  }


  getCurrentEnergyUsage() {
    return Math.random();
  }
  
  stopEnergyTransfer(transaction, blockchain, signing) {
    clearInterval(this.intervalId);
    console.log('Stopped transferring energy');

    // Create a new transaction with the total cost and energy transferred
    let finalTransaction = new Transaction(transaction.fromAddress, transaction.toAddress, this.state.totalCost, this.state.energyTransferred, this.state.tariff, 0, null);
    finalTransaction.signTransaction(signing)
    blockchain.addTransaction(finalTransaction);
    console.log(blockchain.pendingTransactions);
    this.startTime = Date.now();
    this.state.totalCost = 0;
    this.state.energyTransferred = 0;

  }
}

// this.dataBaseInstance = new peopleDatabase("Thomas", "Henderson", "Tom1", "Artie1");
//     let genesisTransaction = new Transaction(null, this.dataBaseInstance.alphaAccount.walletKeys[0].publicKey, 100000, 0, 0, 0, null);
//     let genTransaction = new Transaction(null, this.dataBaseInstance.alphaAccount.walletKeys[0].publicKey, 100000, 0, 0, 0, null);
//     this.blockchainInstance = new Blockchain(genesisTransaction, genTransaction);
//     this.blockchainInstance.difficulty = 4;
//     this.blockchainInstance.minePendingTransactions('hi');
//     this.dataBaseInstance.accountClass = [0, 0];
//     this.rank = this.dataBaseInstance.accountClass[0];
//     this.index = this.dataBaseInstance.accountClass[1];
    
//     this.dataBaseInstance.createBetaAccount("Will", "Freddy", "Will1", "Freddy1");
// let tomPub = this.dataBaseInstance.alphaAccount.walletKeys[0].publicKey;
// let willPub = this.dataBaseInstance.betaAccounts[0].walletKeys[0].publicKey;
// let tomSign = this.dataBaseInstance.alphaAccount.walletKeys[0].keyObj;

// let myContract = new TimeBasedEnergyTradeContract();
// myContract.transactionTime = (1/6) * 60 * 1000;;
// myContract.conclusion = 22*1000;
// let myTransaction = new Transaction(tomPub, willPub, 10, 50, 0.2, 0, myContract);
// console.log("TomPub: " + tomPub);
// console.log("willPub: " + willPub);
// console.log("tomsign: " + tomSign);
// myContract.startEnergyTransfer(myTransaction, this.blockchainInstance, tomSign);




module.exports.Blockchain = Blockchain;
module.exports.Block = Block;
module.exports.Transaction = Transaction;
module.exports.TimeBasedEnergyTradeContract = TimeBasedEnergyTradeContract;
