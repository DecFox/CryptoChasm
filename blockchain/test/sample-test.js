const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('Token Contract', () => {
  let owner, Token, deployedToken, addr1, addr2, addr3;

  before(async () => {
    [owner, addr1, addr2, addr3, ...addr] = await ethers.getSigners();
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
      await expect(
        deployedToken.mint(addr1.address, 'a', 'b')
      ).to.be.revertedWith('Can mint only 1 NFT of single artifact.');
    });

    it('Minting should set the token IDs, recipient and tokenURI correctly', async () => {
      const tx = await deployedToken.mint(addr1.address, 'p', 'q');
      const res = await tx.wait();
      const event = res.events.find((event) => event.event === 'Minted');
      expect(event.args.newItemId.toNumber()).to.equal(2);
      expect(event.args._recipient).to.equal(addr1.address);
      expect(event.args._tokenURI).to.equal('q');

      const tx2 = await deployedToken.mint(addr1.address, 'c', 'd');
      const res2 = await tx2.wait();
      const event2 = res2.events.find((event) => event.event === 'Minted');
      expect(event2.args.newItemId.toNumber()).to.equal(3);
      expect(event2.args._recipient).to.equal(addr1.address);
      expect(event2.args._tokenURI).to.equal('d');
    });
  });

  describe('Start and Stop sale', () => {
    let tokenId;
    before(async () => {
      const tx = await deployedToken.mint(addr1.address, 'e', 'f');
      const res = await tx.wait();
      const event = res.events.find((event) => event.event === 'Minted');
      tokenId = event.args.newItemId.toNumber();
    });

    it('Price of the token cannot be Zero', async () => {
      await expect(
        deployedToken
          .connect(addr1)
          .startSale(tokenId, ethers.utils.parseEther('0'))
      ).to.be.revertedWith('Price cannot be zero');
    });

    it('Sale cannot be started by anyone other than the owner', async () => {
      await expect(
        deployedToken
          .connect(addr2)
          .startSale(tokenId, ethers.utils.parseEther('10'))
      ).to.be.revertedWith('Not the owner of this token.');
    });

    it('Set the price of the token correctly', async () => {
      const tx = await deployedToken
        .connect(addr1)
        .startSale(tokenId, ethers.utils.parseEther('10'));
      const res = await tx.wait();
      const event = res.events.find((event) => event.event === 'SaleStarted');

      const price = await deployedToken.tokenIdToPrice(tokenId);
      expect(ethers.utils.formatEther(event.args._price.toString())).to.equal(
        ethers.utils.formatEther(price.toString())
      );
    });

    it('Sale cannot be stopped by anyone other than the owner', async () => {
      await expect(deployedToken.stopSale(tokenId)).to.be.revertedWith(
        'Not the owner of this token.'
      );
    });

    it('Stopping the sale should set the price to 0', async () => {
      const tx = await deployedToken.connect(addr1).stopSale(tokenId);
      const price = await deployedToken.tokenIdToPrice(tokenId);
      expect(price.toNumber()).to.equal(0);
    });
  });

  describe('Buy NFT', () => {
    let tokenId = 4;
    const price = ethers.utils.parseEther('10');
    const res = price.toString();
    const royalty = (+res * 10) / 100;
    const compensation = (+res * 2.5) / 100;

    before(async () => {
      await deployedToken
        .connect(addr1)
        .startSale(tokenId, ethers.utils.parseEther('10'));
    });

    it('Not for sale NFTs cannot be bought', async () => {
      await expect(
        deployedToken
          .connect(addr2)
          .buy(2, addr1.address, BigInt(royalty), BigInt(compensation), {
            value: price,
            from: addr2.address,
          })
      ).to.be.revertedWith('This token is not for sale.');
    });

    it('Amount of ether sent should be equal to the price of the NFT', async () => {
      await expect(
        deployedToken
          .connect(addr2)
          .buy(tokenId, addr1.address, BigInt(royalty), BigInt(compensation), {
            value: ethers.utils.parseEther('8'),
            from: addr2.address,
          })
      ).to.be.revertedWith('Incorrect price value.');
    });

    describe('Buying directly from the NFT creator, ', async () => {
      let bal, sellerBal, buyerBal;
      before(async () => {
        bal = await deployedToken.contractBalance();
        sellerBal = await addr1.getBalance();
        buyerBal = await addr2.getBalance();

        const tx = await deployedToken
          .connect(addr2)
          .buy(tokenId, addr1.address, BigInt(royalty), BigInt(compensation), {
            value: price,
            from: addr2.address,
          });
        const response = await tx.wait();
        const eventSaleEnded = response.events.find(
          (event) => event.event === 'SaleEnded'
        );
        const eventNftBought = response.events.find(
          (event) => event.event === 'NftBought'
        );
      });

      it('Owner of token should be changed', async () => {
        expect(await deployedToken.ownerOf(tokenId)).to.equal(addr2.address);
      });

      it('Price of the token should be set to 0', async () => {
        const priceAfterBought = await deployedToken.tokenIdToPrice(tokenId);
        expect(priceAfterBought.toNumber()).to.equal(0);
      });

      it('Compensation fee should be set correctly in the contract balance', async () => {
        const newBal = await deployedToken.contractBalance();
        expect(BigInt(newBal) - BigInt(bal)).to.equal(BigInt(compensation));
      });

      it('Balance of the seller is increased correctly and balance of the buyer is decreased correctly', async () => {
        const newSellerBal = await addr1.getBalance();
        const newBuyerBal = await addr2.getBalance();
        expect(BigInt(newSellerBal)).to.equal(
          BigInt(sellerBal) + (BigInt(price) - BigInt(compensation))
        );

        //expect(BigInt(newBuyerBal)).to.equal(BigInt(buyerBal) - BigInt(price));
      });
    });

    describe('Buying from someone else other than the creator', () => {
      before(async () => {
        bal = await deployedToken.contractBalance();
        sellerBal = await addr2.getBalance();
        buyerBal = await addr3.getBalance();

        await deployedToken.connect(addr2).startSale(tokenId, price);

        const tx = await deployedToken
          .connect(addr3)
          .buy(tokenId, addr1.address, BigInt(royalty), BigInt(compensation), {
            value: price,
            from: addr3.address,
          });
        const response = await tx.wait();
        const eventSaleEnded = response.events.find(
          (event) => event.event === 'SaleEnded'
        );
        const eventNftBought = response.events.find(
          (event) => event.event === 'NftBought'
        );
      });
      it('Compensation fee should be set correctly in the contract balance', async () => {
        const newBal = await deployedToken.contractBalance();
        expect(BigInt(newBal) - BigInt(bal)).to.equal(BigInt(compensation));
      });

      it('Balance of the seller is increased correctly and balance of the buyer is decreased correctly', async () => {
        const newSellerBal = await addr2.getBalance();
        const newBuyerBal = await addr3.getBalance();
        expect(BigInt(newSellerBal)).to.equal(
          BigInt(sellerBal) + (BigInt(price) - BigInt(compensation))
        );

        //expect(BigInt(newBuyerBal)).to.equal(BigInt(buyerBal) - BigInt(price));
      });
    });
  });
});
