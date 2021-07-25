import React from "react";


import { makeStyles } from "@material-ui/core/styles";
import DrawerAdmin from "../DrawerAdmin.js"
import Comp from "./Comp.js"
import S1 from "./S1.png"
import schdule from "./schdule.png"
import course from "./course.png"
import teacher from "./teacher.png"
import "../back.css"

const useStyles = makeStyles({
  tot:{
    marginRight:65,
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
      <DrawerAdmin/>
       <div className={classes.tot}>
         <Comp UrlImage={S1} name="القاعات" pathTo="/Rooms" />
         <Comp UrlImage={schdule} name="الجدول الدراسي" pathTo="/Schdule"/>
         <Comp UrlImage={course} name="المساقات" pathTo="/Course"/>
         <Comp UrlImage={teacher} name="المدرسين" pathTo="/Teacher"/>




       </div>
   </div>
  );
}
