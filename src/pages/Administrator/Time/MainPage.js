import React, { useState } from 'react';
import MaterialTable from 'material-table';
import {MTableToolbar} from 'material-table';
import  { useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TablePagination from '@material-ui/core/TablePagination';

import TimerIcon from '@material-ui/icons/Timer';
import { Grid } from '@material-ui/core';
import { composeClasses } from '@material-ui/x-grid';
import { CallMissedSharp, FlareSharp } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory ,useLocation } from 'react-router-dom';
import { Link} from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import TurnedInIcon from '@material-ui/icons/TurnedIn';




const empList = [
  // {name : "ف1عام2020",sem: 1,date: '2019/2020',flag : '1'},
  // {name : "ف1عام2021",sem: 2,date: '2019/2020',flag : '2'},
  // {name : "ف1عام2019",sem: 2,date: '2020/2021',flag : '3'},
  // {name : "ف2عام2019",sem: 1,date: '2020/2021',flag : '1'},
  // {name : "ف2عام2020",sem: 1,date: '2021/2022',flag : '2'},
]
const useStyles = makeStyles({
  mar:{
    margin:100,
    width:1000,
    
  },
  tit:{
    margin:120,

    width:800,
  }
});

function TableR(Props) {
  const {name ,DepId} = Props
  const arr = ['2017/2018','2018/2019','2019/2020','2020/2021','2021/2022','2022/2023',
  '2023/2024','2024/2025','2025/2026','2026/2027']
  const  history  = useHistory();
  const classes = useStyles();
  const [data, setData] = useState([])
  const [flagHandel,setFlagHandel] =useState(false);
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

   
    
  
    { title: "الفصل الدراسي",
    field: "sem",
    lookup:{10:'فصل اول',20:'فصل ثاني'},
    cellStyle: {
        fontFamily: 'Markazi Text',
        fontSize:'25px',
        
       },
      
    },
   
    { title: "تاريخ الجدول ",
    field: "date",
    cellStyle: {
        fontFamily: 'Markazi Text',
        fontSize:'25px',
        
       },
      
    },
  

   

    

    
  ]
  const handelOpenPage =(row) =>{
 console.log(row)
 let sem  = '1'
 if(row.sem === 20)
 sem=2
    history.push({
      pathname: './tableTime',
      state: { sem:sem ,date:row.date,flagT :"New",duration:"test",name:name ,DepId:DepId
       
      }
    })
  
  }
  const handelDeleteInDataBase= (row) =>{
    console.log(row)
    let sem = -1
    if (row.sem === 10) sem =1
    if (row.sem === 20) sem=2
    
    
      let url="https://core-graduation.herokuapp.com/deleteTimes?semester="+sem+"&date="+row.date
    
      axios.get(url).then(res => {console.log(res)},)
    

  }

  useEffect(()=>{
    let list1 = []
    axios.get("https://core-graduation.herokuapp.com/getAllTimes")
    // axios.get("https://jsonplaceholder.typicode.com/todos/1")
    
        .then(res => {
          console.log(res)
            console.log(res.data.response);
            let w = res.data.response
             
             for (let i = 0;i<w.length ; i++){
               let n1 = w[i].name
               let sem1 = 10
               if(w[i].semester === "2"){ sem1 = 20}
               let indexYear = w[i].date
           
            

             
               let x={
                 name:n1,
                 sem:sem1,
                 date:indexYear,
                 
               }
               list1.push(x)
               
              
             }
             setData(list1)
             console.log("list1")
             console.log(list1)
             console.log("data")
             console.log(data) },)
      
 },[]) 
  const HandelAddSem =() =>{
      console.log("hi")
      history.push({
        pathname: './createSemester',
        state: {name:name ,DepId:DepId
         
        }
      })
      
      
  }


  return (
    <div className="App">
        <div>
        <Button variant="contained" onClick={HandelAddSem}  style={{margin:10,backgroundColor:'#045F5F', color:'white',fontFamily:'Markazi Text',fontSize:'20px'}} size='medium'>
           اضافة فصل جديد 
      </Button>
        </div>
      <MaterialTable
        
        className = "table"
        title={<span style={{ fontFamily:'Markazi Text',fontSize:'35px',}}>أوقات الدوام للفصول الدراسية      </span>}
        
        components={{
          Toolbar: (props) => (
            <div >
              <MTableToolbar {...props} />
            </div>
          )
        }}
        data={data}
        icons={{
          Delete: props =>
          <div style={{marginLeft:20}}>
             <DeleteIcon {...props} style={{color:'#963333'}} />
             </div>,
          Edit: props =>
            
              <div style={{marginLeft:20}}>

            <EditIcon {...props} style={{color:'#045F5F'}} />
              </div>,
            


           
      }}
        actions={[

          {
            icon: 'edit',
          tooltip: ' تعديل الجدول',
          onClick: (event, rowData) =>{
            handelOpenPage(rowData)
            }},
            

            
        ]}
     

        columns={columns}
        options={{
         
          
          searchFieldStyle:{
            fontFamily: 'Markazi Text',
            fontSize:'25px',
            
          },
          
          search:true,
          paging:false,
          exportButton: {
            csv: true,
            pdf: false
          },
          actionsColumnIndex:0,
          addRowPosition:'first',
          
          headerStyle:{
            hover: {
              color: 'green',
           },
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
  
       
        body: {
          emptyDataSourceMessage:"لا يوجد فصول مضافه بعد",
          deleteTooltip:"حذف",
          editTooltip:"تعديل",
          addTooltip:"اضافة فصل جديدة",
        
          editRow:{
            deleteText:"هل انت متأكد من حذف هذه الفصل",
            cancelTooltip:"إلغاء",
            saveTooltip:"حفظ"
          },
         
      },
      toolbar:{
        searchTooltip:"بحث",
        searchPlaceholder:"بحث",
        exportTitle:'تصدير',
        exportCSVName: " Excelتصدير ملف ",
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
            }, 2000)
          }),
        

        }}
       
        
      />
    </div>
  );
}

export default TableR;