//SPDX-License-Identifier: Unlicense
pragma solidity >=0.5.0 <0.9.0;

import "@opengsn/contracts/src/BaseRelayRecipient.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ChasmNFT is BaseRelayRecipient, ERC721URIStorage, Ownable {

    constructor(address _forwarder) ERC721("Crypto Chasm","CHSM") {
        _setTrustedForwarder(_forwarder);
    }

    string public override versionRecipient = "2.2.0";

    function _msgSender() internal view override (Context,BaseRelayRecipient) returns (address) {
        return BaseRelayRecipient._msgSender();
    }

    function _msgData() internal view override (Context, BaseRelayRecipient)returns (bytes memory) {
        return BaseRelayRecipient._msgData();
    }

    using Counters for Counters.Counter;

    event NftBought(address _seller, address _buyer, uint256 _price);
    event AmountWithdrawn(address _drawer, uint256 _amount);
    event Minted(address _recipient, string _tokenURI, uint256 newItemId);
    event SaleStarted(uint256 _tokenId, uint256 _price);
    event SaleEnded(uint256 _tokenId);

    Counters.Counter private _tokenIds;
    address public contractOwner;
    
    mapping(uint256 => uint256) public tokenIdToPrice;
    mapping(string => uint256) public nftCount; 

    // The below function allows the owner of the Token to mint an NFT

    function mint(address _recipient, string memory _ipfsHash, string memory _tokenURI) public onlyOwner returns (uint256){
        require(nftCount[_ipfsHash] != 1, "Can mint only 1 NFT of single artifact."); // only 1 NFT can be minted for the same ipfs hash
        nftCount[_ipfsHash] = 1;
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current(); 
        _safeMint(_recipient, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        //tokenIdToCreator[newItemId] = msg.sender;
        emit Minted(_recipient, _tokenURI, newItemId);
        return newItemId;
    }

    // The below function allows the owner of the Token to start its sale

    function startSale(uint256 _tokenId, uint256 _price) external {
        require(_price > 0, "Price cannot be zero");
        require(_msgSender() == ownerOf(_tokenId), "Not the owner of this token.");
        tokenIdToPrice[_tokenId] = _price;
        emit SaleStarted(_tokenId, _price);
    }   

    // The below function allows the owner of the Token to end its sale

    function stopSale(uint256 _tokenId) external {
        require(_msgSender() == ownerOf(_tokenId), "Not the owner of this token.");
        tokenIdToPrice[_tokenId] = 0;
        emit SaleEnded(_tokenId);
    }

    // The below functionn allows users to buy NFTs

    function buy(uint256 _tokenId, address _nftCreator, uint256 _royalty, uint256 _compensationFee) external payable {
        uint256 price = tokenIdToPrice[_tokenId];
        require(price > 0, "This token is not for sale.");
        require(msg.value == price, "Incorrect price value.");

        address seller = ownerOf(_tokenId);
        _transfer(seller, _msgSender(), _tokenId);
        tokenIdToPrice[_tokenId] = 0; // not for sale anymore


        payable(_nftCreator).transfer(_royalty); // tranfer the royalty to the original owner of the nft
        payable(seller).transfer(msg.value - (_royalty + _compensationFee)); // tranfer eth to seller

        emit NftBought(seller, _msgSender(), msg.value);
        emit SaleEnded(_tokenId);
    }

    // The below function tranfers amount from the money held by the contract to the owner's wallet

    function withdraw(uint256 _amount) external payable onlyOwner{
        require(address(this).balance >= _amount, "Insufficient balance.");
        payable(contractOwner).transfer(_amount);
        emit AmountWithdrawn(contractOwner, _amount);
    }

}

