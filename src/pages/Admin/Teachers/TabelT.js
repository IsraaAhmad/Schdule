import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Day from "./Day";
import OneDay from "./OneDay";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  day:{
      width:39,
      height:2,
  },
  cen:{
      display:"flex",
      alignItems:"center",
      justifyContent:"space-between"
  },
  tot:{
      display:"flex",
      flexDirection:"column"
      
      
  }
});
const List1 = [true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true,false,true]


export default function CustomizedTables(props) {
  const {name} = props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <div style={{display:'flex',justifyContent:'center',alignContent:'center',fontFamily:'Markazi Text',fontSize:'35px'}}>
        اسم الجدول التابع للبيانات المعروضة:{name}</div>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow style={{ height: 53 }}>
            <StyledTableCell  style={{width:'88%'}} >
                
                <Day/>
              
                </StyledTableCell>
          <StyledTableCell style={{width:'6%'}} >رقم المدرس</StyledTableCell>
            <StyledTableCell style={{width:'6%'}}>اسم المدرس</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}  style={{ height: 53 }}>
              <StyledTableCell >
                  <div className = {classes.tot}>

                  <div className={classes.cen}>
                  <OneDay day="الثلاثاء" timeList={List1} />
                  <OneDay day="السبت" timeList={List1} />
                  </div>

                  <div className={classes.cen}>
                  <OneDay day="الاربعاء" timeList={List1} />
                  <OneDay day="الاحد" timeList={List1} />
                  </div>

                  <div className={classes.cen}>
                  <OneDay day="الخميس" timeList={List1} />
                  <OneDay day="الاثنين" timeList={List1} />
                  </div>
                  </div>
                  </StyledTableCell>
              <StyledTableCell >انس طعمة</StyledTableCell>
              <StyledTableCell >124664</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
