import React,{useEffect} from "react";
import { makeStyles ,withStyles} from "@material-ui/core/styles";

import { useHistory ,useLocation } from 'react-router-dom';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
import Button from '@material-ui/core/Button';
import ChatAdministrator from "../../pages/LogIn/ChatAdministrator.js"
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Img from "./chating.png"

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
    border: "1px solid #ced4da",
    fontSize: 16,
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



const useStyles = makeStyles({
  tit:{
      position:'fixed',
      top:100,
      Right:100,
      display:'flex',
      alignItems:'center',
      justifyContent:'center' ,
      flexDirection:'column'
      
  }
  
});


export default function App(Props) {
    const {DepId , name} = Props;
    console.log("total name")
    console.log(name)

  const classes = useStyles();
  const [view, setView] = React.useState(true);
  const [doc, setDoc] = React.useState(false);
  const [flag,setFlag] = React.useState(false);
  const [headAll,setHeadAll] = React.useState();
  const [doctor,setDoctor] = React.useState();
  const [genderOther,setGenderOther] = React.useState();

  

  const [teacher,setTeacher] = React.useState();
  const  location  = useLocation();
  const handleChange = (event,value) => {
    
    setDoc(value);
    console.log("on change")

    console.log(value)
  };
  
  const handelOn = async() => {
  
      axios.get("https://core-graduation.herokuapp.com/getAllUsers")
  
     
      .then(res => {
        let w = res.data.response
        console.log(w)
        for(let kk = 0 ;kk<w.length;kk++){
          if(w[kk].name == name) setHeadAll(w[kk].id)
          if(w[kk].name == doc.name){
            setDoctor(w[kk].id)
            setGenderOther(w[kk].gender)
          } 
        }
        setView(false)
     
         },
          )
      
   
  
  }
  const {state} = location;
  useEffect(()=>{
    let listt = []
    axios.get("https://core-graduation.herokuapp.com/getAllUsers")
  
     
    .then(res => {
      console.log(res)
        console.log(res.data.response);
        let w = res.data.response;
        let x = 0
        for(let k = 0 ;k<w.length;k++){
          if(w[k].type == "head of department"){

            let teach = {name:w[k].name,id:x}
            x = x +1
            listt[k] = teach
          }
         }

        
       setTeacher(listt)
       setFlag(true)
       console.log(listt)
       },
        )
        
          
  },[]) 
  return (
      <div>

    {flag&&<div className={classes.tit}>
        {view?
        <div  >
            <div style={{position:'fixed',top:140,left:110}}><img width='170px' height='170px' src={Img} alt=""></img></div>
             <div style={{fontFamily:'Markazi Text',fontSize:'28px',position:'fixed',top:350,left:110}}>قم باختيار اسم الدكتور</div>
             <div style={{position:'fixed',top:420,left:115}}>
             <div className={classes.margin}>
             <Autocomplete
             dir="rtl"
      id="combo-box-demo"
      value={doc}
      onChange={handleChange}
      options={teacher}
      clearText="مسح"
      noOptionsText="لا يوجد خيارات"
      openText="فتح"
      getOptionLabel={(option) => option.name}
      style={{ width: 180 }}
      renderInput={(params) => <TextField {...params} label="" variant="outlined" />}
    />
        
      </div>
      <div style={{position:'fixed',top:460,left:135}}>
        <Button style={{marginTop:40,backgroundColor:'#045F5F',color:'white'}} variant="outlined" size="large" onClick={handelOn} >
          الانتقال الى المحادثة
        </Button>
        </div>
</div>
        </div>
    
    :
    <div>
        <ChatAdministrator otherName={doc} myName={name} myID={headAll} OtherID={doctor} setView={setView} genderOther={genderOther}/>
        </div>}
    </div>
    
    }
        

    </div>
  );
}
