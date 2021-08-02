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
  const [duration,setDuration] = React.useState('');
  const [time1, setTime1] = React.useState('');
  const [time2, setTime2] = React.useState('');
  const [break1, setBreak1] = React.useState('');
  const [break2, setBreak2] = React.useState('');
  


  const [flag, setFlag] = React.useState(false);
  const [sum, setSum] = React.useState('');
  const [disabledTotal,setDisabledTotal] = React.useState(true);
  const [disabled1,setDisabled1] = React.useState(false);
  const [color, setColor] = React.useState({
    checkedB: false,
  });
  useEffect(()=>{
  
 },[])

  const handleChangeBox = (event) => {
    setColor({ ...color, [event.target.name]: event.target.checked });
    setDisabled1(event.target.checked )
    HandelOnChangeData(time1,time2,event.target.checked,break1,break2,duration,group,disabledTotal)
  };

  const handleChangeGroup = (event) => {
    setGroup(event.target.value);
    HandelOnChangeData(time1,time2,disabled1,break1,break2,duration,event.target.value,disabledTotal)
  }; 

  const handleChangeDuration = (event) => {
    setDuration(event.target.value);
    HandelOnChangeData(time1,time2,disabled1,break1,break2,event.target.value,group,disabledTotal)
  };
  const [state, setState] = React.useState({
    checkedA: true,
  });

 
  useEffect(()=>{
    console.log("data="+ data)
    const v1 = data.split(",")
    const d = v1[0].split("/")
    const w = v1[2].split("/")
    const dur  = v1[3]
    if( dur === "1")
    setDuration(10)
    else if( dur === "1.5")
    setDuration(20)
    else if( dur === "2")
    setDuration(30)
    else if( dur === "3")
    setDuration(40)


    const gro = v1[4]
    if( gro === "1")
    setGroup(10)
    else if( gro === "2")
    setGroup(20)
    else if( gro === "3")
    setGroup(30)
    else if( gro === "4")
    setGroup(40)
    setBreak1(w[0])
    setBreak2(w[1])
    console.log("v[1] = " + v1[1])
    if(v1[5] ==="1"){
      setDisabledTotal(false)
      setState({ ...state, checkedA: false });
    }
    else{
      setDisabledTotal(true)
      setState({ ...state, checkedA: true });
    }
    if(v1[1] === "1"){
      
      // setColor(false)
      setColor({ ...color, checkedB: false });
      setDisabled1(false)
    }
    else{
      
     
      setColor({ ...color, checkedB: true });
      setDisabled1(true)
    }
    
    setTime1(d[0])
    setTime2(d[1])
  

    setFlag(true)
           
 },[])

 const HandelOnChangeData =(t1,t2,d1,b1,b2,duration,group,d2) =>{
   console.log("test bla dddbla")
   let x="0"
   if(d1 === false)
   x = "1"
   let r = "0"
   if(d2 === false)
   r="0"
  console.log("new data ")

  console.log(t1+"/"+t2+","+x+","+b1+"/"+b2+","+duration+","+group +","+r)
   setData(t1+"/"+t2+","+x+","+b1+"/"+b2+","+duration+","+group +","+r)

 }
 const HandelOnChangeBreak1 =(e) =>{
     setBreak1(e.target.value)
    HandelOnChangeData(time1,time2,disabled1,e.target.value,break2,duration,group, disabledTotal)
   console.log("heloooo" + e.target.value+ "break1 = "+break1)
  
 }
 const HandelOnChangeBreak2 =(e) =>{
  setBreak2(e.target.value)
 HandelOnChangeData(time1,time2,disabled1,break1,e.target.value,duration,group,disabledTotal)
console.log("heloooo" + e.target.value+ "break1 = "+break1)

}
const HandelOnChangeTime1 =(e) =>{
  setTime1(e.target.value)
 HandelOnChangeData(e.target.value,time2,disabled1,break1,break2,duration,group,disabledTotal)
console.log("heloooo" + e.target.value+ "break1 = "+break1)

}
const HandelOnChangeTime2 =(e) =>{
  setTime2(e.target.value)
 HandelOnChangeData(time1,e.target.value,disabled1,break1,break2,duration,group,disabledTotal)
console.log("heloooo" + e.target.value+ "break1 = "+break1)

}


 const handleChange = (event) => {
  setState({ ...state, [event.target.name]: event.target.checked });
  setDisabledTotal(event.target.checked)
  HandelOnChangeData(time1,time2,disabled1,break1,break2,duration,group,event.target.checked)
  
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


<div className={classes.margin}> 
        <FormControl className={classes.choose}>
        <NativeSelect
        disabled={!disabledTotal}
          id="demo-customized-select-native"
          // input={<BootstrapInput />}
          value={group}
          onChange={handleChangeGroup}
        >
          
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={10}>مجموعة1</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={20}>مجموعة2</option>   
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={30}>مجموعة3</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={40}>مجموعة4</option>

        </NativeSelect>
      </FormControl>
        </div>

        <div>
        <FormControl className={classes.choose}>
        <NativeSelect
        disabled={!disabledTotal}
          id="demo-customized-select-native"
          // input={<BootstrapInput />}
          value={duration}
          onChange={handleChangeDuration}
        >
          
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={10}> 1</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={20}> 1.5</option>   
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={30}> 2</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={40}> 3</option>

        </NativeSelect>
      </FormControl>
        </div>
       
        <div className={classes.break} >

        <div className={classes.time} >
      <TextField
       onChange ={HandelOnChangeBreak1}
       disabled={!disabled1 || !disabledTotal}
       id="time3"
       label="بلا بلا"
       type="time"
       defaultValue = {break1}
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
    onChange={HandelOnChangeBreak2}
    disabled={!disabled1 || !disabledTotal}
    id="time4"
    label="الى"
    type="time"
    defaultValue = {break2}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}
    /> 
      </div>



    <FormControlLabel
    control={<ColorCheckbox  disabled={!disabledTotal} checked={color.checkedB}
     onChange={handleChangeBox} name="checkedB" />}
    label=""
    />
        </div>
<div style={{display:'flex',flexDirection:'row'}}>

        <div className={classes.time} >
     <TextField
     onChange={HandelOnChangeTime1}
     disabled={!disabledTotal}
     id="time1"
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
  <div className={classes.time} >
    <TextField
    onChange={HandelOnChangeTime2}
    disabled={!disabledTotal}
    id="time2"
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
    </div>
  <div style={{color:'black'}}>
      {day}
  </div>
    </div>}
    </div>
  );
}
