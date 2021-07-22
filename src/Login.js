import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import TextField from '@material-ui/core/TextField';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { useHistory ,useLocation } from 'react-router-dom';


const useStyles = makeStyles({
  
  
});

export default function App() {
    const  history  = useHistory();
  const classes = useStyles();
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
    <div  style={{height:1000}}className="back">

      <div><Logo/></div>
      <div><LogInComp/></div>
<TextField 
         inputProps={{min: 0, style: { textAlign: 'right' ,
        
    fontFamily:'Markazi Text',
    fontSize:'20px',}}}
          id="userType"
          label=" "
          variant="outlined"
          required='true'
          className={classes.textField}
          style={{ borderColor: 'red' }}
          onChange = {handelOnChange}
          />


<Button variant="contained" style={{backgroundColor:'#045F5F'}} onClick={handelUser}>
         
              <div style = {{textAlign: 'right',
          fontFamily:'Markazi Text',
          fontSize:'20px', marginLeft:4,color:'white'}}>
                 Log In
              </div>
      </Button>
    </div>
    

  );
}
