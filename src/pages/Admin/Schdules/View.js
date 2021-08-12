import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table1 from './Table1.js';
import DrawerAdmin from "../DrawerAdmin.js"
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
      <DrawerAdmin DepId={state.DepId}/>

      <div className = {classes.root}>
   
        <div className ={classes.mar}>
          {/* <div>{state.name}</div> */}

        <Table1 name = {state.name} DepId={state.DepId} year={state.year} sem={state.sem}/>
        </div>


      </div>
    
    </div>

  
  );
}
