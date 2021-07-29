import React from 'react';
import { makeStyles ,withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';
import { useHistory ,useLocation } from 'react-router-dom';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    boxShadow:3,
    
   
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  paper2: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    height:50,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    display:'flex',
    alignItems:'right',
  },
  paper1: {
    margin:7,
    height:50,
    textAlign: 'center',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#37474f',
    color:'white',
    whiteSpace: 'nowrap',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    fontFamily:'Markazi Text',
    fontSize:'25px',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  textField: {
    textAlign:'right',
    backgroundColor:'white',
    width:'100%',
    display:'flex',
     margin:7,
    align:'left',
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        border: "2px solid #045F5F",

      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        border: "2px solid #D4AC0D"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "2px solid #D4AC0D",
    // borderRadius: 4,
    // border: "2px solid #045F5F",
      }
  },
  choose:{
      height:5

  },
  bto:{
    margin:20,
    backgroundColor:'#045F5F',
     color:'white',
     fontFamily:'Markazi Text',
     fontSize:'30px',
    '&:hover': {
      backgroundColor:'#white',
      color: '#37474f',
  },
  },
  papertext: {
    textAlign: 'center',
    color: 'black',
    whiteSpace: 'nowrap',
    height:50,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    fontFamily:'Markazi Text',
    fontSize:'25px',
  },
  x:{
      display:'flex',
      flexDirection:'row'
  },
  cont:{
    marginTop:0,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,

  
  },
  hed:{
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width:'98.5%',
    marginRight:8,
    height:60,
    backgroundColor:'#37474f',
    // borderColor:'#37474f',
    // border: '2px solid #37474f',
    fontSize:'35px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    fontFamily:'Markazi Text',
    color:'white',
    marginBottom:0,

  }
}));

