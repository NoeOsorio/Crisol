import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
   
  },
  paper: {
    marginTop: theme.spacing(3),
    width: '100%',
    overflowX: 'auto',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
    backgroundColor : "#282c34",
    border: 0
    
  },
  cell:{
    color: "white",
  },
}));

// function createData(name, calories, fat, carbs ) {
//   return { name, calories, fat, carbs };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// ];

export default function Output(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              <TableCell className={classes.cell}>Temperatura</TableCell>
              <TableCell className={classes.cell} align="right">Gas (%)</TableCell>
              <TableCell className={classes.cell} align="right">Aumento de Temperatura (%)</TableCell>
              <TableCell  className={classes.cell} align="right">Ventilador</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow key="temperature">
                <TableCell className={classes.cell} component="th" scope="row">
                  {props.temp} ºC
                </TableCell>
                <TableCell className={classes.cell} align="right">{props.gas} %</TableCell>
                <TableCell className={classes.cell} align="right">{props.grow} %</TableCell>
                <TableCell className={classes.cell} align="right">{props.fan ? "Encendido" : "Apagado"}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}