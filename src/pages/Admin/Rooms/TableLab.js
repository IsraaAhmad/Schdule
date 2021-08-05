import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import './tabler.css';
import axios from 'axios';
import { TablePagination } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import BeatLoader from "react-spinners/BeatLoader";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles({
  mar:{
    margin:100,
    width:1000,
    
  },

  input: {
    display: "none"
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
  const [loading, setLoading] = React.useState(false);
  const EXTENSIONS = ['xlsx', 'xls', 'csv']
  const headerName = ["id","type","location","name"]
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

const handelAddInDataBase = (newRow) =>{
  let type = "قاعة تدريس"
  if(newRow.type === 20 || newRow.type === "20")
  type = "مختبر"

  let location = "الحرم الجديد"
  if(newRow.location === 20 || newRow.location === "20")
  location = "الحرم القديم"
  let url = "https://core-graduation.herokuapp.com/addRoomToDepartment?idDep=60ddc9735b4d43f8eaaabf83&number="
  +newRow.id+"&type="+type+"&campous="+location+"&name="+newRow.name

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
  "&type="+type+"&campous="+location+"&name="+rowUp.name
  
  axios.get(url)
 // axios.get("https://jsonplaceholder.typicode.com/todos/1")
 
     .then(res => {
       console.log(res)
         },
         )
}
 

  
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
    initialEditValue: 20, validate: rowData => rowData.type? true : 'يجب ادخال نوع القاعه',
    lookup: {10:'قاعة تدريس', 20:'مختبر' },
    editable:'never',
    cellStyle: {fontSize:'25px',},
              
    },
    { title: "اسم القاعة",
    field: "name",
    initialEditValue: '####', validate: rowData => rowData.name? true : 'يجب ادخال اسم القاعه',
    editable: 'onAdd',
    cellStyle: {
        fontFamily: 'Markazi Text',
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
    console.log("from import execl")
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
      // console.log(fileData)7
      const headers = fileData[0]
      const hed1 = ['teacher','course','department']
      let x =0
      const heads = headers.map(head => ({ title: head, field: head }))
      // setCol(columns)
      
  
      //removing header
      fileData.splice(0, 1)
  
      // let url = "https://core-graduation.herokuapp.com/addRoomToDepartment?idDep=60ddc9735b4d43f8eaaabf83&number="
      // +newRow.id+"&type="+type+"&campous="+location+"&name="+newRow.name
      // setData(convertToJson(headers, fileData))
      console.log("data")
      let listt = convertToJson(headers, fileData)
      console.log(listt)
      for (let k = 0;k<listt.length;k++){
        let url = "https://core-graduation.herokuapp.com/addRoomToDepartment?idDep=60ddc9735b4d43f8eaaabf83&number="
    +listt[k].id+"&type="+listt[k].type+"&campous="+listt[k].location+"&name="+listt[k].name
  
    axios.get(url).then(res => {console.log(res)},)
  
      }
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
    let list1 =[];
    setLoading(true)
     axios.get("https://core-graduation.herokuapp.com/getRoomsofDep?idDep=60ddc9735b4d43f8eaaabf83")
    // axios.get("https://jsonplaceholder.typicode.com/todos/1")
    
        .then(res => {
          console.log(res)
            console.log(res.data.response);
             
             for (let i = 0;i<res.data.response.length ; i++){
               if(res.data.response[i].type ==="مختبر"){
               let location2 = 20
             
               if(res.data.response[i].campous === "الحرم الجديد")
                  location2 = 10
              

               let x={
                 id:res.data.response[i].number,
                 type:20,
                 location:location2,
                 name:res.data.response[i].name
               }
               list1.push(x)}
               setLoading(false)
               
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
             </div>,
          Edit: props =>
            
              <div style={{marginLeft:20}}>

            <EditIcon {...props} style={{color:'#045F5F'}} />
              </div>
           
      }}
      
        

        columns={columns}

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
              يحتوي على اربع عواميد بعنوان رقم القاعة ,نوع القاعة,الحرم الدراسي واسم القاعة بالترتيب
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
       
        
      />}
    </div>
  );
}

export default TableR;