import React from "react";


import { makeStyles } from "@material-ui/core/styles";
import DrawerAdminstrator from "../DrawerAdminstrator.js"
import Comp from "./Comp.js"
import room from "./room.png"
import time from "./time.png"
import schdule from "./schdule.png"
import course from "./course.png"
import teacher from "./teacher.png"
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
      <DrawerAdminstrator/>
       <div className={classes.tot}>
         <Comp UrlImage={room} name="القاعات" pathTo="/Rooms" />
         <Comp UrlImage={schdule} name="الجدول الدراسي" pathTo="/Schdule"/>
         <Comp UrlImage={course} name="المساقات" pathTo="/Course"/>
         <Comp UrlImage={teacher} name="ألمدرسين" pathTo="/Teacher"/>
         <Comp UrlImage={time} name="أوقات الدوام" pathTo="/Teacher"/>





       </div>
   </div>
  );
}
