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
const useStyles = makeStyles({
    mar:{
        margin:100,
        width:1000,
        
      },
});

export default function App() {
  const classes = useStyles();
  return (
    <div style={{height:1000}} className="back">
<DrawerAdmin/>
    <div className={classes.mar}>
     <DataTable/>
    </div>
    </div>
  );
}
