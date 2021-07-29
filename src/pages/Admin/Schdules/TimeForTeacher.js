
import React, { useState } from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import {MTableToolbar} from 'material-table';

 export default  function BasicSelection() {
    return (
      <MaterialTable
        title=""
        columns={[
            {title: ' الايام',field: 'days',cellStyle: {
              //  fontFamily: 'Markazi Text',
               fontSize:'25px',
                    }, },
            { title: 'وقت الانتهاء', field: 'end',render:(rowData) => 
     
            <TextField
            
           id="time2"
           label="الى"
           type="time"
           value={rowData.end}
           InputLabelProps={{
             shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            /> ,
            cellStyle: {
              //  fontFamily: 'Markazi Text',
               fontSize:'20px',
                    },
          },
            { title: 'وقت البدء', field: 'start', cellStyle: {
              //  fontFamily: 'Markazi Text',
               fontSize:'20px',
                    },render:(rowData) => 
     
            <TextField
           id="time1"
           label="من"
           type="time"
           value={rowData.start}
           InputLabelProps={{
             shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            />, },
            { title: 'سبب الفراغ', field: 'cause' ,  cellStyle: {
              //  fontFamily: 'Markazi Text',
               fontSize:'25px',
                    },},
            {title: ' اسم المدرس',field: 'teacher',  cellStyle: {
              //  fontFamily: 'Markazi Text',
               fontSize:'25px',
                    }, },
        ]}
        localization={{
            toolbar:{
                searchTooltip:"بحث",
                searchPlaceholder:"بحث",
                exportTitle:"تصدير",
                
               
                nRowsSelected:'',
              }
           
            
        }}
       
        data={[
          { days: 'احد,اثنين,اربعا', end: '08:00', start: '09:00', cause: 'مواصلات',teacher:'انس طعمة ' },
          { days: 'احد,ثلاثاء,اربعا', end: '09:00', start: '10:00', cause: '1مواصلات',teacher:'سفيان سماره' },
          { days: 'احد,اثنين,اربعا', end: '08:00', start: '09:00', cause: '2مواصلات',teacher:'منى الضميدي' },
          { days: 'احد,اثنين,اربعا', end: '01:00', start: '02:00', cause: '3مواصلات',teacher:'انس طعمة ' },
          
        ]} 
        components={{
          Toolbar: (props) => (
            <div style={{display:'flex',flexDirection:'row-reverse' }}>
              <MTableToolbar {...props} />
            </div>
          )
        }}       
        options={{
          selection: true,
          selectionProps:{
             color:'black',
          },

          searchFieldStyle:{
            fontFamily: 'Markazi Text',
            fontSize:'25px',
            display:'flex',
            flexDirection:'row-reverse',
            backgroundColor:'white',
            
            
          },
          headerStyle:{
            backgroundColor:'#D4AC0D',
            color:'white',
            fontFamily: 'Markazi Text',
            fontSize:'25px',
            
            

          },
          paging:false,
          exportButton: true,
        }}
      />
    )
  }
  