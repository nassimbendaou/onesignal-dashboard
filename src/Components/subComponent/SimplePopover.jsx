
/*** 
 *cette class définit le popover qui s'affiche en cliquant sur le button retarget 
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

export default function SimplePopover(props) {
//useState ===  state en class
  const [anchorEl, setAnchorEl] = React.useState(null);
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

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
      <TrackChangesIcon className={classes.rightIcon} />
       Retarget
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
        <Typography className={classes.typography} style={{display:"inline-flex"}}> 
                   <div style={{float:"left"}}>
                        <p className="cyber-text" style={{fontSize:17,marginBottom:10,display:'flex',justifySelf:"center"}}>Send a New Notification</p>
                        <Typography variant="body1" color="primary" component="div" className="Forum">
                           
                            <TextField
                                required
                                id="standard-required"
                                label="title"
                                margin="normal"
                                onChange={(e)=>{ 
                                  setNotificationState({
                                    title:   e.target.value,
                                    subtitle:  notificationState.subtitle,
                                    emails:props.email
                                  });}}
                                style={{width: 300,marginBottom:5}}
                            />
                             <br />
                             <TextField
                              required
                              id="standard-required"
                              label="mesage"
                              margin="normal"
                                onChange={(e)=>{ 
                                  setNotificationState({
                                    title: notificationState.title,
                                    subtitle:   e.target.value,
                                    emails:props.email
                                  });}}
                                  style={{width: 300,marginBottom:5}}
                              
                            />
                        </Typography>
                      
                        <Button  style={{marginTop:10}} onClick={()=>{handleRetarget(); handleClose();}} variant="contained" color="primary" className={classes.button}>
                        <SendIcon className={classes.rightIcon} />
                        Send
                         </Button>
                        </div>
               </Typography>
      </Popover>
    </div>
  );
}
