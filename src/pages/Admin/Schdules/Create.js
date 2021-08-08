import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import DataTable from "./DataTable.js"
import TableCreate from "./TableCreate.js"
import DrawerAdmin from "../DrawerAdmin.js"
import { useHistory ,useLocation } from 'react-router-dom';

const useStyles = makeStyles({
    mar:{
        margin:100,
        width:1000,
        
      },
});

export default function App() {
  const  location  = useLocation();
  const {state} = location;
  const classes = useStyles();
  return (
    <div style={{height:1000}} className="back">
<DrawerAdmin DepId={state.DepId}/>
    <div className={classes.mar}>
     <DataTable DepId={state.DepId}/>
    </div>
    </div>
  );
}
