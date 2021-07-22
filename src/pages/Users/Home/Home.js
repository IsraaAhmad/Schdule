import React from "react";


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

  const classes = useStyles();
  return (
   <div  style={{height:1000}}className="back">
      <DrawerUser/>
       <div className={classes.tot}>
         <Comp UrlImage={course} name="مساقاتي" pathTo="/Rooms" />
         <Comp UrlImage={schdule} name="الجدول الدراسي" pathTo="/Schdule"/>
         <Comp UrlImage={time} name="اوقات دوامي" pathTo="/MyTime"/>




       </div>
   </div>
  );
}
