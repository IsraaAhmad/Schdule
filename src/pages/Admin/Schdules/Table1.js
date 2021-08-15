/* eslint-disable no-lone-blocks */
import React, { useState } from 'react';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';
import BeatLoader from "react-spinners/BeatLoader";
import  { useEffect } from 'react';
import axios from 'axios';
import { useHistory ,useLocation } from 'react-router-dom';
import TimerIcon from '@material-ui/icons/Timer';
import { makeStyles } from "@material-ui/core/styles";



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

    
      axios.get("https://core-graduation.herokuapp.com/getFinalTable?idDep="+DepId+"&tableName="+name)
      .then(res => {
        console.log("from heree")
                let w = res.data.response;
                
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
                    
                    listdd[x] = {teacher:w[y].instName,room:temp,ToTime:ee,FromTime:ss,
                    day:w[y].days,course:w[y].courseName,number:w[y].courseNumber,classConflict:w[y].classConflict,flagConflict:w[y].flagConflict}
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
  if (row.flagConflict === false)
     return <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      
      <CheckCircleIcon style={{color:'#045F5F ',fontSize:'35px',}}/>
     </div>

     else{
     return <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

     <div style={{width:35,height:35,backgroundColor:'red',}}>
     <div style={{fontSize:'22px',color:'white',display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center'}}>{row.classConflict +1}</div>
    
     </div>
    </div>
     
     }
   
    
}

  const columns = [
    { title: "المدرس",
    field: "teacher" ,
    lookup:inst,
    cellStyle: {fontSize:'20px',},
              
    },
    { title: "القاعة",
    field: "room" ,  
    lookup:rooms,
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
    lookup:days,
   
 
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

    { title: "الحالة ",
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

  const classes = useStyles();
  return (
    <div className="App">
      {loading?
         <div className={classes.lod}>
         
         <BeatLoader  loading={loading} color='#045F5F' size={30} margin ={3} /> 
       </div>
    
    :
    <div>
     <Button variant="contained" onClick={HandelOK}  style={{margin:10,backgroundColor:'#045F5F', color:'white',fontFamily:'Markazi Text',fontSize:'20px'}} size='medium'>
             اعتماد الجدول 
      </Button>
      <Button variant="contained" onClick={HandelTestConflict}  style={{margin:10,backgroundColor:'#045F5F', color:'white',fontFamily:'Markazi Text',fontSize:'20px'}} size='medium'>
           فحص التعارضات مره اخرى
      </Button>   
      <MaterialTable
        className = "table"
        title={<span  style={{fontFamily: 'Markazi Text',
        fontSize:'25px',}}>اسم الجدول المعروض:{name}</span>}
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
        
        editable={{
          
          

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