/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { useHistory ,useLocation } from 'react-router-dom';
import DrawerAdminstrator from "../DrawerAdminstrator.js"
import Chem from '../chem.png'
import Elec from '../elec.png'
import Comp from '../comp.png'
import Build from '../build.png'
import Civil from '../civil.png'
import Mec from '../mec.png'
import Ind from '../ind.png'
import Arch from '../arch.png'
import Mecat from '../mecat.png'


import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const useStyles = makeStyles({
  mar:{
    marginRight:150,
    marginTop:50,
    width:900,
    display:'flex',
    justifyContent:'space-between'
    
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
      margin:5
  },
  ent:{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    
  },
});

export default function App() {
  const classes = useStyles();
  const  history  = useHistory();
  const HandelOnClick = () =>{
      history.push('/create')
  }
  


  return (
        <div style={{height:1000}} className="back">
          <DrawerAdminstrator/>
  <div className = {classes.mar}>
        <div className={classes.ent} onClick={() => {
          history.push({pathname: './Dep',state: { number: "610ac4a6c2196db2fe637823" ,}})}}>
          <div> <img src={Chem} width="150" height="120" /></div>
          <div style={{fontFamily:'Markazi Text',fontSize:'30px',}}>هندسة كيميائية</div>
        </div>


       <div className={classes.ent} onClick={() => {
          history.push({pathname: './Dep',state: { number: "60ddc8e95b4d43f8eaaabf7d" ,}})}}>
          <div><img src={Elec} width="150" height="120" /></div>
          <div style={{fontFamily:'Markazi Text',fontSize:'30px',}}>هندسة كهربائية وهندسة الاتصالات</div>
       </div>


       <div  className={classes.ent} onClick={() => {
          history.push({pathname: './Dep',state: { number: "60ddc9735b4d43f8eaaabf83" ,}})}}>
          <div><img src={Comp} width="150" height="120" /></div>
          <div style={{fontFamily:'Markazi Text',fontSize:'30px',}}>هندسة الحاسوب</div>
       </div>

  </div>


  <div className = {classes.mar} >
        <div  className={classes.ent} onClick={() => {
          history.push({pathname: './Dep',state: { number: "60ddc95f5b4d43f8eaaabf82" ,}})}}>
          <div> <img src={Build} width="150" height="120" /></div>
          <div style={{fontFamily:'Markazi Text',fontSize:'30px',}}>هندسة البناء</div>
        </div>


       <div className={classes.ent} onClick={() => {
          history.push({pathname: './Dep',state: { number: "60ddc9095b4d43f8eaaabf7e" ,}})}}>
          <div><img src={Civil} width="150" height="120" /></div>
          <div style={{fontFamily:'Markazi Text',fontSize:'30px',}}>الهندسة المدنية</div>
       </div>


       <div  className={classes.ent} onClick={() => {
          history.push({pathname: './Dep',state: { number: "60ddc9235b4d43f8eaaabf80" ,}})}}>
          <div><img src={Mec} width="150" height="120" /></div>
          <div style={{fontFamily:'Markazi Text',fontSize:'30px',}}>الهندسة الميكانيكية </div>
       </div>

  </div>


  <div className = {classes.mar}>
        <div  className={classes.ent} onClick={() => {
          history.push({pathname: './Dep',state: { number: "60ddc7ec5b4d43f8eaaabf7b" ,}})}}>
          <div> <img src={Ind} width="150" height="120" /></div>
          <div style={{fontFamily:'Markazi Text',fontSize:'30px',}}> الهندسة الصناعية</div>
        </div>


       <div className={classes.ent} onClick={() => {
          history.push({pathname: './Dep',state: { number: "60ddc9165b4d43f8eaaabf7f" ,}})}}>
          <div><img src={Arch} width="150" height="120" /></div>
          <div style={{fontFamily:'Markazi Text',fontSize:'30px',}}>الهندسة المعمارية</div>
       </div>


       <div  className={classes.ent} onClick={() => {
          history.push({pathname: './Dep',state: { number: "60ddc9c45b4d43f8eaaabf85" ,}})}}>
          <div><img src={Mecat} width="150" height="120" /></div>
          <div style={{fontFamily:'Markazi Text',fontSize:'30px',}}>هندسة الميكاترونكس</div>
       </div>

  </div>




        </div>
  );
}
