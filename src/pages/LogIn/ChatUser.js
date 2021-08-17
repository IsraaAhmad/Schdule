
import firebase from "../FireBase/firebase"
import React from "react";
import  { useEffect, useState,useRef  } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory} from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import photoURL from "./prof.png"
import { Input, Button } from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';
import { css } from '@emotion/css';
import ScrollToBottom from 'react-scroll-to-bottom';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Female from "./female.png"
import Male from "./male.png"
const ROOT_CSS = css({
  height: 383,
  width: 395
});



const useStyles = makeStyles({
    im:{
      borderRadius: '50%',
      height: '37px',
      width:'37px',
      marginTop:'-5px',
      
      backgroundColor:'white',
      border: '2px solid white',
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
      alignContent:'center',
     },
   
    pa:{
      width: 'auto',
      fontFamily:'Markazi Text',
      fontSize:'20px',
      fontWeight: '500',
      marginTop:'10px',
      marginLeft:'10px',
      marginRight:'10px',
      overflowWap:'break-word',
        
    },
    msg: {
      display: 'flex',
        padding: '20px 10px 0 20px',
        margin: '20px',
        borderRadius: '3000px',
        boxShadow: '0 0 10px rgb(164, 164, 164)',
        alignItems: 'center'
      },
      received: {
        marginTop:20,
        marginLeft:10,
        marginBottom:5,
        display: 'flex',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: '#D4AC0D',
        color: 'white',
        borderTopRightRadius: '30px',
        borderBottomLeftRadius:'30px',
        borderBottomRightRadius:'30px',
        flexDirection: 'row',
        textAlign: 'start',
        float: 'left',
      },
      sent: {
        marginLeft:150,
        marginRight:5,
        marginTop:20,
        marginBottom:5,
        display: 'flex',
        alignItems:'center',
        flexDirection: 'row',
        alignContent:'center',
        border: '1px solid lightgray',
        backgroundColor: '#B7B8B8',
        borderTopLeftRadius: '30px',
        borderBottomLeftRadius:'30px',
        borderBottomRightRadius:'30px',
        float: 'right',
      },
      sendMsg :{
        position: 'fixed',
        display: 'flex',
        
        bottom: 0,
        zIndex: 1,
        borderTop: '1px solid lightgray',
        marginLeft: '-5px',
        padding: '10px',
        paddingBottom: '30px',
        backgroundColor: '#fafafa',
      },
      msgs: {
        marginBottom:10,
        display: 'flex',
        flexDirection: 'column',
      },
      e1:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
      },
      e2:{
        display:'flex',
        flexDirection:'row-reverse',
        alignItems:'center',
        
      },
    
    
      
  
  
});



function App(Props) {
  const {doctor,headID,doctorID,head , genderOther} = Props
  console.log("doctor = " + doctor )
  console.log("headID = " + headID )
  console.log("doctorID = " + doctorID )
  console.log("head = " + head )

    const classes = useStyles();
  const [data, setData] = useState([])
  const [URLImg,setURLImg ] = useState([])
  const [texting,setTexting] = useState("")
  const group = headID +" - "+doctorID
  console.log(group)
  console.log("group")
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  
  const FB = firebase.firestore().collection("messages").doc(group).collection(group);
  console.log("fb")
  console.log(FB)
  const scroll = useRef()
  const d1 = ""+Date.now()
  
  const HandelAddDataBase =() =>{
    console.log("date")
    console.log(d1)
       
    firebase.firestore().collection("messages").doc(group).collection(group).doc(d1).set({
      senderId:doctorID,
      anotherUserId:headID,
      timestamp:d1,
      content:texting,
      type:'soso'
    })
    // console.log(firebase.firestore().collection('messages').doc('1'))
  }
  useEffect(()=>{
    if(genderOther == 'ذكر')
    setURLImg(Male)
    else setURLImg(Female)
   

              
          
  },[]) 
  
  const getData =() =>{

    FB.onSnapshot((querySnapshot) =>{
      const items = []
      console.log("querySnapshot")

      console.log(querySnapshot)

      querySnapshot.forEach((doc) =>{
        items.push(doc.data())
      })
      setData(items)
      console.log("chat page")
      console.log(items)
      setTexting("")
    }
  
    )
    }
  useEffect(()=>{

    getData()

  
      
  },[])
  
  const handelText=(event)=>{
setTexting(event.target.value)
  }
  return (
    <>
     <div style={{width:395,height:50,fontFamily: "Markazi Text",marginRight:0,marginLeft:0,borderBottom: '3px solid rgba(0, 0, 0, 0.09)',
                      fontSize: "30px",display:'flex',justifyContent:'center',paddingBottom:17}}>
                         <div style={{display:'flex',flexDirection:'row-reverse',alignItems:'center'}}>

                         <div><img className={classes.im} src={URLImg} alt="" /> </div>
                       <div style={{display:'flex',marginRight:7,}}>
                         رئيس القسم:{head}

                         </div> 
                
                         </div>
                        </div>
    
   
<ScrollToBottom className={ROOT_CSS}>
<div>

{data.map((item) => (
  
  <div  className={classes.msgs}>

                    <div className={item.senderId == doctorID ? classes.e1 : classes.e2}>
                      {item.senderId !==headID&& <img className={classes.im} src={URLImg} alt="" />}
                        <div  className={item.senderId == doctorID ? classes.sent : classes.received}>
                            
                            <p className={classes.pa}>{item.content}</p>
                        </div>
                    </div>
                    
  </div>
                ))}
                </div>
                </ScrollToBottom >
                <div ref={messagesEndRef} />
                <div style={{width:'397px',display:'flex',flexDirection:'row',height:50,marginRight:0,marginLeft:0,
                 backgroundColor:'white',border: '3px solid rgba(0, 0, 0, 0.09)',
                }}>

                 <Input 
                  inputProps={{
                    min: 0,
                    style: {
                      textAlign: "right",
                      fontFamily: "Markazi Text",
                      fontSize: "20px",
                      color:'black'
                    }
                  }}
                  style={{ width: '87%',height:40, fontSize: '15px', fontWeight: '550', marginLeft: '2px', marginBottom: '-3px',display:'flex',justifyContent:'center',alignContent:'center' ,alignItems:'center'}} placeholder='...اكتب هنا' type="text" value={texting} onChange={handelText}  />
                  <Button style={{ width: '13%',height:40, fontSize: '15px', fontWeight: '550', maxWidth: '200px'}} onClick={HandelAddDataBase}>
                    <SendIcon style={{color:'black'}}/></Button>
                 </div>

    </>
  );
}

export default App;
