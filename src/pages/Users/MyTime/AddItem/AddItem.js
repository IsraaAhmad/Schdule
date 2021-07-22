import { Checkbox } from '@material-ui/core';
import React , {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import './AddItem.css'

class App extends Component{
    state={
        causes:'',
        start:'',
        end:'',
        sat:'',
        sun:'',
        mon:'',
        tus:'',
        wed:'',
        thu:''
        }
        handelchange=(e) =>{
            this.setState({
                [e.target.id]: e.target.value
            })
        }

        handelchange1=(e) =>{
            let x = "no"
            if(e.target.checked){
                x = e.target.value
            }
            else{
                x = ""
            }
            
            this.setState({
                   [e.target.id]:x
            })
        }
        handelSubmit=(e)=>{
            e.preventDefault();
            this.props.addItem(this.state)
            this.setState({
                causes:'',
        start:'',
        end:'',
       
            })
        }
    render(){
        return(
            <div>
              <form onSubmit = {this.handelSubmit} className="com">
                  <div className="tit">
                  <TextField 
                  inputProps={{min: 0, style: { textAlign: 'right' ,
        
                  fontFamily:'Markazi Text',
                  fontSize:'20px',}}}
                        id="outlined-basic"
                        label=" "
                        variant="outlined"
                        required='true'
                        style={{ borderColor: 'red' }}
                  
                  
                  style={{backgroundColor:'white',borderRadius:'25px' ,width:700,marginRight:20}} id="causes" label="" variant="outlined" onChange={this.handelchange} value={this.state.causes}/>
                  {/* <input type ="text" placeholder="causes1" id="causes" onChange={this.handelchange} value={this.state.causes}></input> */}
                  <div className="cas">سبب الفراغ</div>

                  </div>
                  {/* <input type ="number" placeholder="start" id="start" onChange={this.handelchange} value={this.state.start} ></input> */}
                  {/* <input type ="number" placeholder="end" id="end" onChange={this.handelchange} value={this.state.end} ></input> */}
                 <div className="time">

                  <TextField
   id="start"
   label="من الساعة"
   type="time"
   value={this.state.start}
   InputLabelProps={{
       shrink: true,
    }}
    inputProps={{
      step: 300, // 5 min
    }}
    onChange={this.handelchange}
    />
<div className="ti" style={{marginRight:40}}>وقت الانتهاء </div>
<TextField
   id="end"
   label="الى"
   type="time"
   value={this.state.end}
   InputLabelProps={{
       shrink: true,
    }}
    inputProps={{
        step: 300, // 5 min
    }}
    onChange={this.handelchange}
    />
    <div className="ti" style={{marginLeft:40}}>وقت البدء </div>
    </div>
    <div className="day">

        <FormControlLabel
                  value="top"
                  control={<Checkbox id="thu" onChange={this.handelchange1} style={{color:"#045F5F"}} value="خميس"/>}
                  label={<spane style={{fontFamily:'Markazi Text',fontSize:'20px'}}>خميس</spane>}
                  style={{fontSize:'30px'}}
                  labelPlacement="top"
                  />
          <FormControlLabel
                    value="top"
                    control={<Checkbox id="wed" onChange={this.handelchange1}  style={{color:"#045F5F"}} value="اربعاء"/>}
                    label={<spane style={{fontFamily:'Markazi Text',fontSize:'20px'}}>اربعاء</spane>}
                    style={{fontSize:'30px'}}
                    labelPlacement="top"
                    />
          <FormControlLabel
                    value="top"
                    control={<Checkbox id="tus" onChange={this.handelchange1} style={{color:"#045F5F"}} value="ثلاثاء"/>}
                    label={<spane style={{fontFamily:'Markazi Text',fontSize:'20px'}}>ثلاثاء</spane>}
                    style={{fontSize:'30px'}}
                    labelPlacement="top"
                    />
          
          <FormControlLabel
                    value="top"
                    control={<Checkbox id="mon" onChange={this.handelchange1} style={{color:"#045F5F"}} value="اثنين"/>}
                    label={<spane style={{fontFamily:'Markazi Text',fontSize:'20px'}}>اثنين</spane>}
                    style={{fontSize:'30px'}}
                    labelPlacement="top"
                    />
          <FormControlLabel
           value="top"
           control={<Checkbox id="sun" onChange={this.handelchange1} style={{color:"#045F5F"}} value="احد"/>}
           label={<spane style={{fontFamily:'Markazi Text',fontSize:'20px'}}>احد</spane>}
           style={{fontSize:'30px'}}
           labelPlacement="top"
           />
    <FormControlLabel
          value="top"
          control={<Checkbox id="sat" onChange={this.handelchange1} style={{color:"#045F5F"}} value="سبت"/>}
          label={<spane style={{fontFamily:'Markazi Text',fontSize:'20px'}}>سبت</spane>}
          style={{fontSize:'30px'}}
          labelPlacement="top"
          />
         



          <div className="tit" style={{marginLeft:50}}>:الايام</div>
          </div>
          <Button variant="contained"type ="submit" size="small" style={{marginRight:600,  backgroundColor:'#045F5F',color:'white',fontFamily:'Markazi Text',fontSize:'20px'}} >
          اضافة الفراغ
        </Button>
                  {/* <input type ="submit" value="Add"></input> */}
                  </form>
            </div>
        )
    }
}
export default App;