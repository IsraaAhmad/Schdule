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
import { composeClasses } from '@material-ui/x-grid';




function TableR(props) {
  const { DepId ,inst} = props;
  const [data, setData] = useState()

  

  useEffect(()=>{
      
    axios.get("https://core-graduation.herokuapp.com/getDataFromApprovalOfDep?idDep="+DepId)
    .then(res => {
              let w = res.data.response;
              console.log(w)
              
              let x = 0
              let listdd = []
              for(let y = 0 ;y<w.length;y++){
                if(w[y].instName ===inst ){
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
                  
                  listdd[x] = {room:temp,ToTime:ee,FromTime:ss,
                  day:w[y].days,course:w[y].courseName,number:w[y].courseNumber}
                              x =x+1

                }
              }
   setData(listdd)
})
      
 },[]) 
  


  const columns = [
   
    { title: "القاعة",
    field: "room" ,
   
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

  
     
  ]
 

  return (
    <div className="App">
     
      <MaterialTable
        className = "table"
        title=""
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
          
          

         

        }}
       
        
      />
    </div>
  );
}

export default TableR;