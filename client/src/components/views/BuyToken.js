import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function UserToken({ web3, accounts, contractInstance }) {
  const [selectedAddress, setSelectedAddress] = useState("");
  const [name, setName] = useState("");
  const [uri, setUri] = useState("");

  useEffect(() => {
    const getData = async () => {
      if (accounts.length) {
        setSelectedAddress(accounts[0]);
      }
    };
    if (web3) {
      getData();
    }
  }, [web3, contractInstance, accounts]);

  // select handler
  const handleSelectChange = event => setSelectedAddress(event.target.value);

  // textfield 'name' handler
  const handleNameChange = event => setName(event.target.value);

  // textfield 'uri' handler
  const handleUriChange = event => setUri(event.target.value);
  //

  const handleClick = async () => {
    await contractInstance.methods.mint(name, uri).send({
      from: selectedAddress,
      value: web3.utils.toWei("0.1", "ether"),
      gas: 900000
    });
  };

  const allGood = name.length && uri.length;

  return (
    <React.Fragment>
      <FormControl>
        <InputLabel>address</InputLabel>
        <Select value={selectedAddress} onChange={handleSelectChange}>
          {accounts.map(address => (
            <MenuItem key={address} value={address}>
              {address}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <h3>Address {selectedAddress}</h3>
      <form autoComplete="off">
        <TextField
          required
          onChange={handleNameChange}
          value={name}
          label="name"
          margin="normal"
          helperText="enter a name"
        />
        <TextField
          required
          onChange={handleUriChange}
          value={uri}
          label="uri"
          margin="normal"
          helperText="enter an uri"
        />
      </form>
      {allGood ? (
        <h3 style={{ color: "red" }}>You will pay 0.1 ether</h3>
      ) : null}
      <Button
        variant="contained"
        disabled={allGood ? false : true}
        onClick={handleClick}
      >
        buy token
      </Button>
    </React.Fragment>
  );
}
