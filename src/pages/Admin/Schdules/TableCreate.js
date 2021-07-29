import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import  { useEffect } from 'react';
import TimeForTeacher from './TimeForTeacher.js'
import TableSS from "./TableSS";
import TableSS1 from "./TableSS1";
import DataTable from "./DataTable"
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import DrawerAdmin from "../DrawerAdmin.js";
import ToDep from "./ToDep.js"
import "./b1.css"
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

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

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
  }
}));

export default function ScrollableTabsButtonPrevent(props) {
  const  location  = useLocation();
  const  history  = useHistory();

  const {state} = location;
  const classes = useStyles();
  const [flag,setFlag] = React.useState(false);
  const [savedData,setSavedDate] = React.useState(0);
  const [value, setValue] = React.useState(state.index);
  const testing = () =>{
    console.log(savedData)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
   
  };
  useEffect(()=>{
      
      axios.get("https://core-graduation.herokuapp.com/getFromDraft?idDep=60ddc9735b4d43f8eaaabf83")
      .then(res => {
        setSavedDate(res.data.response)
        console.log(res.data.response)
        console.log("SSSSSSSSSSSSSSs")
          console.log(savedData)
          setFlag(true)
        }, 
            )
      }
  ,[value]) 
  return (
    <div>
<DrawerAdmin/>
<Button onClick={testing}>click here</Button>
<div>name from state = {state.name}</div>
    {flag&&<div className={classes.root} className="b1">
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
          <Tab style={{fontFamily:'Markazi Text',fontSize:'30px'}} label="  مواعيد المدرسين"  TableName = {state.name} savedData={savedData}/>
          <Tab style={{fontFamily:'Markazi Text',fontSize:'30px'}} label=" مواد الى قسم اخر" TableName = {state.name} savedData={savedData}/>
          <Tab style={{fontFamily:'Markazi Text',fontSize:'30px'}} label="   مواد من قسم اخر" TableName = {state.name} savedData={savedData}/>
          <Tab style={{fontFamily:'Markazi Text',fontSize:'30px'}} label="مواد من القسم" TableName = {state.name} savedData={savedData}/>
          
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TimeForTeacher TableName = {state.name} savedData={savedData}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
     <ToDep TableName = {state.name} savedData={savedData}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <TableSS1 TableName = {state.name} savedData={savedData}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <TableSS TableName = {state.name} savedData={savedData}/>
      </TabPanel>
      
      <div className={classes.bot}>

      <Button variant="contained" className={classes.b1}  size='medium'>
           حفظ
       </Button>
      <Button variant="contained" className={classes.b1}  size='medium'>
        حفظ وانشاء
      </Button>
      </div>
  
    </div>}
          </div>
  );
}
