import React,{useEffect} from "react";
import axios from 'axios';
import clsx from 'clsx';
import ViewChat from "./ViewChat.js"
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/MoreVert';
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
import ViewNotify from "./ViewNotify.js"
import "./back.css"


const drawerWidth = 200;

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
    
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    // width: 400,
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
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
 
 
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PersistentDrawerRight(Props) {
  const {DepId , name} = Props
  const  history  = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [isNotify, setIsNotify] = React.useState(true);
  
  const [chat, setChat] = React.useState(false);
  const [notify, setNotify] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const location  = useLocation();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleLogOut =() =>{
    history.push('./')
  }
  const menuId = 'primary-search-account-menu';
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
      <MenuItem onClick={handleLogOut}>تسجيل الخروج</MenuItem>
    </Menu>
  );
 
 
  const menuItems = [
    {
      text:'الرئيسية',
      icon: <AppstoreFilled style={{ fontSize: '20px',marginLeft:'7px' }}/>,
      path:'/AdminHome',
      
    },
    {
      text:'المساقات',
      icon: <AppstoreFilled style={{ fontSize: '20px',marginLeft:'7px' }}/>,
      path:'/Course',
    },
    {
      text:'الجدول الدراسي',
      icon: <AppstoreFilled style={{ fontSize: '20px',marginLeft:'7px' }}/>,
      path:'/Schdule',
    },
    {
      text:'المدرسين',
      icon: <AppstoreFilled style={{ fontSize: '20px',marginLeft:'7px' }}/>,
      path:'/Teacher',
    },
    {
      text:'القاعات',
      icon: <AppstoreFilled style={{ fontSize: '20px',marginLeft:'7px' }}/>,
      path:'/Rooms',
    },

  
    
   
  ]

  useEffect(()=>{
    let flagNotify = true
    let url = "https://core-graduation.herokuapp.com/getNotification?instName="+name
    axios.get(url)
 
     
    .then(res => {
      
        console.log(res.data.response);
        let w = res.data.response
        for(let k = 0 ; k<w.length;k++){
          if(w[k].flag == "true") flagNotify = false
        }
        setIsNotify(flagNotify)
       

       
       
        
          
  },[]) 
})

  const handelChat =()=> {
    setNotify(false)
   setChat(!chat)
   
  
  
  }
  const handelNotify =()=> {
    setChat(false)
    setNotify(!notify)
    
   
   }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
 
  const HandelPreviwes = () =>{
    history.goBack();
  }
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
     
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit" onClick={handelChat}>
         
            <MailIcon />
         
        </IconButton>
        
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit" onClick={handelNotify}>
          <Badge color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      
    </Menu>
  );
 
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


            <IconButton style={!chat?{backgroundColor:'#045F5F'}:{backgroundColor:'#16A1A1'}} color="inherit" onClick={handelChat}>
              <Badge  color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            
            <IconButton style={!notify?{backgroundColor:'#045F5F'}:{backgroundColor:'#16A1A1'}}  color="inherit" onClick={handelNotify}>
              <Badge  
               badgeContent={!isNotify?<div style={{color:'red',fontSize:'35px'}}><FiberManualRecordIcon/></div>:
               <div style={{color:'red',fontSize:'35px'}}></div>}>
                <NotificationsIcon />
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
        style={{marginTop:'0px',width:150}}
    
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
          <div style={{fontFamily:'Markazi Text',fontSize:'24px'}}>رئيس القسم- {name}</div>
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
      {notify&&<div style={{
        position:'fixed',
        top:75,left:10,height: 500,
        width: 400,
        backgroundColor:'white',
        zIndex: '+2',border: '3px solid rgba(0, 0, 0, 0.09)',
        }}>
        <ViewNotify DepId={DepId} name={name}/>
        
      </div>}
    </div>
          
  );
}
// export default withRouter(PersistentDrawerRight());