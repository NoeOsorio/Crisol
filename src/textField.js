import React from 'react';
import { fade, withStyles, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default withStyles({
    root: {
      "& .MuiInputBase-root":{
        color: 'white',
        borderColor: "white",
      },
      "& .MuiFormLabel-root":{
        color: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#f9a825',
        },
        '&:hover fieldset': {
          borderColor: '#ff5722',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#f57f17',
        },
      },
    }
  })(TextField);