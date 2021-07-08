
/**
 * compoesent du premier tableau qui affiche les donées détailler de la notification
 */

 import React, { useEffect,useState } from 'react';
 import PropTypes from 'prop-types';
 import { makeStyles, useTheme } from '@material-ui/core/styles';
 import Table from '@material-ui/core/Table';
 import TableBody from '@material-ui/core/TableBody';
 import TableCell from '@material-ui/core/TableCell';
 import TableContainer from '@material-ui/core/TableContainer';
 import TableFooter from '@material-ui/core/TableFooter';
 import TablePagination from '@material-ui/core/TablePagination';
 import TableRow from '@material-ui/core/TableRow';
 import Paper from '@material-ui/core/Paper';
 import IconButton from '@material-ui/core/IconButton';
 import FirstPageIcon from '@material-ui/icons/FirstPage';
 import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
 import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
 import LastPageIcon from '@material-ui/icons/LastPage';
 
 let rows=[];
 const useStyles1 = makeStyles((theme) => ({
   root: {
     flexShrink: 0,
     marginLeft: theme.spacing(2.5),
   },
 }));
 
 function TablePaginationActions(props) {
   const classes = useStyles1();
   const theme = useTheme();
   const { count, page, rowsPerPage, onChangePage } = props;
 
 
   const handleFirstPageButtonClick = (event) => {
     onChangePage(event, 0);
   };
 
   const handleBackButtonClick = (event) => {
     onChangePage(event, page - 1);
   };
 
   const handleNextButtonClick = (event) => {
     onChangePage(event, page + 1);
   };
 
   const handleLastPageButtonClick = (event) => {
     onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
   };
 
   return (
     
     <div className={classes.root}>
       <IconButton
         onClick={handleFirstPageButtonClick}
         disabled={page === 0}
         aria-label="first page"
       >
         {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
       </IconButton>
       <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
         {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
       </IconButton>
       <IconButton
         onClick={handleNextButtonClick}
         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
         aria-label="next page"
       >
         {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
       </IconButton>
       <IconButton
         onClick={handleLastPageButtonClick}
         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
         aria-label="last page"
       >
         {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
       </IconButton>
     </div>
   );
 }
 
 TablePaginationActions.propTypes = {
   count: PropTypes.number.isRequired,
   onChangePage: PropTypes.func.isRequired,
   page: PropTypes.number.isRequired,
   rowsPerPage: PropTypes.number.isRequired,
 };
 
 function createData(name, value) {
   return { name, value };
 }
 
 
 
 
 const useStyles2 = makeStyles({
   table: {
     minWidth: 500,
   },
 });
 
 export default function CustomPaginationActionsTable(props) {
   const classes = useStyles2();
   const [page, setPage] = React.useState(0);
   const [state, setState] = React.useState({load : true,data : undefined
 });
   const [rowsPerPage, setRowsPerPage] = React.useState(-1);
 
 
   useEffect(() => {
     
     return () => {
        console.log("notif od player ezf", props)
        if(props.opened && props.data !== undefined){
            console.log("notif od player 43434", props)
                     
            rows=[]  
            rows.push( createData("contents",  props.data.notification.notification.body))
            rows.push( createData("headings",  props.data.notification.notification.title))
            rows.push( createData("opened at", props.data.openTime))
            rows.push( createData("Data", JSON.stringify(props.data.notification.notification.additionalData)))
            
        }else if(!props.opened && props.data !== undefined)
        {
          rows=[]
            console.log("notif od player ezezez", props)
            rows.push( createData("contents",  props.data.contents.en))
            rows.push( createData("headings",  props.data.headings.en))
            rows.push( createData("sent at", props.data.sent_at))
            rows.push( createData("Data", JSON.stringify(props.data.data)))
            rows.push(createData("Filters", JSON.stringify(props.data.filters)))
           
          
        }
       
  }
 
                  
             }, []);
   const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
 
   const handleChangePage = (event, newPage) => {
     setPage(newPage);
   };
 
   const handleChangeRowsPerPage = (event) => {
     setRowsPerPage(parseInt(event.target.value, 10));
     setPage(0);
   };
  
 
   return (
     <div style={{backgroundColor:"#f8f9fa"}}>
   <TableContainer component={Paper}>
       <Table className={classes.table} aria-label="custom pagination table">
         <TableBody>
           {(rowsPerPage > 0
             ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
             : rows
           ).map((row) =>  ( <TableRow key={row.name}>
             <TableCell component="th" scope="row">
             <strong> {row.name}</strong> 
             </TableCell>
             <TableCell style={{ width: 160 }} align="right">
               {row.value}
             </TableCell>
          
           </TableRow>))}
 
           {emptyRows > 0 && (
             <TableRow style={{ height: 53 * emptyRows }}>
               <TableCell colSpan={6} />
             </TableRow>
           )}
         </TableBody>
         <TableFooter>
           <TableRow>
             <TablePagination
               rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
               colSpan={3}
               count={rows.length}
               rowsPerPage={rowsPerPage}
               page={page}
               SelectProps={{
                 inputProps: { 'aria-label': 'rows per page' },
                 native: true,
               }}
               onChangePage={handleChangePage}
               onChangeRowsPerPage={handleChangeRowsPerPage}
               ActionsComponent={TablePaginationActions}
             />
           </TableRow>
         </TableFooter>
       </Table>
     </TableContainer></div>
   );
 }
 
 
 