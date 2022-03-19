const hre = require('hardhat');

async function main() {
  // We get the contract to deploy
  const ChasmNFT = await hre.ethers.getContractFactory('ChasmNFT');
  const chasmNFT = await ChasmNFT.deploy(
    '0xd8735997ec01b6Fb2F9B05BbDa0f42a81141521A'
  );

  const Paymaster = await hre.ethers.getContractFactory('Paymaster');
  const pm = await Paymaster.deploy();

  await chasmNFT.deployed();
  await pm.deployed();

  console.log('Chasm NFT deployed to:', chasmNFT.address);
  console.log('Paymaster deployed to:', pm.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
