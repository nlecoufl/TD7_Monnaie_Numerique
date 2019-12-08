import React, { useState, useEffect } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

export default function Home({ web3, contractInstance, counter }) {
  const [data, setData] = useState({
    tokenName: "",
    tokenCounter: 0,
    chainId: 0,
    lastBlockNumber: 0
  });

  // watcher for web3/contract state
  useEffect(() => {
    const getData = async () => {
      // get blockchain data
      let chainId = await web3.eth.getChainId();
      let lastBlockNumber = await web3.eth.getBlockNumber();
      // get contract data
      let tokenName = await contractInstance.methods.getName().call();
      // Update state with results
      setData({
        tokenName: tokenName,
        tokenCounter: counter,
        chainId: chainId,
        lastBlockNumber: lastBlockNumber
      });
    };

    if (web3) {
      getData();
    }
  }, [web3, contractInstance, counter]);

  return (
    <React.Fragment>
      <h1>ERC721 Contract Info</h1>
      <List>
        {Object.keys(data).map(key => (
          <ListItem key={key}>
            <ListItemText>
              {key}: {data[key]}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}
