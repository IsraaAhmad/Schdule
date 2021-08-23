import React from 'react';
import { makeStyles ,withStyles } from '@material-ui/core/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { createTheme } from '@material-ui/core'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import moment from "moment";
import { useState } from "react";
import {
  TimePicker,
  DateTimePicker,
  DatePicker,
  
} from "@material-ui/pickers";
import "moment/locale/ar-sa";
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
import "./styl.css"




const useStyles = makeStyles((theme) => ({
  datePicker: {
    color: '#045F5F',
    textColor: '#045F5F',
    calendarTextColor: '#045F5F',
    selectColor: '#045F5F',
    selectTextColor: '#045F5F',
    calendarYearBackgroundColor:'#045F5F',
    headerColor: '#045F5F',
  },
  container: {
    display: 'grid',
    boxShadow:3,
    width:1000,
    margin:130
    
   
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
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
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
  ttot:{
backgroundColor:'white'
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
    // marginTop:0,
    // borderBottomLeftRadius: 40,
    // borderBottomRightRadius: 40,
    

  
  },
  hed:{
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
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
const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";
export default function CSSGrid(Props) {
  const {name, DepId} = Props
   const customTheme = createTheme({
    overrides: {
      MuiPickersToolbar: {
          toolbar: {
              backgroundColor: '#045F5F',
          },
      },
      MuiPickersDay: {
          day: {
              color: 'black',

          },
          daySelected: {
              backgroundColor: '#D4AC0D',
          },
          dayDisabled: {
              color: '#D4AC0D',
          },
          current: {
              color: '#37474f',
          },
      },
      MuiPickersModal: {
          dialogAction: {
              color: '#D4AC0D', 
              backgroundColor: '#37474f',
          },
      },
  },
  })
  
  const [selectedDate1, setSelectedDate1] = React.useState(new Date('2021-08-18T21:11:54'));

  const handleDateChange1 = (date) => {
    setSelectedDate1(date);
  };
  const [selectedDate2, setSelectedDate2] = React.useState(new Date('2021-08-18T21:11:54'));

  const handleDateChange2 = (date) => {
    setSelectedDate2(date);
  };
  const classes = useStyles();
  const [value, setValue] = React.useState();

  const [date,setDate] = React.useState('');
  const [currentSem,setCurrentSem] = React.useState('');


  const  history  = useHistory();
 const f1=() =>{
  return new Promise((Resolve,Reject)=>{
    let value1 = "2"
    
    let date1 
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
    if (value === "s2"){
      value1 = "1"
    }
    const data11 = ""+selectedDate1
    const data2 = ""+selectedDate2
    const st1 = data11.split(' ')
    st1[4] = '06:00:00'
    let start1 = st1[0]+" "+st1[1]+" "+st1[2]+" "+st1[3]+" "+st1[4]+" "+st1[5]
    const en1 = data2.split(' ')
    en1[4] = '06:00:00'
    let end1 = en1[0]+" "+en1[1]+" "+en1[2]+" "+en1[3]+" "+en1[4]+" "+en1[5]
    let TotalDate = start1 +"/"+end1
    console.log("date:  "+ date1)
    console.log("sem:   "+ value1)
    console.log("start : " + start1)
    console.log("end : " + end1)
    console.log("TotalDate : " + TotalDate)

    let d0 ="08:00/17:00,1"
              let d1 ="08:00/17:00,1"
              let d2 ="08:00/17:00,1"
              let d3 ="08:00/17:00,1"
              let d4 ="08:00/17:00,1"
              let d5 ="08:00/17:00,1"
              let arr= d0+"*"+d1+"*"+d2+"*"+d3+"*"+d4+"*"+d5

              let b0 ="08:00/17:00,1,12:00/13:00,1,1,1"
              let b1 ="08:00/17:00,1,12:00/13:00,1,1,1"
              let b2 ="08:00/17:00,1,12:00/13:00,1,1,1"
              let b3 ="08:00/17:00,1,12:00/13:00,1,1,1"
              let b4 ="08:00/17:00,1,12:00/13:00,1,1,1"
              let b5 ="08:00/17:00,1,12:00/13:00,1,1,1"
              let arr1= b0+"*"+b1+"*"+b2+"*"+b3+"*"+b4+"*"+b5

              
    axios.get("https://core-graduation.herokuapp.com/addTimes?semester="+value1+"&date="+date1+
    "&courseTimes="+arr1+"&labsTimes="+arr+"&startandend="+TotalDate)
    .then(res => {console.log(res)
      Resolve() },)
    })
 }

 const f2=() =>{
  return new Promise((Resolve,Reject)=>{
    
    
    let date1 
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
    let value1 = "الثاني"
    if (value === "s2"){
      value1 = "الاول"
    }
    console.log("date:  "+ date1)
    console.log("sem:   "+ value1)
    const x1 = "تم اضافه الفصل"
    const x2 = " "+value1+" "
    const x3 = "من العام الدراسي"
    const x4 = " "+date1+" "
    const x5 = " , "
    const x6 = "يرجى البدء بانشاء الجدول الدراسي"
    const note = x1+x2+x3+x4+x5+x6
    let sem1 = 2
    if(value === "s2"){
      sem1 = 1
    }
    const time1 = date1+","+sem1
  
    axios.get("https://core-graduation.herokuapp.com/addNotification?idDep=0&note="+note+
    "&flag=2&time="+time1+"&hour=0")
    .then(res => {console.log(res)
      Resolve() },)
    })
 }
 const f3=() =>{
  return new Promise((Resolve,Reject)=>{
    
    
    let date1 
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
    let value1 = "الثاني"
    if (value === "s2"){
      value1 = "الاول"
    }
    console.log("date:  "+ date1)
    console.log("sem:   "+ value1)
    const x1 = "تم اضافه الفصل"
    const x2 = " "+value1+" "
    const x3 = "من العام الدراسي"
    const x4 = " "+date1+" "
    const x5 = " , "
    const x6 = "يرجى اضافة مواعيد الدوام الخاصة بك"
    const note = x1+x2+x3+x4+x5+x6
    let sem1 = 2
    if(value === "s2"){
      sem1 = 1
    }
    const time1 = date1+","+sem1
  
    axios.get("https://core-graduation.herokuapp.com/addNotification?idDep=0&note="+note+
    "&flag=3&time="+time1+"&hour=0")
    .then(res => {console.log(res)
      Resolve() },)
    })
 }
  const f4=()=>{
    let date1 
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
    let value1 = "2"
    if (value === "s2"){
      value1 = "1"
    }
    history.push({
      pathname: './tableTime',
      state: { sem: value1 ,date:date1,flagT :"New",duration:"test",name:name,DepId:DepId
      
      }
    })
  }
  const handelNext =  async() =>{ 
    await f1()

    await f2()

    await f3()
    f4()
   

    
  
  }

  const handleChangeRadio = (event) => {
    setValue(event.target.value);
  };

  const handelDate =(event)=>{
   setDate(event.target.value)
   
  }


  const BootstrapInput = withStyles((theme) => ({
    root: {
      "label + &": {
        marginTop: theme.spacing(3)
      }
    },
    input: {
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      borderRadius: 4,
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
    <div className={classes.ttot}>
      <div className={classes.hed}>
        بيانات الجدول 
      </div>
     

      <div container className={classes.cont} spacing={1} >

      <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',margin:15}}>





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
          </div>
          <div className={classes.papertext} style={{marginRight:40}}>:الفصل الدراسي الحالي  </div>


          <div >
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
  </div>


<div >
<span className={classes.papertext} style={{marginLeft:20}}> السنة الدراسية للجدول</span>
</div>
      </div>

      <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',margin:15}}>

      <div>
          <MuiThemeProvider theme={customTheme}>
      
    
          <MuiPickersUtilsProvider utils={DateFnsUtils} theme={customTheme}>
     
     <KeyboardDatePicker theme={customTheme}
     style={{backgroundColor:'white',borderRadius: 4,
     border: "2px solid #045F5F",}}

     className={classes.datePicker}
     clearable
     inputVariant="outlined"
     okLabel={<span style={{fontFamily:'Markazi Text',fontSize:'25px',color:'#045F5F'}}>موافق</span>}
     cancelLabel={<span style={{fontFamily:'Markazi Text',fontSize:'25px',color:'#045F5F'}}>الغاء</span>}
     clearLabel={<span style={{fontFamily:'Markazi Text',fontSize:'25px',color:'#045F5F'}}>مسح</span>}
     margin="normal"
     id="date-picker-dialog"
     label=""
     format="MM/dd/yyyy"
     value={selectedDate2}
     onChange={handleDateChange2}
     locale="ar-SA"
     KeyboardButtonProps={{
       'aria-label': 'change date',
      }}
      />
     
 
 </MuiPickersUtilsProvider>
 </MuiThemeProvider>
            </div>

<div style = {{fontFamily:'Markazi Text',fontSize:'25px',display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center',marginLeft:10,marginRight:40}}>:تاريخ نهاية الفصل</div>


          <div>
          <MuiThemeProvider theme={customTheme}>
      
    
          <MuiPickersUtilsProvider utils={DateFnsUtils} theme={customTheme}>
     
     <KeyboardDatePicker theme={customTheme}
     style={{backgroundColor:'white',borderRadius: 4,
     border: "2px solid #045F5F",}}

     className={classes.datePicker}
     clearable
     inputVariant="outlined"
     okLabel={<span style={{fontFamily:'Markazi Text',fontSize:'25px',color:'#045F5F'}}>موافق</span>}
     cancelLabel={<span style={{fontFamily:'Markazi Text',fontSize:'25px',color:'#045F5F'}}>الغاء</span>}
     clearLabel={<span style={{fontFamily:'Markazi Text',fontSize:'25px',color:'#045F5F'}}>مسح</span>}
     margin="normal"
     id="date-picker-dialog"
     label=""
     format="MM/dd/yyyy"
     value={selectedDate1}
     onChange={handleDateChange1}
     locale="ar-SA"
     KeyboardButtonProps={{
       'aria-label': 'change date',
      }}
      />
     
 
 </MuiPickersUtilsProvider>
 </MuiThemeProvider>
            </div>
          
            <div style = {{fontFamily:'Markazi Text',fontSize:'25px',display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center',marginLeft:10}}>:تاريخ بداية الفصل</div>

      </div>







        
     
          
      </div>


      




  
      
      
      
     
      
       <Button variant="contained" className={classes.bto}  onClick={handelNext} size='medium'>
       التالي
      </Button>


    </div>
  );
}
