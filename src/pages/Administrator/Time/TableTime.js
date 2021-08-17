import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TableTime from "./TableCourse.js";
import Test from "./Test.js"
import AllTime from "./AllTime";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useHistory ,useLocation } from 'react-router-dom';

import DrawerAdminstrator from "../DrawerAdminstrator.js"
const useStyles = makeStyles({
  tot:{
    marginRight:120,
    marginTop:50,
    width:1000
  }
});

export default function App() {
  const classes = useStyles();
  const  location  = useLocation();
  const {state} = location;
  return (
    <div style={{height:1200}}className="back">
     <DrawerAdminstrator name={state.name} DepId={state.DepId}/>
    <div className={classes.tot}>
       <AllTime date={state.date} sem = {state.sem} name={state.name} DepId={state.DepId}/> 
       {/* <Test/> */}
    </div>
    </div>
  );
}
