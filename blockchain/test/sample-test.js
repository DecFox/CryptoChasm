const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Token Contract', () => {
  let owner, Token, deployedToken, addr1, addr2, addr3;

  beforeEach(async () => {
    [owner, addr1, addr2, ...addr] = await ethers.getSigners();
    Token = await ethers.getContractFactory('ChasmNFT');
    deployedToken = await Token.deploy();
  });

  describe('Deployment', () => {
    it('Should set the contractOwner correctly', async () => {
      expect(await deployedToken.contractOwner()).to.equal(owner.address);
    });
  });

  describe('Minting NFT', async () => {
    it('NFT cannot be minted other than the owner', async () => {
      await expect(
        deployedToken.connect(addr1).mint(addr1.address, 'a', 'b')
      ).to.be.revertedWith('Ownable: caller is not the owner');
    });

    it('Should not mint the token with same hash twice', async () => {
      const tokenId = await deployedToken.mint(addr1.address, 'a', 'b');
      expect(tokenId.value.toNumber()).to.equal(0);
      const tokenId1 = await deployedToken.mint(addr1.address, 'c', 'd');
      // expect(tokenId.value.toNumber()).to.equal(1);
      // const own = await deployedToken.ownerOf(tokenId1);
      console.log(token);

      console.log(tokenId1.value.toNumber());
      console.log(tokenId.value.toNumber());
      await expect(
        deployedToken.mint(addr1.address, 'a', 'b')
      ).to.be.revertedWith('Can mint only 1 NFT of single artifact.');
    });
  });

  // describe('Start and Stop sale', () => {
  //   let tokenId;
  //   before(async () => {
  //     tokenId = await deployedToken.mint(addr1.address, 'c', 'd');
  //   });
  //   it('Start sale', async () => {
  //     await deployedToken.startSale(
  //       tokenId.value.toNumber(),
  //       ethers.utils.parseEther('10')
  //     );
  //     deployedToken.on('SaleStarted', (_tokenId, _price) => {
  //       console.log(_price);
  //     });

  //     console.log(tokenId.value.toNumber());
  //   });
  // });
});
