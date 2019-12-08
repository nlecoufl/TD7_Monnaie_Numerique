import React from "react";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { ListItemLink } from "./ListItemLink";

export const ListItems = () => {
  return (
    <List>
      <ListItemLink href="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemLink>
      <ListItemLink href="/displayToken">
        <ListItemIcon>
          <VisibilityIcon />
        </ListItemIcon>
        <ListItemText primary="View Token" />
      </ListItemLink>
      <ListItemLink href="/userToken">
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="View User" />
      </ListItemLink>
      <ListItemLink href="/buyToken">
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Buy Token" />
      </ListItemLink>
    </List>
  );
};
