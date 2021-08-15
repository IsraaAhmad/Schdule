import React from "react";
import { useHistory ,useLocation } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import HashLoader from "react-spinners/HashLoader";
import { css } from "@emotion/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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
  const {setEmail} = Props
  const classes = useStyles();
  const  history  = useHistory();
  const [flag,SetFlag] =React.useState(false);
  const [department,setDepartment] =React.useState(false);
  const [name,setName] =React.useState(false);
  const [type,setType] =React.useState(false);
  const [userName,SetUserName] =React.useState();
  const [password,SetPassword] =React.useState();
  const [loading, setLoading] = React.useState(false);

 const handelEmail = () =>{
  setEmail(true)
 }
const handelUser = () =>{
 
 let url = "https://core-graduation.herokuapp.com/loginAuthorization?idUser="+userName+"&password="+password
    // axios.get("https://core-graduation.herokuapp.com/getAllMaterialsOfDepartment?idDep=60ddc9735b4d43f8eaaabf83")
    setLoading(true)
    console.log(url)
  axios.get(url)
        .then(res => {
          console.log(res)
          setLoading(false)
          let dep = res.data.response[0]
          if(dep.idDep === "None"){
            SetFlag(true);
            console.log("not correct");
          }
          else{
            console.log(" correct");
            setDepartment(dep.idDep)
            setName(dep.name)
            setType(dep.type)
            console.log(type)
            if(dep.type === "head of department"){
              history.push({
                pathname: './AdminHome',
                state: { name: dep.name ,
                  DepId:dep.idDep
                }
              })
             
            }
            else if(dep.type === "normal"){
              history.push({
                pathname: './UsersHome',
                state: { DepName: dep.depName ,
                  DepId:dep.idDep,
                  InstName:dep.name
                }
              })

            }
            else if(dep.type === "head"){
              
              history.push({
                pathname: './AdministratorHome',
                state: { DepName: dep.depName ,
                  DepId:dep.idDep,
                  InstName:dep.name
                }
              })

            }


          }


          // history.push('./AdminHome')
          })
        .catch((error) => {
            SetFlag(true);
            console.log("not correct");
          })
 
            
}

 
const handelOnChangeNumber = (event)=>{
  SetUserName(event.target.value)
}

const handelOnChangePassword = (event) =>{
  SetPassword(event.target.value)
}
  return (
    <div >
    {loading?
            <div className={classes.lod}>
      <HashLoader  loading={loading} color='#008089' size={100} />
    </div>



    :
    <div className={classes.pos}>
        <div className={classes.text}>تسجيل الدخول</div>
        <div className="ent" >

        <TextField 
         inputProps={{min: 0, style: { textAlign: 'right' ,
        
    fontFamily:'Markazi Text',
    fontSize:'20px',}}}
          id="userType"
          label=" "
          variant="outlined"
          required='true'
          placeholder="ادخل رقم التسجل"
          className={classes.textField}
          style={{ borderColor: 'red' }}
          onChange = {handelOnChangeNumber}
          />




<TextField dir="rtl"
         inputProps={{min: 0, style: { textAlign: 'right' ,
        
    fontFamily:'Markazi Text',
    fontSize:'20px',}}}
          id="password"
          label=" "
          type="password"
          variant="outlined"
          required='true'
          placeholder="ادخل كلمة المرور"
          className={classes.textField}
          style={{ borderColor: 'red' }}
          onChange = {handelOnChangePassword}
          />


<Button variant="contained" style={{backgroundColor:'#008089'}} onClick={handelUser}>
         
              <div style = {{textAlign: 'right',
          fontFamily:'Markazi Text',
          fontSize:'20px', marginLeft:4,color:'white'}}>
                 تسجيل الدخول
              </div>
      </Button>
      {flag&&<label  style={{ color: 'red',fontWeight: 'bold'}}>**اسم المستخ\م او كلمة المرور غير صحيحة **</label>}
             <Button> 
             <div  onClick={handelEmail} className={classes.forget}>?هل نسيت كلمة المرور</div>
             </Button>
    
    </div>
        </div>}

    
       
    </div>
  );
}
