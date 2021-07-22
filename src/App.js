import React from "react";
import Rooms from "./pages/Admin/Rooms/Rooms.js";
import Course from "./pages/Admin/Course/Course.js";
import Schdule from "./pages/Admin/Schdules/Schdule.js"
import Teacher from "./pages/Admin/Teachers/Teacher.js";
import AddSchdule from "./pages/Admin/Teachers/Teacher.js";
import Drawer from "./pages/Users/DrawerUser";
import View from "./pages/Admin/Schdules/View.js";
import Create from "./pages/Admin/Schdules/Create.js";
import Time from "./pages/Administrator/Time/Time.js"
import TimeTeacher from "./pages/Admin/Teachers/TimeTeacher";
import AddCourse from "./pages/Admin/Course/CreateCourse.js"
import MyTime from "./pages/Users/MyTime/MyTime.js"
import {RTL , theme} from "./Themes.js";
import Login from "./pages/LogIn/LogIn.js"
import AdminHome from "./pages/Admin/Home/Home.js"
import UsersHome from "./pages/Users/Home/Home.js"
import AdministratorHome from "./pages/Administrator/Home/Home.js";



import { makeStyles } from "@material-ui/core/styles";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const useStyles = makeStyles({
  
  
});

export default function App() {
  const classes = useStyles();
  return (
    <RTL>
				<MuiThemeProvider theme={theme}>

    <div className={classes.container}>
      <div>

      {/* <Drawer /> */}
      </div>

      <div className ={classes.secoundComp}>
      <Switch>
        <Route exact from="/" render={props => <Login {...props} />} />
        <Route exact path="/AdminHome" render={props => <AdminHome {...props} />} />
        <Route exact path="/UsersHome" render={props => <UsersHome {...props} />} />
        <Route exact path="/AdministratorHome" render={props => <AdministratorHome {...props} />} />

        <Route exact path="/course" render={props => <Course {...props} />} />
        <Route exact path="/Rooms" render={props => <Rooms {...props} />} />
        <Route exact path="/Teacher" render={props => <Teacher {...props} />} />
        <Route exact path="/schdule" render={props => <Schdule {...props} />} />
        <Route exact path="/addSchdule" render={props => <AddSchdule {...props} />} />
        <Route exact path="/view" render={props => <View {...props} />} />
        <Route exact path="/Create" render={props => <Create {...props} />} />
        <Route exact path="/timeTeacher" render={props => <TimeTeacher {...props} />} />
        <Route exact path="/time" render={props => <Time {...props} />} />
        <Route exact path="/MyTime" render={props => <MyTime {...props} />} />
        <Route exact path="/AddCourse" render={props => <AddCourse {...props} />} /> 



      </Switch>
      </div>
      
      
    </div>
        </MuiThemeProvider>
        </RTL>
  );
}
