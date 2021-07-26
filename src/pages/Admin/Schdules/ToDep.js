import React, { useState } from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';






function TableR() {
  
  const [data, setData] = useState([])
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
   

    { title: "المدرس",
    field: "teacher" ,
    lookup: {10:'عماد النتشة',20:'منار قمحية',30:'منى الضميدي',40:'انس طعمة' },
 
      cellStyle: {
        //  fontFamily: 'Markazi Text',
         fontSize:'25px',
              },
              
    },
    { title: "اسم المساق",
    field: "course" ,
    lookup: { 10: 'برمجة حاسوب', 20: 'مختبر متحكمات دقيقة',30: ' تصميم دوائر رقمية 1', 40: 'مختبر شبكات', },
 
      cellStyle: {
        //  fontFamily: 'Markazi Text',
         fontSize:'25px',
              },
              
    },
    { title: "اسم القسم",
    field: "department" ,
    lookup: { 10: 'الكيمياوي ', 20: 'المعماري',30: 'الاتصالات', 40: 'الكهرباء ', },
 
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