import React, { useState } from 'react';
import MaterialTable from 'material-table';
import firstLoad ,{MTableToolbar,MTablePagination,MTableEditRow} from 'material-table';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TablePagination from '@material-ui/core/TablePagination';
import './tt.css'
import { Grid } from '@material-ui/core';
import { composeClasses } from '@material-ui/x-grid';
import { CallMissedSharp, FlareSharp } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory ,useLocation } from 'react-router-dom';



const empList = [
  {name : "مسوده 1", date: '2019/2020'},
  {name : "مسوده2", date: '2019/2020'},
  {name : "مسوده 1", date: '2020/2021'},
  {name : "نهائي", date: '2020/2021'},
  {name : "مسوده 1", date: '2021/2022'},
]
const useStyles = makeStyles({
  mar:{
    margin:100,
    width:1000,
    
  },
  tit:{
    marginTop:100,
    marginRight:100,

    width:1000,
  }
});

function TableR() {
  const  history  = useHistory();
  const classes = useStyles();
  const [data, setData] = useState(empList)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const columns = [
    
    { title: "اسم الجدول",
     field: "name",
     cellStyle: {
      // fontFamily: 'Markazi Text',
      fontSize:'25px',
   
             }, 
    },
   
    { title: "تاريخ الجدول ",
    field: "date",
    cellStyle: {
        fontFamily: 'Markazi Text',
        fontSize:'25px',
        
       },
    },

    

    
  ]
  
  


  return (
    <div className="App">
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
        actions={[
          {
            icon: 'edit',
          tooltip: ' تعديل الجدول',
          onClick: (event, rowData) => history.push('/addSchdule')
          }
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
            backgroundColor:'#37474f',
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
          emptyDataSourceMessage:"لا يوجد قاعات مضافه بعد",
          deleteTooltip:"حذف",
          editTooltip:"تعديل",
          addTooltip:"اضافة قاعة جديدة",
          exportName:"csv حفظ",
          editRow:{
            deleteText:"هل انت متأكد من حذف هذه القاعة",
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
          
          

          
          onRowDelete: selectedRow => new Promise((resolve, reject) => {
            const index = selectedRow.tableData.id;
            const updatedRows = [...data]
            updatedRows.splice(index, 1)
            setTimeout(() => {
              setData(updatedRows)
              resolve()
            }, 2000)
          }),
        

        }}
       
        
      />
    </div>
  );
}

export default TableR;