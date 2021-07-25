import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableR from "./TableR.js"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import DrawerAdmin from "../DrawerAdmin.js"
import "../back.css"
const useStyles = makeStyles({
  mar:{
    margin:100,
    width:1000,
    
  }
});

export default function App() {
  const classes = useStyles();
 


  return (
    <div style={{height:10000}} className="back">
<DrawerAdmin/>
    <div className = {classes.mar}>
        <TableR/>
    </div>
    </div>
  );
}
