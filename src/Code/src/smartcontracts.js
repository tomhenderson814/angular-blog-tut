import { peopleDatabase } from './adapter.js';
import { Blockchain, Transaction, Block, TimeBasedEnergyTradeContract } from './blockchain.js';


function transferContract(state, transaction) {
    // Check if the sender has enough balance
    if (state[transaction.fromAddress] < transaction.amount) {
      throw new Error('Insufficient balance');
    }
  
    // Deduct the amount from the sender's balance
    state[transaction.fromAddress] -= transaction.amount;
  
    // Add the amount to the receiver's balance
    if (!state[transaction.toAddress]) {
      state[transaction.toAddress] = 0;
    }
    state[transaction.toAddress] += transaction.amount;
  
    return state;
}
  
  // let initialState = {
  //   'address1': 100,
  //   'address2': 50,
  //   'address3': 200
  // };
  
  
  
  
  // Define the contract function
function energyTransferContractBulk(state, transaction) {
    // Calculate the energy used and the cost
    const energyUsed = transaction.amount; // in kWh
    const time = transaction.time; // in minutes
    const cost = chargeRate * energyUsed * time;//kWh/minute * 10kWh * 1 minute
    const earnings = earnRate * time;
  
    // Check if the receiver (buyer) has enough balance
    if (state[transaction.fromAddress] < cost) {
      throw new Error('Insufficient balance');
    }
  
    // Deduct the cost from the receiver's (buyer's) balance
    state[transaction.fromAddress] -= cost;
  
    // Add the earnings to the sender's (seller's) balance
    if (!state[transaction.toAddress]) {
      state[transaction.toAddress] = 0;
    }
    state[transaction.toAddress] += earnings;
  
    return state;
}
  
  // Execute the contract
  // try {
  //   state = energyTransferContractBulk(state, transaction);
  //   console.log('Transaction processed successfully');
  //   console.log('Updated state:', state);
  // } catch (error) {
  //   console.error('Error processing transaction:', error.message);
  // }
  
  
  // Define the contract function
function energyTransferContractSecond(state, transaction) {
  
    const energyOutputCapacity = outputCapacity(); // in kWh
  
    // Calculate the energy used and the cost
    const moneySent = chargeRate * energyOutputCapacity; // cost/kWh * kWh (cost in cents to the receiver) - $/(kWh * min) * kWh * 1 min
    const energySent = energyOutputCapacity; // energy sent by the seller
  
   
   
    // Check if the buyer has enough balance
    if (state[transaction.fromAddress].money < moneySent) {
      throw new Error('Insufficient balance');
    }
  
    // Deduct the cost from the buyer's balance
    state[transaction.fromAddress].money -= moneySent;
    state[transaction.fromAddress].energy += energySent;
  
    // Add the earnings to the seller's balance
    if (!state[transaction.toAddress]) {
      state[transaction.toAddress] = {money: 0, energy: 0};
    }
    state[transaction.toAddress].money += moneySent;
    state[transaction.toAddress].energy -= energySent;
  
    return state;
}
  
  // Define the initial state
  let state = {
    'address1': {money: 1000, energy: 0}, // buyer's balance in $cents and energy in kWh
    'address2': {money: 0, energy: 100}, // seller's balance in $cents and energy in kWh
    'address3': {money: 0}
  };
  
  // Define the initial rates
  let chargeRate = 10; // $cents/second rate
 
  // Define the transaction
  let transaction = {
    fromAddress: 'address1', // buyer
    toAddress: 'address2', // seller
    toBlockchain: 'address3',
    amount: 10, // energy in kWh
    time: 60 // duration in seconds
  };
  
  // Hypothetical function to get the energy status from the grid provider
  function getEnergyStatus() {
    // This function should return true if the energy supply is consistent
    // and above a certain threshold, and false otherwise.
    // In this example, it's just a placeholder.
    return true;
  }
  function outputCapacity(){
    return 4; //kWh per minute
  }
  let totalAmount = 0;
  
  function processTransaction() {
    try {
      // Check the energy status
      if (!getEnergyStatus()) {
        console.log('Energy supply is not consistent. Pausing transactions...');
        return;
      }
  
      // Update the rates
      chargeRate = 10/* new charge rate */; //blockchainInstance.exchangeRate.now()
  
      totalAmount = totalAmount + outputCapacity();
  
      // Execute the contract
      state = energyTransferContractSecond(state, transaction);
      console.log('Transaction processed successfully');
      console.log('Updated state:', state);
  
      // Check if the total amount has reached the transaction amount
      if (totalAmount < transaction.amount) {
        // If not, schedule the next transaction
        setTimeout(processTransaction, 60 * 1000); // 60 * 1000 milliseconds = 1 minute
      }
    } catch (error) {
      console.error('Error processing transaction:', error.message);
    }
  }
  
  // Start the first transaction
  processTransaction();
  
  
  
  // const contract = new SmartContract(transferContract, initialState);
  // const fromAddress = 'address1';
  // const toAddress = 'address2';
  // const amount = 20;
  // const transaction = new Transaction(fromAddress, toAddress, amount, 0, contract);
  // console.log(transaction);
  // transaction.process();
  // console.log(transaction);


  function calculateExchangeRate(supply, demand) {
    
    // Ensure supply is not zero to avoid division by zero error
    if (supply === 0) {
      throw new Error('Supply cannot be zero');
    }

    return demand / supply;
  }



  // Hypothetical function to get the energy status from the grid provider
  function getEnergyStatus() {
    // This function should return true if the energy supply is consistent
    // and above a certain threshold, and false otherwise.
    // In this example, it's just a placeholder.
    return true;
  }
  function outputCapacity(){
    return 4; //kWh per minute
  }









  
let base = new peopleDatabase("Tom", "Hendo", "Tom1", "Hendo1");
base.createBetaAccount("Will", "Freddy", "Will1", "Freddy1");
let tomPub = base.alphaAccount.walletKeys[0].publicKey;
let willPub = base.betaAccounts.walletKeys[0].publicKey;
let tomSign = base.alphaAccount.walletKeys[0].keyObj;
let genesisTransaction = new Transaction(null, tomPub, 100000, 0, 0, 0, null);
    let genTransaction = new Transaction(null, tomPub, 100000, 0, 0, 0, null);
    let blockchainInstance = new Blockchain(genesisTransaction, genTransaction);
    blockchainInstance.difficulty = 3;
    blockchainInstance.minePendingTransactions('hi');

// Then, when creating a Transaction, you can include a new instance of the SmartContract
let myContract = new TimeBasedEnergyTradeContract();
let myTransaction = new Transaction(tomPub, willPub, 10, 50, 0.2, 0, myContract);

myContract.startEnergyTransfer(myTransaction, blockchainInstance);
setTimeout(() => {
  myContract.stopEnergyTransfer(myTransaction, blockchainInstance, tomSign);
}, 15 * 60 * 1000); // stop after 15 minutes

