import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DataTable from "./DataTable.js"
import DrawerAdmin from "../DrawerAdmin.js"
import { useHistory ,useLocation } from 'react-router-dom';

const useStyles = makeStyles({
    mar:{
        margin:100,
        width:1000,
        
      },
});

export default function App() {
  const  location  = useLocation();
  const {state} = location;
  const classes = useStyles();
  return (
    <div style={{height:1000}} className="back">
<DrawerAdmin DepId={state.DepId} name={state.name}/>
    <div className={classes.mar}>
     <DataTable DepId={state.DepId} name={state.name}/>
    </div>
    </div>
  );
}
