import React, { useState } from 'react';
import MaterialTable from 'material-table';
import {MTableToolbar} from 'material-table';
import  { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TablePagination from '@material-ui/core/TablePagination';
import './main.css'
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

import BeatLoader from "react-spinners/BeatLoader";
import axios from 'axios';




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
    marginTop:100,
    marginRight:100,

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
  const  {DepId} = Props;
  const  history  = useHistory();
  const classes = useStyles();
  const [data, setData] = useState([])
  const [flagHandel,setFlagHandel] =useState(false);
  const [page, setPage] = React.useState(0);
  
const [loading, setLoading] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
 const handelIcon =(row) =>{
   if (row.flag ==="1")
      return <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
       <div style={{fontFamily:'Markazi Text',fontSize:'25px',}}> في الانتظار </div>
        <TimerIcon style={{color:'#F1C40F '}}/>
      </div>

      if (row.flag ==="2")
      return <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
      <div style={{fontFamily:'Markazi Text',fontSize:'25px',}}>جاهز</div>
       <CheckCircleIcon style={{color:'#045F5F '}}/>
     </div>
      

      if (row.flag ==="3")
      return <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
      <div style={{fontFamily:'Markazi Text',fontSize:'25px',}}>محفوظ</div>
       <TurnedInIcon />
     </div>
     
 }
  const columns = [

   
    
    { title: "اسم الجدول",
     field: "name",
     initialEditValue: '####', validate: rowData => rowData.name? true : 'يجب ادخال اسم الجدول ',
     cellStyle: {
      // fontFamily: 'Markazi Text',
      fontSize:'25px',
     
   
             }, 
    },
    { title: "الفصل الدراسي  ",
    field: "sem",
    
    initialEditValue: '####/####', validate: rowData => rowData.date? true : 'يجب ادخال تاريخ الجدول ',
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
  

    {
      title: "حالة الجدول ",
      field: "mode",
      editable: false,
      render: (rowData) =>(rowData&&handelIcon(rowData)),

      cellStyle: {
       
        
       },
      },

    

    
  ]
  const handelOpenPage =(row) =>{
    console.log(row)
    console.log("row")


    if(row.flag === "2"){
      history.push({
        pathname: '/view',
        state: { name: row.name, DepId:DepId ,year:row.date }
      })
    }
    if(row.flag === "3"){
      history.push({
        pathname: '/tableCreate',
        state: { name: row.name,DepId:DepId ,
          index:3 ,year:row.date
        }
      })
    }


  }
  const handelDeleteInDataBase =(selectedRow) =>{
    const n = selectedRow.name
    let url = "https://core-graduation.herokuapp.com/deleteTable?idDep="+DepId+"&name="+n
    
    axios.get(url)
    // axios.get("https://jsonplaceholder.typicode.com/todos/1")
    
        .then(res => {
          console.log(res)
        
            },
            )
    }

  useEffect(()=>{
    let list1 = []
    setLoading(true)
    axios.get("https://core-graduation.herokuapp.com/getTables?idDep="+DepId)
    // axios.get("https://jsonplaceholder.typicode.com/todos/1")
    
        .then(res => {
          console.log(res)
            console.log(res.data.response);
            let w = res.data.response
             
             for (let i = 0;i<w.length ; i++){
               let n1 = w[i].name
               let sem1 = "فصل اول"
               if(w[i].semester === "2"){ sem1 = "فصل ثاني"}
               let flag1 =-1
               if(w[i].status ==="new" || w[i].status ==="draft"){flag1 ="3"}
               else if(w[i].status ==="proc"){flag1="1"}
               else if(w[i].status === "done"){flag1="2"}

               let year1 = w[i].year
             
               let x={
                 name:n1,
                 sem:sem1,
                 date:year1,
                 flag:flag1
               }
               list1.push(x)
               
              
             }
             
             setData(list1)
             console.log("list1")
             console.log(list1)
             console.log("data")
             console.log(data)

               setLoading(false)


          
            // setData(res.data.response)
          },

          
            
            
            )
      
 },[flagHandel]) 
  


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
        components={{
          Toolbar: (props) => (
            <div style={{ height:1 }}>
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
          
          search:false,
          paging:false,
          exportButton: false,
          exportDelimiter:"doc",
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
        exportTitle:'تصدير',
        exportCSVName: " Excelتصدير ملف ",
        exportPDFName:  " PDF ملف ",
      }
      }}
        
        editable={{
          
          

          
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
        

        }}
       
        
      />
      
   }
    </div>
  );
}

export default TableR;