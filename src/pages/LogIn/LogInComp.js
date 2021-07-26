import React from "react";
import { useHistory ,useLocation } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    pos:{
        position:'absolute',
        right: 800,
        top:200,
        
    },
    ent:{
        display:'flex',
        flexDirection:'column',
        border: '2px solid white',
        padding:10,
        borderRadius:20,
        boxShadow: "5px 5px 5px white"

        
    },
    textField: {
      textAlign:'right',
      backgroundColor:'white',
      margin:20,
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border: "2px solid black",
  
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border: "2px solid #7F7F83"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "3px solid #045F5F",
      // borderRadius: 4,
      // border: "2px solid #045F5F",
        }
    },
    
    text:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:20,
        width:'100%',
        fontSize:'30px',
        fontFamily:'Markazi Text',
        margin:10,
        color:'#008089',
        fontStyle:'bold'
    }
  
});

export default function App() {
  const classes = useStyles();
  const  history  = useHistory();
  const [flag,SetFlag] =React.useState(false);
  const [userName,SetUserName] =React.useState();
  const [password,SetPassword] =React.useState();


const handelUser = () =>{
 let url = "https://core-graduation.herokuapp.com/loginAuthorization?idUser="+userName+"&password="+password
    // axios.get("https://core-graduation.herokuapp.com/getAllMaterialsOfDepartment?idDep=60ddc9735b4d43f8eaaabf83")
  axios.get(url)
    
        .then(res => {
          console.log(res)
          history.push('./AdminHome')
          })
        .catch((error) => {
            SetFlag(true);
            console.log("not correct");
          })
 
            
}
 
const handelOnChangeNumber = (event)=>{
  SetUserName(event.target.value)
}

const handelOnChangePassword = (event) =>{
  SetPassword(event.target.value)
}
  return (
    <div className={classes.pos}>
        <div className={classes.text}>تسجيل الدخول</div>
        <div className="ent" >

        <TextField 
         inputProps={{min: 0, style: { textAlign: 'right' ,
        
    fontFamily:'Markazi Text',
    fontSize:'20px',}}}
          id="userType"
          label=" "
          variant="outlined"
          required='true'
          placeholder="ادخل رقم التسجل"
          className={classes.textField}
          style={{ borderColor: 'red' }}
          onChange = {handelOnChangeNumber}
          />


<TextField 
         inputProps={{min: 0, style: { textAlign: 'right' ,
        
    fontFamily:'Markazi Text',
    fontSize:'20px',}}}
          id="password"
          label=" "
          variant="outlined"
          required='true'
          placeholder="ادخل كلمة المرور"
          className={classes.textField}
          style={{ borderColor: 'red' }}
          onChange = {handelOnChangePassword}
          />


<Button variant="contained" style={{backgroundColor:'#008089'}} onClick={handelUser}>
         
              <div style = {{textAlign: 'right',
          fontFamily:'Markazi Text',
          fontSize:'20px', marginLeft:4,color:'white'}}>
                 تسجيل الدخول
              </div>
      </Button>
      {flag&&<label  style={{ color: 'red',fontWeight: 'bold'}}>**اسم المستخ\م او كلمة المرور غير صحيحة **</label>}


        </div>
       
    </div>
  );
}
