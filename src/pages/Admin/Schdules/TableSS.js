import React, { useState } from 'react';
import MaterialTable from 'material-table';
import  { useEffect } from 'react';
import axios from 'axios';
import { ConsoleSqlOutlined } from '@ant-design/icons';
import { useHistory ,useLocation } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import { makeStyles } from "@material-ui/core/styles";
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



function TableR(Props) {
  let {TableName , savedData,setChild,child ,DepId} = Props
  console.log("from top saved ="+ savedData)
  const [savDate,setSavDate] = React.useState(savedData)
  const [nameTable,setNameTable] = React.useState(TableName)
  const [loading, setLoading] = React.useState(false)
  const  history  = useHistory();
  
  
  const [data, setData] = useState([])
  const [rooms,setRooms] = React.useState({})
  
  
  const [inst,setInst] = React.useState({})
  const [course,setCourse] = React.useState({})
  
  const [ren, setRen] = React.useState(false)
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
    const headerName = ["course","teacher","type"]

  const mapRoom=[
    {name:"قاعة تدريس"}
  ]
  const mapIns=[]
  const  mapCourse=[]
 
  const course1 =() =>{
    return new Promise((Resolve,Reject)=>{

      axios.get("https://core-graduation.herokuapp.com/getAllMaterialsOfDepartment?idDep="+DepId)
  
     
      .then(res => {
        // console.log(res)
        //   console.log(res.data.response);
          let w = res.data.response;
          let x = 0
          w.map(row =>(
           mapCourse[x++] = {name:row.name}
          ))
          Resolve()
         },
          )
          
    })
  }


  const room1 =() =>{
    return new Promise((Resolve,Reject)=>{
      axios.get("https://core-graduation.herokuapp.com/getRoomsofDep?idDep="+DepId)
  .then(res => {
        console.log(res)
          console.log(res.data.response);
          let x = 1
          res.data.response.filter(room => (room.type === "مختبر") ).map(cor => (
            
            mapRoom[x++] = {name:cor.name}
               ))
               setTimeout(() => {
                setSavDate(savedData)
               
              }, 2000)
         
          Resolve()
         },
          )
          
    })
  }


  const inst1 =() =>{
    return new Promise((Resolve,Reject)=>{

      axios.get("https://core-graduation.herokuapp.com/getAllIsn?idDep="+DepId)
  
     
      .then(res => {
        console.log(res)
          console.log(res.data.response);
          let w = res.data.response;
          let x = 0
          w.map(row =>(
            mapIns[x++] = {name:row.name}
          ))
          Resolve()
         },
          )
          
    })
  }
  const findInedx =(obj,da) =>{
     for(let i = 0;i<obj.length;i++){
       if (obj[i].name === da){

         return i
       }
      }
      return -1 
  }

  const findInedx1 =(obj,da) =>{
    for(let i = 0;i<obj.length;i++){
      if (obj[i].name === da){

        return i
      }
     }
     return -1 
 }


  const initialData=() =>{

    
    console.log("form inital data")
     let listd=[]
     let x = 0 
     console.log("saved mat="+savedData)
     console.log("saveData mat="+savDate)
     
     savDate.filter(row => (row.fromOtherDep ==="false")&(row.toOtherDep ==="false")&(row.tableName===TableName ) ).map(cor => (
           listd[x++] = {type:cor.roomType,teacher:cor.courseIns,course:cor.courseName}

    ))
    
    console.log("listd = ")
    console.log(listd)
    for (let i = 0;i<listd.length;i++){
      console.log("to func" +listd[i].rooms)
      let index= findInedx(mapRoom,listd[i].type)
      listd[i].type = index
      index = findInedx1(mapCourse,listd[i].course)
      listd[i].course = index
      index = findInedx1(mapIns,listd[i].teacher)
      listd[i].teacher = index
      // if(i == listd.length -1) 
    }
    
    console.log(" after roooms listd = ")
    console.log(listd)
  
    setData(listd)
 
  }
   const FilledData = async() =>{
     
     await course1()
     await inst1()
     await room1()
      initialData()

     let list1 ={}
     let list2 ={}
     let list3 ={}
   
 
     let x = 0
     let y = 0
     let z = 0 
     
     mapRoom.map(row =>list1[x++] = row.name)
 
     mapIns.map(row =>list2[y++] = row.name)
   
     mapCourse.map(row =>list3[z++] = row.name)
     
           setRooms(list1) 
           setInst(list2)
           setCourse(list3)
           setLoading(false)
          

   
  }
  const handelAddInDataBase = (row) =>{
    let room1 = rooms[row.type]
    let inst1 = inst[row.teacher]
    let course1 = course[row.course]

    console.log("room = " + room1)
    console.log("inst = " + inst1)
    console.log("course = " + course1)
    console.log("tableName = " + nameTable)

  let url = "https://core-graduation.herokuapp.com/saveMatOfDraft?depId="+DepId+"&tableName="
   +nameTable+"&courseIns="+inst1+"&courseName="+course1+"&flag=0&timeSlot=0&roomType="+room1+"&date=2020/2019"
  console.log("url="+ url)
    axios.get(url).then(res => {console.log(res)},)

          
  }

  const handelDeleteInDataBase =(row) =>{
    let room1 = rooms[row.type]
    let inst1 = inst[row.teacher]
    let course1 = course[row.course]
    let tableN = nameTable
    let url="https://core-graduation.herokuapp.com/deleteFromSaveMatOfDraft?depId="+DepId+"&tableName="+
    tableN+"&courseIns="+inst1+"&courseName="+course1+"&flag=0&timeSlot=0&roomType="+room1+"&date=2020/2019"
  console.log(url)
    axios.get(url)
  // // axios.get("https://jsonplaceholder.typicode.com/todos/1")
  
      .then(res => {
        console.log(res)
          },
          )
  }


 

   useEffect(()=>{
     setLoading(true)
     console.log("from use effect")
    FilledData()
    console.log("end use effect")
       
  },[ren]) 
  const columns = [
  
   

    { title: "نوع القاعة",
    field: "type" ,
    lookup:rooms,
 
      cellStyle: {
        //  fontFamily: 'Markazi Text',
         fontSize:'25px',
              },
              
    },
    { title: "اسم المدرس",
    field: "teacher" ,
    lookup:inst,
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
  
  
      // setData(convertToJson(headers, fileData))
      console.log("data")
      let listt = convertToJson(headers, fileData)
      console.log(listt)
      for (let k = 0;k<listt.length;k++){

        // let url = "https://core-graduation.herokuapp.com/saveMatOfDraft?depId=60ddc9735b4d43f8eaaabf83&tableName="
        // +nameTable+"&courseIns="+inst1+"&courseName="+course1+"&flag=0&timeSlot=0&roomType="+room1+"&date=2020/2019"


        let url = "https://core-graduation.herokuapp.com/saveMatOfDraft?depId="+DepId+"&tableName="
        +nameTable+"&courseIns="+listt[k].teacher+"&courseName="+listt[k].course+
        "&flag=0&timeSlot=0&roomType="+listt[k].type+"&date=2020/2019"
  
    axios.get(url).then(res => {console.log(res)},)
    setChild(!child)
    setRen(!ren)
  
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
              يحتوي على ثلاث عواميد بعنوان رقم القاعة ,اسم القاعة,الحرم الدراسي بالترتيب
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
            handelAddInDataBase(newRow)
           
            
            
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
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
       
        
      />}
    </div>
  );
}

export default TableR;