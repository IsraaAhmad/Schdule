import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import StopSharpIcon from '@material-ui/icons/StopSharp';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
const useStyles = makeStyles({
  rows:{
      display:'flex',
      flexDirection:'row'
  }
});

export default function App(Props) {
    const {day,timeList}=Props
    const [color, setColor] = React.useState(false);
  const classes = useStyles();
  return (
    <div className={classes.rows}>
        
        <div style = {{width:25,height:25,textAlign:'center',backgroundColor: timeList[18] ? 'red' : 'green'}}>5</div>
        <div style = {{width:25,height:25,textAlign:'center',backgroundColor: timeList[17] ? 'red' : 'green'}}>4.5</div>
        <div style = {{width:25,height:25,textAlign:'center',backgroundColor: timeList[16] ? 'red' : 'green'}}>4</div>
        <div style = {{width:25,height:25,textAlign:'center',backgroundColor: timeList[15] ? 'red' : 'green'}}>3.5</div>
        <div style = {{width:25,height:25,textAlign:'center',backgroundColor: timeList[14] ? 'red' : 'green'}}>3</div>
        <div style = {{width:25,height:25,textAlign:'center',backgroundColor: timeList[13] ? 'red' : 'green'}}>2.5</div>
        <div style = {{width:25,height:25,textAlign:'center',backgroundColor: timeList[12] ? 'red' : 'green'}}>2</div>
        <div style = {{width:25,height:25,textAlign:'center',backgroundColor: timeList[11] ? 'red' : 'green'}}>1.5</div>
        <div style = {{width:25,height:25,textAlign:'center',backgroundColor: timeList[10] ? 'red' : 'green'}}>1</div>
        <div style = {{width:25,height:25,textAlign:'center',backgroundColor: timeList[9] ? 'red' : 'green'}}>12.5</div>
        <div style = {{width:25,height:25,textAlign:'center',backgroundColor: timeList[8] ? 'red' : 'green'}}>12</div>
        <div style = {{width:25,height:25,textAlign:'center',backgroundColor: timeList[7] ? 'red' : 'green'}}>11.5</div>
        <div style = {{width:25,height:25,textAlign:'center',backgroundColor: timeList[6] ? 'red' : 'green'}}>11</div>
        <div style = {{width:25,height:25,textAlign:'center',backgroundColor: timeList[5] ? 'red' : 'green'}}>10.5</div>
        <div style = {{width:25,height:25,textAlign:'center',backgroundColor: timeList[4] ? 'red' : 'green'}}>10</div>
        <div style = {{width:25,height:25,textAlign:'center',backgroundColor: timeList[3] ? 'red' : 'green'}}>9.5</div>
        <div style = {{width:25,height:25,textAlign:'center',backgroundColor: timeList[2] ? 'red' : 'green'}}>9</div>
        <div style = {{width:25,height:25,textAlign:'center',backgroundColor: timeList[1] ? 'red' : 'green'}}>8.5</div>
        <div style = {{width:25,height:25,textAlign:'center', backgroundColor: timeList[0] ? 'red' : 'green'}}>8</div>
        <div style={{width:4,margin:5,display:'flex',justifyContent:'flex-start'}}>{day}</div>

              


    </div>
  );
}
