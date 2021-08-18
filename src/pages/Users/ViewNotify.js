import React,{useEffect} from "react";
import { makeStyles ,withStyles} from "@material-ui/core/styles";

import { useHistory ,useLocation } from 'react-router-dom';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import Button from '@material-ui/core/Button';
import Chat from "../../pages/LogIn/Chat.js"
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckIcon from '@material-ui/icons/Check';
import Img from "./time.png"
import { render } from "@testing-library/react";


const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);



const useStyles = makeStyles({
  tit:{
      position:'fixed',
      top:100,
      Right:100,
      display:'flex',
      alignItems:'center',
      justifyContent:'center' ,
      flexDirection:'column'
      
  },
  yes:{
    //   border:'2px solid black',
      backgroundColor:'#E1E8E8'
  },
  no:{
    // border:'2px solid black',
      backgroundColor:'white'
  }
  
});

const Emplist=[
    {note:"يرجى البدء باعداد الجدول الدراسي للفصل الدراسي بالاطلاع على المواعيد الدراسية للفصل ",hour:"3:30",flag:true},
    {note:"يرجى البدء باعداد الجدول الدراسي للفصل الدراسي بالاطلاع على المواعيد الدراسية للفصل ",hour:"3:30",flag:true},
    {note:"يرجى البدء باعداد الجدول الدراسي للفصل الدراسي بالاطلاع على المواعيد الدراسية للفصل ",hour:"3:30",flag:false},
]
export default function App(Props) {
    const {DepId , name , DepName} = Props;
console.log(name)
console.log("name")
const  history  = useHistory();

  const classes = useStyles();
  const [flag,setFlag] = React.useState(false);
  const [data,setData] = React.useState();
  const [rend,setRend] = React.useState(false)
  const  location  = useLocation();

  

  const {state} = location;
  useEffect(()=>{
    // setFlag(true)
    let listt = []
    let url = "https://core-graduation.herokuapp.com/getNotification?instName="+name
    console.log(url)
    axios.get(url)
  
     
    .then(res => {
        console.log("notifiy")
      console.log(res.data.response)
      let w = res.data.response
      let x = 0
      for(let k = (w.length)-1  ;k>=0;k--){
        let teach = {flag:w[k].flag,from:w[k].from,instName:w[k].instName,note:w[k].note,time:w[k].time}
        listt[x] = teach
        x = x+1
       }
       setData(listt)
       setFlag(true)
       },
        )
        
          }
  ,[rend]) 
  const handelGoToNotifications = (row) =>{
    if(row.from == "headOfDep"){
      
      history.push({
        pathname:'./TeacherTable',
        state:{DepId:DepId,DepName:DepName,InstName:name}
      })
    }
    else{
      console.log(row)
      const arr = row.time
      const arr1  = arr.split(',')
      console.log(arr1)
      history.push({
        pathname:'./UserNotifyTime',
        state:{DepId:DepId,DepName:DepName,InstName:name ,sem:arr1[1],date:arr1[0]}
      })
    }
    
    
  }
  const handelDone = (row) => {
    let x1 = "https://core-graduation.herokuapp.com/editNotification?instName="
    let x2  = row.instName
    let x3 = "&note="
    let x4 = row.note
    let url = x1+x2+x3+x4
    console.log(url)
    axios.get(url).then(res => {console.log(res)
        setRend(!rend)},)

  }
  return (
      <div >
          <div style={{fontFamily:'Markazi Text',fontSize:'28px',display:'flex',width:'100%',height:'60px',alignContent:'center',alignItems:'center',justifyContent:'center', backgroundColor:'#37474f',color:'white'}}>الاشعارات</div>

    {flag&&
    <div style={{marginBottom:20,display:'flex',justifyContent:'center',alignItems:'center',alignContent:'center',flexDirection:'column'}}>
     {data.map(row => (
         <div  style={{display:'flex',flexDirection:'row',width:'100%',justifyContent:'flex-end'}}
         className={row.flag === "true"?classes.yes:classes.no}>
             <div dir="rtl"
             
             style={{
                 textAlign:'right',
                 fontFamily:'Markazi Text',
                 fontSize:'18px',
                 padding:10,
                 margin:2
            
                }}>
                
                    {row.note}
                    {row.flag === "true"?
                <Button onClick={() => handelDone(row)}><CheckIcon/></Button>
                    :
                    <div></div>
                    }
                </div>
                <Button onClick={() => handelGoToNotifications(row)}>
                  
                <img src={Img} width='70px' height='70px' alt="" borderRadius="30px"></img>
                  </Button>
             </div>

     ))}  
        
    
   
 
    </div>}
    </div>
  );
}
