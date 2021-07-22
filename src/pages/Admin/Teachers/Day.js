import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { SpaceBarRounded } from '@material-ui/icons';
import StopSharpIcon from '@material-ui/icons/StopSharp';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    backgroundColor:'black'
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  dis1:{
      height:53,
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      
  },
  dis2:{
    height:20,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'black',
    
},
  dis:{
    height:53,
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
}
}));

export default function CSSGrid() {
  const classes = useStyles();

  return (
    <div className={classes.dis}>
      <Typography variant="subtitle1" gutterBottom style={{color:'white'}}>
        الأيام
      </Typography>
      <Grid container spacing={3} className={classes.dis}>
        <Grid item xs={6}>
            <div className={classes.dis1}>
          <Paper className={classes.paper} style={{margin:2}}>
              <div className = {classes.dis2}>
                  <div style = {{color:'white'}}>غير متاح </div>
                  <StopSharpIcon  style = {{color:'red'}} fontSize="large"></StopSharpIcon>
              </div>
          </Paper>
          <Paper className={classes.paper} style={{margin:2}}>xs=3</Paper>
          <div className = {classes.dis2}>
                  <div style = {{color:'white'}}> متاح </div>
                  <StopSharpIcon  style = {{color:'green'}} fontSize="large"></StopSharpIcon>
              </div>
            </div>
        </Grid>
       
        
      
      </Grid>
      
     
        
     
    </div>
  );
}
