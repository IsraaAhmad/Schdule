// import React from "react";
// import  { useEffect, useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import { useHistory} from 'react-router-dom';

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
//   var gapi = window.gapi
// var CLIENT_ID = "682089646966-5fb6kgose720gc8f3l7uu1k6am50kudf.apps.googleusercontent.com"
// var API_KEY = "AIzaSyAlrDnNRWEnRMDKhP6Jk7YjY1p7nQ2AACQ"
// var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
// var SCOPES = "https://www.googleapis.com/auth/calendar";


// var dt1 = new Date("30 July 2021 15:00 UTC +3");
// console.log(dt1)
// let w1 =dt1.toISOString();
// var dt2 = new Date("30 July 2021 17:00 UTC +3");
// console.log(dt2)
// let w2 =dt2.toISOString();
//   const handelClickCalender= () =>{
//     gapi.load('client:auth2', () => {
//       console.log('loaded client')

//       gapi.client.init({
//         apiKey: API_KEY,
//         clientId: CLIENT_ID,
//         discoveryDocs: DISCOVERY_DOCS,
//         scope: SCOPES,
//       })

//       gapi.client.load('calendar', 'v3', () => console.log('bam!'))

//       gapi.auth2.getAuthInstance().signIn()
//       .then(() => {
        
//         var event = {
//           'summary': 'Google I/O 2015',
//           'location': '800 Howard St., San Francisco, CA 94103',
//           'description': 'A chance to hear more about Google\'s developer products.',
//           'start': {
//             'dateTime': w1,
//             'timeZone': 'Israel'
//           },
//           'end': {
//             'dateTime': w2,
//             'timeZone': 'Israel'
//           },
//           'recurrence': [
//             'RRULE:FREQ=WEEKLY;COUNT=5'
//           ],
//           'reminders': {
//             'useDefault': false,
//             'overrides': [
//               {'method': 'email', 'minutes': 24 * 60},
//               {'method': 'popup', 'minutes': 10}
//             ]
//           }
//         };

//         var request = gapi.client.calendar.events.insert({
//           'calendarId': 'primary',
//           'resource': event,
//         })

//         request.execute(event => {
//           console.log(event)
//           window.open(event.htmlLink)
//         })
        

//         /*
//             Uncomment the following block to get events
//         */
//         /*
//         // get events
//         gapi.client.calendar.events.list({
//           'calendarId': 'primary',
//           'timeMin': (new Date()).toISOString(),
//           'showDeleted': false,
//           'singleEvents': true,
//           'maxResults': 10,
//           'orderBy': 'startTime'
//         }).then(response => {
//           const events = response.result.items
//           console.log('EVENTS: ', events)
//         })
//         */
    

//       })
//     })

// }

 
//   return (
//     <div  style={{height:1000}} className="back2">

    
//       <button onClick={handelClickCalender}>calender</button>

     

//     </div>
    

//   );
// }

