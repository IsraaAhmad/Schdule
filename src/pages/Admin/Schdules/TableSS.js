import React, { useState } from 'react';
import MaterialTable from 'material-table';
import firstLoad ,{MTableToolbar,MTablePagination,MTableEditRow} from 'material-table';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TablePagination from '@material-ui/core/TablePagination';
import  { useEffect } from 'react';
import axios from 'axios';





function TableR(props) {
  const {name} = props
  
  
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
          let w = res.data.response;
          let x = 1
          w.map(row =>(
           mapRoom[x++] = {number:row.number}
          ))
          Resolve()
         },
          )
          
    })
  }


  const inst1 =() =>{
    return new Promise((Resolve,Reject)=>{

      axios.get("https://core-graduation.herokuapp.com/getAllInstOfDepartment?idDep=60ddc9735b4d43f8eaaabf83")
  
     
      .then(res => {
        // console.log(res)
        //   console.log(res.data.response);
          // let w = res.data.response;
          // let x = 0
          // w.map(row =>(
          //   mapIns[x++] = {name:row.name}
          // ))
          Resolve()
         },
          )
          
    })
  }
   const FilledData = async() =>{
     await course1()
    //  await inst1()
     await room1()

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
           console.log("mapcourse = "+mapCourse)
           console.log("list3 = "+list3)
           setCourse(list3)
   
  }
  const handelAddInDataBase = (row) =>{
    let room1 = rooms[row.type]
    let inst1 = inst[row.teacher]
    let course1 = course[row.course]

    console.log("room = " + room1)
    console.log("inst = " + inst1)
    console.log("course = " + course1)


  let url = "https://core-graduation.herokuapp.com/saveMatOfDraft?depId=60ddc9735b4d43f8eaaabf83&tableName="
   +name+"&courseIns="+inst1+"&courseName="+course1+"&flag=0&timeSlot=0&roomType="+room1+"&date=2020/2019"
  console.log(url)
    axios.get(url)
  // axios.get("https://jsonplaceholder.typicode.com/todos/1")
  
      .then(res => {
        console.log(res)
          },
          )
  }

  const handelDeleteInDataBase =(row) =>{
    let room1 = rooms[row.type]
    let inst1 = inst[row.teacher]
    let course1 = course[row.course]
  //   let url = "https://core-graduation.herokuapp.com/saveMatOfDraft?depId=60ddc9735b4d43f8eaaabf83&tableName="
  //  +name+"&courseIns="+inst1+"&courseName="+course1+"&flag=0&timeSlot=0&roomType="+room1+"&date=2020/2019"
  // console.log(url)
  //   axios.get(url)
  // // axios.get("https://jsonplaceholder.typicode.com/todos/1")
  
  //     .then(res => {
  //       console.log(res)
  //         },
  //         )
  }


  const handelEditInDataBase =(updateRow,OldRow) =>{
    let room1 = rooms[updateRow.type]
    let inst1 = inst[updateRow.teacher]
    let course1 = course[updateRow.course]


    let room2 = rooms[OldRow.type]
    let inst2 = inst[OldRow.teacher]
    let course2 = course[OldRow.course]

  }

   useEffect(()=>{
    FilledData()
  
       
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
            
          },
          paging:false,
          exportButton: true,
          exportDelimiter:"doc",
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
          emptyDataSourceMessage:"لا يوجد قاعات مضافه بعد",
          deleteTooltip:"حذف",
          editTooltip:"تعديل",
          addTooltip:"اضافة قاعة جديدة",
          exportName:"csv حفظ",
          editRow:{
            deleteText:"هل انت متأكد من حذف هذه القاعة",
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
            const updatedRows = [...data]
            updatedRows.splice(index, 1)
            handelDeleteInDataBase(selectedRow)
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...data]
            handelEditInDataBase(updatedRow,oldRow)
            updatedRows[index]=updatedRow
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          })

        }}
       
        
      />
    </div>
  );
}

export default TableR;