import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useHistory ,useLocation } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';




const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    fontFamily:'Markazi Text',

  },
  table:{
width:600,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    display:'flex',
    alignItems:'end',
    justifyContent:'right',
    
  },
  heading1: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    display:'flex',
    alignItems:'end',
    justifyContent:'right',
    width:500,
    
    
  },
  hed:{
    display:'flex',
    justifyContent:"flex-end",
    flexDirection:"row",
    
  },
  tit:{
    width:'100%',
    backgroundColor:'#37474f',
    color:'white',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    height:65,
    fontFamily:'Markazi Text',
    fontSize:'35px'

  },
  even:{
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,}
  },
  t1:{
    display:'flex',
    flexDirection:'row',
  },
  hed1:{
    fontFamily:'Markazi Text',
    fontSize:'25px',
    color:'white'

  },
  cor:{
    fontFamily:'Markazi Text',
    fontSize:'20px'
  },
  t3:{
    display:'flex',
    justifyContent:'flex-end',
  },
 
}));

export default function SimpleAccordion(Props) {
  const {DepId ,name} = Props

  const [data, setData] = useState([])
  const classes = useStyles();
  const [dia,setDia] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [ren,setRen] = React.useState(false);
  const  history  = useHistory();
  const handleClose = () => {
    setOpen(false);
    setRen(!ren)
    
  };
  const handelDeleteCourse =(x) =>{
    
    axios.get("https://core-graduation.herokuapp.com/deleteCourseFromDep?idDep="+DepId+"&number="+
    x)
    
    
    .then(res => {},)
    setOpen(true);
    setDia(true)

  }
  const HandelAddCourse = ()=>{
         history.push({
          pathname:'/AddCourse1',
          state:{DepId:DepId ,name:name}
        })
         
  }
  const HandelAddCourseFromOtherDep = ()=>{
  
    
    history.push({
      pathname:'/addCourseFromOtherDep1',
      state:{DepId:DepId,name:name}
    })
}


  useEffect(()=>{
   
     axios.get("https://core-graduation.herokuapp.com/getAllMaterialsOfDepartment?idDep="+DepId)
     .then(res => {setData(res.data.response)},)
          
  },[ren]) 
  

  return (
    <div className={classes.root} dir="rtl">
      <div className={classes.t3}>

        <Button variant="contained" onClick={HandelAddCourse}  style={{margin:10,backgroundColor:'#045F5F', color:'white',fontFamily:'Markazi Text',fontSize:'20px'}} size='medium'>
           اضافة مساق جديد 
      </Button>
      <Button variant="contained" onClick={HandelAddCourseFromOtherDep}  style={{margin:10,backgroundColor:'#045F5F', color:'white',fontFamily:'Markazi Text',fontSize:'20px'}} size='medium'>
           اضافة مساق جديد من قسم اخر 
      </Button>
      </div>
      <div className={classes.tit}>الخطة الدراسية</div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            <div className={classes.hed} style={{fontSize:'28px'}}>
             مواد سنة اولى
              </div>
              </Typography>
        </AccordionSummary>
        <AccordionDetails>
        {/* #045F5F */}
          <Typography>
          <Accordion style={{
               borderBottom: '2px solid #37474f',
               borderLeft: '2px solid #37474f',
               borderTop: '1px solid #37474f',
               borderRight: '1px solid #37474f',
               borderTopLeftRadius:10,
               borderTopRightRadius:10,
              marginRight:20,
               
            }}>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="pan6el1a-header"
          
          
        >
          <Typography className={classes.heading1}  style={{fontSize:'25px'}}> فصل اول</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Typography >
          <div>
            <div>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor:'#D4AC0D' }}>
          <TableRow>
            
            <TableCell align="left" className={classes.hed1}>اسم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}>رقم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
        
            {data.filter(course => (course.year === "1") && (course.semester === "1") && (course.flagTo === "false")).map(cor => (
        

                     <TableRow className={classes.even}>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.name}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.number}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       <Button onClick={() => handelDeleteCourse(cor.number)}>
                       <DeleteIcon/>
                       </Button>
                     </TableCell>
                    </TableRow>
               ))}
               </TableBody>
      </Table>
    </TableContainer>
            </div>
               </div>
          </Typography>
        </AccordionDetails>
      </Accordion>


      <Accordion style={{
        borderBottom: '2px solid #37474f',
        borderLeft: '2px solid #37474f',
        borderTop: '1px solid #37474f',
        borderRight: '1px solid #37474f',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        marginRight:20,
    }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="pane2l1a-header"
        >
          <Typography className={classes.heading2} style={{fontSize:'25px'}}> فصل ثاني</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor:'#D4AC0D' }}>
          <TableRow>
            
            <TableCell align="left" className={classes.hed1}>اسم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}>رقم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
        
            {data.filter(course => (course.year === "1") && (course.semester === "2") && (course.flagTo === "false")).map(cor => (
            

                     <TableRow className={classes.even}>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.name}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.number}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       <Button onClick={() => handelDeleteCourse(cor.number)}>
                       <DeleteIcon/>
                       </Button>
                     </TableCell>
                    </TableRow>
               ))}
               </TableBody>
      </Table>
    </TableContainer>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
          </Typography>
        </AccordionDetails>
      </Accordion>






      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            <div className={classes.hed} style={{fontSize:'28px'}}>
             مواد سنة ثانية
              </div>
              </Typography>
        </AccordionSummary>
        <AccordionDetails>
        {/* #045F5F */}
          <Typography>
          <Accordion style={{
               borderBottom: '2px solid #37474f',
               borderLeft: '2px solid #37474f',
               borderTop: '1px solid #37474f',
               borderRight: '1px solid #37474f',
               borderTopLeftRadius:10,
               borderTopRightRadius:10,
              marginRight:20,
               
            }}>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="pan6el1a-header"
          
          
        >
          <Typography className={classes.heading1}  style={{fontSize:'25px'}}> فصل اول</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Typography >
          <div>
            <div>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor:'#D4AC0D' }}>
          <TableRow>
            
            <TableCell align="left" className={classes.hed1}>اسم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}>رقم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
         
        
            {data.filter(course => (course.year === "2") && (course.semester === "1") && (course.flagTo === "false")).map(cor => (
           

                     <TableRow className={classes.even}>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.name}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.number}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       <Button onClick={() => handelDeleteCourse(cor.number)}>
                       <DeleteIcon/>
                       </Button>
                     </TableCell>
                    </TableRow>
               ))}
               </TableBody>
      </Table>
    </TableContainer>
            </div>
               </div>
          </Typography>
        </AccordionDetails>
      </Accordion>


      <Accordion style={{
        borderBottom: '2px solid #37474f',
        borderLeft: '2px solid #37474f',
        borderTop: '1px solid #37474f',
        borderRight: '1px solid #37474f',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        marginRight:20,
    }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="pane2l1a-header"
        >
          <Typography className={classes.heading2} style={{fontSize:'25px'}}> فصل ثاني</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor:'#D4AC0D' }}>
          <TableRow>
            
            <TableCell align="left" className={classes.hed1}>اسم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}>رقم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
         
        
            {data.filter(course => (course.year === "2") && (course.semester === "2") && (course.flagTo === "false")).map(cor => (
          

                     <TableRow className={classes.even}>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.name}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.number}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       <Button onClick={() => handelDeleteCourse(cor.number)}>
                       <DeleteIcon/>
                       </Button>
                     </TableCell>
                    </TableRow>
               ))}
               </TableBody>
      </Table>
    </TableContainer>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
          </Typography>
        </AccordionDetails>
      </Accordion>

      
        
      
     




      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            <div className={classes.hed} style={{fontSize:'28px'}}>
             مواد سنة ثالثة
              </div>
              </Typography>
        </AccordionSummary>
        <AccordionDetails>
        {/* #045F5F */}
          <Typography>
          <Accordion style={{
               borderBottom: '2px solid #37474f',
               borderLeft: '2px solid #37474f',
               borderTop: '1px solid #37474f',
               borderRight: '1px solid #37474f',
               borderTopLeftRadius:10,
               borderTopRightRadius:10,
              marginRight:20,
               
            }}>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="pan6el1a-header"
          
          
        >
          <Typography className={classes.heading1}  style={{fontSize:'25px'}}> فصل اول</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Typography >
          <div>
            <div>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor:'#D4AC0D' }}>
          <TableRow>
            
            <TableCell align="left" className={classes.hed1}>اسم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}>رقم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
         
        
            {data.filter(course => (course.year === "3") && (course.semester === "1") && (course.flagTo === "false")).map(cor => (
          

                     <TableRow className={classes.even}>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.name}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.number}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       <Button onClick={() => handelDeleteCourse(cor.number)}>
                       <DeleteIcon/>
                       </Button>
                     </TableCell>
                    </TableRow>
               ))}
               </TableBody>
      </Table>
    </TableContainer>
            </div>
               </div>
          </Typography>
        </AccordionDetails>
      </Accordion>


      <Accordion style={{
        borderBottom: '2px solid #37474f',
        borderLeft: '2px solid #37474f',
        borderTop: '1px solid #37474f',
        borderRight: '1px solid #37474f',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        marginRight:20,
    }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="pane2l1a-header"
        >
          <Typography className={classes.heading2} style={{fontSize:'25px'}}> فصل ثاني</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor:'#D4AC0D' }}>
          <TableRow>
            
            <TableCell align="left" className={classes.hed1}>اسم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}>رقم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
         
        
            {data.filter(course => (course.year === "3") && (course.semester === "2") && (course.flagTo === "false")).map(cor => (
          

                     <TableRow className={classes.even}>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.name}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.number}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       <Button onClick={() => handelDeleteCourse(cor.number)}>
                       <DeleteIcon/>
                       </Button>
                     </TableCell>
                    </TableRow>
               ))}
               </TableBody>
      </Table>
    </TableContainer>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
          </Typography>
        </AccordionDetails>
      </Accordion>






      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            <div className={classes.hed} style={{fontSize:'28px'}}>
             مواد سنة رابعة
              </div>
              </Typography>
        </AccordionSummary>
        <AccordionDetails>
        {/* #045F5F */}
          <Typography>
          <Accordion style={{
               borderBottom: '2px solid #37474f',
               borderLeft: '2px solid #37474f',
               borderTop: '1px solid #37474f',
               borderRight: '1px solid #37474f',
               borderTopLeftRadius:10,
               borderTopRightRadius:10,
              marginRight:20,
               
            }}>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="pan6el1a-header"
          
          
        >
          <Typography className={classes.heading1}  style={{fontSize:'25px'}}> فصل اول</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Typography >
          <div>
            <div>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor:'#D4AC0D' }}>
          <TableRow>
            
            <TableCell align="left" className={classes.hed1}>اسم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}>رقم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
         
        
            {data.filter(course => (course.year === "4") && (course.semester === "1") && (course.flagTo === "false")).map(cor => (
          

                     <TableRow className={classes.even}>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.name}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.number}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       <Button onClick={() => handelDeleteCourse(cor.number)}>
                       <DeleteIcon/>
                       </Button>
                     </TableCell>
                    </TableRow>
               ))}
               </TableBody>
      </Table>
    </TableContainer>
            </div>
               </div>
          </Typography>
        </AccordionDetails>
      </Accordion>


      <Accordion style={{
        borderBottom: '2px solid #37474f',
        borderLeft: '2px solid #37474f',
        borderTop: '1px solid #37474f',
        borderRight: '1px solid #37474f',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        marginRight:20,
    }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="pane2l1a-header"
        >
          <Typography className={classes.heading2} style={{fontSize:'25px'}}> فصل ثاني</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor:'#D4AC0D' }}>
          <TableRow>
            
            <TableCell align="left" className={classes.hed1}>اسم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}>رقم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
         
        
            {data.filter(course => (course.year === "4") && (course.semester === "2") && (course.flagTo === "false")).map(cor => (
          

                     <TableRow className={classes.even}>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.name}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.number}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       <Button onClick={() => handelDeleteCourse(cor.number)}>
                       <DeleteIcon/>
                       </Button>
                     </TableCell>
                    </TableRow>
               ))}
               </TableBody>
      </Table>
    </TableContainer>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
          </Typography>
        </AccordionDetails>
      </Accordion>






      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            <div className={classes.hed} style={{fontSize:'28px'}}>
             مواد سنة خامسة
              </div>
              </Typography>
        </AccordionSummary>
        <AccordionDetails>
        {/* #045F5F */}
          <Typography>
          <Accordion style={{
               borderBottom: '2px solid #37474f',
               borderLeft: '2px solid #37474f',
               borderTop: '1px solid #37474f',
               borderRight: '1px solid #37474f',
               borderTopLeftRadius:10,
               borderTopRightRadius:10,
              marginRight:20,
               
            }}>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="pan6el1a-header"
          
          
        >
          <Typography className={classes.heading1}  style={{fontSize:'25px'}}> فصل اول</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Typography >
          <div>
            <div>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor:'#D4AC0D' }}>
          <TableRow>
            
            <TableCell align="left" className={classes.hed1}>اسم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}>رقم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
         
        
            {data.filter(course => (course.year === "5") && (course.semester === "1") && (course.flagTo === "false")).map(cor => (
          

                     <TableRow className={classes.even}>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.name}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.number}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       <Button onClick={() => handelDeleteCourse(cor.number)}>
                       <DeleteIcon/>
                       </Button>
                     </TableCell>
                    </TableRow>
               ))}
               </TableBody>
      </Table>
    </TableContainer>
            </div>
               </div>
          </Typography>
        </AccordionDetails>
      </Accordion>


      <Accordion style={{
        borderBottom: '2px solid #37474f',
        borderLeft: '2px solid #37474f',
        borderTop: '1px solid #37474f',
        borderRight: '1px solid #37474f',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        marginRight:20,
    }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="pane2l1a-header"
        >
          <Typography className={classes.heading2} style={{fontSize:'25px'}}> فصل ثاني</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <div>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor:'#D4AC0D' }}>
          <TableRow>
            
            <TableCell align="left" className={classes.hed1}>اسم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}>رقم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
         
        
            {data.filter(course => (course.year === "5") && (course.semester === "2") && (course.flagTo === "false")).map(cor => (
          

                     <TableRow className={classes.even}>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.name}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.number}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       <Button onClick={() => handelDeleteCourse(cor.number)}>
                       <DeleteIcon/>
                       </Button>
                     </TableCell>
                    </TableRow>
               ))}
               </TableBody>
      </Table>
    </TableContainer>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
          </Typography>
        </AccordionDetails>
      </Accordion>






      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            <div className={classes.hed} style={{fontSize:'28px'}}>
             المواد الاختيارية  
              </div>
              </Typography>
        </AccordionSummary>
        <AccordionDetails>
        {/* #045F5F */}
          <Typography>
          <Accordion style={{
               borderBottom: '2px solid #37474f',
               borderLeft: '2px solid #37474f',
               borderTop: '1px solid #37474f',
               borderRight: '1px solid #37474f',
               borderTopLeftRadius:10,
               borderTopRightRadius:10,
              marginRight:20,
               
            }}>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="pan6el1a-header"
          
          
        >
          <Typography className={classes.heading1}  style={{fontSize:'25px'}}> جميع الفصول </Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Typography >
          <div>
            <div>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor:'#D4AC0D' }}>
          <TableRow>
            
            <TableCell align="left" className={classes.hed1}>اسم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}>رقم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
        
            {data.filter(course => (course.year === "-1") && (course.semester === "-1")).map(cor => (
          

                     <TableRow className={classes.even}>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.name}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.number}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       <Button onClick={() => handelDeleteCourse(cor.number)}>
                       <DeleteIcon/>
                       </Button>
                     </TableCell>
                    </TableRow>
               ))}
               </TableBody>
      </Table>
    </TableContainer>
            </div>
               </div>
          </Typography>
        </AccordionDetails>
      </Accordion>


      
          </Typography>
        </AccordionDetails>
      </Accordion>




    
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>
            <div className={classes.hed} style={{fontSize:'28px'}}>
             مواد  لاقسام اخرى
              </div>
              </Typography>
        </AccordionSummary>
        <AccordionDetails>
        {/* #045F5F */}
          <Typography>
          <Accordion style={{
               borderBottom: '2px solid #37474f',
               borderLeft: '2px solid #37474f',
               borderTop: '1px solid #37474f',
               borderRight: '1px solid #37474f',
               borderTopLeftRadius:10,
               borderTopRightRadius:10,
              marginRight:20,
               
            }}>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="pan6el1a-header"
          
          
        >
          <Typography className={classes.heading1}  style={{fontSize:'25px'}}> جميع الفصول</Typography>
        </AccordionSummary>
        <AccordionDetails >
          <Typography >
          <div>
            <div>
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={{backgroundColor:'#D4AC0D' }}>
          <TableRow>
            
            <TableCell align="left" className={classes.hed1}>اسم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}>رقم المساق</TableCell>
            <TableCell align="left" className={classes.hed1}></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
         
        
            {data.filter(course => (course.flagTo === "true")).map(cor => (
          

                     <TableRow className={classes.even}>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.name}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       {cor.number}
                     </TableCell>
                     <TableCell component="th" scope="row" className={classes.cor}>
                       <Button onClick={() => handelDeleteCourse(cor.number)}>
                       <DeleteIcon/>
                       </Button>
                     </TableCell>
                    </TableRow>
               ))}
               </TableBody>
      </Table>
    </TableContainer>
            </div>
               </div>
          </Typography>
        </AccordionDetails>
      </Accordion>


     
          </Typography>
        </AccordionDetails>
      </Accordion>

      {dia&&<div>
            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            dir='rtl'
          >
            <DialogTitle id="alert-dialog-title" >
              <div style={{ fontFamily: 'Markazi Text',fontSize:'35px',borderRadius:'5px'}}>
             
              </div>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <div  style={{ fontFamily: 'Markazi Text',fontSize:'30px',}}>
                 تم حذف المساق بنجاح
                </div>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus style={{ fontFamily: 'Markazi Text',fontSize:'35px',color:'#045F5F'}}>
               <CheckCircleIcon style={{color:'#045F5F' }} fontSize='large'/>
              </Button>
              
            </DialogActions>
          </Dialog>
            </div>}





    </div>
  );
}
