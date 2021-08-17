import React from 'react';
import { makeStyles ,withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import NativeSelect from "@material-ui/core/NativeSelect";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InputBase from "@material-ui/core/InputBase";
import Button from '@material-ui/core/Button';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CancelIcon from '@material-ui/icons/Cancel';
import { useHistory ,useLocation } from 'react-router-dom';
import axios from 'axios';
import  { useEffect } from 'react';



const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    boxShadow:3,
    
   
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  paper2: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    height:50,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    display:'flex',
    alignItems:'right',
  },
  paper1: {
    margin:7,
    height:50,
    textAlign: 'center',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#37474f',
    color:'white',
    whiteSpace: 'nowrap',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
    fontFamily:'Markazi Text',
    fontSize:'25px',
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  textField: {
    textAlign:'right',
    backgroundColor:'white',
    width:'100%',
    display:'flex',
    align:'left',
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        border: "2px solid #045F5F",

      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        border: "2px solid #045F5F"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "2px solid red",
    // borderRadius: 4,
    // border: "2px solid #045F5F",
      }
  },
  choose:{
      height:5

  },
  papertext: {
    textAlign: 'center',
    color: 'black',
    whiteSpace: 'nowrap',
    height:50,
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    fontFamily:'Markazi Text',
    fontSize:'25px',
  },
  x:{
      display:'flex',
      flexDirection:'row'
  },
  cont:{
    backgroundColor:'white',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    // borderTopLeftRadius: 40,
    // borderTopRightRadius: 40,
  
  }
}));

