import React, { useState } from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import  { useEffect } from 'react';






function TableR(props) {
  const {name} = props
  
  const [data, setData] = useState([])
  const [course,setCourse] = React.useState({})
  const [department,setDepartment] = React.useState({})
  


  const mapCourse =[
    {id:0,name:'سيركت',dep:'كيماوي'},
    {id:1,name:'الكترونيه',dep:'كهربا'},
    {id:2,name:'نيوماركل',dep:'كيماوي'},
    {id:3,name:'سيجنال',dep:'كهربا'}
  ]

  const mapDepartment =[
    {id:0,name:'كيماوي'},
    {id:1,name:'كهربا'},
    {id:2,name:'معماري'},
    {id:3,name:'مدني'}
  ]

  const FilledData = async() =>{
   

    let list1 ={}
    let list2 ={}
    let list3 ={}

    let x = 0
    let y = 0
    let z = 0 
  
    mapCourse.map(row =>list3[z++] = row.name)



    
    mapDepartment.map(row =>list2[x++] = row.name)

          setCourse(list3)
          setDepartment(list2)
  
 }
 useEffect(()=>{
  FilledData()

     
},[]) 
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
   

    { title: "السنة الدراسية",
    field: "type" ,
    lookup: {10:'خامسة فصل ثاني',20:'خامسة فصل اول',30:'رابعة فصل ثاني',40:'رابعة فصل اول',50:'ثالثة فصل ثاني',60:'ثالثة فصل اول',70:'ثانية فصل ثاني',80:'ثانية فصل اول',90:'اولى فصل ثاني',100:'اولى فصل اول' },
 
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
    { title: "اسم القسم",
    field: "department" ,
    lookup:department,
 
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