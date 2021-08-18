import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';


import AllTime from "./AllTime";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { useHistory ,useLocation } from 'react-router-dom';

import DrawerUser from "../DrawerUser.js"
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
  console.log(state)
  console.log("date = " + state.date)
  console.log("sem = " + state.sem)

  return (
    <div style={{height:1200}}className="back">
     <DrawerUser DepName={state.DepName} DepId ={state.DepId} InstName = {state.InstName}/>
    <div className={classes.tot}>
       <AllTime date={state.date} sem = {state.sem} InstName={state.InstName} DepId={state.DepId} DepName={state.DepName}/> 
      
    </div>
    </div>
  );
}
