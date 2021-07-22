import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory} from 'react-router-dom';

import cycle1 from "./cycle1.png"


const useStyles = makeStyles({
  mar:{
      position:'absolute',
      left:200,
      top:0,
  }
  
});

export default function App() {
    const  history  = useHistory();
  const classes = useStyles();

 
  return (
    <div  className={classes.mar}>
           <img src={cycle1} width="700px" height="400px"/>
    

    </div>
    

  );
}
