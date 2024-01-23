const fs = require('fs');

const Web3 = require('web3');
const web3 = new Web3.Web3('http://127.0.0.1:8545');

const contractName = 'SimpleStorage';
const artifactPath = `./contract/artifacts/contracts/${contractName}.sol/${contractName}.json`;
//const artifactPath = `./artifacts/contracts/${contractName}.sol/${contractName}.json`;

const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
const contractABI = artifact.abi;
//console.log(JSON.stringify(contractABI, null, 2));
const contractAddress = '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9'; // Deployed contract address

const myContract = new web3.eth.Contract(contractABI, contractAddress);

async function readContractData(req, res) {
    try {
        // Read the initial value
        let initialResult = await myContract.methods.get().call();
        console.log("Initial contract method output:", Number(initialResult));

        // Send a transaction to change the state
        await myContract.methods.set(Number(initialResult) + 100).send({ from: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' });

        // Read the updated value
        let result = await myContract.methods.get().call();
        console.log("Updated contract method output:", Number(result))
        res.json({
            initialResult: Number(initialResult),
            updatedResult: Number(result)
        });
    } catch (error) {
        console.error(`Error interacting with the contract: ${error.message}`);
        res.status(500).send(`Error interacting with the contract: ${error.message}`);
    }
}


//readContractData();
module.exports = { readContractData };
