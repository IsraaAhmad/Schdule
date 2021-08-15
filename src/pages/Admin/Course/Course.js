import React from "react";
import CourseList from "./CoursesList.js"
import { makeStyles } from "@material-ui/core/styles";
import "../back.css"
import DrawerAdmin from "../DrawerAdmin.js"
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
<DrawerAdmin  DepId={state.DepId} name={state.name}/>
   <diV className={classes.mar}>

       <CourseList DepId={state.DepId} name={state.name}/>
   </diV>
    </div>
  );
}
