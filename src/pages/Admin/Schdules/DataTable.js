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
    
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  
  }
}));

export default function CSSGrid() {
  const classes = useStyles();
  const [year, setYear] = React.useState('');
  const [room, setRoom] = React.useState('');
  const [time, setTime] = React.useState('');
  const [openYear, setOpenYear] = React.useState(false);
  const [openRoom, setOpenRoom] = React.useState(false);
  const [openTime, setOpenTime] = React.useState(false);
  
  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };

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
        <Box boxShadow={3}
        bgcolor="background.paper"
        m={1}
        p={1}
        className={classes.cont}>

      <Grid container className={classes.cont} spacing={1} >
          
        
        

        <Grid item xs={10}>
          
          <TextField 
          inputProps={{min: 0, style: { textAlign: 'right' ,
        
    fontFamily:'Markazi Text',
    fontSize:'20px',}}}
          id="outlined-basic"
          label=" "
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
          <div className={classes.papertext}></div>
          </Grid>
          <Grid item xs={7}>
          <div className={classes.papertext}></div>
          </Grid>

          <Grid item xs={2}>
            <FormControl className={classes.choose}>
        <NativeSelect
          id="demo-customized-select-native"
          value={time}
          onChange={handleChangeTime}
          input={<BootstrapInput />}
          style={{width:160}}
          width='150px'
        >
          <option aria-label="None" value="" />
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
    </div>
  );
}
