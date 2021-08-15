import React from "react";


import { makeStyles } from "@material-ui/core/styles";
import DrawerAdmin from "../DrawerAdmin.js"
import Comp from "./Comp.js"
import S1 from "./S1.png"
import schdule from "./schdule.png"
import course from "./course.png"
import teacher from "./teacher.png"
import "../back.css"
import { useHistory ,useLocation } from 'react-router-dom';


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
  const  location  = useLocation();
  const {state} = location;
  const classes = useStyles();
  return (
   <div  style={{height:1000}}className="back">
      <DrawerAdmin name={state.name} DepId={state.DepId} />
       <div className={classes.tot}>
         <Comp UrlImage={S1} title="القاعات" pathTo="/Rooms" DepId={state.DepId} name={state.name}/>
         <Comp UrlImage={schdule} title="الجدول الدراسي" pathTo="/Schdule" DepId={state.DepId} name={state.name}/>
         <Comp UrlImage={course} title="المساقات" pathTo="/Course" DepId={state.DepId} name={state.name}/>
         <Comp UrlImage={teacher} title="المدرسين" pathTo="/Teacher" DepId={state.DepId} name={state.name}/>




       </div>
   </div>
  );
}
