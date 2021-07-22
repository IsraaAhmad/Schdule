import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {useLocation} from "react-router-dom";
import TableT from "./TabelT";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import DrawerAdmin from "../DrawerAdmin.js"
const useStyles = makeStyles({
  mar:{
      width:1200,
      margin:40
  }
});

export default function App() {
  let location = useLocation();
  const {state} = location;
  const classes = useStyles();
  return (
    <div style={{height:1000}} className="back">
      <DrawerAdmin/>
    <div className = {classes.mar}>
        <TableT name={state.name}/>

    </div>
    </div>
  );
}
