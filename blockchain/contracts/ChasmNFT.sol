//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0 <0.9.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ChasmNFT is ERC721URIStorage, Ownable {

    using Counters for Counters.Counter;

    event NftBought(address _seller, address _buyer, uint256 _price);

    Counters.Counter private _tokenIds;
    
    mapping(uint256 => uint256) public tokenIdToPrice;
    mapping(string => uint32) public nftCount;

    constructor() ERC721("Crypto Chasm","CHSM"){}

    function mint(address _recipient, string memory _ipfsHash, string memory _tokenURI) public onlyOwner returns (uint256){
        require(nftCount[_ipfsHash] != 1, "Can mint only 1 NFT of single artifact."); // only 1 NFT can be minted for the same ipfs hash
        nftCount[_ipfsHash] = 1;

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current(); 
        _safeMint(_recipient, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        return newItemId;

    }

    // The below function allows the owner of the Token to start its sale

    function startSale(uint256 _tokenId, uint256 _price) external {
        require(_price > 0, "Price cannot be zero");
        require(msg.sender == ownerOf(_tokenId), "Not the owner of this token.");
        tokenIdToPrice[_tokenId] = _price;
    }

    // The below function allows the owner of the Token to end its sale

    function stopSale(uint256 _tokenId) external {
        require(msg.sender == ownerOf(_tokenId), "Not the owner of this token.");
        tokenIdToPrice[_tokenId] = 0;
    }

    function buy(uint256 _tokenId) external payable {
        uint256 price = tokenIdToPrice[_tokenId];
        require(price > 0, "This token is not for sale.");
        require(msg.value == price, "Incorrect price value.");

        address seller = ownerOf(_tokenId);
        _transfer(seller, msg.sender, _tokenId);
        tokenIdToPrice[_tokenId] = 0; // not for sale anymore
        payable(seller).transfer(msg.value); // tranfer eth to seller

        emit NftBought(seller, msg.sender, msg.value);
    }

}
