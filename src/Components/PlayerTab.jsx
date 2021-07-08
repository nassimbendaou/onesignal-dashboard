/**
 * interface User pour visualiser les données des utilisateur !
 */

import React from 'react';
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import StatesCard from "./StatesCard"
import {

  Update,
  NotificationsNoneOutlined,
  Accessibility
} from "@material-ui/icons";
import TableHead from '@material-ui/core/TableHead';
import SimplePopover from './subComponent/SimplePopover';
let rows=[];
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
//crétaion des lignes du tableau 
function createData(id,identifier,language,last_active,created_at) {

  return { id,identifier,language,last_active : new Date(last_active*1000).toLocaleDateString("fr-FR"),created_at: new Date(created_at*1000).toLocaleDateString("fr-FR")};
}

const getUsers=()=>{
var paramsUsers = {

    method: 'get',
        //retourner les utilisateurs de l'app id = .... en se limitant dans 300 utilisateur
    url: 'https://onesignal.com/api/v1/players?app_id=e88e0d46-c05a-45d7-a0fe-9e82eb884f88&limit=300&offset=0',

    headers: {

      'Content-Type': 'application/json',
                            // rest api key de onesignal
      Authorization: 'Basic ****************************'

    }

  }
    return axios(paramsUsers);
}

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




const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});
const handleIdentifier=(row)=>{
  if(row.identifier.length>20) {return row.identifier.slice(0, 19)+"...";}
  else return row.identifier
}

export default function UserTable(props) {
  const classes = useStyles2();
  const history = useHistory();
  const [page, setPage] = React.useState(0);
  const [users, setUsers] = React.useState(0);
  const [row, setRow] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(-1);
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
React.useEffect(() => {
    //récupération des donées des utilisateurs et les enregistrer dans la state
    getUsers().then(d=>{
      setUsers(d.data.total_count)
      let rowData = []
       
      d.data.players.forEach(e=>{
        
        rows.push(createData(e.id,e.identifier,e.language,e.last_active,e.created_at));
      });
      setRow(rows)
      console.log("row data",rows)
    } )

   
       
    
}, [])


  return (
    <div style={{marginBottom:70}}>
       <div  style={{marginLeft:props.left,padding:0,height:180,width:window.innerWidth-(props.left+50),marginBottom:100,alignSelf:"center"}}>
          <StatesCard
              icon={Accessibility}
              iconColor="blue"
              title="Users"
              description={users}
              statIcon={Update}
              statText="Just Updated"
           />
            </div>
  <TableContainer component={Paper}  style={{width:window.innerWidth-(props.left+50),marginLeft:props.left,marginTop:30,marginBottom:70}}>
      <Table className={classes.table} aria-label="custom pagination table">
      <TableHead style={{zIndex:1000}}>
          <TableRow>
          <TableCell align="center"><strong>ID</strong></TableCell>
            <TableCell align="center"><strong>User identifier</strong></TableCell>
        
            <TableCell align="center"><strong>language</strong> </TableCell>
           
            <TableCell align="center" ><strong>last session </strong> </TableCell>
            <TableCell align="center" ><strong>first session</strong></TableCell>
            <TableCell align="center"><strong>notifications</strong></TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) =>  ( <TableRow key={row.identifier}>
             <TableCell style={{ width: 160 }} align="center">
             {row.id}
            </TableCell>
            <TableCell style={{ width: 70 }} align="center">
             {handleIdentifier(row)}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              {row.language}
            </TableCell>
            <TableCell style={{ width: 160 }} align="center">
              {row.last_active}
            </TableCell>
             <TableCell style={{ width: 160 }} align="center">
              {row.created_at}
            </TableCell>
          <TableCell style={{ width: 160 }} align="center">
               <button  style={{background:"transparent",borderColor:"transparent"}}><MoreVertIcon    onClick={() => {
                    history.push('/PlayerInfo',{email : row.identifier})
                }} /></button> 
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
    </TableContainer>
    <div  style={{marginTop:30,marginBottom:70,marginLeft:props.left}}>   </div>
    </div>
  );
}

 