import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import DeleteIcon from '@material-ui/icons/Delete';
import BeatLoader from "react-spinners/BeatLoader";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";



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
    marginTop:20,
    width:800,
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center'
  }
});




function TableR(Props) {
  const {DepId,DepName,InstName,ren} = Props
  const [data, setData] = useState()
  const [loading, setLoading] = React.useState(true);
  const [dialog,setDialog] = React.useState(false);
  const [open, setOpen] = React.useState(false);


  useEffect(()=>{
    setLoading(true)
    let url = "https://core-graduation.herokuapp.com/getSoftConst?idDep="+DepId
    console.log("loooooooooooool")
    axios.get(url).then(res => {
      console.log(res.data.response)
      let w= res.data.response
      let listt = []
      let count = 0
      console.log("len" + w.length)

      for(let k = 0;k<w.length;k++){
        if (w[k].insName ===InstName ){
          let we = 1
          if (w[k].wieght === "0.3") we=2
          if (w[k].wieght === "0.6") we=3
          if (w[k].wieght === "0.9") we=4
          let timeAnd = w[k].time.split("/")
          let r1 = 'نعم'
          if(w[k].need === "false") r1 = "لا"

          let r2 = 'نعم'
          if(w[k].space === "false") r2 = "لا"

          // { space: "نعم", need: "نعم", weight:2, days: "احد ثلاثا", ToTime:"08:30", FromTime: "09:30", note:"ملاحظ"},
          listt[count] = {need:r1,note:w[k].note,space:r2,weight:we,
            FromTime:timeAnd[0],ToTime:timeAnd[1],days:timeAnd[2]}
            count = count+1
            
        }
      }
      setLoading(false)
      setData(listt)

    },)
      
 },[ren])



 
 
const handelDeleteInDataBase =(selectedRow) =>{

let url = "https://core-graduation.herokuapp.com/deleteSoftConst?idDep="+DepId+"&note="+selectedRow.note
+"&instName="+InstName

axios.get(url).then(res => {console.log(res)},)
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
          zIndex: '0',
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
       
        
      />
       } 
    </div>
  );
}

export default TableR;