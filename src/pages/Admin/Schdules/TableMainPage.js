import React, { useState } from 'react';
import MaterialTable from 'material-table';
import {MTableToolbar} from 'material-table';
import  { useEffect } from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import './main.css'
import TimerIcon from '@material-ui/icons/Timer';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory ,useLocation } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import BeatLoader from "react-spinners/BeatLoader";
import axios from 'axios';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';




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
},
colHeader: {
  color: "white",
  "&:hover": {
    color: "white"
  }
}
});

function TableR(Props) {
  const  {DepId,name} = Props;
  const  history  = useHistory();
  const classes = useStyles();
  const [data, setData] = useState([])
  const [flagHandel,setFlagHandel] =useState(false);
  
const [loading, setLoading] = React.useState(false);

 
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

   
    
    { title:<div className={classes.colHeader}>اسم الجدول</div>,
     field: "name",
     initialEditValue: '####', validate: rowData => rowData.name? true : 'يجب ادخال اسم الجدول ',
     cellStyle: {
      // fontFamily: 'Markazi Text',
      fontSize:'25px',
     
   
             }, 
    },
    { title:<div className={classes.colHeader}>الفصل الدراسي</div>,
    field: "sem",
    
    initialEditValue: '####/####', validate: rowData => rowData.date? true : 'يجب ادخال تاريخ الجدول ',
    cellStyle: {
        fontFamily: 'Markazi Text',
        fontSize:'25px',
        
       },
      
    },
   
    { title:<div className={classes.colHeader}>تاريخ الجدول</div>,
    field: "date",
    cellStyle: {
        fontFamily: 'Markazi Text',
        fontSize:'25px',
        
       },
      
    },
  

    {
      title:<div className={classes.colHeader}>حالة الجدول</div>,
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
    let sem1=-1
    if(row.sem === "فصل اول") sem1 = 1
    if(row.sem === "فصل ثاني") sem1 = 2
    console.log(sem1)


    if(row.flag === "2"){
      history.push({
        pathname: '/view',
        state: { name: row.name, DepId:DepId ,year:row.date  ,sem:sem1 ,namme:name}
      })
    }
    if(row.flag === "3"){
      history.push({
        pathname: '/tableCreate',
        state: { name: row.name,DepId:DepId ,
          index:3 ,year:row.date,sem:sem1,namme:name
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
             <DeleteOutlineIcon {...props} style={{color:'#963333'}} />
             </div>,
          Edit: props =>
            
              <div style={{marginLeft:20}}>

            <EditIcon {...props} style={{color:'#045F5F'}} />
              </div>,
               SortArrow: props =>
          
               <div >
     
                 <ArrowDownwardIcon {...props} style={{color:'white'}} />
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
          actionsColumnIndex:0,
          addRowPosition:'first',
          
          headerStyle:{
            '&:hover': {
              color: 'white',
            },
            backgroundColor:'#37474f',
            color:'white',
            fontFamily: 'Markazi Text',
            fontSize:'25px',
            zIndex: '0'
            
           
            
            

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
          emptyDataSourceMessage:"لا يوجد جداول مضافه بعد",
          deleteTooltip:"حذف",
          editTooltip:"تعديل",
          addTooltip:"اضافة قاعة جديدة",
          exportName:"csv حفظ",
          editRow:{
            deleteText:"هل انت متأكد من حذف هذا الجدول",
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