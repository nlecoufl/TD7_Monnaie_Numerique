import React from "react";
import ListItem from "@material-ui/core/ListItem";

export const ListItemLink = props => {
  return <ListItem button component="a" {...props} />;
};
