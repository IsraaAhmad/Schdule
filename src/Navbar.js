
import faker from 'faker';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Grid,
    Typography,
    TablePagination,
    TableFooter
 } from '@material-ui/core';
import { Schedule } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
    table: {
      
      
      
    },
    rowss:{
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    tableContainer: {

        width:1000,
        borderRadius: 15,
        margin: '70px 145px',
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
    },
    tableHeaderCell: {
        fontWeight: 'bold',
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    name: {
        fontWeight: 'bold',
        color: theme.palette.secondary.dark
    },
    status: {
        fontWeight: 'bold',
        fontSize: '0.75rem',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 8,
        padding: '3px 10px',
        display: 'inline-block'
    }
  }));

let USERS = [], STATUSES = ['Active', 'Pending', 'Blocked'];
for(let i=0;i<14;i++) {
    USERS[i] = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        jobTitle: faker.name.jobTitle(),
        company: faker.company.companyName(),
        joinDate: faker.date.past().toLocaleDateString('en-US'),
        status: STATUSES[Math.floor(Math.random() * STATUSES.length)]
    }
}

function Schedules() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="simple table" style = {{width:1000}}>
        <TableHead >
          <TableRow > 
            <TableCell className={classes.tableHeaderCell} >اسم المدرس</TableCell>
            <TableCell className={classes.tableHeaderCell} >الحرم</TableCell>
            <TableCell className={classes.tableHeaderCell} >رقم القاعة</TableCell>
            <TableCell className={classes.tableHeaderCell} >الساعه</TableCell>
            <TableCell className={classes.tableHeaderCell} >الأيام</TableCell>
            <TableCell className={classes.tableHeaderCell} >س.م</TableCell>
            <TableCell className={classes.tableHeaderCell} >اسم المساق</TableCell>
            <TableCell className={classes.tableHeaderCell} >رقم المساق/ش</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {USERS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.name} className = {classes.rowss}>
              <TableCell>
                  <Typography>منار قمحية</Typography>
              </TableCell>
              <Typography>الجديد</Typography>

              <TableCell> 
              <Typography>114070</Typography>
              </TableCell>
              <Typography>11-12 </Typography>
              <TableCell>
              <Typography>احد,ثلاثاء,خميس </Typography>
              </TableCell>
              <Typography> 3</Typography>
              <TableCell>
              <Typography>برمجه الحاسوب </Typography>
              </TableCell>
              <TableCell>
              <Typography>1891019/3 </Typography>
                  </TableCell>
    
                  <TableCell> 
    
                  </TableCell>
    
                  <TableCell>
    
                  </TableCell>
                  
                  <TableCell>
                      
                  </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
        <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={USERS.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default Schedules;