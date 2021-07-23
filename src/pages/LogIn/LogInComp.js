import React from "react";
import { useHistory ,useLocation } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
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
  const [typeUser, setTypeUser] = React.useState(0);
  const handelUser =()=>{
    if(typeUser === 'User'){
        history.push('./UsersHome')

    }
    if(typeUser === 'Admin'){
      history.push('./AdminHome')
    }
    if(typeUser === 'Administrator'){
      history.push('./AdministratorHome')
    }
    else{
        console.log('no')
    }
}
const handelOnChange = (event)=>{
  setTypeUser(event.target.value)
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
          onChange = {handelOnChange}
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
          onChange = {handelOnChange}
          />


<Button variant="contained" style={{backgroundColor:'#008089'}} onClick={handelUser}>
         
              <div style = {{textAlign: 'right',
          fontFamily:'Markazi Text',
          fontSize:'20px', marginLeft:4,color:'white'}}>
                 تسجيل الدخول
              </div>
      </Button>


        </div>
       
    </div>
  );
}