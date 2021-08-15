import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TableTime from "./TableCourse.js";
import Divider from '@material-ui/core/Divider';
import  { useEffect } from 'react';
import { Button } from '@material-ui/core';
import axios from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import NativeSelect from "@material-ui/core/NativeSelect";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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
    backgroundColor:'#D4AC0D',
    color:'white',
    height:50,

  }
});



export default function App(Props) {
  const classes = useStyles();
  const {courseList,setCourseList,labList,setLabList , sem , date} = Props
  let str = labList
  const arr = str.split("*")
  const [a0, setA0] = React.useState(arr[0]);
  const [a1, setA1] = React.useState(arr[1]);
  const [a2, setA2] = React.useState(arr[2]);
  const [a3, setA3] = React.useState(arr[3]);
  const [a4, setA4] = React.useState(arr[4]);
  const [a5, setA5] = React.useState(arr[5]);
  const [dia,setDia] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  
  const handleClose = () => {
    setOpen(false);
    
  };


  
  const HandelSave =() =>{
    let ww = a0+"*"+a1+"*"+a2+"*"+a3+"*"+a4+"*"+a5
    axios.get("https://core-graduation.herokuapp.com/editTimes?semester="+sem+"&date="+date+
    "&courseTimes="+courseList+"&labsTimes="+ww+"&startandend=yet")

     .then(res => {console.log(res.data.response) },)
  
    
    setLabList(a0+"*"+a1+"*"+a2+"*"+a3+"*"+a4+"*"+a5)
    
    setOpen(true);
    setDia(true)
  }

  useEffect(()=>{
      
  },[])
  return (
    <div className={classes.mar}>
     <div className={classes.title}>
         <div>تفعيل/تعطيل</div>
         
         
         <div style={{marginRight:35}}>
         الدوام من الساعة - 
           الدوام الى الساعة 
         
          </div>
         <div>اليوم</div>
     </div>
     <div><TLab backColor="white" day ="السبت" data ={arr[0]} setData={setA0} /></div>
     <Divider variant="middle"/>
     <div><TLab backColor="white" day ="الاحد" data ={arr[1]} setData={setA1} /></div>
     <Divider variant="middle"/>
     <div><TLab backColor="white" day ="الاثنين" data ={arr[2]} setData={setA2} /></div>
     <Divider variant="middle"/>
     <div><TLab backColor="white" day ="الثلاثاء" data ={arr[3]} setData={setA3} /></div>
     <Divider variant="middle"/>
     <div><TLab backColor="white" day ="الاربعاء" data ={arr[4]} setData={setA4} /></div>
     <Divider variant="middle"/>
     <div><TLab backColor="white" day ="الخميس" data ={arr[5]} setData={setA5} /></div>
     <Divider variant="middle"/>
     <Button variant="contained" onClick={HandelSave} style={{margin:40,backgroundColor:'#045F5F', color:'white',fontFamily:'Markazi Text',fontSize:'30px'}} size='medium'>
           حفظ
       </Button>
       {dia&&<div>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            dir='rtl'
          >
            <DialogTitle id="alert-dialog-title" >
              <div style={{ fontFamily: 'Markazi Text',fontSize:'35px',borderRadius:'5px'}}>
             
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div  style={{ fontFamily: 'Markazi Text',fontSize:'30px',}}>
                 تم حفظ اوقات المختبرات بنجاح
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus style={{ fontFamily: 'Markazi Text',fontSize:'35px',color:'#045F5F'}}>
               <CheckCircleIcon style={{color:'#045F5F' }} fontSize='large'/>
              </Button>
              
            </DialogActions>
          </Dialog>
            </div>}
    </div>
  );
}
