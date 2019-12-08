import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default function UserToken({ web3, contractInstance, users }) {
  const [addressInfo, setAddressInfo] = useState({
    address: "",
    totalToken: 0
  });

  useEffect(() => {
    const getData = async () => {
      // if at least one address bought a token then get item data
      if (users.length) {
        let totalToken = await getTotalToken(users[0]);
        setAddressInfo({
          address: users[0],
          totalToken: totalToken
        });
      }
    };

    if (web3) {
      getData();
    }
  }, [web3, contractInstance, users]);

  /**
   * get total token of given address
   * @{string} address - array containing all addresses
   */
  const getTotalToken = address => {
    return contractInstance.methods.balanceOf(address).call();
  };

  const handleChange = async event => {
    let value = event.target.value;
    let totalToken = await getTotalToken(value);
    setAddressInfo({
      address: value,
      totalToken: totalToken
    });
  };

  const { address, totalToken } = addressInfo;

  return (
    <React.Fragment>
      <FormControl>
        <InputLabel>address</InputLabel>
        <Select value={address} onChange={handleChange}>
          {users.map(address => (
            <MenuItem key={address} value={address}>
              {address}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <h3>Address {address}</h3>
      <h3>Total token: {totalToken}</h3>
    </React.Fragment>
  );
}
