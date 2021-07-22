import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TableTime from "./TableCourse.js";
import TLab from "./TLab.js"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const useStyles = makeStyles({
  mar:{
     
  },
  course:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      fontFamily:'Markazi Text',
      fontSize:'30px',
      backgroundColor:'#045F5F',
      color:'white',
      height:50,
  },
  title:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    margin:5,
    padding:20,
    alignItems:'center',
    fontFamily:'Markazi Text',
    fontSize:'20px',
    backgroundColor:'#045F5F',
    color:'white',
    height:50,

  }
});

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.mar}>
     <div className={classes.title}>
         <div>تفعيل/تعطيل</div>
         <div>مدة المختبر</div>
         <div> فراغ الجامعة</div>
         <div>أوقات الدوام</div>
         <div>اليوم</div>
     </div>
     <div><TLab backColor="#E5E8E8" day ="السبت"/></div>
     <div><TLab backColor="#CCD1D1" day ="الاحد"/></div>
     <div><TLab backColor="#99A3A4" day ="الاثنين"/></div>
     <div><TLab backColor="#707B7C" day ="الثلاثاء"/></div>
     <div><TLab backColor="#515A5A" day ="الاربعاء"/></div>
    </div>
  );
}
