import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import './tabler.css';
import axios from 'axios';
import { TablePagination } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';




const empList = [
  { id: "117859", type: 10, location:10},
  { id: "5955695", type: 20, location:10},
  { id: "5595646", type: 10, location:10},
  { id: "57424", type: 20, location:20},
  { id: "1178459", type: 10, location:10},
  { id: "59554695", type: 20, location:10},
  { id: "55954646", type: 20, location:20},
  { id: "457424", type: 10, location: 10},
]

function TableR() {
  
  const [data, setData] = useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 
const handelDeleteInDataBase =(selectedRow) =>{
const id = selectedRow.id
let url = "https://core-graduation.herokuapp.com/deleteRoomFromDep?idDep=60ddc9735b4d43f8eaaabf83&number="+id
axios.get(url)
// axios.get("https://jsonplaceholder.typicode.com/todos/1")

    .then(res => {
      console.log(res)
        },
        )
}

const handelAddInDataBase = (newRow) =>{
  let type = "قاعة تدريس"
  if(newRow.type === 20 || newRow.type === "20")
  type = "مختبر"

  let location = "الحرم الجديد"
  if(newRow.location === 20 || newRow.location === "20")
  location = "الحرم القديم"
  let url = "https://core-graduation.herokuapp.com/addRoomToDepartment?idDep=60ddc9735b4d43f8eaaabf83&number="
  +newRow.id+"&type="+type+"&campous="+location

  axios.get(url)
// axios.get("https://jsonplaceholder.typicode.com/todos/1")

    .then(res => {
      console.log(res)
        },
        )
}

const handelEditInDataBase =(rowUp) =>{
  const id = rowUp.id;
  let location = "الحرم الجديد";
  if(rowUp.location === "20" || rowUp.location === 20 ){
    location="الحرم القديم";
  }
  let type = "مختبر";
  if(rowUp.type === "10" || rowUp.type === 10 ){
    type="قاعة تدريس";
  }
 
  console.log("id="+ id)
  console.log("type="+ type)
  console.log("locaion="+ location)
  let url = "https://core-graduation.herokuapp.com/editRoom?idDep=60ddc9735b4d43f8eaaabf83&number="+id+
  "&type="+type+"&campous="+location
  
  axios.get(url)
 // axios.get("https://jsonplaceholder.typicode.com/todos/1")
 
     .then(res => {
       console.log(res)
         },
         )
}
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  const columns = [
    
    { title: "الحرم",
     field: "location",
     lookup:{10:'الحرم الجديد',20:'الحرم القديم'},
     initialEditValue: 10, validate: rowData => rowData.location? true : 'يجب ادخال مكان القاعة',
     cellStyle: {
      // fontFamily: 'Markazi Text',
      fontSize:'25px',
   
             }, 
    },
   

    { title: "نوع القاعة",
    field: "type" ,
    initialEditValue: 10, validate: rowData => rowData.type? true : 'يجب ادخال نوع القاعه',
    lookup: {10:'قاعة تدريس', 20:'مختبر' },
  //   render:sele =>(
  //   <Select
  //   labelId="demo-simple-select-label"
  //   id="demo-simple-select"
  //   style = {{fontSize:'25px',}}
    
  // >
  //   <MenuItem style = {{fontSize:'20px',}} value={10}>قاعة</MenuItem>
  //   <MenuItem style = {{fontSize:'20px',}} value={20}>مختبر متحكمات دقيقة</MenuItem>
  //   <MenuItem style = {{fontSize:'20px',}} value={30}>متبر تصميم دوائر رقمية 1</MenuItem>
  //   <MenuItem style = {{fontSize:'20px',}} value={40}>مختبر شبكات</MenuItem>
  //   <MenuItem style = {{fontSize:'20px',}} value={50}>مختبر تصميم الكمبيوتر</MenuItem>
  //   <MenuItem style = {{fontSize:'20px',}} value={60}>مختبر تصميم دوائر رقمية 2</MenuItem>
  // </Select>),
      cellStyle: {
        //  fontFamily: 'Markazi Text',
         fontSize:'25px',
              },
              
    },
    { title: "رقم القاعة",
    field: "id",
    initialEditValue: '####', validate: rowData => rowData.id? true : 'يجب ادخال رقم القاعه',
    editable: 'onAdd',
    cellStyle: {
        fontFamily: 'Markazi Text',
        fontSize:'25px',
        
       },
    },

    

    
  ]
  useEffect(()=>{
    let list1 =[];
     axios.get("https://core-graduation.herokuapp.com/getRoomsofDep?idDep=60ddc9735b4d43f8eaaabf83")
    // axios.get("https://jsonplaceholder.typicode.com/todos/1")
    
        .then(res => {
          console.log(res)
            console.log(res.data.response);
             
             for (let i = 0;i<res.data.response.length ; i++){
               let location2 = 20
               let type2 = 20
               if(res.data.response[i].campous === "الحرم الجديد")
                  location2 = 10
               if(res.data.response[i].type ==="قاعة تدريس")
                 type2 = 10

               let x={
                 id:res.data.response[i].number,
                 type:type2,
                 location:location2,
               }
               list1.push(x)
               
             }
             
             setData(list1)
             console.log("list1")
             console.log(list1)
             console.log("data")
             console.log(data)

               


          
            // setData(res.data.response)
          },

          
            
            
            )
          
  },[]) 
  


  return (
    <div className="App">
      <MaterialTable
        className = "table"
        title=""
        data={data}
        icons={{
          Delete: props =>
          <div style={{marginLeft:20}}>
             <DeleteIcon {...props} style={{color:'#963333'}} />
             </div>,
          Edit: props =>
            
              <div style={{marginLeft:20}}>

            <EditIcon {...props} style={{color:'#045F5F'}} />
              </div>
           
      }}
      
        

        columns={columns}
       
        options={{
        

          searchFieldStyle:{
            fontFamily: 'Markazi Text',
            fontSize:'25px',
            display:'flex',
            flexDirection:'row-reverse',
          
            
            

            
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
            paddingRight:0
            
            

          }

        }}
        localization={{
          header: {
              actions: <div  style={{display:'flex',flexDirection:'row'}}>
                <div style={{marginLeft:20}}>تعديل</div>
                <div style={{marginLeft:20}}>حذف</div>
                </div>,
          },
        //   pagination: {
        //     labelRowsSelect:"صفوف"
        // },
        
        body: {
          emptyDataSourceMessage:"لا يوجد قاعات  ",
          deleteTooltip:"حذف",
          editTooltip:"تعديل",
          addTooltip:"اضافة قاعة جديدة",
          
          editRow:{
            deleteText:"هل انت متأكد من حذف هذه القاعة",
            cancelTooltip:"إلغاء",
            saveTooltip:"حفظ"
          },
         
      },
      toolbar:{
        searchTooltip:"بحث",
        searchPlaceholder:"بحث",
      }
      }}
        
        editable={{
          
          

          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            
            // const updatedRows = [...data, { id: Math.floor(Math.random() * 100), ...newRow }]
            handelAddInDataBase(newRow)
            const updatedRows = [...data,{ ...newRow }]
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...data]
            handelDeleteInDataBase(selectedRow)
            updatedRows.splice(index, 1)
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...data]
            console.log(updatedRow)
            updatedRows[index]=updatedRow
            handelEditInDataBase(updatedRow)
    

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