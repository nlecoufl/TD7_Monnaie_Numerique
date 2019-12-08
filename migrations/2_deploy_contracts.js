const Token = artifacts.require("./Token.sol");

let tokenName = "Test";

let name1 = "dog";
let uri1 = "https://imgur.com/gallery/i78hv1I";

let name2 = "cats";
let uri2 = "https://imgur.com/gallery/nrT50Wo";

module.exports = (deployer, _, accounts) => {
  deployer.deploy(Token, tokenName).then(TokenInstance => {
    TokenInstance.mint(name1, uri1, {
      value: "100000000000000000"
    });
    TokenInstance.mint(name2, uri2, {
      from: accounts[1],
      value: "100000000000000000"
    });
  });
};
