import React from "react";
import { useHistory ,useLocation } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Fade from '@material-ui/core/Fade';
import CancelIcon from '@material-ui/icons/Cancel';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import HashLoader from "react-spinners/HashLoader";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { css } from "@emotion/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Done } from "@material-ui/icons";


// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;



const useStyles = makeStyles({
    pos:{
        position:'absolute',
        right: 800,
        top:200,
        
    },
    ent:{
        display:'flex',
        flexDirection:'column',
        border: '2px solid white',
        padding:10,
        borderRadius:20,
        boxShadow: "5px 5px 5px white"

        
    },
    textField: {
      textAlign:'right',
      backgroundColor:'white',
      margin:20,
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border: "2px solid black",
  
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          border: "2px solid #7F7F83"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          border: "3px solid #045F5F",
      // borderRadius: 4,
      // border: "2px solid #045F5F",
        }
    },
    forget:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      fontSize:'20px',
        fontFamily:'Markazi Text',
        margin:0,
    },
    text:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        height:20,
        width:'100%',
        fontSize:'30px',
        fontFamily:'Markazi Text',
        margin:10,
        color:'#008089',
        fontStyle:'bold'
    },
    lod:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      padding:'30px',
      marginLeft: '30px',
      marginRight:'30px',
      marginTop:'80px',
      position:'absolute',
      right: 850,
      top:280,
      

    }
  
  
});

