import React from "react";
import  { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory} from 'react-router-dom';

import Logo from "./Logo.js"
import "./back.css"
import Cycle from "./Cycle"
import SendEmail from './SendEmail.js'

import LogInComp from "./LogInComp.js"



const useStyles = makeStyles({
  
  
});

export default function App() {
  const [email,setEmail ] = useState(false)
    const  history  = useHistory();
  const classes = useStyles();

 
  return (
    <div  style={{height:1000}} className="back2">

      <div><Logo/></div>
      <div><Cycle/></div>
      {email?

        <div><SendEmail setEmail={setEmail}/></div>
       :
       <div><LogInComp setEmail={setEmail}/></div>
      }

     

    </div>
    

  );
}

