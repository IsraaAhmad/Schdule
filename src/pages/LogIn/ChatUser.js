
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

const ROOT_CSS = css({
  height: 380,
  width: 400
});



const useStyles = makeStyles({
    im:{
        borderRadius: '50%',
        height: '35px',
        marginTop:'-10px',
        marginLeft:10,
        marginRight:10,
        border: '2px solid black',
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
        marginLeft:15,
        marginRight:55,
        marginTop:20,
        display: 'flex',
        alignContent:'center',
        alignItems:'center',
        backgroundColor: '#D4AC0D',
        color: 'white',
        borderTopRightRadius: '30px',
        borderBottomLeftRadius:'30px',
        borderBottomRightRadius:'30px',
        flexDirection: 'row-reverse',
        
        
        textAlign: 'end',
        float: 'left',
      },
      sent: {
        marginLeft:55,
        marginRight:15,
        marginTop:20,
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
        width: '100%',
        bottom: 0,
        zIndex: 1,
        borderTop: '1px solid lightgray',
        marginLeft: '-5px',
        padding: '10px',
        paddingBottom: '30px',
        backgroundColor: '#fafafa',
      },
      msgs: {
        margin: '10px 0',
        display: 'flex',
        flexDirection: 'column',
      },
    
    
      
  
  
});



function App(Props) {
  const {otherName,headID,doctorID,setView} = Props
  console.log("first")
  console.log(otherName)
    const classes = useStyles();
  const [data, setData] = useState([])
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
    <div style={{width:'100%',height:50,fontFamily: "Markazi Text",
                      fontSize: "30px",display:'flex',justifyContent:'center'}}>
                         <div style={{display:'flex',marginRight:110}}>
                           <Button onClick={()=>{setView(true)}}>
                             <ArrowBackIosIcon/>
                           </Button>

                         </div>
                       <div style={{display:'flex',marginRight:150}}>
                         {otherName.name}
                         </div> 
                        </div>
    
   
<ScrollToBottom className={ROOT_CSS}>

{data.map((item) => (
  
  <div >

                    <div className={classes.msgs}>
                      
                        <div  className={item.senderId !== doctorID ? classes.sent : classes.received}>
                            <img className={classes.im} src={photoURL} alt="" />
                            <p className={classes.pa}>{item.content}</p>
                        </div>
                    </div>
                    
  </div>
                ))}
                </ScrollToBottom >
                <div ref={messagesEndRef} />
                <div style={{display:'flex',flexDirection:'row',width:400,height:50, backgroundColor:'black'}}>

                 <Input 
                  inputProps={{
                    min: 0,
                    style: {
                      textAlign: "right",
                      fontFamily: "Markazi Text",
                      fontSize: "20px",
                      color:'white'
                    }
                  }}
                 style={{ width: '78%',height:40, fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px',display:'flex',justifyContent:'center',alignContent:'center' ,alignItems:'center'}} placeholder='...اكتب هنا' type="text" value={texting} onChange={handelText}  />
                 <Button style={{ width: '18%',height:40, fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} onClick={HandelAddDataBase}>
                   <SendIcon style={{color:'white'}}/></Button>
                </div>

    </>
  );
}

export default App;