export default function App(Props) {
  const {setEmail , email} = Props
  const classes = useStyles();
  const  history  = useHistory();
  const [flag,SetFlag] =React.useState(false);
  const [department,setDepartment] =React.useState(false);
  const [name,setName] =React.useState(false);
  const [type,setType] =React.useState(false);
  const [userEmail,setUserEmail] =React.useState();
  const [loading, setLoading] = React.useState(false);

  const [diaOK,setDiaOK] = React.useState(false);
  const [diaNO,setDiaNO] = React.useState(false);
  const [diaNOCode,setDiaNOCode] = React.useState(false);

  const [diaCode,setDiaCode] = React.useState(false);

  const [openOK, setOpenOK] = React.useState(false);
  const [openNO, setOpenNO] = React.useState(false);
  const [openNOCode, setOpenNOCode] = React.useState(false);


   const [openCode, setOpenCode] = React.useState(false);
  const [openCodeCancel, setOpenCodeCancel] = React.useState(false);



  const handleCode = () =>{
    console.log("ok")
    let x  = document.getElementById('code').value
    console.log(x)
    console.log(userEmail)
    let url = "http://core-graduation.herokuapp.com/sendEmailWithPassword?email="+userEmail+"&code="+x
    axios.get(url)
    .then(res => {
      console.log(res)
      if(res.data.response[0].state == "Failed"){
        console.log("no")
        FaildSendCode()
        
      }
      else{
        console.log("yes")
        DoneSend()
      }
  })
}
  const handleCodeCancel = () =>{
    console.log("cancel")
    setDiaCode(false)
  setOpenCode(false)
  }

  const handelOpenCode = () => {
    // openCode(true);
 
    
  };

  
  const handleOK = () => {
    setOpenOK(false);
    setEmail(false)
    
  };

  const handleNO = () => {
    setOpenNO(false);
  };
  const handleNOCode = () => {
    setOpenNOCode(false);
  };

 const handelBack = () =>{
    setEmail(false)
 }
 const DoneSend = () =>{
    setOpenOK(true);
    setDiaOK(true)
 }

 const FaildSend = () =>{
    setOpenNO(true);
    setDiaNO(true)
    setDiaCode(false)
  setOpenCode(false)
}

const FaildSendCode = () =>{
  setOpenNOCode(true);
  setDiaNOCode(true)
}
const handelSend = () =>{
 
 let url = "https://core-graduation.herokuapp.com/checkAndSendEmail?email="+userEmail
    // axios.get("https://core-graduation.herokuapp.com/getAllMaterialsOfDepartment?idDep=60ddc9735b4d43f8eaaabf83")
    setLoading(true)
  axios.get(url)
        .then(res => {
          console.log(res.data.response[0].state)
          let w1 = res.data.response[0].state
          setLoading(false)
          if(w1 ==="Done"){
             EnterCode()
              // DoneSend()
          }
          else{
              FaildSend()
          }
         
          


         
          })
       
 
            
}
const EnterCode = () => {
  setDiaCode(true)
  setOpenCode(true)
}


 
const handelOnChangeNumber = (event)=>{
    setUserEmail(event.target.value)
}


  return (
    <div >
    {loading?
            <div className={classes.lod}>
      <HashLoader  loading={loading} color='#008089' size={100} />
    </div>



    :
    <div className={classes.pos}>
        <div className={classes.text}>نسيت كلمة المرور </div>
        <div className="ent" >

        <TextField 
         inputProps={{min: 0, style: { textAlign: 'right' ,
        
    fontFamily:'Markazi Text',
    fontSize:'20px',}}}
          id="email"
          label=" "
          variant="outlined"
          required='true'
          placeholder="ادخل البريد الاكتروني  "
          className={classes.textField}
          style={{ borderColor: 'red' }}
          onChange = {handelOnChangeNumber}
          />






<Button variant="contained" style={{backgroundColor:'#008089'}} onClick={handelSend}>
         
              <div style = {{textAlign: 'right',
          fontFamily:'Markazi Text',
          fontSize:'20px', marginLeft:4,color:'white'}}>
                 ارسال  
              </div>
      </Button>
      

             <Button> 
             <div  onClick={handelBack} className={classes.forget}>رجوع</div>
             </Button>
    
    </div>
        </div>}
        {diaOK&&<div>
            <Dialog
            open={openOK}
            onClose={handleOK}
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
                تم ارسال كلمة المرور الجديدة الى الايميل
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleOK} color="primary" autoFocus style={{ fontFamily: 'Markazi Text',fontSize:'35px',color:'#045F5F'}}>
               <CheckCircleIcon style={{color:'#045F5F' }} fontSize='large'/>
              </Button>
              
            </DialogActions>
          </Dialog>
            </div>}

            {setDiaNO&&<div>
            <Dialog
            open={openNO}
            onClose={handleNO}
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
                 يرجى التأكد من ادخال الايميل بشكل صحيح
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleNO} color="primary" autoFocus style={{ fontFamily: 'Markazi Text',fontSize:'35px',color:'#045F5F'}}>
               <CancelIcon style={{color:'red' }} fontSize='large'/>
              </Button>
              
            </DialogActions>
          </Dialog>
            </div>}


            {setDiaCode&&<div>
              
      <Dialog  dir="rtl" open={openCode} onClose={handelOpenCode} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <div style ={{ fontFamily: 'Markazi Text',fontSize:'25px'}}>ارسال كود الى البريد الاكتروني
            </div></DialogTitle>
        <DialogContent>
          <DialogContentText>
            تم ارسال كود الى البريد الالكتروني الخاص بك , ادخلة في الفراغ
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="code"
            label=""
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCode} color="primary">
          {/* <CheckCircleIcon style={{color:'#045F5F' }} fontSize='large'/> */}
         <div style ={{ fontFamily: 'Markazi Text',fontSize:'30px',color:'#045F5F'}}>تم</div> 
          </Button>
          <Button onClick={handleCodeCancel} color="primary">
          {/* <CancelIcon style={{color:'red' }} fontSize='large'/> */}
          <div style ={{ fontFamily: 'Markazi Text',fontSize:'20px',color:'#045F5F'}}>الغاء</div>
          </Button>
        </DialogActions>
      </Dialog>
            </div>}



            {setDiaNOCode&&<div>
            <Dialog
            open={openNOCode}
            onClose={handleNOCode}
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
                 الكود الذي ادخلته غير صحيح
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleNOCode} color="primary" autoFocus style={{ fontFamily: 'Markazi Text',fontSize:'35px',color:'#045F5F'}}>
               <CancelIcon style={{color:'red' }} fontSize='large'/>
              </Button>
              
            </DialogActions>
          </Dialog>
            </div>}



            

    
       
    </div>
  );
}
