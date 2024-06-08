const EC = require('elliptic').ec;
const ec = new EC('secp256k1');



class Account {
    
   /**
    * @param {string} firstName
   * @param {string} lastName
   * @param {string} username
   * @param {string} password
   */
   //@param {IWalletKey[]} walletKeys
 
   constructor(firstName, lastName, username, password) {
     this.firstName = firstName;
     this.lastName = lastName;
     this.username = username;
     this.password = password;
     this.walletKeys = [];

    //  this.walletKeys.publicK = '';
    //  this.walletKeys.privateK = '';
    //  this.walletKeys.obj;
   }
   generateKeys() {
    const key = ec.genKeyPair();
    const walletKey = new IWalletKey(key, key.getPublic('hex'), key.getPrivate('hex'));
    this.walletKeys.push(walletKey);
    }
 
}

class peopleDatabase {
   /**
   * @param {string} first
   * @param {string} last
   * @param {string} user
   * @param {string} pass
   */
    constructor(first, last, user, pass){
        
        this.alphaAccount = new Account(first, last, user, pass);
        this.alphaAccount.generateKeys();
        this.betaAccounts = [];
        this.gammaAccounts = [];
        this.accountClass = [0, 0];
        this.primeAccount = null;
        
        this.emptyAccount = new Account();
        this.emptyAccount.firstName = "";
        this.emptyAccount.lastName = "";
        this.emptyAccount.username = "";
        this.emptyAccount.password = "";
        this.emptyAccount.walletKeys.push(new IWalletKey(null, "", ""));
        
        }

    createBetaAccount(firstName, lastName, username, password){

        let newAcc = new Account(firstName, lastName, username, password);
        newAcc.userIndex = this.betaAccounts.length;
        newAcc.generateKeys();
        this.betaAccounts.push(newAcc);
    }

    createGammaAccount(firstName, lastName, username, password){

        let newAcc = new Account(firstName, lastName, username, password);
        newAcc.userIndex = this.gammaAccounts.length;
        newAcc.generateKeys();
        this.gammaAccounts.push(newAcc);
    }

    whatRankAccount(username, password) {
        if (this.alphaAccount.username === username && this.alphaAccount.password === password) {
            this.primeAccount = this.loggedIn(1, 0);
            return [1, 0]; // Alpha
        }
        for (let i = 0; i < this.betaAccounts.length; i++) {
            if (this.betaAccounts[i].username === username && this.betaAccounts[i].password === password) {
                this.primeAccount = this.loggedIn(2, i);
                return [2, i]; // Beta
            }
        }
        for (let i = 0; i < this.gammaAccounts.length; i++) {
            if (this.gammaAccounts[i].username === username && this.gammaAccounts[i].password === password) {
                this.primeAccount = this.loggedIn(3, i);
                return [3, i]; // Gamma
            }
        }

        return [0, 0]; // Account not found or password incorrect
    }
    
    doesUsernameExist(username) {
        if (this.alphaAccount.username === username) {
            return true;
        }

        for (let i = 0; i < this.betaAccounts.length; i++) {
            if (this.betaAccounts[i].username === username) {
                return true;
            }
        }

        for (let i = 0; i < this.gammaAccounts.length; i++) {
            if (this.gammaAccounts[i].username === username) {
                return true;
            }
        }

        return false; // Username not found
    }

    loggedIn(rankIndex, userNumber){
        if (rankIndex === 1){
        return this.alphaAccount;
        }
        else if (rankIndex === 2){
            return this.betaAccounts[userNumber];
        }
        else if (rankIndex === 3){
            return this.gammaAccounts[userNumber];
        }
        else if (rankIndex === 0) {

            return this.emptyAccount;
        }
        }

}

class IWalletKey {
    /**
   * @param {any} keyObj
   * @param {string} publicKey
   * @param {string} privateKey
   */
    constructor(keyObj, publicKey, privateKey) {
      this.keyObj = keyObj;
      this.publicKey = publicKey;
      this.privateKey = privateKey;
    }
  }



module.exports.peopleDatabase = peopleDatabase;
//module.exports.IWalletKey = IWalletKey;