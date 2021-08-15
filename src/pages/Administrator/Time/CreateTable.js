import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TableTime from "./TableCourse.js";
import Test from "./Test.js"
import Create from "./Create";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import DrawerAdminstrator from "../DrawerAdminstrator.js"
const useStyles = makeStyles({
  tot:{
    marginRight:120,
    marginTop:80,
    width:950
  }
});

export default function App() {
  const classes = useStyles();
  return (
    <div style={{height:1000}}className="back">
     <DrawerAdminstrator/>
    <div className={classes.tot}>
       <Create/> 
       {/* <Test/> */}
    </div>
    </div>
  );
}
