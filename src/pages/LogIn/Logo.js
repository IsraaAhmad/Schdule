

import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import logo from "./log.png"
import backlog from "./backlog.jpg"

const useStyles = makeStyles({
  pos:{
      position:'absolute',
      right: 0,
      top:0
  }
  
});

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.pos}>
         <img src={logo} width="600" height="600" />
    </div>
  );
}
