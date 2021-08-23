/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import { withStyles } from "@material-ui/core/styles";
import MaterialTable from 'material-table';
import EventIcon from '@material-ui/icons/Event';
import firstLoad ,{MTableToolbar,MTablePagination,MTableEditRow} from 'material-table';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from "@material-ui/core/IconButton";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from "@material-ui/core/styles";
import TablePagination from '@material-ui/core/TablePagination';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TextField from '@material-ui/core/TextField';
import  { useEffect } from 'react';
import axios from 'axios';
import { composeClasses } from '@material-ui/x-grid';
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DraftsIcon from "@material-ui/icons/Drafts";
import PublishIcon from "@material-ui/icons/Publish";
import GoogleCalender from './googleCalendar.png'

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor:'#045F5F',
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);
const useStyles = makeStyles({


  
});

function TableR(props) {
  const { DepId ,inst} = props;
  const [data, setData] = useState()
  const [startSemester, setStartSemester] = useState()
  const [endSemester, setEndSemester] = useState()
  const [tableName1,setTableName1] = useState()

  var gapi = window.gapi
  var CLIENT_ID = "682089646966-5fb6kgose720gc8f3l7uu1k6am50kudf.apps.googleusercontent.com"
  var API_KEY = "AIzaSyAlrDnNRWEnRMDKhP6Jk7YjY1p7nQ2AACQ"
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  var SCOPES = "https://www.googleapis.com/auth/calendar";
  let arabicDays = ["سبت","احد","اثنين","ثلاثاء","اربعاء","خميس","جمعة"]
 
  

  const addTimeToDate =(time,date)=>{
    const d =""+date
    const d1 = d.split(" ")
    d1[4] = time+":00"

    const val = d1[0]+" "+d1[1]+" "+d1[2]+" "+d1[3]+" "+d1[4]+" "+d1[5]+" "+d1[6]
    return val
    

  }
  const getStartAndEndSemester =(tab) => {
    return new Promise((Resolve,Reject)=>{
    axios.get("https://core-graduation.herokuapp.com/getTimesOfTable?idDep="+DepId+"&tableName="+tab)
    .then(res => {
              let w = res.data.response[0].startandend;
              const qa = w.split("/")
            
              setStartSemester(qa[0])
              setEndSemester(qa[1])
             
              
            
              Resolve() 
})

})
  }
  

  const handelDateToExport = async() =>{
    // await getStartAndEndSemester()
   
    let totEvent = []
    let indexEvent = 0
 
    
    const allDay = ["Sat","Sun","Mon","Tue","Wed","Thu","Fri"]
    let opDay = ["","","","","","",""]
    
    let index = -1
    const ss = startSemester.split(" ")
    for (let i =0 ;i<7;i++){if(ss[0] == allDay[i]) index=i}

    let count = 0
    var day = new Date(startSemester);
    console.log(startSemester)
    console.log(day)

    for(let j = index ; j<index+7 ;j++){
      
      var nextDay = new Date(day);
      nextDay.setDate(day.getDate() + count++);
      opDay[j%7] = nextDay
      

    }
   
     
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
            let z1 =  new Date(startSemester);
            let z2 =  new Date(endSemester);
            var time_difference = z2.getTime() - z1.getTime();  
            var days_difference = time_difference / (1000 * 60 * 60 * 24);  
            const zza = endSemester.split(" ")
            let remender = days_difference % 7
            let indexEnd =-1
            const ss1 = endSemester.split(" ")
            for (let ii =0 ;ii<7;ii++){if(ss1[0] == allDay[ii]) indexEnd=ii}
           





            let dd1 = days_difference/7
            if(index < indexEnd ){
              if(o >=index && o<=indexEnd) {
                dd1 = (days_difference/7 )+1
              }
            }
            if(index > indexEnd){
              if(o<=indexEnd || o>=index ){
                dd1 = (days_difference/7 )+1
              }
            }
            console.log(" start index=" +index)
            console.log("my index=" +o)
            console.log("end index="+ indexEnd)
            console.log("count="+ dd1)
            console.log("*************************************")

          //   if((index < o) && ( o < indexEnd)){
          //  dd1 = (days_difference/7 )+1
          //   } 
          //   else dd1 = days_difference/7

            
            totEvent[indexEvent++] = {w1:w1,w2:w2,tit:tit,count:parseInt(dd1)}

            // await handelExportToGoogleCalender(w1,w2,tit)
            
          

          }
        }
      }
      console.log(totEvent)
      handelExportToGoogleCalender(totEvent)
    }
    
  }

 

  const handelExportToGoogleCalender =(totEvent) =>{
    
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
        var batch = gapi.client.newBatch();
      
        for(let b =0 ; b<totEvent.length;b++){
            let rr = totEvent[b]
            var event = {
         
              'summary': rr.tit,
              'location': 'Al-Najah National University ',
              'description': 'Remainder for your lecture',
              "event": {
                'nested' : {
                  "background": 'red',
                  "foreground": 'black'
                }
              },
              'start': {
                'dateTime': rr.w1,
                'timeZone': 'Israel'
              },
              'end': {
                'dateTime': rr.w2,
                'timeZone': 'Israel'
              },
              'recurrence': [
                'RRULE:FREQ=WEEKLY;COUNT='+rr.count
              ],
              'reminders': {
                'useDefault': false,
                'overrides': [
                  {'method': 'email', 'minutes': 24 * 60},
                  {'method': 'popup', 'minutes': 10}
                ]
              }
            };
            
            
            
           
            batch.add(gapi.client.calendar.events.insert({
              'calendarId': 'primary',
              'resource': event
          }));
        }
        batch.execute(event => {
         
          window.open("https://www.google.com/calendar/event")
        })
       })
    })
  

  }
  const openCalender =() =>{
    window.open("https://www.google.com/calendar/event")  
  }
  

  useEffect(()=>{
      
    axios.get("https://core-graduation.herokuapp.com/getDataFromApprovalOfDep?idDep="+DepId)
    .then(res => {
              let w = res.data.response;
             
              
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
                  day:w[y].days,course:w[y].courseName,number:w[y].courseNumber,tableName:w[y].tableName}
                              x =x+1

                }
              }
              setTableName1(listdd[0].tableName)
             
   setData(listdd)
   getStartAndEndSemester(w[0].tableName)
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
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
  const classes = useStyles();
  return (
    <div className="App">
      <div >
       
      <StyledMenu
        dir="rtl"
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem   onClick={handelDateToExport}>
          <ListItemIcon >
            <PublishIcon fontSize="small"  />
          </ListItemIcon>
          <ListItemText  primary=" تصدير الجدول الى Google Calender" />
        </StyledMenuItem>
        <StyledMenuItem onClick={openCalender}>
          <ListItemIcon>
            <EventIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="الانتقال الى Google Calender" />
        </StyledMenuItem>
      </StyledMenu>
      </div>
     

      <MaterialTable
    
        className = "table"
        title=""
        data={data}
        actions={[
          {
            icon: () => 
            <div>
          
            <div >
       
    <label htmlFor="icon-button-file">
      <IconButton
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={handleClick}
        
        >
       <img src={GoogleCalender} alt="" width="35" height="35" />
      </IconButton>
    </label>
        </div>
         
        </div>,
         tooltip: "Google Calender ",
         isFreeAction: true,
         
        }
      ]}
       
        columns={columns}
        options={{
          searchFieldStyle:{
            fontFamily: 'Markazi Text',
            fontSize:'25px',
            
          },
          paging:false,
          exportButton: {
            csv: true,
            pdf: false
          },
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
       
      }
      }}
        
        editable={{
          
          

         

        }}
       
        
      />
    </div>
  );
}

export default TableR;