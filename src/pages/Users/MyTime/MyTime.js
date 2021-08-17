import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print';
import DrawerUser from "../DrawerUser.js"
import ClearIcon from '@material-ui/icons/Clear';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import FormLabel from '@material-ui/core/FormLabel';
import { Checkbox } from '@material-ui/core';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TableConst from "./TableConst.js"
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {useLocation} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { renderAvatar } from "@material-ui/x-grid-data-generator";

const useStyles =  makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
   
    
  },
  
  wieght:{
    display:'flex',
    justifyContent:'flex-end',
    
      paddingLeft:10,
  },
    tot:{

        marginTop:70,
        marginRight:200,
        width:820
    },
    com:{
      backgroundColor:'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center'
      
      
  },
  ti:{
      margin: 10,
      fontSize: 25,
      fontFamily: 'Markazi Text',
      display: 'flex',
  },
  wie:{
      display: 'flex',
      flexDirection: 'row',
  },
  tit:{
      display: 'flex',
      justifyContent:'flex-end',
      alignContent:'center',
      alignItems:'center',
      flexDirection: 'row',
      paddingTop:25,
      paddingLeft:16,
      fontSize: 25,
      fontFamily: 'Markazi Text',
      
  },
  
  cas:{
      marginTop: 25,
  },
  time:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent:'flex-end',
      paddingLeft:10,
      
  },
  day:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent:'flex-end',
      paddingLeft:10,
  },
}));
function ValueLabelComponent(props) {
  const { children, open, value } = props;
  

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired
};

