import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Test from "./Test.js";
import DrawerAdmin from "../DrawerAdmin.js"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const useStyles = makeStyles({
  mar:{
    margin:150,
    width:970
  }
});

export default function App() {
  const classes = useStyles();
  return (
    <div  style={{height:1000}} className="back">
<DrawerAdmin/>
   <div className={classes.mar}>
     <Test/>
   </div>
    </div>
  );
}
