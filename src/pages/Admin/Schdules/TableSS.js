import React, { useState } from 'react';
import MaterialTable from 'material-table';
import  { useEffect } from 'react';
import axios from 'axios';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import { useHistory ,useLocation } from 'react-router-dom';






function TableR(Props) {
  let {TableName , savedData} = Props
  console.log("from top saved ="+ savedData)
  const [savDate,setSavDate] = React.useState(savedData)
  const [nameTable,setNameTable] = React.useState(TableName)
  const  history  = useHistory();


  const [data, setData] = useState([])
  const [rooms,setRooms] = React.useState({})


  const [inst,setInst] = React.useState({})
  const [course,setCourse] = React.useState({})

  const mapRoom=[
    {number:"قاعة تدريس"}
  ]
  const mapIns=[]
  const  mapCourse=[]
 
  const course1 =() =>{
    return new Promise((Resolve,Reject)=>{

      axios.get("https://core-graduation.herokuapp.com/getAllMaterialsOfDepartment?idDep=60ddc9735b4d43f8eaaabf83")
  
     
      .then(res => {
        // console.log(res)
        //   console.log(res.data.response);
          let w = res.data.response;
          let x = 0
          w.map(row =>(
           mapCourse[x++] = {name:row.name}
          ))
          Resolve()
         },
          )
          
    })
  }


  const room1 =() =>{
    return new Promise((Resolve,Reject)=>{
      axios.get("https://core-graduation.herokuapp.com/getRoomsofDep?idDep=60ddc9735b4d43f8eaaabf83")
  .then(res => {
        console.log(res)
          console.log(res.data.response);
          let x = 1
          res.data.response.filter(room => (room.type === "مختبر") ).map(cor => (
            
            mapRoom[x++] = {number:cor.number}
               ))
               setTimeout(() => {
                setSavDate(savedData)
               
              }, 2000)
          
         
         
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
  const findInedx =(obj,da) =>{
     for(let i = 0;i<obj.length;i++){
       if (obj[i].number === da){

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


  const initialData=() =>{

    
    console.log("form inital data")
     let listd=[]
     let x = 0 
     console.log("saved mat="+savedData)
     console.log("saveData mat="+savDate)
     
     savDate.filter(row => (row.fromOtherDep ==="false")&(row.toOtherDep ==="false")&(row.tableName===TableName ) ).map(cor => (
           listd[x++] = {type:cor.roomType,teacher:cor.courseIns,course:cor.courseName}

    ))
    
    console.log("listd = ")
    console.log(listd)
    for (let i = 0;i<listd.length;i++){
      console.log("to func" +listd[i].rooms)
      let index= findInedx(mapRoom,listd[i].type)
      listd[i].type = index
      index = findInedx1(mapCourse,listd[i].course)
      listd[i].course = index
      index = findInedx1(mapIns,listd[i].teacher)
      listd[i].teacher = index
      // if(i == listd.length -1) 
    }
    
    console.log(" after roooms listd = ")
    console.log(listd)
  
    setData(listd)
 
  }
   const FilledData = async() =>{
     
     await course1()
     await inst1()
     await room1()
      initialData()

     let list1 ={}
     let list2 ={}
     let list3 ={}
   
 
     let x = 0
     let y = 0
     let z = 0 
     
     mapRoom.map(row =>list1[x++] = row.number)
 
     mapIns.map(row =>list2[y++] = row.name)
   
     mapCourse.map(row =>list3[z++] = row.name)
     
           setRooms(list1) 
           setInst(list2)
           setCourse(list3)
          

   
  }
  const handelAddInDataBase = (row) =>{
    let room1 = rooms[row.type]
    let inst1 = inst[row.teacher]
    let course1 = course[row.course]

    console.log("room = " + room1)
    console.log("inst = " + inst1)
    console.log("course = " + course1)
    console.log("tableName = " + nameTable)

  let url = "https://core-graduation.herokuapp.com/saveMatOfDraft?depId=60ddc9735b4d43f8eaaabf83&tableName="
   +nameTable+"&courseIns="+inst1+"&courseName="+course1+"&flag=0&timeSlot=0&roomType="+room1+"&date=2020/2019"
  console.log("url="+ url)
    axios.get(url).then(res => {console.log(res)},)

          
  }

  const handelDeleteInDataBase =(row) =>{
    let room1 = rooms[row.type]
    let inst1 = inst[row.teacher]
    let course1 = course[row.course]
    let tableN = nameTable
    let url="https://core-graduation.herokuapp.com/deleteFromSaveMatOfDraft?depId=60ddc9735b4d43f8eaaabf83&tableName="+
    tableN+"&courseIns="+inst1+"&courseName="+course1+"&flag=0&timeSlot=0&roomType="+room1+"&date=2020/2019"
  console.log(url)
    axios.get(url)
  // // axios.get("https://jsonplaceholder.typicode.com/todos/1")
  
      .then(res => {
        console.log(res)
          },
          )
  }


 

   useEffect(()=>{
     console.log("from use effect")
    FilledData()
    console.log("end use effect")
       
  },[]) 
  const columns = [
  
   

    { title: "نوع القاعة",
    field: "type" ,
    lookup:rooms,
 
      cellStyle: {
        //  fontFamily: 'Markazi Text',
         fontSize:'25px',
              },
              
    },
    { title: "اسم المدرس",
    field: "teacher" ,
    lookup:inst,
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
  
  


  return (
    <div className="App">
      <MaterialTable
        className = "table"
        title=""
        data={data}
       
      //   components={{
      //     Pagination: (props) =>  
      //     <TablePagination
      //     rowsPerPageOptions={[5, 10, 25]}
      //     component="div"
      //     count={data.length}
      //     rowsPerPage={rowsPerPage}
      //     page={page}
      //     onPageChange={handleChangePage}
      //     onRowsPerPageChange={handleChangeRowsPerPage}
      //   />
      //     }
      // } 
        

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
       
        
      />
    </div>
  );
}

export default TableR;