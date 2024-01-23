const fs = require('fs');

const Web3 = require('web3');
const web3 = new Web3.Web3('http://127.0.0.1:8545');

const contractName = 'SimpleStorage';
const artifactPath = `./artifacts/contracts/${contractName}.sol/${contractName}.json`;

const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
const contractABI = artifact.abi;
//console.log(JSON.stringify(contractABI, null, 2));
const contractAddress = '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'; // Deployed contract address

const myContract = new web3.eth.Contract(contractABI, contractAddress);

async function readContractData() {
    try {
        // Read the initial value
        let result = await myContract.methods.get().call();
        console.log("Initial contract method output:", Number(result));

        // Send a transaction to change the state
        await myContract.methods.set(600).send({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' });

        // Read the updated value
        result = await myContract.methods.get().call();
        console.log("Updated contract method output:", Number(result))
    } catch (error) {
        console.error(`Error interacting with the contract: ${error.message}`);
    }
}


readContractData();
