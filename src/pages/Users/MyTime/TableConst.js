import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { TablePagination } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BeatLoader from "react-spinners/BeatLoader";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { css } from "@emotion/react";

import XLSX from 'xlsx';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import CommentIcon from '@material-ui/icons/Comment';

const empList = [
    { space: "نعم", need: "نعم", weight:2, days: "احد ثلاثا", ToTime:"08:30", FromTime: "09:30", note:"ملاحظ"},
    { space: "نعم", need: "نعم", weight:1, days: "احد ثلاثا", ToTime:"08:30", FromTime: "09:30", note:"ملاحظ"},
    { space: "نعم", need: "نعم", weight:2, days: "احد ثلاثا", ToTime:"08:30", FromTime: "09:30", note:"ملاحظ"},
    
  ]

const useStyles = makeStyles({
  root: {
    "& > *": {
      margin:1
    }
  },
  input: {
    display: "none"
  },
  mar:{
    margin:100,
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




function TableR() {
  
  const [data, setData] = useState(empList)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = React.useState(false);
  const [dialog,setDialog] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose1 = () => {
    setOpen(false);
    setDialog(true)
  };
  const handleClose = () => {
    setOpen(false);
    
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



  
  
  const columns = [


    { title: "فراغات",
     field: "space",
     cellStyle: {fontFamily: 'Markazi Text',fontSize:'25px',}, },

    { title: "اريد",
     field: "need",
     cellStyle: {fontFamily: 'Markazi Text',fontSize:'25px',}, },
    
    { title: "الوزن",
     field: "weight",
     render:(rowData) =>
     <Box component="fieldset" borderColor="transparent" dir="rtl" style={{display:'flex',alignItems:'center',alignContent:'center'}}>
     <Rating name="read-only" value={rowData.weight}  readOnly max={4} />
   </Box>,
     cellStyle: {fontFamily: 'Markazi Text',fontSize:'25px',}, },
   

    { title: "الايام",
      field: "days" ,
      cellStyle: {fontSize:'25px',},},

    
      { title: " الوقت",
      field: "ToTime" ,
      render:(rowData) => 
      <div>

      <TextField
     id="time2"
     label="الى"
     type="time"
     value={rowData.ToTime}
     InputLabelProps={{shrink: true,}}
     inputProps={{step: 300, }}
     />
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
     </div>
     ,
      cellStyle: {fontSize:'20px',},},
     
     
     
  

    { title: "ملاحظة",
    field: "note",
    cellStyle: { fontFamily: 'Markazi Text',fontSize:'25px',},},
]

  useEffect(()=>{
    // let list1 =[];
    // setLoading(true)
    //  axios.get("https://core-graduation.herokuapp.com/getRoomsofDep?idDep=60ddc9735b4d43f8eaaabf83")
    // // axios.get("https://jsonplaceholder.typicode.com/todos/1")
    
    //     .then(res => {
    //       console.log(res)
    //         console.log(res.data.response);
             
    //          for (let i = 0;i<res.data.response.length ; i++){
    //            if(res.data.response[i].type ==="قاعة تدريس"){
    //            let location2 = 20
             
    //            if(res.data.response[i].campous === "الحرم الجديد")
    //               location2 = 10
              

    //            let x={
    //              id:res.data.response[i].number,
    //              type:10,
    //              location:location2,
    //            }
    //            list1.push(x)}
    //            setLoading(false)
               
    //          }
             
    //          setData(list1)
    //          console.log("list1")
    //          console.log(list1)
    //          console.log("data")
    //          console.log(data)

               


          
    //         // setData(res.data.response)
    //       },

          
            
            
    //         )
          
  },[]) 
  

  const classes = useStyles();
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
        data={data}
        icons={{
          Delete: props =>
          <div style={{marginLeft:20}}>
             <DeleteIcon {...props} style={{color:'#963333'}} />
             </div>,}}
      
        

        columns={columns}
        
     
       
        options={{
        searchFieldStyle:{
            fontFamily: 'Markazi Text',
            fontSize:'25px',
            display:'flex',
            flexDirection:'row-reverse',},
        paging:false,
        exportButton: true,
        actionsColumnIndex:0,
        addRowPosition:'first',
        headerStyle:{
            backgroundColor:'#D4AC0D',
            color:'white',
            fontFamily: 'Markazi Text',
            fontSize:'25px',
            paddingRight:0} }}
        localization={{
          header: {
              actions: "",
          },
        //   pagination: {
        //     labelRowsSelect:"صفوف"
        // },
        
        body: {
          emptyDataSourceMessage:"لا يوجد   ",
          deleteTooltip:"حذف",
          
          editRow:{
            deleteText:"هل انت متأكد من حذف هذا  الموعد",
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
       
        
      />}
    </div>
  );
}

export default TableR;