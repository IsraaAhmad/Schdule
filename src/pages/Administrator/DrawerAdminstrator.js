import React from 'react';
import clsx from 'clsx';
import ViewChat from "./ViewChat.js"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withRouter } from 'react-router-dom';
import {AppstoreFilled } from '@ant-design/icons';
import { useHistory ,useLocation } from 'react-router-dom';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  heedername:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    height:"60px",
    marginBottom:"0px",
    padding:"0px",

  },
  heedername1:{
   fontSize:"20px !important",
   fontWeight:"fontWeightBold",
   

  },
  toText :{
    display:"flex",
    justifyContent:"flex-end",
    flexDirection:"row",
    paddingLeft:"2px",
    alignItems:"center",
    width:'100%',
    height:'100%',
    color:'black'
  },
  toText1 :{
    fontFamily: 'Roboto',
    fontSize: "66px !important",
    fontWeight:"fontWeightBold"
    
    

  },
  appBar: {
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
 
    backgroundColor:"#045F5F",
  },
  fontJomhuria:{
    fontFamily: 'Roboto',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 300,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    
  },
  content: {
    flexGrow: 1,
    marginRight: -drawerWidth,
  },
  contentShift: {
    marginRight: 0,
  },
  active:{
    padding:'0px',
    margin:'0px',
    display:"flex",
    justifyContent:"flex-end",
    flexDirection:"row",
    paddingLeft:"2px",
    alignItems:"center",
    width:'100%',
    height:'100%',
    color:'white'
  },
}));

export default function PersistentDrawerRight(Props) {
  const {DepId,name} = Props;
  const  history  = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location  = useLocation();
  const [chat, setChat] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const menuItems = [
    {
      text:'الرئيسية',
      icon: <AppstoreFilled style={{ fontSize: '20px',marginLeft:'7px' }}/>,
      path:'/AdministratorHome',
    },
   
    {
      text:'اوقات الدوام',
      icon: <AppstoreFilled style={{ fontSize: '20px',marginLeft:'7px' }}/>,
      path:'/Time',
    },
    
   
  ]
  const menuId = 'primary-search-account-menu';
  const handelLogOut =() =>{
    history.push("./")
    
  }
  const handelChat =()=> {
   
   setChat(!chat)
   
  
  
  }
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handelLogOut}>تسجيل الخروج</MenuItem>
    </Menu>
  );
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const HandelPreviwes = () =>{
    history.goBack();
    // let x = window.history
    // console.log(x)
    // history.push(
    //   {pathname:history.goBack(),
    //   state: { name:name,DepId:DepId}})
    
  }
  return (
    

    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        >
        <Toolbar>
        <div className={classes.root} >
        <IconButton onClick={HandelPreviwes} color="inherit">
             
                <ArrowBackIosIcon />
              
            </IconButton>


            
          
        

        <IconButton 
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              >
              <AccountCircle />
        </IconButton>
            <IconButton aria-label="show 4 new mails" color="inherit" style={!chat?{backgroundColor:'#045F5F'}:{backgroundColor:'#16A1A1'}}  onClick={handelChat}>
              <Badge >
                <MailIcon />
              </Badge>
            </IconButton>
                </div>
          <Typography variant="h6" noWrap className={classes.title}>
          
          </Typography>
          
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
            >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
        >
          
        <div className={classes.drawerHeader} />
       
      </main>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        style={{marginTop:'0px'}}
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        >
        <div style={{backgroundColor: '#efefef ', color: 'white',height:'100%',padding:'0px'}}>

        <div className={classes.drawerHeader} className={classes.heedername} style={{backgroundColor: 'white', color: 'black',padding:'0px',margin:'0px'}}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <div style={{fontFamily:'Markazi Text',fontSize:'30px'}}>عميد الكلية:{name}</div>
        </div>
        <Divider />
       

        <List style={{margin:'0.5px',padding:'0px'}}>
          {menuItems.map((item) => (
            <ListItem button key={item.text}
            
            onClick={() => {
              history.push({
                pathname:item.path,
                state:{DepId:DepId , name:name}
              })
              
              setOpen(false)
            }}
            style={location.pathname == item.path?{backgroundColor: '#045F5F',width:'100%',height:'100%',marginBottom:'1px',color:'#045F5F'}:{backgroundColor: '#efefef',width:'100%',height:'100%',marginBottom:'1px'}}
            
            className={classes.toText}
            >
              <div  className={location.pathname == item.path?classes.active:classes.toText}>
                <div style={{fontFamily:'Jomhuria',fontSize:'25px'}}>
              <ListItemText className={classes.toText1} >
                <div style={{fontFamily:'Markazi Text',fontSize:'25px'}}>
                {item.text}
                </div>
                </ListItemText>  
                </div>
                <ListItemIcon  style={location.pathname === item.path?{color: 'white'}:{color: 'black'}}>
              {item.icon}
              </ListItemIcon>
              </div>
            </ListItem>
          ))}
        </List>
          </div>
      </Drawer>
      {chat&&<div style={{
        position:'fixed',
        top:75,left:10,height: 500,
        width: 400,
        backgroundColor:'white',
        zIndex: '+2',border: '3px solid rgba(0, 0, 0, 0.09)',
        }}>
        <ViewChat DepId={DepId} name={name}/>
        
      </div>}
    </div>
          
  );
}
// export default withRouter(PersistentDrawerRight());