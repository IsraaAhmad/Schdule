import React from "react";
import  { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory} from 'react-router-dom';

// import Logo from "./Logo.js"
// import "./back.css"
// import Cycle from "./Cycle"
// import SendEmail from './SendEmail.js'

// import LogInComp from "./LogInComp.js"



// const useStyles = makeStyles({
  
  
// });

// export default function App() {
//   const [email,setEmail ] = useState(false)
//     const  history  = useHistory();
//   const classes = useStyles();

 
//   return (
//     <div  style={{height:1000}} className="back2">

//       <div><Logo/></div>
//       <div><Cycle/></div>
//       {email?

//         <div><SendEmail setEmail={setEmail}/></div>
//        :
//        <div><LogInComp setEmail={setEmail}/></div>
//       }

     

//     </div>
    

//   );
// }

import './fire.css';
import firebase from "../FireBase/firebase"







function App() {
  const [data, setData] = useState([])
  const FB = firebase.firestore().collection("times");
  const HandelAddDataBase =() =>{
    firebase.firestore().collection('times').add({
      title:"israa",
      time_seconds:45
    })
    console.log(firebase.firestore().collection('times'))
  }
  
  const getData =() =>{
  FB.onSnapshot((querySnapshot) =>{
    const items = []
    querySnapshot.forEach((doc) =>{
      items.push(doc.data())
    })
    setData(items)
  }

  )
  }
  useEffect(()=>{
    getData()
  
      
  },[])
  return (
    <>
    <button onClick={HandelAddDataBase}>click here</button>
    {data.map((item) =>(
      <div>
        <div>
        <div>name:</div>
        <div>{item.name}</div>
        </div>
        <div>*********</div>
        <div>
        <div>place</div>
        <div>{item.place}</div>
        </div>
      </div>
    )

    )

    }
    </>
  );
}

export default App;


