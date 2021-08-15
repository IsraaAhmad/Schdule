import React from "react";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import { makeStyles ,withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import NativeSelect from "@material-ui/core/NativeSelect";
import  { useEffect } from 'react';
import './styl.css';




import Switch from '@material-ui/core/Switch';

const ColorCheckbox = withStyles({
    root: {
      color: 'black',
      '&$checked': {
        color: '#37474f',
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);
const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      border: '1px solid black',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',

      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily:'Markazi Text',
      fontSize:'20px',
      backgroundColor:'white',
      '&:focus': {
        borderRadius: 4,
        borderColor: 'white',
        boxShadow: '0 0 0 0.2rem rgba(0,0,0,0)',
      },
    },
  }))(InputBase);
const useStyles = makeStyles({
  time:{
      display:'flex',
      flexDirection:'column',
      margin:5
  },
  tot:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    margin:5,
    padding:20,
    alignItems:'center',
    fontFamily:'Markazi Text',
    fontSize:'20px',
    color:'white',
    height:80,
  },
  break:{
      display:'flex',
      flexDirection:'row'
  },
  margin:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    alignSelf:'center'
  }
  
});

export default function App(Props) {
   const  {backColor , day ,data , setData} = Props;
  const classes = useStyles();
  const [group, setGroup] = React.useState('');
  const [time1, setTime1] = React.useState('');
  const [time2, setTime2] = React.useState('');
  const [flagBreak, setFlagBreak] = React.useState('');


  const [flag, setFlag] = React.useState(false);
  const [sum, setSum] = React.useState('');
  const [disabledTotal,setDisabledTotal] = React.useState(true);
  const [disabled1,setDisabled1] = React.useState(false);
  const [color, setColor] = React.useState({
    checkedB: false,
  });
  useEffect(()=>{
  
 },[])

 

  const handleChangeGroup = (event) => {
    setGroup(event.target.value);
  };
  const handleChangeSum = (event) => {
    setSum(event.target.value);
  };
  const [state, setState] = React.useState({
    checkedA: true,
  });

 
  useEffect(()=>{
    console.log("data="+ data)
    const v1 = data.split(",")
    const d = v1[0].split("/")
  
    if(v1[1] ==="0"){
      setDisabledTotal(false)
      setState({ ...state, checkedA: false });
    }
    else{
      setDisabledTotal(true)
      setState({ ...state, checkedA: true });
    }
  
    setTime1(d[0])
    setTime2(d[1])
    setFlag(true)
           
 },[])

 const HandelOnChangeData =(t1,t2,d2) =>{
   console.log("test bla dddbla")
  
   
   let r = "1"
   if(d2 === false)
   r="0"
  console.log("new data ")

  console.log(t1+"/"+t2+","+r)
   setData(t1+"/"+t2+","+r)

 }

const HandelOnChangeTime1 =(e) =>{
  setTime1(e.target.value)
 HandelOnChangeData(e.target.value,time2,disabledTotal)

}
const HandelOnChangeTime2 =(e) =>{
  setTime2(e.target.value)
 HandelOnChangeData(time1,e.target.value,disabledTotal)

}


 const handleChange = (event) => {
  setState({ ...state, [event.target.name]: event.target.checked });
  setDisabledTotal(event.target.checked)
  HandelOnChangeData(time1,time2,event.target.checked)
  
};
  return (
    <div >
      {flag&&<div className={classes.tot} style={{backgroundColor:backColor}}>

        <div>  <Switch
        id = "en"
        checked={state.checkedA}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        /></div>



       
     
      
<div style={{display:'flex',flexDirection:'row'}}>

        <div className={classes.time} >
     <TextField
     onChange={HandelOnChangeTime2}
     disabled={!disabledTotal}
     id="time1"
     label="الى"
     type="time"
     defaultValue = {time2}
     InputLabelProps={{
       shrink: true,
      }}
      inputProps={{
        step: 300, // 5 min
      }}
      />
  </div>
  <div className={classes.time} >
    <TextField
    onChange={HandelOnChangeTime1}
    disabled={!disabledTotal}
    id="time2"
    label="من"
    type="time"
    defaultValue = {time1}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}
    />
  </div>
    </div>
  <div style={{color:'black'}}>
      {day}
  </div>
    </div>}
    </div>
  );
}