export default function CSSGrid() {
  const classes = useStyles();
  const [year, setYear] = React.useState('');
  const [room, setRoom] = React.useState('');
  const [time, setTime] = React.useState('');
  const [value, setValue] = React.useState();
  const [name,setName] = React.useState('');
  const [date,setDate] = React.useState('');
  const [currentSem,setCurrentSem] = React.useState('');


  const  history  = useHistory();
  const [openYear, setOpenYear] = React.useState(false);
  const [openRoom, setOpenRoom] = React.useState(false);
  const [openTime, setOpenTime] = React.useState(false);
 
  const handelOnChangeName = (event) =>{
    setName(event.target.value)
  }
  
  const handelNext =  () =>{ 
    let date1 
    let value1 = "2"

    switch(date){
      case "10":
        date1 ="2018/2019"
        break;
      
      case "20":
        date1 ="2019/2020"
        break;

      case "30":
        date1 ="2020/2021"
        break;

      case "40":
        date1 ="2021/2022"
        break;

      case "50":
        date1 ="2022/2023"
        break;
      
      case "60":
        date1 ="2023/2024"
        break;

      case "70":
        date1 ="2024/2025"
        break;
      
      case "80":
        date1 ="2025/2026"
        break;

     
        
      default:
        break;
    }
    if (value == "s2"){
      value1 = "1"
    }
    console.log("name:  "+ name)
    console.log("date:  "+ date1)
    console.log("sem:   "+ value1)


  //   let url = "https://core-graduation.herokuapp.com/addCourseToDepartment?idDep=60ddc9735b4d43f8eaaabf83&name="+
  //   name+"&date="+date1+"&sem="+value1
  //   // axios.get("https://core-graduation.herokuapp.com/getAllMaterialsOfDepartment?idDep=60ddc9735b4d43f8eaaabf83")
  // axios.get(url)
    
  //       .then(res => {
  //         console.log(res)
  //           console.log(res.data.response);
  //         },
 
  //           )




    
     history.push({
      pathname: './tableCreate',
      state: { name: name ,
        index:3
      }
    })
  }

  const handleChangeRadio = (event) => {
    setValue(event.target.value);
  };
   const handelSem = (event) =>{
     setCurrentSem(event.target.Select)

   }


  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };
  const handelDate =(event)=>{
   setDate(event.target.value)
   
  }
  const handleCloseTime = () => {
    setOpenTime(false);
  };

  const handleOpenTime = () => {
    setOpenTime(true);
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };

  const handleCloseYear = () => {
    setOpenYear(false);
  };

  const handleOpenYear = () => {
    setOpenYear(true);
  };
  const handleChangeRoom = (event) => {
    setRoom(event.target.value);
  };

  const handleCloseRoom = () => {
    setOpenRoom(false);
  };

  const handleOpenRoom = () => {
    setOpenRoom(true);
  };
  const BootstrapInput = withStyles((theme) => ({
    root: {
      "label + &": {
        marginTop: theme.spacing(3)
      }
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #045F5F",
      fontSize: 16,
      height:25,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
      }
    }
  }))(InputBase);

  return (
    <div>
      <div className={classes.hed}>
        بيانات الجدول 
      </div>
        <Box boxShadow={3}
        bgcolor="background.paper"
        m={1}
        p={1}
        className={classes.cont}>

      <Grid container className={classes.cont} spacing={1} >
          
        
      <Grid item xs={12}>
          <div style={{height:30}}></div>
          </Grid>
          

        <Grid item xs={10}>
          
          <TextField 
          inputProps={{min: 0, style: { textAlign: 'right' ,
        
    fontFamily:'Markazi Text',
    fontSize:'20px',}}}
          id="outlined-basic"
          label=" "
          onChange={handelOnChangeName}
          variant="outlined"
          required='true'
          className={classes.textField}
          style={{ borderColor: 'red' }}
          />
        </Grid>


        <Grid item xs={2}>
          <div className={classes.papertext}>اسم الجدول </div>
          </Grid>
          <Grid item xs={12}>
          <div style={{height:10}}></div>
          </Grid>
          <Grid item xs={1}>
          <div className={classes.papertext}></div>
          </Grid>


          <Grid item xs={6} >

            <div style={{display:'flex',flexDirection:'row'}}>
          <FormControl component="fieldset"  >
      
      <RadioGroup  row aria-label="position" name="position" id="sem" value={value} onChange={handleChangeRadio}>
       
        <FormControlLabel
          value="s1"
          control={<Radio style={{color:"#045F5F"}} />}
          label={<span style={{fontFamily:'Markazi Text',fontSize:'25px'}}>فصل ثاني</span>}
          labelPlacement="start"
          />

<FormControlLabel
          value="s2"
          control={<Radio style={{color:"#045F5F"}} />}
          label={<span style={{fontFamily:'Markazi Text',fontSize:'25px'}}>فصل اول</span>}
          labelPlacement="start"
          />
      
      </RadioGroup>
    </FormControl>
    <div className={classes.papertext}>:الفصل الدراسي الحالي  </div>
          </div>
            </Grid>


        



          <Grid item xs={2}>
            <FormControl className={classes.choose}>
        <NativeSelect
          id="date"
          value={date}
          onChange={handelDate}
          input={<BootstrapInput />}
          style={{width:160}}
          width='150px'
        >
          <option aria-label="None"   />
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={10}>2018/2019</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={20}>2019/2020</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={30}>2020/2021</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={40}>2021/2022</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={50}>2022/2023</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={60}>2023/2024</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={70}>2024/2025</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={80}>2025/2026</option>
        </NativeSelect>
      </FormControl>
            </Grid>


        <Grid item xs={3}>
          <span className={classes.papertext}> السنة الدراسية للجدول</span>
          </Grid>
          <Grid item xs={12}>
          <div className={classes.papertext}></div>
          </Grid>
      
      </Grid>
     
      
      
      
     
       </Box>
       <Button variant="contained" className={classes.bto}  onClick={handelNext} size='medium'>
       التالي
      </Button>


    </div>
  );
}
