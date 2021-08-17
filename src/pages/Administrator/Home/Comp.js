import React from "react";

import { Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useHistory ,useLocation } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



const useStyles = makeStyles({
  mar:{
      width:250,
      height:200,
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      alignContent:'center',
      backgroundColor:'#045F5F',
      alignItems:'center',
      
      borderRadius:6,
  },
name:{
  width:'100%',
  backgroundColor:'#034B4B',
  color:'white',
  fontFamily:'Markazi Text',
  fontSize:'25px',
  height:50

}
  
});

export default function App(props) {
  const {UrlImage , name , pathTo , DepId , instName} = props
  const  history  = useHistory();

  const classes = useStyles();
  const handelOnClick=() =>{
    // history.push(pathTo)
    history.push({pathname:pathTo,state: { DepId: DepId , name:instName }})
  }

  return (
      

   
   <Button onClick={handelOnClick}>
     <div className={classes.mar}>
          <div style={{marginTop:20}}> <img src={UrlImage} alt="" width="130" height="90" />  </div>
          <div  className={classes.name} >
               
                    {name}
               
          </div>
     </div>
       
      </Button>
     
 
      
  );
}
