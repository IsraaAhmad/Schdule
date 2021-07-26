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
    backgroundColor:'#045F5F',

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

export default function ScrollableTabsButtonPrevent(props) {
  const  location  = useLocation();
  const {state} = location;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
<DrawerAdmin/>
<div>name from state = {state.name}</div>
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
          <Tab style={{fontFamily:'Markazi Text',fontSize:'30px'}} label="  مواعيد المدرسين" {...a11yProps(0)} />
          <Tab style={{fontFamily:'Markazi Text',fontSize:'30px'}} label=" مواد الى قسم اخر" {...a11yProps(1)} />
          <Tab style={{fontFamily:'Markazi Text',fontSize:'30px'}} label="   مواد من قسم اخر" {...a11yProps(2)} />
          <Tab style={{fontFamily:'Markazi Text',fontSize:'30px'}} label="مواد من القسم" {...a11yProps(3)} />
          
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <TimeForTeacher name = {state.name}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
     <ToDep name = {state.name}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <TableSS1 name = {state.name}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <TableSS name = {state.name}/>
      </TabPanel>
      
      <div className={classes.bot}>

      <Button variant="contained"  style={{margin:10,backgroundColor:'#045F5F', color:'white',fontFamily:'Markazi Text',fontSize:'30px'}} size='medium'>
           حفظ
       </Button>
      <Button variant="contained"  style={{margin:10,backgroundColor:'#045F5F', color:'white',fontFamily:'Markazi Text',fontSize:'30px'}} size='medium'>
        حفظ وانشاء
      </Button>
      </div>
  
    </div>
          </div>
  );
}