const PrettoSlider = withStyles({
  root: {
    color: "#045F5F",
    height: 8
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit"
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

function valuetext(value) {
  return `${value}`;
}


export default function App(props) {
  let location = useLocation();
  const {state} = location;
  console.log("stateeeeee444eeeee")
  console.log(state)
  const [ren,setRen] =  useState(false)
  const [value1,setValue1] = useState()
  const [flagNote,setFlagNote] = useState(true)

  const [value2,setValue2] = useState()
  const [weight,setWeight] = useState(0)
  const [dia,setDia] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const  history  = useHistory();

  
  const handleClose = () => {
    setOpen(false);
  
  };

  const classes = useStyles();
  const HandelAdd=() =>{
    let y =[]
    let day = ['سبت','احد','اثنين','ثلاثاء','اربعاء','خميس',]
    let x1 =  document.getElementById('causes').value
    let x2 =  document.getElementById('start').value
   let x3 =  document.getElementById('end').value
    y[5] =  document.getElementById('thu').checked
    y[4] =  document.getElementById('wed').checked
    y[3] =  document.getElementById('tus').checked
    y[2] =  document.getElementById('mon').checked
    y[1] =  document.getElementById('sun').checked
    y[0] =  document.getElementById('sat').checked
    let x10 =""
    if(weight == 0)
     x10="0"
     else if(weight == 33)
     x10="0.3"
     else if(weight == 66)
     x10="0.6"
     else if(weight == 99)
     x10="0.9"

    let x11 =  document.getElementById('r1').value
    let ss =""
    for(let i =0 ; i<6;i++){
      if (ss == ""){
        if(y[i])
           ss+=day[i]}
      else{
        if(y[i])
           ss+=","+day[i]

      }
    }
    console.log("causes="+x1)
    console.log("start="+x3)
    console.log("end="+x2)
    console.log("days="+ss)
    console.log("x10="+x10)
    console.log("need="+value2)
    console.log("space="+value1)

    let url = "https://core-graduation.herokuapp.com/addSoftConst?idDep="+state.DepId+"&note="
        +x1+"&start="+x3+"&end="+x2+"&days="+ss+"&weight="+x10+"&need="+value2+"&space="+value1+
        "&instName="+state.InstName
  
    axios.get(url).then(res => {console.log(res)},)
    setOpen(true);
    setDia(true)
    setRen(!ren)

  }
  const handelW=(event , value) =>{
    setWeight(value)
}
const handleChangeRadio1 = (event) => {
  
};
const handelCloseNote =() =>{
  setFlagNote(false)
}
const handleChangeRadio2 = (event) => {
  setValue2(event.target.value);
};

const handelchange1=(event) =>{
  setValue1(event.target.checked);
}

  return (
    <div style={{height:3000 }}  className="back">
      <DrawerUser DepName={state.DepName} DepId ={state.DepId} InstName = {state.InstName}/>

      <div className = {classes.tot}>
      <div style={{
        display:'flex',
        justifyContent:'center',
        fontSize: 35,
      fontFamily: 'Markazi Text',
      backgroundColor:'#37474f',
      color :'white'
      }}>اوقات الدوام</div>
<div style={{backgroundColor:'white',boxShadow: "3px 3px 3px #9E9E9E"}}>
  
  {flagNote&&<div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
<div style={{boxShadow: "3px 3px 3px #9E9E9E",display:'flex',flexDirection:'row',
alignContent:'center',marginTop:15,padding:10 }}>
    <div>
      <Button onClick={handelCloseNote} >

      <ClearIcon fontSize="small" style={{color:'#045F5F'}}/>
      </Button>
    </div>
  <div style={{fontSize: 20,fontFamily: 'Markazi Text',color:'#B4B2B2',display:'flex',justifyContent:'center',marginRight:13}}>
    الرجاء ادخال مده محاضره واحده لكل اضافة</div>
    </div>
  </div>}
 
                <div className={classes.tit} style={{marginBottom:22}}>
                  <TextField 
                  
                    inputProps={{min: 0, style: { textAlign: 'right' ,
                    fontFamily:'Markazi Text',
                    fontSize:'20px',}}}
                        label=" "
                        variant="outlined"
                        required='true'
                        style={{backgroundColor:'white',
                        borderRadius:'25px' ,
                        width:600,
                        marginRight:20}} 
                        id="causes" 
                        label="" 
                        variant="outlined" />
                 
                  <div className={classes.cas}> :ملاحظات</div>

                </div>
                  {/* <input type ="number" placeholder="start" id="start" onChange={this.handelchange} value={this.state.start} ></input> */}
                  {/* <input type ="number" placeholder="end" id="end" onChange={this.handelchange} value={this.state.end} ></input> */}
                 <div className={classes.time} style={{marginBottom:22}}>

                  <TextField
                      id="start"
                      label="الى"
                      type="time"
                      InputLabelProps={{
                          shrink: true,
                       }}
                       inputProps={{ 
                         step: 300, // 5 min
                       }}
                       />
                <div className={classes.ti} style={{marginRight:40}}>وقت الانتهاء </div>
                <TextField
                      id="end"
                      label="من"
                      type="time"
                      InputLabelProps={{
                          shrink: true,
                       }}
                       inputProps={{
                           step: 300, // 5 min
                       }}
                       />
                       <div className={classes.ti} style={{marginLeft:40}}>وقت البدء </div>
                       </div>

    <div className={classes.day} style={{marginBottom:22}}>

        <FormControlLabel
                  value="top"
                  control={<Checkbox id="thu" onChange={handelchange1} style={{color:"#045F5F"}} value="خميس"/>}
                  label={<spane style={{fontFamily:'Markazi Text',fontSize:'20px'}}>خميس</spane>}
                  style={{fontSize:'30px'}}
                  labelPlacement="top"
                  />
          <FormControlLabel
                    value="top"
                    control={<Checkbox id="wed" onChange={handelchange1}  style={{color:"#045F5F"}} value="اربعاء"/>}
                    label={<spane style={{fontFamily:'Markazi Text',fontSize:'20px'}}>اربعاء</spane>}
                    style={{fontSize:'30px'}}
                    labelPlacement="top"
                    />
          <FormControlLabel
                    value="top"
                    control={<Checkbox id="tus" onChange={handelchange1} style={{color:"#045F5F"}} value="ثلاثاء"/>}
                    label={<spane style={{fontFamily:'Markazi Text',fontSize:'20px'}}>ثلاثاء</spane>}
                    style={{fontSize:'30px'}}
                    labelPlacement="top"
                    />
          
          <FormControlLabel
                    value="top"
                    control={<Checkbox id="mon" onChange={handelchange1} style={{color:"#045F5F"}} value="اثنين"/>}
                    label={<spane style={{fontFamily:'Markazi Text',fontSize:'20px'}}>اثنين</spane>}
                    style={{fontSize:'30px'}}
                    labelPlacement="top"
                    />
          <FormControlLabel
           value="top"
           control={<Checkbox id="sun" onChange={handelchange1} style={{color:"#045F5F"}} value="احد"/>}
           label={<spane style={{fontFamily:'Markazi Text',fontSize:'20px'}}>احد</spane>}
           style={{fontSize:'30px'}}
           labelPlacement="top"
           />
    <FormControlLabel
          value="top"
          control={<Checkbox id="sat" onChange={handelchange1} style={{color:"#045F5F"}} value="سبت"/>}
          label={<spane style={{fontFamily:'Markazi Text',fontSize:'20px'}}>سبت</spane>}
          style={{fontSize:'30px'}}
          labelPlacement="top"
          />
         



          <div className={classes.tit} style={{marginLeft:50}}>:الايام</div>
          </div>
<div className={classes.wieght} style={{marginBottom:22}}>
  

          <div className={classes.root}>
      <div className={classes.margin} />

      <PrettoSlider
        onChange = {handelW}
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        id = "weight"
        step={33}
        marks
        min={0}
        max={100}
        />
    </div>
    <div style={{fontSize: 25,fontFamily: 'Markazi Text',marginRight:10,marginLeft:50}}>:الأهمية</div>
        </div>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',marginRight:10,marginLeft:15 ,marginBottom:22}}>

        <FormControlLabel
           value="top"
           control={<Checkbox id="sun" onChange={handelchange1} style={{color:"#045F5F"}} value="احد"/>}
           label={<spane style={{fontFamily:'Markazi Text',fontSize:'20px'}}>نعم</spane>}
           style={{fontSize:'30px'}}
           labelPlacement="start"
           />
           <div style={{fontSize: 25,fontFamily: 'Markazi Text',marginRight:10,marginLeft:15}}>: فراغ بين المحاضرات</div>
           </div>


        <div style={{display:'flex',justifyContent:'flex-end',marginRight:10,marginLeft:15}}>
        <FormControl component="fieldset">
      <RadioGroup id ="r1" row aria-label="position" value={value1} onChange={handleChangeRadio2}>
       
        <FormControlLabel 
        value="true" 
        labelPlacement="start"
        control={<Radio style={{color:'#045F5F'}} />} 
        label={<span style={{fontSize: 25,fontFamily: 'Markazi Text',}}>اريد محاضره في هذا الموعد</span>} />
         <FormControlLabel 
        value="false" 
        labelPlacement="start"
        control={<Radio style={{color:'#045F5F'}} />} 
        label={<span style={{fontSize: 25,fontFamily: 'Markazi Text',}}>لا اريد محاضره في هذا الموعد</span>} />
      </RadioGroup>
    </FormControl>
        </div>
       
        
          <Button  onClick={HandelAdd} variant="contained"type ="submit" size="small" style={{marginLeft:20,marginBottom:30,  backgroundColor:'#045F5F',color:'white',fontFamily:'Markazi Text',fontSize:'20px'}} >
          اضافة 
        </Button>
        {dia&&<div>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            dir='rtl'
          >
            <DialogTitle id="alert-dialog-title" >
              <div style={{ fontFamily: 'Markazi Text',fontSize:'35px',borderRadius:'5px'}}>
             
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div  style={{ fontFamily: 'Markazi Text',fontSize:'30px',}}>
                 تم اضافة المساق بنجاح
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus style={{ fontFamily: 'Markazi Text',fontSize:'35px',color:'#045F5F'}}>
               <CheckCircleIcon style={{color:'#045F5F' }} fontSize='large'/>
              </Button>
              
            </DialogActions>
          </Dialog>
            </div>}
                 
                  

                  </div>
      </div>
      <div className = {classes.tot}>

    <TableConst DepId = {state.DepId} DepName={state.DepName} InstName={state.InstName} ren={ren}/>
      </div>
    </div>

  
  );
}

