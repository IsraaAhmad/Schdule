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




const empList = [
  { course: 10, number: 10, FromTime:"04:30",ToTime:"06:15",day:10,location:10,teacher:10,room:10},
  { course: 20, number: 20, FromTime:"04:30",ToTime:"06:15",day:20,location:20,teacher:20,room:20},
  { course: 30, number: 30, FromTime:"04:30",ToTime:"06:15",day:10,location:10,teacher:30,room:30},
  { course: 40, number: 40, FromTime:"04:30",ToTime:"06:15",day:20,location:10,teacher:40,room:40},
]


function TableR(props) {
  const {name , DepId , year , sem} = props;
  const [inst,setInst] = React.useState({})
  const [data, setData] = useState()
  const [totalDataRoom, setTotalDataRoom] = useState()

  const [rooms,setRooms] = React.useState({})
  const [days,setDays] = React.useState({})
  
  const mapIns=[]
  const mapRoom=[]
  const mapDays=[]

  const findInedx =(obj,da) =>{
    for(let i = 0;i<obj.length;i++){
      if (obj[i].name === da){

        return i
      }
     }
     return -1 
 }

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
    FilledData()
      
 },[]) 
  
 const handelIcon =(row) =>{
  if (row.flagConflict ==="false")
     return <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
      
      <CheckCircleIcon style={{color:'#045F5F '}}/>
     </div>

     else{
     return <div style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>

     <div style={{width:25,height:25,backgroundColor:'red',}}>
     <div style={{fontSize:'20px',color:'white',display:'flex',justifyContent:'center',alignContent:'center',alignItems:'center'}}>{row.classConflict +1}</div>
    
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

  }
  const HandelTestConflict =()=>{

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
    </div>
  );
}

export default TableR;