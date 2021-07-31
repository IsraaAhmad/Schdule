import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TableTime from "./TableCourse.js";
import Divider from '@material-ui/core/Divider';
import T from "./T.js"
import  { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import DrawerAdminstrator from "../DrawerAdminstrator.js"
const useStyles = makeStyles({
  mar:{
     
  },
  course:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      fontFamily:'Markazi Text',
      fontSize:'30px',
      backgroundColor:'#045F5F',
      color:'white',
      height:50,
  },
  title:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    margin:5,
    padding:20,
    alignItems:'center',
    fontFamily:'Markazi Text',
    fontSize:'20px',
    backgroundColor:'#D4AC0D',
    color:'white',
    height:50,

  }
});

export default function App(Props) {
  const classes = useStyles();
  const {courseList,setCourseList,labList,setLabList} = Props
  let str = courseList
  const arr = str.split("*")
  const [a0, setA0] = React.useState(arr[0]);
  const [a1, setA1] = React.useState(arr[1]);
  const [a2, setA2] = React.useState(arr[2]);
  const [a3, setA3] = React.useState(arr[3]);
  const [a4, setA4] = React.useState(arr[4]);
  const [a5, setA5] = React.useState(arr[5]);


  
  console.log("labList")
  console.log(labList)

  useEffect(()=>{

    setCourseList("put in from course List")
    console.log("from course")
    console.log(labList)
    let list1 = []
    // axios.get("https://core-graduation.herokuapp.com/getTables?idDep=60ddc9735b4d43f8eaaabf83")
    // axios.get("https://jsonplaceholder.typicode.com/todos/1")
    
        // .then(res => {
        //   console.log(res)
        //     console.log(res.data.response);
            
             
             
        //       },)
            
  },[])
  return (
    <div>
    {/* <DrawerAdminstrator/> */}
    <div className={classes.mar}>
     <div className={classes.title}>
         <div>تفعيل/تعطيل</div>
         <div>المجموعة</div>


         <div> مدة المحاضرة</div>
         <div style={{display:'flex',flexDirection:'row'}}>
         بدء فراغ الجامعة 
         - انتهاء فراغ الجامعة

          
         </div>
         {/* <div>تفعيل</div> */}
         <div style={{marginRight:35}}>
         الدوام من الساعة - 
           الدوام الى الساعة 
         
          </div>
         <div>اليوم</div>
     </div>
     <div><T backColor="white" day ="السبت"/></div>
     <Divider variant="middle"/>
     <div><T backColor="white" day ="الاحد"/></div>
     <Divider variant="middle"/>
     <div><T backColor="white" day ="الاثنين"/></div>
     <Divider variant="middle"/>
     <div><T backColor="white" day ="الثلاثاء"/></div>
     <Divider variant="middle"/>
     <div><T backColor="white" day ="الاربعاء"/></div>
     <Divider variant="middle"/>
     <div><T backColor="white" day ="الخميس"/></div>
     <Divider variant="middle"/>
    </div>
    </div>
  );
}
