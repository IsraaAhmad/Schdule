
import React, { useState } from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
 export default  function BasicSelection() {
    return (
      <MaterialTable
        title={<span  style={{fontFamily: 'Markazi Text',
        fontSize:'25px',}}>"مراجعة على مواعيد المدرسين"</span>}
        columns={[
            {title: ' الايام',field: 'days',cellStyle: {
              //  fontFamily: 'Markazi Text',
               fontSize:'25px',
                    }, },
            { title: 'وقت الانتهاء', field: 'end',cellStyle: {
              //  fontFamily: 'Markazi Text',
               fontSize:'25px',
                    },render:(rowData) => 
     
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
            /> },
            { title: 'وقت البدء', field: 'start',render:(rowData) => 
     
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
            { title: 'سبب الفراغ', field: 'cause' },
            {title: ' اسم المدرس',field: 'teacher', },
        ]}
        localization={{
            toolbar:{
                searchTooltip:"بحث",
                searchPlaceholder:"بحث",
                exportTitle:"تصدير",
                nRowsSelected:''
              }
           
            
        }}
       
        data={[
          { days: 'احد,اثنين,اربعا', end: '08:00', start: '09:00', cause: 'مواصلات',teacher:'انس طعمة ' },
          { days: 'احد,ثلاثاء,اربعا', end: '09:00', start: '10:00', cause: '1مواصلات',teacher:'سفيان سماره' },
          { days: 'احد,اثنين,اربعا', end: '08:00', start: '09:00', cause: '2مواصلات',teacher:'منى الضميدي' },
          { days: 'احد,اثنين,اربعا', end: '01:00', start: '02:00', cause: '3مواصلات',teacher:'انس طعمة ' },
          
        ]}        
        options={{
          selection: true,
          searchFieldStyle:{
            fontFamily: 'Markazi Text',
            fontSize:'25px',
            
          },
          paging:false,
          exportButton: true,
        }}
      />
    )
  }
  