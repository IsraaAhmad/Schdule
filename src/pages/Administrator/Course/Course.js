import React from "react";
import CourseList from "./CoursesList.js"
import { makeStyles } from "@material-ui/core/styles";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import "../back.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import DrawerAdminstrator from "../DrawerAdminstrator.js"
import { useHistory ,useLocation } from 'react-router-dom';


const useStyles = makeStyles({
  mar:{
      marginTop:120,
      marginRight:150,
      width:1000
  }
  
});

export default function App() {
  const classes = useStyles();
  const  location  = useLocation();
  const {state} = location;
  return (
    <div style={{height:1000}} className="back">
<DrawerAdminstrator  DepId={state.DepId} name={state.name}/>
   <diV className={classes.mar}>

       <CourseList DepId={state.DepId} name={state.name}/>
   </diV>
    </div>
  );
}
