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
import { useHistory ,useLocation } from 'react-router-dom';

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
  console.log(state.number)

  const classes = useStyles();
  return (
   <div  style={{height:1000}}className="back">
      <DrawerAdminstrator name={state.name} DepId={state.number}/>
       <div className={classes.tot}>
         
         <Comp UrlImage={room} name="القاعات" pathTo="/AdministratorRooms" DepId={state.number} instName={state.name} />
         <Comp UrlImage={schdule} name="الجدول الدراسي" pathTo="/AdministratorSchdule" DepId={state.number} instName={state.name}/>
         <Comp UrlImage={course} name="المساقات" pathTo="/AdmainistratorCourse" DepId={state.number} instName={state.name}/>
         <Comp UrlImage={teacher} name="المدرسين" pathTo="/AdministratorTeachers" DepId={state.number} instName={state.name}/>
         <Comp UrlImage={time} name="أوقات الدوام" pathTo="/Time" DepId={state.number} instName={state.name}/>





       </div>
   </div>
  );
}
