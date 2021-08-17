import React, { useState } from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import  { useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import BeatLoader from "react-spinners/BeatLoader";
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
import { useHistory ,useLocation } from 'react-router-dom';


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
  let {TableName , savedData ,setChild,child ,DepId ,year , sem , namme} = Props

 
  const [nameTable,setNameTable] = React.useState(TableName)
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = useState([])
  const [course,setCourse] = React.useState({})
  const  history  = useHistory();

  const [department,setDepartment] = React.useState({})
  const [days,setDays] = React.useState({})
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
    const headerName = ["course","FromTime","ToTime","days"]
  

  const mapDays =[]
  const mapCourse =[]
  const mapDepartment =[]

  
  const course1 =() =>{
    return new Promise((Resolve,Reject)=>{

      axios.get("https://core-graduation.herokuapp.com/getAllMaterialsOfDepartment?idDep="+DepId)
  
     
      .then(res => {
          let w = res.data.response;
          let x = 0

          w.filter(course => (course.flagFrom === "true") ).map(row => (
            mapCourse[x++] = {name:row.name}
               ))

          Resolve()
         },
          )
          
    })
  }


  const department1 =() =>{
    return new Promise((Resolve,Reject)=>{
     
      let url = "https://core-graduation.herokuapp.com/getAllDep"
      let list1 =[]
      let x = 0 
    axios.get(url)
          .then(res => {
              res.data.response.map(row => (
                mapDepartment[x++] = {name:row.name}
  
              ))
              Resolve()
            },)}, )
          
    
  }

  const day1 =() =>{
    return new Promise((Resolve,Reject)=>{
    
      let url = "https://core-graduation.herokuapp.com/getDays?date="+year+"&semester="+sem
      let list1 =[]
      let x = 0 
    axios.get(url)
          .then(res => {
            console.log(res)
              res.data.response.map(row => (
                mapDays[x++] = {days:row}
  
              ))
              Resolve()
            },)
            .catch(res =>{
              Resolve()
            }

            )
          }, )
          
    
  }
  const findInedx1 =(obj,da) =>{
    for(let i = 0;i<obj.length;i++){
      if (obj[i].name === da){

        return i
      }
     }
     return -1 
 }

 const findInedxD =(obj,da) =>{
  for(let i = 0;i<obj.length;i++){
    if (obj[i].days === da){

      return i
    }
   }
   return -1 
}

  const initialData=() =>{

    
     let listd=[]
     let x = 0 
     
     savedData.filter(row => (row.fromOtherDep ==="true")&(row.toOtherDep ==="false")&(row.tableName===TableName )  ).map(cor => (
           listd[x++] = {time:cor.timeSolt,course:cor.courseName}

    ))
    
    let newList = []
    for (let i = 0;i<listd.length;i++){
    
      let  index = findInedx1(mapCourse,listd[i].course)
      listd[i].course = index

      
     let c = listd[i].time
    

     const x = c.split("/")
     let  indexD = findInedxD(mapDays,x[2])
     

     newList[i] = {course:index,FromTime:x[0],ToTime:x[1],days:indexD}

    }
    
   
  
    setData(newList)
 
  }

  const FilledData = async() =>{
    await course1()
     await department1()
     await day1()
     initialData()

    let list1 ={}
    let list2 ={}
    let list4 ={}

    let x = 0
    let y = 0
    let w = 0
  
    mapCourse.map(row =>list1[x++] = row.name)
    mapDepartment.map(row =>list2[y++] = row.name)
    mapDays.map(row =>list4[w++] = row.days)

          setCourse(list1)
          setDepartment(list2)
          setDays(list4)
          setLoading(false)
  
 }
 useEffect(()=>{
   setLoading(true)
    FilledData()

     
},[ren,savedData]) 
  const columns = [

    { title: "الايام ",
    field: "days" ,
    lookup: days,
    
      cellStyle: {
        //  fontFamily: 'Markazi Text',
         fontSize:'25px',
              },

              
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
    const hed1 = ['teacher','course','department']
    let x =0
    const heads = headers.map(head => ({ title: head, field: head }))
    // setCol(columns)
    

    //removing header
    fileData.splice(0, 1)


    // setData(convertToJson(headers, fileData))
  
    let listt = convertToJson(headers, fileData)
    
    for (let k = 0;k<listt.length -1;k++){

      // let url = "https://core-graduation.herokuapp.com/saveMatOfDraft?depId=60ddc9735b4d43f8eaaabf83&tableName="
      // +nameTable+"&courseIns=0&courseName="+c1+"&flag=1&timeSlot="+time+"&roomType=0&date=2020/2019"
      let f = listt[k].FromTime
      let t = listt[k].ToTime
      let day1 = listt[k].days
      let time = f+"/"+t+"/"+day1

      let url = "https://core-graduation.herokuapp.com/saveMatOfDraft?depId="+DepId+"&tableName="
      +nameTable+"&courseIns=0&courseName="+listt[k].course+
      "&flag=1&timeSlot="+time+"&roomType=0&date="+year

  axios.get(url).then(res => {
  
    setChild((Math.random() ))
    
    
    
   

  
    
    
  },)
 

  
  
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
  
 const handelAddInDataBase = (row) =>{
  let d1 = department[row.department]
  let c1 = course[row.course]
  let day1 = days[row.days]
 
  let f = row.FromTime
  let t = row.ToTime


  let time = f+"/"+t+"/"+day1


let url = "https://core-graduation.herokuapp.com/saveMatOfDraft?depId="+DepId+"&tableName="
 +nameTable+"&courseIns=0&courseName="+c1+"&flag=1&timeSlot="+time+"&roomType=0&date="+year

  axios.get(url).then(res => {},)

        
}

const handelDeleteInDataBase =(row) =>{
  let d1 = department[row.department]
  let c1 = course[row.course]
  let day1 = days[row.days]
 
  let f = row.FromTime
  let t = row.ToTime



  let time = f+"/"+t+"/"+day1
  let url="https://core-graduation.herokuapp.com/deleteFromSaveMatOfDraft?depId="+DepId+"&tableName="+
  TableName+"&courseIns=0&courseName="+c1+"&flag=1&timeSlot="+time+"&roomType=0&date="+year

  axios.get(url).then(res => {},)
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
              يحتوي على اربع عواميد بعنوان اسم المساق ,من الساعة,الى الساعة,الايام بالترتيب
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
          exportButton: {
            csv: true,
            pdf: false
          },
          exportDelimiter:"doc",
          actionsColumnIndex:0,
          addRowPosition:'first',
          headerStyle:{
            backgroundColor:'#D4AC0D',
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
        exportTitle:'تصدير',
        exportCSVName: " Excelتصدير ملف ",
        exportPDFName:  " PDF ملف ",
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