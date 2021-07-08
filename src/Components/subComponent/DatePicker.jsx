/*import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import { TextField } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
   border:0.8,
    marginRight: theme.spacing(1),
    paddingTop:10,
    paddingBottom:10
  },
}));

export default function DateAndTimePickers(props) {
  const classes = useStyles();

  return (
   
       <form noValidate>
        <TextField
           style={{backgroundColor:"#fff",borderRadius:5,fontSize:20,width:285}}
           id="datetime-local"
           label="Select Date & Time"
           type="datetime-local"
           defaultValue="2017-05-24T03:30"
       
          onChange={props.time}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    
  );
}

import React, { useState } from "react";
import { DateTimePicker, KeyboardDateTimePicker } from "@material-ui/pickers";

function InlineDateTimePickerDemo(props) {
  const [selectedDate, handleDateChange] = useState(new Date("2018-01-01T00:00:00.000Z"));

  return (
    <>
  
      <KeyboardDateTimePicker
        variant="inline"
        ampm={false}
        label="With keyboard"
        value={selectedDate}
        onChange={handleDateChange}
        onError={console.log}
        disablePast
        format="yyyy/MM/dd HH:mm"
      />
    </>
  );
}

export default InlineDateTimePickerDemo;

import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function MaterialUIPickers() {
  
  const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
*/

import 'date-fns';
import React, { useState } from "react";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  DateTimePicker, KeyboardDateTimePicker
} from '@material-ui/pickers';
function InlineDateTimePickerDemo(props) {
  const [selectedDate, handleDateChange] = useState(new Date("2018-01-01T00:00:00.000Z"));

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    
      <KeyboardDateTimePicker
      style={{backgroundColor:"#fff",borderRadius:5,fontSize:20,width:285}}
        variant="inline"
        ampm={false}
        label="Select a date"
        value={selectedDate}
        onChange={props.time}
    
        format="yyyy/MM/dd HH:mm"
      />
    </MuiPickersUtilsProvider>
  );
}

export default InlineDateTimePickerDemo;
