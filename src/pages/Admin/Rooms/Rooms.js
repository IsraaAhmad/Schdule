import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableR from "./TableR.js";
import "./b1.css"


import PropTypes from 'prop-types';
import { useHistory ,useLocation } from 'react-router-dom';

import DrawerAdmin from "../DrawerAdmin.js"
import "../back.css"
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TableLab from "./TableLab.js"

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
    width: '1000',
    
    margin:100,
    backgroundColor: theme.palette.background.paper,
  },
  tab:{
    backgroundColor:'#37474f',

  },
  indicator:{
    backgroundColor:'#D4AC0D'
  },
  bot:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
  },
  b1:{
    '&:hover': {
      backgroundColor:'#white',
      color: '#37474f',

  },
  margin:10,
  backgroundColor:'#045F5F', 
  color:'white',
  fontFamily:'Markazi Text',
  fontSize:'30px'
  },
 
}));

export default function App() {
  const classes = useStyles();
  const  location  = useLocation();
  const {state} = location;
  const [value, setValue] = React.useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
   
  };


  return (
    <div >
<DrawerAdmin   DepId={state.DepId} name={state.name}/>

<div className={classes.root} className="b1">
      <AppBar position="static" >
        <Tabs
        
      
          value={value}
          onChange={handleChange}
          className= {classes.tab}
          // centered
          variant="fullWidth"
          classes={{
            indicator: classes.indicator
          }}
          >
          <Tab style={{fontFamily:'Markazi Text',fontSize:'30px'}} label="  اضافة قاعة تدريس " DepId = {state.DepId}  />
          <Tab style={{fontFamily:'Markazi Text',fontSize:'30px'}} label=" اضافة مختبر" DepId = {state.DepId}/>
          
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} >
      <TableR DepId = {state.DepId}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
     <TableLab DepId = {state.DepId}/>
      </TabPanel>
     
 
  
    </div>
    
    
    </div>
  );
}
