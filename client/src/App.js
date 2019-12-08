import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TokenContract from "./contracts/Token.json";
import getWeb3 from "./getWeb3";
import { Layout } from "./components/layout/Layout";
import Home from "./components/views/Home";
import DisplayToken from "./components/views/DisplayToken";
import UserToken from "./components/views/UserToken";
import BuyToken from "./components/views/BuyToken";
import ErrorPage from "./components/misc/ErrorPage";

export default function App() {
  const [state, setState] = useState({
    web3: null,
    accounts: [],
    contractInstance: null,
    counter: 0,
    users: []
  });

  useEffect(() => {
    const init = async () => {
      try {
        // get network provider and web3 instance
        const web3 = await getWeb3();
        // get accounts
        const accounts = await web3.eth.getAccounts();
        // get contract instance
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = TokenContract.networks[networkId];
        const contractInstance = new web3.eth.Contract(
          TokenContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        // get total token
        const counter = await contractInstance.methods.getCounter().call();
        // get all addresses that have bought one of our token
        const allAddresses = await getAllAddresses(contractInstance, counter);
        // remove duplicates
        const users = removeDuplicate(allAddresses);
        // set contract state
        setState({
          web3: web3,
          accounts: accounts,
          contractInstance: contractInstance,
          counter: counter,
          users: users
        });
      } catch (error) {
        alert("Failed to load web3, accounts or contract");
      }
    };

    const removeDuplicate = arr => [...new Set(arr)];

    const getAllAddresses = async (contractInstance, counter) => {
      let allAddresses = [];
      for (let id = 0; id < counter; id++) {
        let address = await contractInstance.methods.ownerOf(id).call();
        allAddresses.push(address);
      }
      return allAddresses;
    };

    init();
  }, []);

  const { web3, accounts, contractInstance, counter, users } = state;

  return (
    <Layout>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home
                web3={web3}
                contractInstance={contractInstance}
                counter={counter}
              />
            )}
          />
          <Route
            exact
            path="/displayToken"
            render={() => (
              <DisplayToken
                web3={web3}
                contractInstance={contractInstance}
                counter={counter}
              />
            )}
          />
          <Route
            exact
            path="/userToken"
            render={() => (
              <UserToken
                web3={web3}
                contractInstance={contractInstance}
                users={users}
              />
            )}
          />
          <Route
            exact
            path="/buyToken"
            render={() => (
              <BuyToken
                web3={web3}
                accounts={accounts}
                contractInstance={contractInstance}
              />
            )}
          />
          <Route component={ErrorPage} />
        </Switch>
      </Router>
    </Layout>
  );
}
