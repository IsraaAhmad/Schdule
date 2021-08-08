import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableMainPage from "./TableMainPage"
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { useHistory ,useLocation } from 'react-router-dom';
import DrawerAdmin from "../DrawerAdmin.js"
import "../back.css"

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const useStyles = makeStyles({
  mar:{
    margin:100,
    width:1000,
    
  },
  tit:{
    backgroundColor:'#37474f',
    height:50,
    borderTopLeftRadius:50,
    borderTopRightRadius:50,
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    fontFamily:'Markazi Text',
    fontSize:'30px',
    color:'white'



  },
  create:{
      backgroundColor:'#045F5F',
      fontFamily:'Markazi Text',
      fontSize:'20px',
      color:'white',
      margin:5,
      '&:hover': {
        backgroundColor:'#white',
        color: '#37474f',
    },
  }
});

export default function App() {
  const classes = useStyles();
  const  location  = useLocation();
  const {state} = location;
  console.log(location)
  console.log("from tot")
  console.log(state)
  const  history  = useHistory();
  const HandelOnClick = () =>{
      history.push({
        pathname:'/create',
        state:{DepId:state.DepId}
      })
  }
 


  return (
    <div style={{height:1000}} className="back">
<DrawerAdmin DepId={state.DepId}/>
    <div className = {classes.mar}>
        <div>
        <Button  variant="contained" className = {classes.create} onClick={HandelOnClick} size='large'>
          إنشاء جدول
        </Button>

        </div>
        {/* <div className={classes.tit}>الجداول الدراسية</div> */}
        <TableMainPage  DepId={state.DepId}/>
    </div>
    </div>
  );
}
