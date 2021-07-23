import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import './tabler.css';
import axios from 'axios'



const empList = [
  { id: "117859", type: 10, location:10},
  { id: "5955695", type: 20, location:10},
  { id: "5595646", type: 30, location:10},
  { id: "57424", type: 40, location:20},
  { id: "1178459", type: 10, location:10},
  { id: "59554695", type: 20, location:10},
  { id: "55954646", type: 30, location:20},
  { id: "457424", type: 40, location: 10},
]

function TableR() {
  
  const [data, setData] = useState(empList)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
 

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const columns = [
    
    { title: "الحرم",
     field: "location",
     lookup:{10:'الجديد',20:'القديم'},
     initialEditValue: 10, validate: rowData => rowData.location? true : 'يجب ادخال مكان القاعة',
     cellStyle: {
      // fontFamily: 'Markazi Text',
      fontSize:'25px',
   
             }, 
    },
   

    { title: "نوع القاعة",
    field: "type" ,
    initialEditValue: 10, validate: rowData => rowData.type? true : 'يجب ادخال نوع القاعه',
    lookup: { 10: 'قاعة', 20: 'مختبر متحكمات دقيقة',30: 'مختبر تصميم دوائر رقمية 1', 40: 'مختبر شبكات', },
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
    cellStyle: {
        fontFamily: 'Markazi Text',
        fontSize:'25px',
        
       },
    },

    

    
  ]
  useEffect(()=>{
     axios.get("https://virtual-grad.herokuapp.com/getRoomsofDep?idDep=60ddc9735b4d43f8eaaabf83")
    // axios.get("https://jsonplaceholder.typicode.com/todos/1")
        .then(res => {
            console.log(res)})
  },[]) 
  


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
      }
      }}
        
        editable={{
          
          

          onRowAdd: (newRow) => new Promise((resolve, reject) => {
            
            // const updatedRows = [...data, { id: Math.floor(Math.random() * 100), ...newRow }]
            const updatedRows = [...data,{ ...newRow }]
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...data]
            updatedRows.splice(index, 1)
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
          onRowUpdate:(updatedRow,oldRow)=>new Promise((resolve,reject)=>{
            const index=oldRow.tableData.id;
            const updatedRows=[...data]
            
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