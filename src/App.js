import React from "react";
import Rooms from "./pages/Admin/Rooms/Rooms.js";
import Course from "./pages/Admin/Course/Course.js";
import Schdule from "./pages/Admin/Schdules/Schdule.js"
import Teacher from "./pages/Admin/Teachers/Teacher.js";
import AddSchdule from "./pages/Admin/Teachers/Teacher.js";
import Drawer from "./pages/Users/DrawerUser";
import View from "./pages/Admin/Schdules/View.js";
import View1 from "./pages/Administrator/Schdules/View.js"
import AdminNotifyTime from './pages/Admin/SemesterTime/Time.js'
import Create from "./pages/Admin/Schdules/Create.js";
import Create1 from './pages/Administrator/Schdules/Create.js'
import Time from "./pages/Administrator/Time/Time.js"
import TimeTeacher from "./pages/Admin/Teachers/TimeTeacher";
import AddCourse from "./pages/Admin/Course/CreateCourse.js"
import AddCourse1 from "./pages/Administrator/Course/CreateCourse.js"
import MyTime from "./pages/Users/MyTime/MyTime.js"
import {RTL , theme} from "./Themes.js";
import Login from "./pages/LogIn/LogIn.js";
import TableTime from "./pages/Administrator/Time/TableTime.js"
import Testing from "./Testing.js"
import AdminHome from "./pages/Admin/Home/Home.js"
import UsersHome from "./pages/Users/Home/Home.js"
import AdministratorHome from "./pages/Administrator/Home/Home.js";
import TableCreate from "./pages/Admin/Schdules/TableCreate.js";
import TableCreate1 from "./pages/Administrator/Schdules/TableCreate.js"
import AddCourseFromOtherDep from "./pages/Admin/Course/AddCourseFromOther.js"
import AddCourseFromOtherDep1 from "./pages/Administrator/Course/AddCourseFromOther.js"
import CreateSemester from "./pages/Administrator/Time/CreateTable.js"

import Dep from './pages/Administrator/Home/Dep.js'
import AdministratorRooms from './pages/Administrator/Rooms/Rooms.js'
import AdministratorTeachers from './pages/Administrator/Teachers/Teacher.js'
import TeacherTable from './pages/Users/Schedule/Schedule.js'
import AdmainistratorCourse from './pages/Administrator/Course/Course.js'
import AdministratorSchdule from './pages/Administrator/Schdules/Schdules.js'
import UserNotifyTime from './pages/Users/SemesterTime/Time.js'


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
        <Route exact path="/tableCreate" render={props => <TableCreate {...props} />} />
        <Route exact path="/tableCreate1" render={props => <TableCreate1 {...props} />} />

        <Route exact path="/addCourseFromOtherDep" render={props => <AddCourseFromOtherDep {...props} />} />
        <Route exact path="/testing" render={props => <Testing {...props} />} />
        <Route exact path="/tableTime" render={props => <TableTime {...props} />} />
        <Route exact path="/createSemester" render={props => <CreateSemester {...props} />} />
        <Route exact path="/course" render={props => <Course {...props} />} />
        <Route exact path="/Rooms" render={props => <Rooms {...props} />} />
        <Route exact path="/Teacher" render={props => <Teacher {...props} />} />
        <Route exact path="/schdule" render={props => <Schdule {...props} />} />
        <Route exact path="/addSchdule" render={props => <AddSchdule {...props} />} />
        <Route exact path="/view" render={props => <View {...props} />} />
        <Route exact path="/view1" render={props => <View1 {...props} />} />
        <Route exact path="/Create" render={props => <Create {...props} />} />
        <Route exact path="/AdminNotifyTime" render={props => <AdminNotifyTime {...props} />} />
        <Route exact path="/timeTeacher" render={props => <TimeTeacher {...props} />} />
        <Route exact path="/time" render={props => <Time {...props} />} />
        <Route exact path="/MyTime" render={props => <MyTime {...props} />} />
        <Route exact path="/AddCourse" render={props => <AddCourse {...props} />} /> 
        <Route exact path="/create1" render={props => <Create1 {...props} />} /> 
        
        <Route exact path="/Dep" render={props => <Dep {...props} />} /> 
        <Route exact path="/AdministratorRooms" render={props => <AdministratorRooms {...props} />} /> 
        <Route exact path="/AdministratorTeachers" render={props => <AdministratorTeachers {...props} />} /> 
        <Route exact path="/TeacherTable" render={props => <TeacherTable {...props} />} /> 
        <Route exact path="/AdmainistratorCourse" render={props => <AdmainistratorCourse {...props} />} /> 
        <Route exact path="/AddCourse1" render={props => <AddCourse1 {...props} />} /> 
        <Route exact path="/AddCourseFromOtherDep1" render={props => <AddCourseFromOtherDep1 {...props} />} /> 
        <Route exact path="/AdministratorSchdule" render={props => <AdministratorSchdule {...props} />} /> 
        <Route exact path="/UserNotifyTime" render={props => <UserNotifyTime {...props} />} /> 



        






      </Switch>
      </div>
      
      
    </div>
        </MuiThemeProvider>
        </RTL>
  );
}
