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
    checkedB: true,
  });
  

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
    checkedA: false,
  });

 
  useEffect(()=>{
    console.log("data="+ data)
    const v1 = data.split(",")
    const d = v1[0].split("/")
    const w = v1[2].split("/")
    const dur  = v1[3]
   
    setDuration(dur)
   
  
    const gro = v1[4]
  
    setGroup("مجموعة"+gro)
   
    setBreak1(w[1])
    setBreak2(w[0])
    if(v1[5] ==="0"){
      setDisabledTotal(false)
      setState({ ...state, checkedA: false });
    }
    else{
      setDisabledTotal(true)
      setState({ ...state, checkedA: true });
    }
    if(v1[1] === "0"){
     
      setColor({ ...color, checkedB: false });
      setDisabled1(false)
    }
    else{
      
     
      setColor({ ...color, checkedB: true });
      setDisabled1(true)
    }
    
    setTime1(d[1])
    setTime2(d[0])
  
   
    setFlag(true)
    
    
           
 },[])

 const HandelOnChangeData =(t1,t2,d1,b1,b2,duration1,group,d2) =>{
 
   let x="1"
   if(d1 === false)
   x = "0"
   let r = "1"
   if(d2 === false)
   r="0"
  

  let du 
  if(duration == 10) du =1
  if(duration == 20) du =1.5
  if(duration == 30) du =2
  if(duration == 40) du =3
console.log("duration")
console.log(duration)

  console.log(t2+"/"+t1+","+x+","+b2+"/"+b1+","+du+","+group +","+r)
   setData(t2+"/"+t1+","+x+","+b2+"/"+b1+","+du+","+group +","+r)

 }
 const HandelOnChangeBreak1 =(e) =>{
     setBreak1(e.target.value)
    HandelOnChangeData(time1,time2,disabled1,e.target.value,break2,duration,group, disabledTotal)
   
  
 }
 const HandelOnChangeBreak2 =(e) =>{
  setBreak2(e.target.value)
 HandelOnChangeData(time1,time2,disabled1,break1,e.target.value,duration,group,disabledTotal)


}
const HandelOnChangeTime1 =(e) =>{
  setTime1(e.target.value)
 HandelOnChangeData(e.target.value,time2,disabled1,break1,break2,duration,group,disabledTotal)


}
const HandelOnChangeTime2 =(e) =>{
  setTime2(e.target.value)
 HandelOnChangeData(time1,e.target.value,disabled1,break1,break2,duration,group,disabledTotal)


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
       
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        /></div>


<div className={classes.margin}> 
<TextField
       style={{width:60}}
       disabled={!disabled1 || !disabledTotal}
       id="demo-customized-select-native"
       defaultValue = {group}
       InputLabelProps={{
         shrink: true,
        }}
        inputProps={{
          readOnly: true, 
        }}
        />
        {/* <FormControl className={classes.choose}>
        <NativeSelect
       
        disabled={!disabledTotal}
          id="demo-customized-select-native"
          // input={<BootstrapInput />}
          value={group}
          inputProps={{readOnly: true }}
       
        >
          
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={1}>مجموعة1</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={2}>مجموعة2</option>   
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={3}>مجموعة3</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={4}>مجموعة4</option>

        </NativeSelect>
      </FormControl> */}
        </div>

        <div>
        {/* <FormControl className={classes.choose}>
        <NativeSelect
        disabled={!disabledTotal}
          id="demo-customized-select-native"
          // input={<BootstrapInput />}
          value={duration}
        >
          
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={10}> 1</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={20}> 1.5</option>   
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={30}> 2</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={40}> 3</option>

        </NativeSelect>
      </FormControl> */}
       <TextField
       style={{width:20}}
       disabled={!disabled1 || !disabledTotal}
       id="demo-customized-select-native"
       defaultValue = {duration}
       InputLabelProps={{
         shrink: true,
        }}
        inputProps={{
          readOnly: true, 
        }}
        />
        </div>
       
        <div className={classes.break} >

        <div className={classes.time} >
      <TextField
       disabled={!disabled1 || !disabledTotal}
       id="time3"
       label="الى"
       type="time"
       defaultValue = {break1}
       InputLabelProps={{
         shrink: true,
        }}
        inputProps={{
          readOnly: true, 
        }}
        />
 
      </div>
      
      <div className={classes.time} >
     
    <TextField
    disabled={!disabled1 || !disabledTotal}
    id="time4"
    label="من"
    type="time"
    defaultValue = {break2}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      readOnly: true, 
    }}
    /> 
      </div>



    <FormControlLabel
    control={<ColorCheckbox  disabled={!disabledTotal} checked={color.checkedB}
      name="checkedB" />}
    label=""
    />
        </div>
<div style={{display:'flex',flexDirection:'row'}}>

        <div className={classes.time} >
     <TextField
     disabled={!disabledTotal}
     id="time1"
     label="الى"
     type="time"
     defaultValue = {time1}
     InputLabelProps={{
       shrink: true,
      }}
      inputProps={{
        readOnly: true, 
      }}
      />
  </div>
  <div className={classes.time} >
    <TextField
    disabled={!disabledTotal}
    id="time2"
    label="من"
    type="time"
    
    defaultValue = {time2}
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={
      { readOnly: true, }
    }
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
