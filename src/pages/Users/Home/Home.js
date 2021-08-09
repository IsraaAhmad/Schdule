import React from "react";
import { useHistory ,useLocation } from 'react-router-dom';


import { makeStyles } from "@material-ui/core/styles";
import DrawerUser from "../DrawerUser.js"
import Comp from "./Comp.js"
import schdule from "./schdule.png"
import course from "./course.png"
import time from "./time.png"
import "../back.css"

const useStyles = makeStyles({
  tot:{
    marginRight:110,
    marginTop:150,
    display:'flex',
    flexDirection:'row',
    width:1100,
    justifyContent:'space-between'
  }
  
});

export default function App() {
  const  location  = useLocation();
  const {state} = location;
  console.log(state)
  const classes = useStyles();
  return (
   <div  style={{height:1000}}className="back">
      <DrawerUser DepName={state.DepName} DepId ={state.DepId} InstName = {state.InstName}/>
       <div className={classes.tot}>
         <Comp UrlImage={course} name="مساقاتي" pathTo="/Rooms"
               DepName={state.DepName} DepId ={state.DepId} InstName = {state.InstName}/>
         <Comp UrlImage={schdule} name="الجدول الدراسي" pathTo="/Schdule"
               DepName={state.DepName} DepId ={state.DepId} InstName = {state.InstName}/>
         <Comp UrlImage={time} name="اوقات دوامي" pathTo="/MyTime"
               DepName={state.DepName} DepId ={state.DepId} InstName = {state.InstName}/>




       </div>
   </div>
  );
}
