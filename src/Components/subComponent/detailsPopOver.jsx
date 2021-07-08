
/*** 
 *cette class définit le popover qui s'affiche en cliquant sur le button details 
 * 
 * 
 * 
 */


 import React,{ useState }  from 'react';
 import { makeStyles } from '@material-ui/core/styles';
 import Popover from '@material-ui/core/Popover';
 import Typography from '@material-ui/core/Typography';
 import Button from '@material-ui/core/Button';
 import TextField from '@material-ui/core/TextField';
 import SendIcon from '@material-ui/icons/Send';
 import axios from 'axios';
 import TrackChangesIcon from '@material-ui/icons/TrackChanges';
 import Link from '@material-ui/core/Link';
 import FileCopyIcon from '@material-ui/icons/FileCopy';
 import VisibilityIcon from '@material-ui/icons/Visibility';
 import MoreVertIcon from '@material-ui/icons/MoreVert';
 import { useHistory } from 'react-router-dom';

 export default function DetailsPopOver(props) {
 //useState ===  state en class
   const [anchorEl, setAnchorEl] = useState(null);
   // les données de la notification initialiser par l'email de l'utilisateur 
   const [notificationState, setNotificationState] = useState({
     title: '',
     subtitle: '',
     emails:props.email
    
   });
   //makeStyles === objet de définition de style fournit par material ui
   const useStyles = makeStyles((theme) => ({
     typography: {
       padding: theme.spacing(2),
       button: {
         margin: theme.spacing(1),
       },
       rightIcon: {
         marginLeft: theme.spacing(1),
       },
     },
   }));
   const classes = useStyles();
   // chemin fournit par onesignal pour l'envoi des notifications
   const path = "https://onesignal.com/api/v1/notifications";
   /**parametre de la requettes http */
   var params = {
   
       method: 'post',
   
       url: path,
   
       headers: {
   
         'Content-Type': 'application/json',
           //clé secret de l'api REST
         Authorization: 'Basic ZDI0ZTYyOGMtZmU5Mi00ZDM5LWJmZjEtZDhhMjdhN2NhMzIx'
   
       },
   
       data: {
           // l'id de l'application
         app_id: 'e88e0d46-c05a-45d7-a0fe-9e82eb884f88',
   
         headings: {
           en: notificationState.title, 
         },
         contents: {
           en: notificationState.subtitle,
         },
        //ciblage des utilisateurs 
         filters :[{ "key": "value",
         "field": "email",
         "value": notificationState.emails,
         "relation": "="
      }],
        
       }
   
     }
   
   const handleRetarget=()=>{axios(params).then(rep=>console.log(rep))} 
   
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
 
   const handleClose = () => {
     setAnchorEl(null);
   };
   
const history = useHistory();
 
   const open = Boolean(anchorEl);
   const id = open ? 'simple-popover' : undefined;
 
   return (
     <div>
       <Button style={{background:"transparent",borderColor:"transparent"}} aria-describedby={id}  onClick={handleClick}>
       <MoreVertIcon className={classes.rightIcon} />
       
       </Button>
       <Popover
         id={id}
         open={open}
         anchorEl={anchorEl}
         onClose={handleClose}
         anchorOrigin={{
           vertical: 'bottom',
           horizontal: 'center',
         }}
         transformOrigin={{
           vertical: 'top',
           horizontal: 'center',
         }}
       >
         <Typography className={classes.typography} style={{display:"inline-flex",flexDirection:"column"}}> 
               <div  style={{display:"inline-flex"}}>
               <VisibilityIcon style={{marginRight:10 }}/>
               <Link
                component="button"
                variant="body2"
                style={{textDecoration:"none",color:"#000",marginBottom:10}}
                onClick={() => {
                    history.push('/NotifInfo',{id : props.id})
                }}
                >
                Details
                </Link>
                 </div> 

                <div style={{display:"inline-flex"}}> 
                <FileCopyIcon style={{marginRight:10 }}/>
               <Link
                component="button"
                variant="body2"
                style={{textDecoration:"none",color:"#000"}}
                onClick={() => {
                  history.push('/NotifDuplicate',{notifId : props.id})
                }}
                >
                Deplicate
                </Link>
                   </div> 
              
                </Typography>
       </Popover>
     </div>
   );
 }
 