export default function CSSGrid(Props) {
  const {DepId} = Props
  const [dataDep,setDataDep] = React.useState([]);
  const [dataCourse,setDataCourse] = React.useState([]);
  const classes = useStyles();
  const [nameCourse,setNameCourse] = React.useState(''); 
  const [year, setYear] = React.useState('');
  const [time, setTime] = React.useState('');
  const [value, setValue] = React.useState();
  const [dep, setDep] = React.useState();
  const [course, setCourse] = React.useState();
  const [done , setDone] = React.useState(false);
  const [sections , setSections] = React.useState();
  const [sec,SetSec] = React.useState();
  const [dia,setDia] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const  history  = useHistory();

  
  const handleClose = () => {
    setOpen(false);
    history.goBack()
    
  };


  

  useEffect(()=>{
    console.log("from use effect")
    let url = "https://core-graduation.herokuapp.com/getAllDep"

  axios.get(url)
        .then(res => {
          console.log(res)
            let da =res.data.response 
            for (let i =0 ;i<da.length;i++){
              if( da[i].idDepartment === DepId){
                const sep = da[i].sections
                let sep2 = sep.split('/')
                let listt = []
                 
                for(let j =0 ;j<sep2.length;j++){
                  listt[j]={sec:sep2[j]}

                  
                }
                setSections(listt)
 }}
              setDone(true)
          },
 
            )
  
      
 },[]) 

 const handleChangeSection =(event) =>{
  SetSec(event.target.value)
}
  
  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };
 

  const handelSave = () =>{
    let course = document.getElementById('course').value
    let hour = document.getElementById('hour').value
    let idDepartmant = dep
    let type1 = value
    let type = "اجباري"
    let year = 0 
    let semester = 0
    

   
    
    let time=document.getElementById('time').value
    switch(time){
      case "10":
        year = 1
        semester =1
        break;
      
      case "20":
          year = 1
          semester =2
          break;

      case "30":
        year = 2
        semester =1
        break;

      case "40":
          year = 2
          semester =2
          break;

      case "50":
            year = 3
            semester =1
            break;
      
      case "60":
        year = 3
        semester =2
        break;

      case "70":
          year = 4
          semester =1
          break;
      
      case "80":
            year = 4
            semester =2
            break;

      case "90":
        year = 5
        semester =1
        break;


      case "100":
          year = 5
          semester =2
          break;

      case "110":
            year = -1
            semester =-1
            
            break;
        
      default:
        break;
    }

 





    let url = "https://core-graduation.herokuapp.com/addCourseToDepartment?idDep="+DepId+"&number="+
    course+"&type=اجباري"+"&year="+year+"&sem="+semester+"&name="+nameCourse+"&numberOfHour="+hour+
    "&flag=1&toDepartments="+idDepartmant+"&specialty="+sec
    console.log(url)
    // axios.get("https://core-graduation.herokuapp.com/getAllMaterialsOfDepartment?idDep=60ddc9735b4d43f8eaaabf83")
  axios.get(url).then(res => {console.log(res.data.response);},)

  setOpen(true);
  setDia(true)

  }

  const handelCancel = () => {
    history.goBack()

  }

  const handleChangeYear = (event) => {
    setYear(event.target.value);
  };
 
  const handleChangeDep = (event) => {
    setDep(event.target.value);
    let list1 =[]
    let x = 0 
    let url = "https://core-graduation.herokuapp.com/getAllMaterialsOfDepartment?idDep="+event.target.value
    console.log(url)
    axios.get(url)
    
 
        .then(res => {
            res.data.response.map(row => (
                list1[x++] = {name:row.name,number:row.number}

            ))
            setDataCourse(list1)
          },
 
            )


  };
  const handleChangeCourse = (event) => {
    setCourse(event.target.value);
    for (let c = 0;c<dataCourse.length;c++){
        if(dataCourse[c].number === event.target.value)
        setNameCourse(dataCourse[c].name)
    }
    
  };
  
  const BootstrapInput = withStyles((theme) => ({
    root: {
      "label + &": {
        marginTop: theme.spacing(3)
      }
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #045F5F",
      fontSize: 16,
      height:30,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
      }
    }
  }))(InputBase);


  useEffect(()=>{
    let url = "https://core-graduation.herokuapp.com/getAllDep"
    let list1 =[]
    let x = 0 
  axios.get(url)
        .then(res => {
            res.data.response.map(row => (
                list1[x++] = {name:row.name,number:row.idDepartment}

            ))
            setDataDep(list1)
          },
 
            )
      
 },[])

  return (
    <div>
     {done&&<div>

        

      <div container className={classes.cont}  >
          
          <Paper className={classes.paper1} >اضافة مساق جديد</Paper>
        <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',margin:15}}>
        <FormControl className={classes.choose}>
        <NativeSelect
          id="time"
          value={year}
          onChange={handleChangeYear}
          input={<BootstrapInput />}
          >
          <option aria-label="None" value="" />
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={10}>سنة اولى فصل اول</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={20}>سنة اولى فصل ثاني</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={30}>سنة ثانية فصل اول</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={40}>سنة ثانية فصل ثاني</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={50}>سنة ثالثة فصل اول</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={60}>سنة ثالثة فصل ثاني</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={70}>سنة رابعة فصل اول</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={80}>سنة رابعة فصل ثاني</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={90}>سنة خامسة فصل اول</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={100}>سنة خامسة فصل ثاني</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={110}>غير ذلك</option>

          
        </NativeSelect>
      </FormControl>
          <div className={classes.papertext} style={{marginLeft:10}}>الموعد حسب الخطة الدراسية  </div>
          
          
            
           
          
        <FormControl className={classes.choose} style={{marginLeft:80}}>
        <NativeSelect
          id="time2"
          value={dep}
          onChange={handleChangeDep}
          input={<BootstrapInput />}
          >
          <option aria-label="None" value="" />
          {dataDep.map(row=>(
            <option style = {{fontFamily:'Markazi Text',fontSize:'20px',height:'35px'
            
        }} value={row.number}>{row.name}</option>
        ))}

          
        </NativeSelect>
      </FormControl>
      <div style={{marginLeft:17}} className={classes.papertext}>:اسم القسم</div>
        </div>


        <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',marginRight:15,marginBottom:50,marginTop:50}}>
        <FormControl className={classes.choose}>
        <NativeSelect
          id="hour"
          value={time}
          onChange={handleChangeTime}
          input={<BootstrapInput />}
          >
          <option aria-label="None" value="" />
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={0}>0</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={1}>1</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={2}>2</option>
<option style = {{fontFamily:'Markazi Text',fontSize:'20px',}} value={3}>3</option>
        </NativeSelect>
      </FormControl>
            
          <div className={classes.papertext} style={{marginLeft:10,marginRight:42}}>الساعة المعتمدة</div>
         
          
          <FormControl className={classes.choose}>
          <NativeSelect
            id="time2"
            onChange={handleChangeSection}
            input={<BootstrapInput />}
            >
            <option aria-label="None" value="" />
            {sections.map(row=>(
              <option style = {{fontFamily:'Markazi Text',fontSize:'20px',height:'35px'
              
            }} value={row.sec}>{row.sec}</option>
            ))}
  
            
          </NativeSelect>
        </FormControl>
         
            <div className={classes.papertext} style={{marginRight:42 ,marginLeft:10}}>اسم التخصص</div>
            <FormControl  style={{width:230}} className={classes.choose} >
          <NativeSelect
            id="course"
            value={course}
            onChange={handleChangeCourse}
            input={<BootstrapInput />}
            >
            <option aria-label="None" value="" />
            {dataCourse.map(row=>(
              <option style = {{fontFamily:'Markazi Text',fontSize:'20px',height:'35px'
              
            }} value={row.number}>{row.name}</option>
            ))}
            
  
            
          </NativeSelect>
        </FormControl>
        <div className={classes.papertext} style={{marginLeft:10}}>:اسم المساق</div>
         
            </div>
            <div >
          
            
          </div>
        
         




        
          <div style={{marginLeft:70}} >
          <Button variant="contained" style={{backgroundColor:'#37474f'}} onClick={handelCancel}>
          <CancelIcon style={{color:'white'}}/>
              <div style = {{textAlign: 'right',
          fontFamily:'Markazi Text',
          fontSize:'20px', marginLeft:4,color:'white'}}>
                 الغاء
              </div>
      </Button>
          
          <Button variant="contained" style={{backgroundColor:'#045F5F',margin:30}} onClick={handelSave}>
          <SaveAltIcon style={{color:'white'}}/>
              <div style = {{textAlign: 'right',
          fontFamily:'Markazi Text',
          fontSize:'20px', marginLeft:4,color:'white'}}>
                 حفظ
              </div>
      </Button>
          </div>
          
          
         
      
      </div>
     
      
      
      
     
      
            </div>}

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
                 تم اضافة المساق بنجاح
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
