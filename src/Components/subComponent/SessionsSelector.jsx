
/***
 * filtre des session 
 */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import "../../assets/style.scss"
import "../../App.css"
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const classes = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    rightIcon: {
      marginLeft: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 80,
        maxWidth:120
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },

 
  }));

const SessionsSelector = (props) => {
    let {name,action_op,action}=props;
    return ( <div style={{display:"inline",marginLeft:50}}>
    <InputLabel  htmlFor={name} style={{marginBottom:5}}>{name}</InputLabel>
    
    <FormControl variant="outlined" className={classes.formControl}  style={{marginBottom:15,backgroundColor:"#fff"}}>
    <InputLabel htmlFor={name} style={{paddingTop:0,marginBottom:20}}>...</InputLabel>
    <Select
    native
    
    name={name}
    onChange={action_op}
    inputProps={{
        name: name,
        id: name,
    }}
    >
    <option aria-label="None" value="" />
    <option value={">"}> {">"} </option>
    <option value={"<"}> {"<"}</option>
 
    </Select>
</FormControl>
 <TextField id="outlined-basic" label="Value" variant="outlined" style={{backgroundColor:"#fff"}} onChange={(e)=>{action( Number(e.target.value))}}/>

</div>)
}

export default SessionsSelector