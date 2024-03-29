import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table1 from './Table1.js';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print';
import DrawerUser from "../DrawerUser.js"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {useLocation} from "react-router-dom";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles({
    root:{

        marginTop:60,
        marginRight:100,
    },
    margin: {
        marginBottom:12,
        marginLeft:12
      },
      mar:{
        width:1100,
        
      }
});

export default function App(props) {
  let location = useLocation();
  const {state} = location;
  const classes = useStyles();
  return (
    <div style={{height:1000}} className="back">
      <DrawerUser DepName={state.DepName} DepId ={state.DepId} InstName = {state.InstName}/>

      <div className = {classes.root}>
   
        <div className ={classes.mar}>
          {/* <div>{state.name}</div> */}

        <Table1  DepId={state.DepId} inst = {state.InstName}/>
        </div>


      </div>
    
    </div>

  
  );
}
