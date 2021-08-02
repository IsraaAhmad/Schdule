import React, { useState } from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import  { useEffect } from 'react';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";
import { makeStyles } from "@material-ui/core/styles";



const useStyles = makeStyles({
  mar:{
    margin:100,
    width:1000,
    
  },
  lod:{
    margin:100,
    width:800,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  }
});





function TableR(Props) {
  let {TableName , savedData} = Props
  console.log("from top saved ="+ savedData)
  const [rooms,setRooms] = React.useState({})
  const [savDate,setSavDate] = React.useState(savedData)
  const [nameTable,setNameTable] = React.useState(TableName)
  const [loading, setLoading] = React.useState(false);

const classes = useStyles();
  const [data, setData] = useState([])
  const [course,setCourse] = React.useState({})
  const [inst,setInst] = React.useState({})
  const [department,setDepartment] = React.useState({})
 
  const [days,setDays] = React.useState({})
  
  

  const mapDays =[{days:'احد,ثلاثا,خميس'},
  {days:'اثنين,اربعاء'},
  {days:'احد'},
  {days:'اربعاء'},
  {days:'ثلاثاء'},]


  const mapCourse =[]
  const mapDepartment =[]
  const mapIns=[]
  const mapRoom=[
    {name:"قاعة تدريس"}
  ]

  
  const room1 =() =>{
    return new Promise((Resolve,Reject)=>{
      axios.get("https://core-graduation.herokuapp.com/getRoomsofDep?idDep=60ddc9735b4d43f8eaaabf83")
  .then(res => {
        console.log(res)
        console.log("*********")
          console.log(res.data.response);
          let x = 1
          res.data.response.filter(room => (room.type === "مختبر") ).map(cor => (
            
            mapRoom[x++] = {name:cor.name}
               ))
               setTimeout(() => {
                setSavDate(savedData)
               
              }, 2000)
         
          Resolve()
         },
          )
          
    })
  }


  const course1 =() =>{
    return new Promise((Resolve,Reject)=>{

      axios.get("https://core-graduation.herokuapp.com/getAllMaterialsOfDepartment?idDep=60ddc9735b4d43f8eaaabf83")
  
     
      .then(res => {
        // console.log(res)
        //   console.log(res.data.response);
          let w = res.data.response;
          let x = 0

          w.filter(course => (course.flagTo === "true") ).map(row => (
            mapCourse[x++] = {name:row.name}
               ))

          Resolve()
         },
          )
          
    })
  }

  const inst1 =() =>{
    return new Promise((Resolve,Reject)=>{

      axios.get("https://core-graduation.herokuapp.com/getAllIsn?idDep=60ddc9735b4d43f8eaaabf83")
  
     
      .then(res => {
        console.log(res)
          console.log(res.data.response);
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


  const department1 =() =>{
    return new Promise((Resolve,Reject)=>{
      console.log("from use effect")
      let url = "https://core-graduation.herokuapp.com/getAllDep"
      let list1 =[]
      let x = 0 
    axios.get(url)
          .then(res => {
            console.log(res)
              console.log(res.data.response);
              res.data.response.map(row => (
                mapDepartment[x++] = {name:row.name}
  
              ))
              Resolve()
            },
   
              )
    

       
         },
          )
          
    
  }
  const findInedx1 =(obj,da) =>{
    for(let i = 0;i<obj.length;i++){
      if (obj[i].name === da){

        return i
      }
     }
     return -1 
 }

 const findInedxD =(obj,da) =>{
  for(let i = 0;i<obj.length;i++){
    if (obj[i].days === da){

      return i
    }
   }
   return -1 
}
const findInedx =(obj,da) =>{
  for(let i = 0;i<obj.length;i++){
    if (obj[i].name === da){

      return i
    }
   }
   return -1 
}

  const initialData=() =>{

    
    console.log("form inital data")
     let listd=[]
     let x = 0 
     console.log("saved mat="+savedData)
     console.log("saveData mat="+savDate)
     
     savDate.filter(row => (row.fromOtherDep ==="false")&(row.toOtherDep ==="true")&(row.tableName===TableName )  ).map(cor => (
           listd[x++] = {room:cor.roomType,time:cor.timeSolt,teacher:cor.courseIns,course:cor.courseName}

    ))
    
    console.log("listd = ")
    console.log(listd)
    let newList = []
    for (let i = 0;i<listd.length;i++){
      let indexR= findInedx(mapRoom,listd[i].room)
      listd[i].room = indexR


      let  index = findInedx1(mapCourse,listd[i].course)
      listd[i].course = index

      let index1 = findInedx1(mapIns,listd[i].teacher)
      listd[i].teacher = index

     let c = listd[i].time
     console.log(c)

     const x = c.split("/")
     let  indexD = findInedxD(mapDays,x[2])
     newList[i] = {room:indexR,course:index,teacher:index1,FromTime:x[0],ToTime:x[1],days:indexD}

    }
    
    console.log(" after roooms listd = ")
    console.log(listd)
  
    setData(newList)
 
  }

  const FilledData = async() =>{
    await course1()
     await department1()
     await inst1()
     await room1()
     initialData()

    let list1 ={}
    let list2 ={}
    let list3 ={}
    let list4 = {}
    let list5 ={}

    let x = 0
    let y = 0
    let z = 0
    let w = 0
    let v =0
  
    mapCourse.map(row =>list1[x++] = row.name)
    mapDepartment.map(row =>list2[y++] = row.name)
    mapIns.map(row =>list3[z++] = row.name)
    mapDays.map(row =>list4[w++] = row.days)
    mapRoom.map(row =>list5[v++]= row.name)
          setCourse(list1)
          setDepartment(list2)
          setInst(list3)
          setDays(list4)
          setRooms(list5)
          setLoading(false)
  
 }
 useEffect(()=>{
   setLoading(true)
  console.log("from use effect")
    FilledData()
    console.log("end use effect")

     
},[]) 
  const columns = [

    { title: "نوع القاعة",
    field: "room" ,
    lookup:rooms,
 
      cellStyle: {
        //  fontFamily: 'Markazi Text',
         fontSize:'25px',
              },
              
    },
    { title: "الايام ",
    field: "days" ,
    lookup: days,
    
      cellStyle: {
        //  fontFamily: 'Markazi Text',
         fontSize:'25px',
              },

              
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
    { title: "اسم المدرس",
    field: "teacher" ,
    lookup: inst,
    
      cellStyle: {
        //  fontFamily: 'Markazi Text',
         fontSize:'25px',
              },

              
    },

   
    { title: "اسم المساق",
    field: "course" ,
    lookup: course,
    
      cellStyle: {
        //  fontFamily: 'Markazi Text',
         fontSize:'25px',
              },

              
    },
 
    
 ]
  
 const handelAddInDataBase = (row) =>{
  let d1 = department[row.department]
  let c1 = course[row.course]
  let inst1 = inst[row.teacher]
  let roo  = rooms[row.room]
  let day1 = days[row.days]
 
  let f = row.FromTime
  let t = row.ToTime

 console.log("Departmqnt = " + d1)
  console.log("course = " + c1)
  console.log("from time = " + f)
  console.log("to time = " + t)
  let time = f+"/"+t+"/"+day1


let url = "https://core-graduation.herokuapp.com/saveMatOfDraft?depId=60ddc9735b4d43f8eaaabf83&tableName="
 +nameTable+"&courseIns="+inst1+"&courseName="+c1+"&flag=2&timeSlot="+time+"&roomType="+roo+"&date=2020/2019"
console.log("url="+ url)
  axios.get(url).then(res => {console.log(res)},)

        
}

const handelDeleteInDataBase =(row) =>{
  let d1 = department[row.department]
  let c1 = course[row.course]
  let inst1 = inst[row.teacher]
  let roo  = rooms[row.room]
  let day1 = days[row.days]
 
  let f = row.FromTime
  let t = row.ToTime

 
  console.log("course = " + c1)
  console.log("from time = " + f)
  console.log("to time = " + t)
  console.log("TableName = " + TableName)
  console.log("day1 = " + day1)


  let time = f+"/"+t+"/"+day1
  let url="https://core-graduation.herokuapp.com/deleteFromSaveMatOfDraft?depId=60ddc9735b4d43f8eaaabf83&tableName="+
  TableName+"&courseIns="+inst1+"&courseName="+c1+"&flag=2&timeSlot="+time+"&roomType="+roo+"&date=2020/2019"
console.log(url)
  axios.get(url).then(res => {console.log(res)},)
}
  


  return (
    <div className="App">
       {loading?
         <div className={classes.lod}>
         
         <BeatLoader  loading={loading} color='#045F5F' size={30} margin ={3} /> 
       </div>
    
    :
      <MaterialTable
        className = "table"
        title=""
        data={data}
      
        columns={columns}
        options={{
          searchFieldStyle:{
            fontFamily: 'Markazi Text',
            fontSize:'25px',
            display:'flex',
            flexDirection:'row-reverse',
            backgroundColor:'white',
            
          },
          paging:false,
          exportButton: true,
          exportDelimiter:"doc",
          actionsColumnIndex:0,
          addRowPosition:'first',
          headerStyle:{
            backgroundColor:'#D4AC0D',
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
          emptyDataSourceMessage:<span style={{fontFamily: 'Markazi Text',
          fontSize:'25px',}} >لا يوجد مواد مضافه بعد</span>,
          deleteTooltip:"حذف",
          editTooltip:"تعديل",
          addTooltip:"اضافة ماده جديدة",
          exportName:"csv حفظ",
          editRow:{
            deleteText:"هل انت متأكد من حذف هذه الماده",
            cancelTooltip:"إلغاء",
            saveTooltip:"حفظ"
          },
         
      },
      toolbar:{
        searchTooltip:"بحث",
        searchPlaceholder:"بحث",
        exportTitle:"تصدير"
      }
      }}
        
        editable={{
          
          

          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            const updatedRows = [...data, { id: Math.floor(Math.random() * 100), ...newRow }]
            handelAddInDataBase(newRow)
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
            }, 2000)
          }),
         

        }}
       
        
      />}
    </div>
  );
}

export default TableR;