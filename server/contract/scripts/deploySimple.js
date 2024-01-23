// scripts/deploy.js
const { ethers } = require('hardhat');
async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    const simpleStorage = await SimpleStorage.deploy(0, {
        gasLimit: 30000000,
    });

    console.log("SimpleStorage address:", simpleStorage.target);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
