import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import TableLab from './TableLab';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import TableCourse from "./TableCourse.js";
import  { useEffect } from 'react';
import axios from 'axios';
import DrawerUser from "../DrawerUser.js"
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
    width: '100%',
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
  }
}));

export default function ScrollableTabsButtonPrevent(Props) {
  const {sem,date ,DepName,DepId,InstName} = Props;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [courseList,setCourseList]=React.useState(0);
  const [labList,setLabList]=React.useState(0);
  const [flag,setFlag] =React.useState(false);
  const  location  = useLocation();
  const  history  = useHistory();
  const [hande,setHande] = React.useState(false);
  const {state} = location;
  // const [listCourse,setListCourse] =React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(()=>{
    let d0 ="08:30/16:30,1"
    let d1 ="09:30/16:30,0"
    let d2 ="10:30/16:30,0"
    let d3 ="11:30/16:30,1"
    let d4 ="12:30/16:30,1"
    let d5 ="13:30/16:30,1"
    let arr= d0+"*"+d1+"*"+d2+"*"+d3+"*"+d4+"*"+d5
    
    // setLabList(arr)
     axios.get("https://core-graduation.herokuapp.com/getTimes?semester="+sem+"&date="+date)
     .then(res => {
      console.log(res)
            
       console.log("&&&&&&&&&&&")
            
            let w = res.data.response
            
           
              setLabList(w[0].labsTimes)
            
            
              setCourseList(w[0].courseTimes)
            
            setHande(true)

             },)
    


    setFlag(true)
    if(state.flag === "0"){
    let list1 = []
    // axios.get("https://core-graduation.herokuapp.com/getTables?idDep=60ddc9735b4d43f8eaaabf83")
    // axios.get("https://jsonplaceholder.typicode.com/todos/1")
    
        // .then(res => {
        //   console.log(res)
        //     console.log(res.data.response);
            //  },)
            }
 },[value])

  return (
    <div>
    <DrawerUser DepName={DepName} DepId ={DepId} InstName = {InstName}/>
    {hande&&<div>

    <div className={classes.root}>
      <AppBar position="static">
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
          <Tab style={{fontFamily:'Markazi Text',fontSize:'30px'}} label="أوقات دوام المختبرات" {...a11yProps(0)}
           courseList={courseList} setCourseList={setCourseList} 
         labList={labList} setLabList={setLabList} sem={sem} date={date}/>
          <Tab style={{fontFamily:'Markazi Text',fontSize:'30px'}} label="أوقات دوام المساقات" 
          {...a11yProps(1)} courseList={courseList} setCourseList={setCourseList} 
         labList={labList} setLabList={setLabList} sem={sem} date={date}/>
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
         <TableLab courseList={courseList} setCourseList={setCourseList} 
         labList={labList} setLabList={setLabList} sem={sem} date={date}
         />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <TableCourse courseList={courseList} setCourseList={setCourseList} 
         labList={labList} setLabList={setLabList} sem={sem} date={date}/>
      </TabPanel>
      <div className={classes.bot}>

      
    
      </div>
  
         </div>
    </div>}
          </div>
  );
}
