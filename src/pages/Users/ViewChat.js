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
import ChatUser from "../LogIn/ChatUser.js"
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Img from "../Admin/chating.png"

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
      
  }
  
});


export default function App(Props) {
    const {DepId , name} = Props;

  const classes = useStyles();
  const [flag,setFlag] = React.useState(false);
  const [head,setHead] = React.useState();
  const [headID,setHeadID] = React.useState();
  const [doctorID,setDoctorID] = React.useState();
  const  location  = useLocation();
  const {state} = location;
  useEffect(()=>{
    axios.get("https://core-graduation.herokuapp.com/getUsers?idDep="+DepId)
  
     
    .then(res => {
      let w = res.data.response
      console.log(w)
      for(let kk = 0 ;kk<w.length;kk++){
        if(w[kk].name === name) {
          setDoctorID(w[kk].id)
          
        }
       if(w[kk].type == "head of department"){

         setHeadID(w[kk].id)
         setHead(w[kk].name)
       } 
      }
     
      

      
      setFlag(true)
   
       },
        )
          
  },[]) 
  return (
      <div>

    {flag&&<div className={classes.tit}>
       
    <div>
        <ChatUser doctor={name} doctorID={doctorID} headID={headID} head={head}    />
        </div>
    </div>
    
    }
        
        
    </div>
  );
}
