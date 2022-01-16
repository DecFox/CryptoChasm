
const hre = require("hardhat");

async function main() {
  
  // We get the contract to deploy
  const ChasmNFT = await hre.ethers.getContractFactory("ChasmNFT");
  const chasmNFT = await ChasmNFT.deploy();

  await chasmNFT.deployed();

  console.log("Chasm NFT deployed to:", chasmNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
