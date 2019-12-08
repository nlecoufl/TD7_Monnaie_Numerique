pragma solidity >=0.4.21 <0.6.0;

import './ERC721/ERC721.sol';

contract Token is ERC721 {
  event Mint(address indexed owner, uint256 indexed tokenId);

  // ERC721 name
  string private _name;
  // total number of token
  uint256 private _counter;

  // mapping from tokenId to Item object
  mapping(uint256 => Item) private _idToItem;

  struct Item {
    address owner;
    string name;
    string uri;
  }

  constructor(string memory name) public {
    _name = name;
    _counter = 0;
  }

  /**
   * get ERC721 name
   */
  function getName() public view returns (string memory) {
    return _name;
  }

  /**
   * get total number of token
   */
  function getCounter() public view returns (uint256) {
    return _counter;
  }

  /**
   * get item data by id
   */
  function getItem(uint256 tokenId) public view returns (address, string memory, string memory) {
    require(_exists(tokenId), 'Token: token does not exist');
    Item memory item = _idToItem[tokenId];
    return (item.owner, item.name, item.uri);
  }

  /**
   * mint new item/token by paying 0.1 ether
   */
  function mint(string memory name, string memory uri) public payable  {
    require(msg.value == 0.1 ether, 'Token: mint() not right amount, need 0.1 ETH');
    _mint(_msgSender(), _counter);
    _createItem(_msgSender(), name, uri);
    _counter++;

    emit Mint(_msgSender(), _counter - 1);
  }

  /**
   * create item
   */
  function _createItem(address to, string memory name, string memory uri) private {
    _idToItem[_counter] = Item(to, name, uri);
  }

  function() external payable {}
}

