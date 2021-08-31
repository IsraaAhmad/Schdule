/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Dialog from "@material-ui/core/Dialog";
import MenuItem from '@material-ui/core/MenuItem';
import EventIcon from '@material-ui/icons/Event';
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import DraftsIcon from "@material-ui/icons/Drafts";
import PublishIcon from "@material-ui/icons/Publish";
import GoogleCalender from './googleCalendar.png'

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';
import BeatLoader from "react-spinners/BeatLoader";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import  { useEffect } from 'react';
import { withStyles } from "@material-ui/core/styles";
import axios from 'axios';
import { useHistory ,useLocation } from 'react-router-dom';
import TimerIcon from '@material-ui/icons/Timer';
import { makeStyles } from "@material-ui/core/styles";
import './b1.css'
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
  mar:{
    margin:100,
    width:1000,
    
  },
  input: {
    display: "none"
  },
  lod:{
    marginRight:100,
    marginTop:200,
    width:800,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  },
  colHeader: {
    color: "white",
    "&:hover": {
      color: "white"
    }
  }
});


function TableR(props) {
  const {name , DepId , year , sem ,namme} = props;
  const [inst,setInst] = React.useState({})
  const [data, setData] = useState()
  const [newData, setNewData] = useState(false)
  const [totalDataRoom, setTotalDataRoom] = useState()
  const [loading, setLoading] = React.useState(false);
  const [rooms,setRooms] = React.useState({})
  const [days,setDays] = React.useState({})
  
  const mapIns=[]
  const mapRoom=[]
  const mapDays=[]
  const  history  = useHistory();
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [dia1,setDia1] = React.useState(false);
  const [dia2,setDia2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [dia3,setDia3] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [startSemester, setStartSemester] = useState()
  const [endSemester, setEndSemester] = useState()
  
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
      if (data[k].teacher == -1) continue
      const days1 = data[k].day
      let n = days[days1]
      console.log(n)
      console.log(data)
      console.log(k)
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
            let tea = data[k].teacher
            let inst1 = inst[tea]
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

            
            totEvent[indexEvent++] = {w1:w1,w2:w2,tit:tit,count:parseInt(dd1),teacher:inst1}

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
         
              'summary': rr.tit +"/"+rr.teacher,
              'location': 'Al-Najah National University ',
              'description': '',
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 

  
  const handleClose1 = () => {
    setOpen1(false);
    
  };
  const handleClose2 = () => {
    setOpen2(false);
    
  };

  const handleClose3 = () => {
    setOpen3(false);
    
  };

 

 const findInedx1 =(obj,da) =>{
   for(let i = 0;i<obj.length;i++){
     if (obj[i].name === da){

       return i
     }
    }
    return -1 
}



const room1 =() =>{
  return new Promise((Resolve,Reject)=>{
    axios.get("https://core-graduation.herokuapp.com/getRoomsofDep?idDep="+DepId)
.then(res => {
        setTotalDataRoom(res.data.response)
        let x = res.data.response
        for(let r = 0 ;r<x.length;r++){
          if( x[r].name === 'قاعة تدريس'){
            mapRoom[r] = {name:x[r].number}
          }
          else{
            mapRoom[r] = {name:x[r].name}
          }

        }
          
          
             
             setTimeout(() => {
              
             
            }, 2000)
       
        Resolve()
       },
        )
        
  })
}
    const initialData=() =>{

    let url = "https://core-graduation.herokuapp.com/getFinalTable?idDep="+DepId+"&tableName="+name
    console.log(url)
    axios.get(url)
    .then(res => {
        console.log("from heree")
        
        
        let w = res.data.response;
        console.log(w)
                
                let x = 0
                let listdd = []
                for(let y = 0 ;y<w.length;y++){
                  if(w[y].tableName ===name ){
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
                    
                    let yy1 =w[y].year
                    if(w[y].year == "-1")  yy1 ="اختياري"
                    if(w[y].year == "1")  yy1 ="اولى"
                    if(w[y].year == "2")  yy1 ="ثانية"
                    if(w[y].year == "3")  yy1 ="ثالثة"
                    if(w[y].year == "4")  yy1 ="رابعة"
                    if(w[y].year == "5")  yy1 ="خامسة"
                    
                    listdd[x] = {teacher:w[y].instName,room:temp,ToTime:ee,FromTime:ss,
                    day:w[y].days,course:w[y].courseName,number:w[y].courseNumber,classConflict:w[y].classConflict,flagConflict:w[y].flagConflict,year:yy1}
                                x =x+1

                  }
                }
     
                
          
    


    for (let i = 0;i<listdd.length;i++){
      let index1= findInedx1(mapRoom,listdd[i].room)
      listdd[i].room = index1
      let index = findInedx1(mapIns,listdd[i].teacher)
      listdd[i].teacher = index

      let index2 = findInedx1(mapDays,listdd[i].day)
      listdd[i].day = index2
      // if(i == listd.length -1) 
    }
    
  
  
    setData(listdd)
    getStartAndEndSemester(w[0].tableName)
    setLoading(false)
  })
 
  }

  const FilledData = async() =>{
    
    // await course1()
    await inst1()
    await room1()
    await day1()
     initialData()

    let list1 ={}
    let list2 ={}
    let list3 ={}
  

    let x = 0
    let y = 0
    let z = 0 
    
    
    mapRoom.map(row =>list1[x++] = row.name)
    mapIns.map(row =>list2[y++] = row.name)
    mapDays.map(row =>list3[z++] = row.name)

    
         
          setInst(list2)
          setRooms(list1)
          setDays(list3)

         

  
 }
  const inst1 =() =>{
    return new Promise((Resolve,Reject)=>{

      axios.get("https://core-graduation.herokuapp.com/getAllIsn?idDep="+DepId)
  
     
      .then(res => {
          let w = res.data.response;
          let x = 0
          w.map(row =>(
            mapIns[x++] = {name:row.name}
          ))
          Resolve()
         },
          )
          
    })
  }

  const day1 =() =>{
    return new Promise((Resolve,Reject)=>{

      axios.get("https://core-graduation.herokuapp.com/getDays?date="+year+"&semester="+sem)
  
     
      .then(res => {
        console.log(res)
          console.log(res.data.response);
          let w = res.data.response;
          let x = 0
          w.map(row =>(
            mapDays[x++] = {name:row}
          ))
          Resolve()
         },
          )
          .catch(res =>{
            Resolve()
          })
          
    })
  }

  useEffect(()=>{
    setLoading(true)
    console.log("start of use effect")
    FilledData()
    
      
 },[newData]) 
  
 const handelIcon =(row) =>{
  if (row.flagConflict == false || row.flagConflict =="false")
     return <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      
      <CheckCircleIcon style={{color:'#045F5F ',fontSize:'35px',}}/>
     </div>

     else{
     return <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

     <div style={{width:35,height:35,}} className="tra">
     <div style={{fontSize:'25px',color:'white',display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center',marginTop:5}}>{row.classConflict +1}</div>
    
     </div>
    </div>
     
     }
   
    
}
const classes = useStyles();
  const columns = [
    { title:<div className={classes.colHeader}>السنة الدراسية </div>,
    field: "year" ,
    editable: 'never',
    cellStyle: {fontSize:'20px'},
              
    },
    { title:<div className={classes.colHeader}>اسم المدرس</div>,
    field: "teacher" ,
    lookup:inst,
    cellStyle: {fontSize:'20px',},
              
    },
    { title:<div className={classes.colHeader}>رقم القاعة </div>,
    field: "room" ,  
    lookup:rooms,
    cellStyle: {fontSize:'20px',},
              
    },
     
    { title:<div className={classes.colHeader}>انتهاء المحاضره </div>,
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
    
    { title:<div className={classes.colHeader}>بدء المحاضره </div>,
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
    { title:<div className={classes.colHeader}> ايام الدوام</div>,
    field: "day" ,
    lookup:days,
   
 
      cellStyle: {
        //  fontFamily: 'Markazi Text',
         fontSize:'20px',
              },
              
    },
   


    { title:<div className={classes.colHeader}>اسم المساق </div>,
    field: "course" ,
    editable: 'onAdd',
   
 
      cellStyle: {
        //  fontFamily: 'Markazi Text',
         fontSize:'20px',
              },
              
    },
    { title:<div className={classes.colHeader}> رقم المساق</div>,
    field: "number" ,
    editable: 'onAdd',
   
    cellStyle: {fontSize:'20px',},
              
    },

    { title:<div className={classes.colHeader}> الحالة</div>,
    field: "status" ,
    editable: 'never',
    render: (rowData) =>(rowData&&handelIcon(rowData)),
    cellStyle: {fontSize:'20px',},
              
    },
     
  ]
  const HandelOK =() =>{
    let url = "https://core-graduation.herokuapp.com/setApprovalTable?idDep="+DepId+"&tableName="+name
    axios.get(url).then(res => {
      console.log(res)
      setOpen2(true);
      setDia2(true)
  })
const note = "الجدول الدراسي الخاص بدك لهذا الفصل جاهز وموجود في خانة جدولي"
  axios.get("https://core-graduation.herokuapp.com/addNotification?idDep="+DepId+"&note="+note+
  "&flag=1&time=0&hour=0")
  .then(res => {console.log(res)})
}
  const HandelTestConflict =()=>{
    setOpen3(true);
    setDia3(true)
    let url = "https://core-graduation.herokuapp.com/checkConflict?idDep="+DepId+"&tableName="+name
    axios.get(url).then(res => {
      console.log(res)
      setNewData(!newData)
      setOpen1(true);
      setDia1(true)
      setOpen3(false);
      setDia3(false)

    },
      )


  }
  const handelEditInDataBase = (updateRow) =>{
    let room1 = rooms[updateRow.room]
    let inst1 = inst[updateRow.teacher]
    let days1 = days[updateRow.day]
    let num
    let nam
    {totalDataRoom.filter(course => (course.name === room1) || (course.number === room1)).map(cor => (
      num = cor.number,
      nam = cor.name
         ))}
   

    let url = "https://core-graduation.herokuapp.com/editFinalTable?idDep="+DepId+"&tableName="+name
    +"&startHour="+updateRow.FromTime+"&endHour="+updateRow.ToTime+"&roomNumber="+num
    +"&roomType="+nam+"&days="+days1+"&courseNumber="+updateRow.number
    +"&instName="+inst1
    
    axios.get(url).then(res => {},)
  }
  const handelDeleteInDataBase= (row) =>{
    
    let url="https://core-graduation.herokuapp.com/deleteFromFinalTable?idDep="+DepId+"&tableName="+name
    +"&courseNumber="+row.number+"&courseName="+row.course
   
    axios.get(url).then(res => {},)
  }


  return (
    <div className="App">
      {loading?
         <div className={classes.lod}>
         
         <BeatLoader  loading={loading} color='#045F5F' size={30} margin ={3} /> 
       </div>
    
    :
    <div><div >
       
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
     <Button variant="contained" onClick={HandelOK}  style={{margin:10,backgroundColor:'#045F5F', color:'white',fontFamily:'Markazi Text',fontSize:'20px'}} size='medium'>
             اعتماد الجدول 
      </Button>
      <Button variant="contained" onClick={HandelTestConflict}  style={{margin:10,backgroundColor:'#045F5F', color:'white',fontFamily:'Markazi Text',fontSize:'20px'}} size='medium'>
           فحص التعارضات مره اخرى
      </Button>   
      <MaterialTable
        className = "table"
        title={<span  style={{fontFamily: 'Markazi Text',
        fontSize:'25px',marginLeft:35}}>اسم الجدول المعروض : {name}</span>}
        data={data}
       
        columns={columns}
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
            backgroundColor:'#37474f',
            color:'white',
            fontFamily: 'Markazi Text',
            fontSize:'25px',
            zIndex: '0'
            
            

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
      icons={{
        
             SortArrow: props =>
        
             <div >
   
               <ArrowDownwardIcon {...props} style={{color:'white'}} />
                 </div>,
          


         
    }}
        
        editable={{
          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const updatedRows = [...data, { id: Math.floor(Math.random() * 100), ...newRow }]
            // handelAddInDataBase(newRow)
           
            
            
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          
          

          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            handelDeleteInDataBase(selectedRow)

            const updatedRows = [...data]
            updatedRows.splice(index, 1)
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 1000)
          }),
          onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...data]
            
            updatedRows[index]=updatedRow
            handelEditInDataBase(updatedRow)
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 1000)
          })

        }}
       
        
      />
      </div>}
       {dia1&&<div>
            <Dialog
            open={open1}
            onClose={handleClose1}
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
                تم فحص التعارضات بنجاح
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose1} color="primary" autoFocus style={{ fontFamily: 'Markazi Text',fontSize:'35px',color:'#045F5F'}}>
               <CheckCircleIcon style={{color:'#045F5F' }} fontSize='large'/>
              </Button>
              
            </DialogActions>
          </Dialog>
            </div>}

            {dia2&&<div>
            <Dialog
            open={open2}
            onClose={handleClose2}
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
                تم اعتماد الجدول
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose2} color="primary" autoFocus style={{ fontFamily: 'Markazi Text',fontSize:'35px',color:'#045F5F'}}>
               <CheckCircleIcon style={{color:'#045F5F' }} fontSize='large'/>
              </Button>
              
            </DialogActions>
          </Dialog>
            </div>}

            {dia3&&<div>
            <Dialog
            open={open3}
            onClose={handleClose3}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            dir='rtl'
          >
            <DialogTitle id="alert-dialog-title"  style={{marginRight:90}}>
              <div style={{ fontFamily: 'Markazi Text',fontSize:'35px',borderRadius:'5px',display:'flex',flexDirection:'center',alignContent:'center'}}>
             <TimerIcon  style={{color:'#F1C40F',fontSize:40 }} />
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div  style={{ fontFamily: 'Markazi Text',fontSize:'30px',}}>
               يرجى الانتظار لبضع ثواني
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose3} color="primary" autoFocus style={{margin:0,color:'#045F5F'}}>
               {/* <CheckCircleIcon style={{color:'#045F5F' }} fontSize='large'/> */}
              <div style={{ fontFamily: 'Markazi Text',fontSize:'25px',borderRadius:'5px'}}>تم</div>
              </Button>
              
            </DialogActions>
          </Dialog>
            </div>}
    </div>
  );
}

export default TableR;