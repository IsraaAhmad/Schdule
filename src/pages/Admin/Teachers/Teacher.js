/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableMainPage from './TableMainPage.js'
import Tea from './tea.png'

import PropTypes from 'prop-types';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import DrawerAdmin from "../DrawerAdmin.js"
import "../back.css"
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useHistory ,useLocation } from 'react-router-dom';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: 800,
    marginRight:200,
    marginTop:100,
  },
  log:{
    position:'absolute',
    top:130,
    right:730
  }

}));

export default function App() {
  const classes = useStyles();
  const  location  = useLocation();
  const {state} = location;
  console.log(location)
  console.log("from tot")
  console.log(state.DepId)
  const [value, setValue] = React.useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
   
  };


  return (
    <div style={{height:10000}} className="back">
<DrawerAdmin DepId={state.DepId} />

<div className={classes.root} >
      <TableMainPage DepId={state.DepId}/>
      
     
 
  
    </div>
    
    </div>
  );
}
