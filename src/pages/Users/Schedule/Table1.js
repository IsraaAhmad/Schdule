/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import MaterialTable from 'material-table';
import firstLoad ,{MTableToolbar,MTablePagination,MTableEditRow} from 'material-table';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TablePagination from '@material-ui/core/TablePagination';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TextField from '@material-ui/core/TextField';
import  { useEffect } from 'react';
import axios from 'axios';
import { composeClasses } from '@material-ui/x-grid';




function TableR(props) {
  const { DepId ,inst} = props;
  const [data, setData] = useState()
  var gapi = window.gapi
  var CLIENT_ID = "682089646966-5fb6kgose720gc8f3l7uu1k6am50kudf.apps.googleusercontent.com"
  var API_KEY = "AIzaSyAlrDnNRWEnRMDKhP6Jk7YjY1p7nQ2AACQ"
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  var SCOPES = "https://www.googleapis.com/auth/calendar";
  let arabicDays = ["سبت","احد","اثنين","ثلاثاء","اربعاء","خميس","جمعة"]
  
  
  // var dt1 = new Date("Mon Aug 18 2021 11:54:00 GMT 0300");
  // console.log(dt1)
  // let w1 =dt1.toISOString();
  // console.log(w1)
  // var dt2 = new Date("Mon Aug 18 2021 11:54:00 GMT 0300");
  // console.log(dt2)
  // let w2 =dt2.toISOString();
  // console.log(w2)

  const addTimeToDate =(time,date)=>{
    const d =""+date
    const d1 = d.split(" ")
    d1[4] = time+":00"
    // console.log(d1)
    const val = d1[0]+" "+d1[1]+" "+d1[2]+" "+d1[3]+" "+d1[4]+" "+d1[5]+" "+d1[6]
    return val
    

  }

  const handelDateToExport = async() =>{
    var semDate = new Date("Mon Aug 18 2021 11:54:00 GMT 0300");
    const x=""+semDate
    const allDay = ["Sat","Sun","Mon","Tue","Wed","Thu","Fri"]
    let opDay = ["","","","","","",""]
    let index = -1
    const ss = x.split(" ")
    for (let i =0 ;i<7;i++){
      if(ss[0] == allDay[i]) index=i
    }
    let count = 0
    var day = new Date("Mon Aug 18 2021 11:54:00 GMT 0300");
    for(let j = index ; j<index+7 ;j++){
      // console.log(day); // Apr 30 2000
      
      var nextDay = new Date(day);
      nextDay.setDate(day.getDate() + count++);
      opDay[j%7] = nextDay
      
      // console.log(nextDay);

    }
    console.log(opDay)
    console.log(index)
    console.log(ss)
    console.log(data)
    console.log(arabicDays)
    for(let k = 0 ; k<data.length;k++){
      const n = data[k].day
      const arrN = n.split(",")
      for(let c =0;c<arrN.length;c++){
        for(let o = 0;o<7;o++){
          if(arabicDays[o] == arrN[c]){
            let startTime = addTimeToDate(data[k].FromTime,opDay[o])
            var dt1 = new Date(startTime);
            let w1 =dt1.toISOString();
            let endTime = addTimeToDate(data[k].ToTime,opDay[o])
            var dt2 = new Date(endTime);

            let w2 =dt2.toISOString();
            let tit = data[k].course
            console.log(w1+"****"+w2+"****"+tit)
            await handelExportToGoogleCalender(w1,w2,tit)
            
          

          }
        }
      }
    }
    
  }

  const handelExportToGoogleCalender =(w1,w2,tit) =>{
    return new Promise((Resolve,Reject)=>{
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        
        var event = {
          'summary': tit,
          'location': '800 Howard St., San Francisco, CA 94103',
          'description': 'A chance to hear more about Google\'s developer products.',
          'start': {
            'dateTime': w1,
            'timeZone': 'Israel'
          },
          'end': {
            'dateTime': w2,
            'timeZone': 'Israel'
          },
          'recurrence': [
            'RRULE:FREQ=WEEKLY;COUNT=5'
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        };
        var event1 = {
          'summary': tit,
          'location': '800 Howard St., San Francisco, CA 94103',
          'description': 'A chance to hear more about Google\'s developer products.',
          'start': {
            'dateTime': "2021-09-22T12:00:00.000Z",
            'timeZone': 'Israel'
          },
          'end': {
            'dateTime': "2021-09-22T12:00:00.000Z",
            'timeZone': 'Israel'
          },
          'recurrence': [
            'RRULE:FREQ=WEEKLY;COUNT=5'
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        };

        var request = gapi.client.calendar.events.insert(
          {
          'calendarId': 'primary',
          'resource': event1,
        },
        {
          'calendarId': 'primary',
          'resource': event,
        },
        )

        request.execute(event => {
          console.log(event)
          
          window.open(event.htmlLink)
        })
        

        /*
            Uncomment the following block to get events
        */
        /*
        // get events
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(response => {
          const events = response.result.items
          console.log('EVENTS: ', events)
        })
        */
    
        Resolve()
      })
    })
  })

  }
  

  useEffect(()=>{
      
    axios.get("https://core-graduation.herokuapp.com/getDataFromApprovalOfDep?idDep="+DepId)
    .then(res => {
              let w = res.data.response;
              console.log(w)
              
              let x = 0
              let listdd = []
              for(let y = 0 ;y<w.length;y++){
                if(w[y].instName ===inst ){
                  let temp
                  if( w[y].roomType === 'قاعة تدريس'){
                    temp = w[y].roomNumber
                  }
                  else{
                   temp = w[y].roomType
                  }
                  let ss = w[y].startHour
                  let strStart = w[y].startHour
                  if(strStart.length === 4) ss="0"+strStart

                  let ee = w[y].endHour
                  let strEnd = w[y].endHour
                  if(strEnd.length === 4) ee="0"+strEnd
                  
                  listdd[x] = {room:temp,ToTime:ee,FromTime:ss,
                  day:w[y].days,course:w[y].courseName,number:w[y].courseNumber}
                              x =x+1

                }
              }
   setData(listdd)
})
      
 },[]) 
  


  const columns = [
   
    { title: "القاعة",
    field: "room" ,
   
    cellStyle: {fontSize:'20px',},
              
    },
     
    { title: "الى الساعة",
    field: "ToTime" ,
    editComponent: (props) => 
     

    <TextField
   id="time2"
   label="الى"
   type="time"
   value={props.value}
   InputLabelProps={{
     shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}
    onChange={(e) =>props.onChange(e.target.value)}
    />
     ,
    render:(rowData) => 
     
    <TextField
   id="time2"
   label="الى"
   type="time"
   value={rowData.ToTime}
   InputLabelProps={{
     shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}
    />,
    cellStyle: {
      //  fontFamily: 'Markazi Text',
       fontSize:'20px',
            },
  },
    
    { title: "من الساعة",
    field: "FromTime" ,
    editComponent: (props) => 
     

    <TextField
   id="time1"
   label="من"
   type="time"
   value={props.value}
   InputLabelProps={{
     shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}
    onChange={(e) =>props.onChange(e.target.value)}
    />
     ,
    render:(rowData) => 
     
    <TextField
   id="time1"
   label="من"
   type="time"
   value={rowData.FromTime}
   InputLabelProps={{
     shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}
    />
    
   
 ,
   
  
    
 
      cellStyle: {
        //  fontFamily: 'Markazi Text',
         fontSize:'20px',
              },
              
    },
    { title: "الايام",
    field: "day" ,
    
   
 
      cellStyle: {
        //  fontFamily: 'Markazi Text',
         fontSize:'20px',
              },
              
    },
   


    { title: "اسم المساق",
    field: "course" ,
    editable: 'never',
   
 
      cellStyle: {
        //  fontFamily: 'Markazi Text',
         fontSize:'20px',
              },
              
    },
    { title: "رقم المساق",
    field: "number" ,
    editable: 'never',
   
    cellStyle: {fontSize:'20px',},
              
    },

  
     
  ]
 

  return (
    <div className="App">
      <Button variant="contained" onClick={handelDateToExport}  style={{margin:10,backgroundColor:'#045F5F', color:'white',fontFamily:'Markazi Text',fontSize:'20px'}} size='medium'>
           Google Calender تصدير الجدول الى
      </Button>
      <Button variant="contained"   style={{margin:10,backgroundColor:'#045F5F', color:'white',fontFamily:'Markazi Text',fontSize:'20px'}} size='medium'>
      Google Calender فتح  الجدول في
      </Button>

      <MaterialTable
        className = "table"
        title=""
        data={data}
       
        columns={columns}
        options={{
          searchFieldStyle:{
            fontFamily: 'Markazi Text',
            fontSize:'25px',
            
          },
          paging:false,
          exportButton: true,
          actionsColumnIndex:0,
          addRowPosition:'first',
          headerStyle:{
            zIndex: '0',
            backgroundColor:'#37474f',
            color:'white',
            fontFamily: 'Markazi Text',
            fontSize:'25px',
            
            

          }

        }}
        localization={{
          header: {
              actions: '',
          },
        //   pagination: {
        //     labelRowsSelect:"صفوف"
        // },
        body: {
          emptyDataSourceMessage:"لا مواد مضافة بعد",
          deleteTooltip:"حذف",
          editTooltip:"تعديل",
          exportName:"csv حفظ",
          editRow:{
            deleteText:"هل انت متأكد من حذف هذه المادة",
            cancelTooltip:"إلغاء",
            saveTooltip:"حفظ"
          },
         
      },
      toolbar:{
        searchTooltip:"بحث",
        searchPlaceholder:"بحث",
        exportTitle:'تصدير',
        exportCSVName: " Excelتصدير ملف ",
        exportPDFName:  " PDF ملف ",
      }
      }}
        
        editable={{
          
          

         

        }}
       
        
      />
    </div>
  );
}

export default TableR;