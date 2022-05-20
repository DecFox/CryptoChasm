const hre = require('hardhat');
const { parseEther } = require('ethers/lib/utils');
const provider = waffle.provider;

const address = {
  relayHubAddress: '0x3D29d2AB7B1319C1CD54dB4e689f142Cf4DF2169',
  payMasterAddress: '0x82E1087fAcF1a4f6110cB6656c5F3E29B8850FAA',
};

const fund = async () => {
  const chainId = hre.network.config.chainId;
  const [admin] = await ethers.getSigners();

  const RelayHub = await hre.ethers.getContractFactory('RelayHub');
  const relayHub = await RelayHub.attach(address.relayHubAddress);

  const tx = await relayHub.depositFor(address.payMasterAddress, {
    value: parseEther('1'),
  });
  await tx.wait();

  console.log(
    'PayMaster balance:',
    await relayHub.balanceOf(address.payMasterAddress)
  );
  console.log('Admin wallet balance', await provider.getBalance(admin.address));
};

async function main() {
  await hre.run('compile');

  await fund();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// Chasm NFT deployed to: 0xed0B5F89e6C1d41625000d0131fE6EdFa9c41BeD
// Paymaster deployed to: 0x82E1087fAcF1a4f6110cB6656c5F3E29B8850FAA
