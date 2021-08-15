import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Test from "./Test.js";
import DrawerAdmin from "../DrawerAdmin.js"
import { useHistory ,useLocation } from 'react-router-dom';

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
<DrawerAdmin DepId={state.DepId} name={state.name}/>
   <div className={classes.mar}>
     <Test DepId={state.DepId}/>
   </div>
    </div>
  );
}
