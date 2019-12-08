import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function DisplayToken({ web3, contractInstance, counter }) {
  const [selectedId, setSelectedId] = useState(0);
  const [tokenIds, setTokenIds] = useState([]);
  const [tokenInfo, setTokenInfo] = useState({
    owner: "",
    name: "",
    uri: ""
  });

  useEffect(() => {
    const getData = async () => {
      // get array of all token Ids (since we index token Ids with counter)
      let tokenIds = getTokenIds(counter);
      // if there are any item then get first token data
      let itemInfo = counter ? await getTokenInfo(0) : tokenInfo;
      // set state
      setTokenIds(tokenIds);
      setTokenInfo(itemInfo);
    };

    if (web3) {
      getData();
    }
  }, [web3, contractInstance, counter]);

  const getTokenIds = totalToken => [...Array(Number(totalToken)).keys()];

  const getTokenInfo = async id => {
    let item = await contractInstance.methods.getItem(id).call();
    return {
      owner: item[0],
      name: item[1],
      uri: item[2]
    };
  };

  const handleChange = async event => {
    let value = event.target.value;
    let item = await getTokenInfo(value);
    setSelectedId(value);
    setTokenInfo(item);
  };

  return (
    <React.Fragment>
      <h1>Total Token: {tokenIds.length}</h1>
      <FormControl>
        <InputLabel>id</InputLabel>
        <Select value={selectedId} onChange={handleChange}>
          {tokenIds.map(tokenId => (
            <MenuItem key={tokenId} value={tokenId}>
              {tokenId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <h3>owner: {tokenInfo.owner}</h3>
      <h3>name: {tokenInfo.name}</h3>
      <h3>
        uri:{" "}
        <a href={tokenInfo.uri} target="_blank" rel="noopener noreferrer">
          {tokenInfo.uri}
        </a>
      </h3>
    </React.Fragment>
  );
}
