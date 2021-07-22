import React from 'react';
import clsx from 'clsx';
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
    // appBarShift: {
    //   width: `calc(100% - ${drawerWidth}px)`,
    //   marginLeft: drawerWidth,
    //   transition: theme.transitions.create(['margin', 'width'], {
    //     easing: theme.transitions.easing.easeOut,
    //     duration: theme.transitions.duration.enteringScreen,
    //   }),
    // },
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
    width: drawerWidth,
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
    color:'black',
    display:"flex",
    justifyContent:"flex-end",
    flexDirection:"row",
    paddingLeft:"2px",
    alignItems:"center",
    width:'100%',
    height:'100%',
  },
}));

export default function PersistentDrawerRight() {
  const  history  = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const location  = useLocation();
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
      icon: <AppstoreFilled style={{ fontSize: '20px', color: 'white' ,marginLeft:'7px' }}/>,
      path:'/AdministratorHome',
    },
   
    {
      text:'اوقات الدوام',
      icon: <AppstoreFilled style={{ fontSize: '20px', color: 'white' ,marginLeft:'7px' }}/>,
      path:'/Time',
    },
    
   
  ]
  const menuId = 'primary-search-account-menu';
  const handelLogOut =() =>{
    history.push("./")
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


            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary" >
                <NotificationsIcon />
              </Badge>
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
        <div style={{backgroundColor: 'black', color: 'white',height:'100%',padding:'0px'}}>

        <div className={classes.drawerHeader} className={classes.heedername} style={{backgroundColor: 'white', color: 'black',padding:'0px',margin:'0px'}}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          <div style={{fontFamily:'Markazi Text',fontSize:'30px'}}>عميد الكلية</div>
        </div>
        <Divider />
       

        <List style={{margin:'0.5px',padding:'0px'}}>
          {menuItems.map((item) => (
            <ListItem button key={item.text}
            
            onClick={() => {
              history.push(item.path);
              setOpen(false)
            }}
            style={location.pathname == item.path?{backgroundColor: 'white',width:'100%',height:'100%',marginBottom:'1px'}:{backgroundColor: '#37474f',width:'100%',height:'100%',marginBottom:'1px'}}
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
              <ListItemIcon>
              {item.icon}
              </ListItemIcon>
              </div>
            </ListItem>
          ))}
        </List>
          </div>
      </Drawer>
    </div>
          
  );
}
// export default withRouter(PersistentDrawerRight());