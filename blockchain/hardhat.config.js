require('@nomiclabs/hardhat-waffle');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
// task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
//   const accounts = await hre.ethers.getSigners();

//   for (const account of accounts) {
//     console.log(account.address);
//   }
// });

module.exports = {
  solidity: '0.8.4',
  networks: {
    localhost: {
      url: 'HTTP://127.0.0.1:7545',
      from: '0x8a4C8185B8D32369Ebc707D688A2F9B5f462DB94',
    },
  },
};
