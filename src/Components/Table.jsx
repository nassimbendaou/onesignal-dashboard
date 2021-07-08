
/**
 * le composent du tableau de l'interface dashboard qui affiche toutes les notifications 
 */

import React,{useEffect} from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router-dom';
import DetailsPopOver from "./subComponent/detailsPopOver"

const columns = [
  { id: 'Text', label: 'Name', minWidth: 170 , align: 'left', },
  { id: 'Sent', label: 'Notification Sent', minWidth: 100 ,  align: 'right',},
  {
    id: 'Succesfull',
    label: 'Succesfull',
    minWidth: 170,
    align: 'right',
    
  },
  {
    id: 'More',
    label: 'More',
    minWidth: 170,
    align: 'right',
    
  }
];

function createData(heading,text, Sent, Succesfull, time,id) {

  return { notification : {heading :heading,text:text}, Sent, Succesfull,time,id};
}

const rows = [


];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [row, setRow] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    
    if(props.data !== undefined){
        let rowData = []
        props.data.forEach(e=>{
          
          rows.push(createData(e.headings.en,e.contents.en,e.successful, e.successful,e.queued_at,e.id));
        });
        setRow(rowData)
    }


}, [])

const history = useHistory();
function TableCells(column,row){

  if(column.id === 'More'){
    //se redériger vers la page /notifInfo t envoyées l'id de la notification en parametres
    return <DetailsPopOver id={row.id} />
  //  return <button onClick={()=>{history.push('/NotifInfo',{id : row.id})}} style={{background:"transparent",borderColor:"transparent"}}><MoreVertIcon /></button> 
  }
  else if (column.id ==='Text' ){
    return ( 
       <div class="dialog-box">
    <div class="background-blur"></div>
    <div class="header">
      <div class="background-blur"></div>
      <div class="contents">
      <div class="left">
        <i class="far fa-comment"></i> Notification
      </div>
      <div class="right">
        {new Date(row.time*1000).toLocaleDateString("fr-FR")}
      </div>
      </div>
    </div>
    <div class="contents main-content">
      <strong>
      {row.notification.heading}
      </strong>
      <br/>
      {row.notification.text}
    </div>
  </div>)
  }else{
    return row[column.id]
  }
}

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
        <TableHead style={{zIndex:1000}}>
          <TableRow>
            <TableCell>Notification Text</TableCell>
            <TableCell align="right">Notifications Sent </TableCell>
            <TableCell align="right">Successfull </TableCell>
            <TableCell align="right">More</TableCell>
            
          </TableRow>
        </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover  tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {TableCells(column,row)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
