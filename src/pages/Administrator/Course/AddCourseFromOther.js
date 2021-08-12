import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Test from "./Test.js";
import Add2 from "./Add2.js"
import DrawerAdminstrator from "../DrawerAdminstrator.js"
import { useHistory ,useLocation } from 'react-router-dom';

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
  const  location  = useLocation();
  const {state} = location;
  const classes = useStyles();
  return (
    <div  style={{height:1000}} className="back">
<DrawerAdminstrator DepId={state.DepId}/>
   <div className={classes.mar}>
     <Add2 DepId={state.DepId}/>
   </div>
    </div>
  );
}
