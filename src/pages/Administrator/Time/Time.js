import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TableTime from "./TableCourse.js";
import Test from "./Test.js"
import MainPage from "./MainPage";
import { useHistory ,useLocation } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import DrawerAdminstrator from "../DrawerAdminstrator.js"
const useStyles = makeStyles({
  tot:{
    margin:120,
    width:950
  }
});

export default function App() {
  const  location  = useLocation();
  const {state} = location;
  const classes = useStyles();
  return (
    <div style={{height:1100}}className="back">
     <DrawerAdminstrator name={state.name} DepId={state.DepId}/>
    <div className={classes.tot}>
       <MainPage name={state.name} DepId={state.DepId}/> 
       {/* <Test/> */}
    </div>
    </div>
  );
}
