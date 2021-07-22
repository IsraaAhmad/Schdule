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
import './styl.css';




import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  
  Route,
} from "react-router-dom";
import Switch from '@material-ui/core/Switch';

const ColorCheckbox = withStyles({
    root: {
      color: 'black',
      '&$checked': {
        color: 'red',
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
      flexDirection:'column'
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
    height:150,
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
   const  {backColor , day} = Props;
  const classes = useStyles();
  const [group, setGroup] = React.useState('');
  const [sum, setSum] = React.useState('');
  const [disabled1,setDisabled1] = React.useState(true);
  const [color, setColor] = React.useState({
    checkedB: true,
  });

  const handleChangeBox = (event) => {
    setColor({ ...color, [event.target.name]: event.target.checked });
    setDisabled1(event.target.checked )
  };

  const handleChangeGroup = (event) => {
    setGroup(event.target.value);
  };
  const handleChangeSum = (event) => {
    setSum(event.target.value);
  };
  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  return (
    <div className={classes.tot} style={{backgroundColor:backColor}}>
        <div>  <Switch
        checked={state.checkedA}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      /></div>



        <div className={classes.margin}> 
        <FormControl className={classes.choose}>
        <NativeSelect
          id="demo-customized-select-native"
          input={<BootstrapInput />}
          value={group}
          onChange={handleChangeGroup}
        >
          
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={10}>مجموعة 1</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={20}>مجموعة 2</option>   
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={30}>مجموعة 3</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={40}>مجموعة 4</option>

        </NativeSelect>
      </FormControl>
        </div>
        <div>
        <FormControl className={classes.choose}>
        <NativeSelect
          id="demo-customized-select-native"
          input={<BootstrapInput />}
          value={sum}
          onChange={handleChangeSum}
        >
          
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={10}> 1</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={20}> 1.5</option>   
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={30}> 2</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={40}> 3</option>

        </NativeSelect>
      </FormControl>
        </div>
        <div className={classes.break} >

        {disabled1&&<div className={classes.time} style={{backgroundColor:'white',border: '1px solid black',borderRadius:10 , padding:10}}>
      <TextField
       
      
    id="time3"
    label="من"
    type="time"
    defaultValue="07:30"
    InputLabelProps={{
        shrink: true,
    }}
    inputProps={{
        step: 300, // 5 min
    }}
  />
    <TextField
    
    id="time4"
    label="الى"
    type="time"
    defaultValue="07:30"
    InputLabelProps={{
        shrink: true,
    }}
    inputProps={{
        step: 300, // 5 min
    }}
  /> 
      </div>}
    <FormControlLabel
    control={<ColorCheckbox checked={color.checkedB} onChange={handleChangeBox} name="checkedB" />}
    label=""
  />
        </div>

        <div className={classes.time} style={{backgroundColor:'white',border: '1px solid black',borderRadius:10 , padding:10}}>
     <TextField
    id="time1"
    label="من"
    type="time"
    defaultValue="07:30"
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}
  />
    <TextField
    
    id="time2"
    label="الى"
    type="time"
    defaultValue="07:30"
    InputLabelProps={{
      shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}
  />
  </div>
  <div style={{color:'black'}}>
      {day}
  </div>
    </div>
  );
}
