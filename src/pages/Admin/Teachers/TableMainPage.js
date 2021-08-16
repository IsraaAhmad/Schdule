import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

import axios from 'axios';
import { TablePagination } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BeatLoader from "react-spinners/BeatLoader";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import { css } from "@emotion/react";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import XLSX from 'xlsx';
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import CommentIcon from '@material-ui/icons/Comment';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';



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
    
    width:600,
    display:'flex',
   
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  }
});




function TableR(Props) {
  const {DepId} = Props
  const [data, setData] = useState([])
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

  const EXTENSIONS = ['xlsx', 'xls', 'csv']
    const headerName = ["name"]
 
 
const handelDeleteInDataBase =(selectedRow) =>{
const id = selectedRow.name
let url = "https://core-graduation.herokuapp.com/deleteInsFromDep?idDep="+DepId+"&name="+id
axios.get(url).then(res => {},)
}

const handelAddInDataBase = (newRow) =>{
  let url = "https://core-graduation.herokuapp.com/addInstToDepartment?idDep="+DepId+"&name="
  +newRow.name+"&email="+newRow.email+"&gender="+newRow.gender
  axios.get(url).then(res => {},)
}

  

  const columns = [
    { title: "البريد الالكتروني",
    field: "email",
    cellStyle: {fontFamily: 'Markazi Text',fontSize:'25px',}, 
    editComponent: (props) => 
     

    <TextField
 
   value={props.value}
   inputProps={{min: 0, style: { textAlign: 'right',
    fontFamily:'Markazi Text',
    fontSize:'25px', }}}
   
    onChange={(e) =>props.onChange(e.target.value)}
    />
     ,
   },
    
   { title: "الجنس ",
    field: "gender",
    lookup:{10:'ذكر',20:'انثى'},
    cellStyle: {fontFamily: 'Markazi Text',fontSize:'25px',}, 
   },
    { title: "اسم المدرس",
     field: "name",
     initialEditValue: '###', validate: rowData => rowData.name? true : 'يجب ادخال اسم المدرس',
     cellStyle: {fontFamily: 'Markazi Text',fontSize:'25px',}, 
     editComponent: (props) => 
     

     <TextField
  
    value={props.value}
    inputProps={{min: 0, style: { textAlign: 'right',
     fontFamily:'Markazi Text',
     fontSize:'25px', }}}
    
     onChange={(e) =>props.onChange(e.target.value)}
     />
      ,
    },
   

    
]
const getExention = (file) => {
  const parts = file.name.split('.')
  const extension = parts[parts.length - 1]
  return EXTENSIONS.includes(extension) // return boolean
}

const convertToJson = (headers, data) => {
  const rows = []
  data.forEach(row => {
    let rowData = {}
    row.forEach((element, index) => {
      rowData[headerName[index]] = element
    })
    rows.push(rowData)

  });
  return rows
}

const importExcel = (e) => {
  const file = e.target.files[0]

  const reader = new FileReader()
  reader.onload = (event) => {
    //parse data

    const bstr = event.target.result
    const workBook = XLSX.read(bstr, { type: "binary" })

    //get first sheet
    const workSheetName = workBook.SheetNames[0]
    const workSheet = workBook.Sheets[workSheetName]
    //convert to array
    const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })
    
    const headers = fileData[0]
    
  
    // setCol(columns)
    

    //removing header
    fileData.splice(0, 1)


    // setData(convertToJson(headers, fileData))
    
    let listt = convertToJson(headers, fileData)
  
  
  }

  if (file) {
    if (getExention(file)) {
      reader.readAsBinaryString(file)
    }
    else {
      alert("Invalid file input, Select Excel, CSV file")
    }
  } else {
    setData([])
  }
}
  useEffect(()=>{
    let listt = []
    setLoading(true)
   
    axios.get("https://core-graduation.herokuapp.com/getAllIsn?idDep="+DepId)
  
     
    .then(res => {
        console.log(res.data.response);
        let w = res.data.response;
        for(let k = 0 ;k<w.length;k++){
          let gend = 10
          if(w[k].gender == "انثى") gend=20
          let teach = {name:w[k].name,email:w[k].email,gender:gend}
          listt[k] = teach
          

        }
       setData(listt)
       setLoading(false)
       },
        )
          
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
        actions={[
          {
            icon: () => 
            <div>
            {dialog?
              <div >
           <input
        className={classes.input}
        id="icon-button-file"
        type="file"
        onChange={importExcel}
        
      />
      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          
        >
          <CloudUploadIcon  style={{color:'#808880'}}/>
        </IconButton>
      </label>
          </div>
            
            :
            <div>
        
      <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={handleClickOpen}
        >
          <CommentIcon  style={{color:'#808880'}}/>
        </IconButton>
          

            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            dir='rtl'
          >
            <DialogTitle id="alert-dialog-title" >
              <div style={{ fontFamily: 'Markazi Text',fontSize:'35px',}}>
              طريقة ادراج الملف
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div  style={{ fontFamily: 'Markazi Text',fontSize:'30px',}}>

               لتصدير بيانات الى الصفحة يجب ان يتم ادراج ملف 
              execl
              امتداد
              'xlsx'او 'xls'او  'csv'
              يحتوي على  عامود واحد بعنوان اسم المدرس 
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose1} color="primary" autoFocus style={{ fontFamily: 'Markazi Text',fontSize:'35px',color:'#045F5F'}}>
                تم
              </Button>
              <Button onClick={handleClose} color="primary" style={{ fontFamily: 'Markazi Text',fontSize:'35px',color:'#045F5F'}}>
               إلغاء
              </Button>
            </DialogActions>
          </Dialog>
          </div>
          
          }
          </div>
           
          ,
            tooltip: "استيراد من ملف",
            isFreeAction: true,
          
          }
        ]}
        icons={{
          Delete: props =>
          <div style={{marginLeft:20}}>
             <DeleteOutlineIcon {...props} style={{color:'#963333'}} />
             </div>,
        
        
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
            backgroundColor:'#D4AC0D',
            color:'white',
            fontFamily: 'Markazi Text',
            fontSize:'25px',
            paddingRight:0,
            zIndex: '0'
            
            

          }

        }}
        localization={{
          header: {
              actions:""
          },
        //   pagination: {
        //     labelRowsSelect:"صفوف"
        // },
        
        body: {
          emptyDataSourceMessage:"لا يوجد مدرسين مضافين بعد  ",
          deleteTooltip:"حذف",
          editTooltip:"تعديل",
          addTooltip:"اضافة مدرس جديدة",
          
          editRow:{
            deleteText:"هل انت متأكد من حذف هذا المدرس",
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
       

        }}
       
        
      />}
    </div>
  );
}

export default TableR;