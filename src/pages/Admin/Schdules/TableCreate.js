import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import  { useEffect } from 'react';
import TimeForTeacher from './TimeForTeacher.js'
import TableSS from "./TableSS";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TableSS1 from "./TableSS1";
import DataTable from "./DataTable"
import { Button } from '@material-ui/core';
import DrawerAdmin from "../DrawerAdmin.js";
import BeatLoader from "react-spinners/BeatLoader";
import ToDep from "./ToDep.js"
import "./b1.css"
import { useHistory ,useLocation } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";


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
  },
  lod:{
    margin:250,
    width:800,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  }

}));

export default function ScrollableTabsButtonPrevent(props) {
  const  history  = useHistory();
  
  const  location  = useLocation();
  const {state} = location;
  const DepId = state.DepId
  const year = state.year
  console.log("state.year")

  console.log(state.year)
  const classes = useStyles();
  const [flag,setFlag] = React.useState(false);
  const [savedData,setSavedDate] = React.useState(0);
  const [child,setChild] = React.useState(false);
  const [value, setValue] = React.useState(state.index);
  const [loading, setLoading] = React.useState(false);
  const [dia,setDia] = React.useState(false);
  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false);
    history.goBack()
    
  };

  const handelSaveAndCreate =()=>{
    
    let url ="http://192.168.1.7:3000/runCore?idDep="+DepId+"&tableName="+state.name+
    "&date="+year+"&semester="+state.sem+"&softFlag=true"
    console.log(url)
    setOpen(true);
    setDia(true)
    // axios.get(url).then(res => {console.log(res.data.response)},)
  }

  const handelSaveAndCreate1 =()=>{
    
    let url ="http://192.168.1.7:3000/runCore?idDep="+DepId+"&tableName="+state.name+
    "&date="+year+"&semester="+state.sem+"&softFlag=false"
    console.log(url)
    setOpen(true);
    setDia(true)
    // axios.get(url).then(res => {console.log(res.data.response)},)
  }

  const testing = () =>{
    console.log(savedData)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
   
  };
  useEffect(()=>{
    // setLoading(true)
      
      axios.get("https://core-graduation.herokuapp.com/getFromDraft?idDep="+DepId+"&tableName="+state.name)
      .then(res => {
        setSavedDate(res.data.response)
        console.log(res.data.response)
        console.log("SSSSSSSSSSSSSSs")
          console.log(savedData)
          setFlag(true)
          setLoading(false)
        }, 
            )
      }
  ,[value,child]) 
  return (
    <div>
<DrawerAdmin DepId={DepId}/>
{loading?
         <div className={classes.lod}>
         
         <BeatLoader  loading={loading} color='#045F5F' size={30} margin ={3} /> 
       </div>
    
    :
    <div>

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
          <Tab style={{fontFamily:'Markazi Text',fontSize:'30px'}} label="  مواعيد المدرسين"  TableName = {state.name} savedData={savedData} setChild={setChild} child={child} DepId={DepId} year={year} sem={state.sem}/>
          <Tab style={{fontFamily:'Markazi Text',fontSize:'30px'}} label=" مواد الى قسم اخر" TableName = {state.name} savedData={savedData} setChild={setChild} child={child} DepId={DepId} year={year} sem={state.sem}/>
          <Tab style={{fontFamily:'Markazi Text',fontSize:'30px'}} label="   مواد من قسم اخر" TableName = {state.name} savedData={savedData} setChild={setChild} child={child} DepId={DepId} year={year} sem={state.sem}/>
          <Tab style={{fontFamily:'Markazi Text',fontSize:'30px'}} label="مواد من القسم" TableName = {state.name} savedData={savedData} setChild={setChild} child={child} DepId={DepId} year={year} sem={state.sem}/>
          
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TimeForTeacher TableName = {state.name} savedData={savedData} setChild={setChild} child={child} DepId={DepId} year={year} sem={state.sem}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
     <ToDep TableName = {state.name} savedData={savedData} setChild={setChild} child={child} DepId={DepId} year={year} sem={state.sem}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <TableSS1 TableName = {state.name} savedData={savedData} setChild={setChild} child={child} DepId={DepId} year={year} sem={state.sem}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <TableSS TableName = {state.name} savedData={savedData} setChild={setChild} child={child} DepId={DepId} year={year} sem={state.sem}/>
      </TabPanel>
      
      <div className={classes.bot}>

      <Button onClick={handelSaveAndCreate1} variant="contained" className={classes.b1}  size='medium'>
           انشاء سريع
       </Button>
      <Button  onClick={handelSaveAndCreate} variant="contained" className={classes.b1}  size='medium'>
        انشاء
      </Button>
      </div>
    
    </div>}
    </div>}

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
                 تم ارسال الجدول ..يرجى الانتظار بضع  الوقت 
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
