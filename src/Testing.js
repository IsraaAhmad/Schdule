import React, { useState } from 'react';
import MaterialTable from 'material-table';
import TextField from '@material-ui/core/TextField';
import XLSX from 'xlsx';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { render } from '@testing-library/react';






function TableR() {
    const EXTENSIONS = ['xlsx', 'xls', 'csv']
  const [data, setData] = React.useState([]);
  const [col,setCol] = React.useState([]);
  const headerName = ["teacher","course","department"]
  const columns = [
    { title: "المدرس",
      field: "teacher" ,
    },
      { title: "اسم المساق",
      field: "course" ,
      },
      { title: "اسم القسم",
      field: "department" ,
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
      // console.log(fileData)
      const headers = fileData[0]
      const hed1 = ['teacher','course','department']
      let x =0
      const heads = headers.map(head => ({ title: head, field: head }))
      setCol(columns)

      //removing header
      fileData.splice(0, 1)


      setData(convertToJson(headers, fileData))
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

 
    const useStyles = makeStyles((theme) => ({
        root: {
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        input: {
          display: 'none',
        },
      }));
  

      const classes = useStyles();
  return (
    <div className="App">
        <div>
        <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={importExcel}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" color="primary" component="span">
          تحميل ملف من الاكسل
        </Button>
      </label>
        </div>
      <MaterialTable
        className = "table"
        title=""
        data={data}
        columns={col}
       
        
      />
    </div>
  );
}

export default TableR;