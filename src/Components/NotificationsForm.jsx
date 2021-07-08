
/**
 * le formulaire pour remplir les données de la notifications 
 */

import React,{ useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import { TagsInput } from "react-tag-input-component";
import Card from '@material-ui/core/Card';
import "../assets/style.scss"
import "../App.css"
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AndroidIcon from '@material-ui/icons/Android';
import AppleIcon from '@material-ui/icons/Apple';
import MenuItem from '@material-ui/core/MenuItem';
import CountrySelect from './subComponent/CountrySelect';
import SessionsSelector from './subComponent/SessionsSelector';
import EmojiPicker from './subComponent/EmojiPicker';
import DateAndTimePickers from './subComponent/DatePicker';
import AddToPhotosOutlinedIcon from '@material-ui/icons/AddToPhotosOutlined';
import ReactFileReader from 'react-file-reader';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';




let additional =[]
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
      buttonProgress: {
       
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
      buttonSuccess: {
        backgroundColor: "primary",
        '&:hover': {
          backgroundColor: "primary",
        },
      },
      wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
      },
      
 
  }));

 
const NotificationForm = (props) => {
 
    const [selected, setSelected] = useState([]);
    const [click, setClicked] = useState(false);
    const [advanced, setAdvanced] = useState(false);
  
    const [data, setData] = useState([]);
    const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
   
    const [longitude, setLongitude] = useState(0.0);
    const [latitude, setLatitude] = useState(0.0);
    const [raduis, setRaduis] = useState(0);
    const [L_session, set_L_Session] = useState(0);
    const [mails, setMails] = useState([]);
    const [time, setTime] = useState(undefined);
   
    const [L_session_op, set_L_Session_op] = useState("");
    const [F_session, set_F_Session] = useState(0);
    const [F_session_op, set_F_Session_op] = useState("");
 
    
    const handleTime=(e)=>{
      //send after ****  le parametre pour programmer l'envoie programmé
     // console.log(new Date(Date.parse(e)).toUTCString())
       setTime(new Date(Date.parse(e)).toUTCString())
      
      }
const handleFiles = files  => {
 /* var reader = new FileReader();
  reader.onload = function(e) {
      // Use reader.result

  let Earray =   reader.result.split(",");
  props.emails(Earray)


  }
  reader.readAsText(files[0]);*/

  var reader = new FileReader();
  
    reader.readAsText(files[0]);
     reader.onload=function(){
       console.log(reader.result)
       let Earray =   reader.result.split("\r\n")[0].split(",");
       props.emails(Earray)
      }
      setSuccess(true);
  setLoading(false);
}
const buttonClassname = clsx({
  [classes.buttonSuccess]: success,
});
       
const handleTimeOut = () => {
  setSuccess(false);
  setLoading(true);
}
  const handleEmails=()=>{
  let   filters = []
  console.log(mails)
  //ajouté le filtres des emails et ajouté l'opérateur OR ( mail1 or mail2 or ...)
    
    
    
  }
  //composent des meta data
  // ce composent il est sous composent de notification form car ilchange le state du parent
    const ChildComponent = (props) =>  {
      const [ok, setOk] = useState(false);
      const [key, setKey] = useState("");
    const [val, setVal] = useState("");
    const [chosenEmoji,setChosenEmoji] = useState("");
   
    const _handlePair=()=>{
     
      if(props.defined)
      {
       
        setKey(props.meta)
        let pair = {};
      pair[props.meta] = val;
      additional=[...additional,pair]
    
      setData(additional)
    
      }else{
        let pair = {};
      pair[key] = val;
     
      additional=[...additional,pair]
      setData(additional)
      }
      //console.log(additional)
      
     
  }
  


      return (<div style={{display:"inline",marginTop:10}} id={props.id}>
        <TextField disabled={ok || props.defined} label="Key" variant="outlined" style={{backgroundColor:"#fff"}} 
        value={props.defined ? props.meta : undefined}
        onChange={(e)=>{
       setKey( e.target.value)
      }}
        />
        <TextField disabled={ok} label="Value" variant="outlined" style={{marginLeft:5,backgroundColor:"#fff"}}  onChange={(e)=>{setVal( e.target.value)}} />
       
       
        <Button color="inherit" onClick={()=>{_handlePair(); setOk(true);}} style={{alignSelf:"center",justifySelf:"center",marginTop:10}}>
                        <CheckIcon style={{color:"#00FF00"}} />
         </Button>
      
        
        </div>)}
        const [childs, setChilds] = useState(2);
        //initialiser le composent des données additionnel avec les parametres définie (gotopage,discountCode)
        const [children, set_children] = useState([<ChildComponent id={0} defined={false} /> 
                                                ,<ChildComponent id={1} defined={false}/>]);

   
    const _handleChilds=()=>{
      let div= <ChildComponent id={childs}/>;
      set_children([...children, div]) 
    }
  

    return (
        
        <div style={{  marginLeft:props.left,marginBottom:100,marginRight:props.left}}>
            <div style={{marginBottom:100}}>
           
                
                 
                    <CardContent style={{justifyContent:"center",alignItems:"center"}}>
                        <h2 className="cyber-text" style={{marginBottom:70,display:'flex',justifySelf:"center"}}>Send a New Notification</h2>
                        <Typography variant="body2" color="textSecondary" component="div" className="Forum">
                        <div style={{display:"inline-flex"}}>
                            <TextField
                                required
                                id="Title"
                                label="Title"
                                margin="normal"
                                multiline
                                onChange={props.titleChange}
                                style={{width: 450}}
                            />
                              <EmojiPicker parent={"Title"} onChange={props.titleChange}/>
                            </div>
                            <br />
                            <div style={{display:"inline-flex"}}>
                            <TextField
                                required
                                id="Message"
                                label="Message"
                                margin="normal"
                                multiline
                                onChange={props.subtitleChange}
                                style={{width: 450}}
                            />
                             <EmojiPicker parent={"Message"}  onChange={props.subtitleChange}/>
                            </div>
                            <br />
                            
                              <TextField
                                required
                                id="URL image"
                                label="URL image"
                                margin="normal"

                                onChange={props.imageUrl}
                                style={{width: 450}}
                                
                            />
                           
                           
                             <br />
                             <TextField
                                required
                                id="URL"
                                label="URL"
                                margin="normal"
                                onChange={props.urlChange}
                                style={{width: 450}}
                            />
                             <br />
                            <TextField
                                required
                                id="standard-required"
                                label="Campaign"
                                margin="normal"
                                onChange={props.campagne}
                                style={{width: 450,marginBottom:30}}
                            />
                             <br />
                           <div style={{}}>
                             <TagsInput
                                value={selected}
                                onChange={props.emails}
                                name="Emails"
                                placeHolder="enter emails"
                                width={200}
                                
                              
                            />
                            <ReactFileReader handleFiles={handleFiles} >
                                 <Button   style={{height:45,marginLeft:10}}
                            variant="contained" color="primary" className={buttonClassname}
                            disabled={loading}
                            onClick={handleTimeOut}
                            >
                        <AddToPhotosOutlinedIcon className={classes.rightIcon} />
                        Upload Emails
                </Button></ReactFileReader>
                {loading && <CircularProgress size={24} style={{marginLeft:-80,zIndex:1000,marginTop:10}} className={classes.buttonProgress} />}
                            </div>  
                        </Typography>
                        <div style={{display:"inline",marginTop:10,marginBottom:30}}>

        <Button variant="outlined" color="primary" onClick={()=>{setClicked(!click)}} style={{marginTop:15,marginBottom:15,height:55,width:220,justifyContent:"normal"}}>
                <ArrowDropDownIcon className="arrow" style={{ transform:!click? "rotate(-90deg)" :"rotate(0deg)" }} /> additional data
        </Button>   
       
     
    
      
           
      </div>
                {
                /** si le button additional data a été cliquer la partie des filtres s'affiche */
                click && (
                     <Card className={classes.root} style={{backgroundColor:"#e0e0e0cc",marginTop:30}}>
                     <CardContent style={{display:"flex",flexDirection:"column"}} >
                     {children}
                     
                    </CardContent>
                    <div style={{display:"inline",marginTop:10}}>
                    <Button color="primary" onClick={()=>{ setChilds(childs+1); _handleChilds()}}>
                <AddIcon />
                </Button>
                <Button color="#00FF00" onClick={()=>{props.data(additional)}} >
                        <CheckIcon style={{color:"#00FF00"}} />
                  </Button>
                    </div>
                   
                
                   </Card>
                    
                )}
        
          <div style={{display:"flex"}}><Button variant="outlined" color="primary" onClick={()=>{setAdvanced(!advanced)}} style={{justifyContent:"normal",width:220,marginTop:15,marginBottom:15,height:55}}>
                <ArrowDropDownIcon className="arrow" style={{ transform:!advanced? "rotate(-90deg)" :"rotate(0deg)" }} /> 
                advanced sittings
        </Button>   </div>
        
        {/** si le button andvanced a été cliquer la partie des filtres s'affiche */
        advanced && (
          
                     <Card className={classes.root} style={{backgroundColor:"#e0e0e0cc",marginTop:30}}>
                   
                     <CardContent style={{display:"flex",flexDirection:"column"}} >
              <div>
                    <InputLabel  htmlFor="location" style={{marginTop:10,marginBottom:5,fontSize:20}}>Location</InputLabel>
                    <div style={{display:"inline",marginTop:10}}>
                <TextField id="outlined-basic" label="Longitude" variant="outlined" style={{backgroundColor:"#fff",width:120}} onChange={(e)=>{setLongitude(Number(e.target.value))}}/>
                <TextField id="outlined-basic" label="Latitude" variant="outlined" style={{marginLeft:5,backgroundColor:"#fff",width:120}}  onChange={(e)=>{setLatitude(Number(e.target.value))}}/>
                <TextField id="outlined-basic" label="Raduis" variant="outlined" style={{marginLeft:5,backgroundColor:"#fff",width:120}}  onChange={(e)=>{setRaduis(Number(e.target.value))}}/>
                
                </div>
              </div>
              <div>
              <InputLabel  htmlFor="language" style={{marginTop:10,marginBottom:5,fontSize:20}}>Language</InputLabel>
              <div style={{display:"inline",marginTop:10}}>
                      <FormControl variant="outlined" className={classes.formControl}   style={{marginTop:15,marginBottom:15}}>
                <InputLabel htmlFor="outlined-age-native-simple" style={{paddingTop:0,marginBottom:20}}>language</InputLabel>
                <Select
                  native
                  style={{width:285,backgroundColor:"#fff"}}
                  name="language"
                  onChange={props.language}
                  inputProps={{
                    name: 'age',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option value={"en"}>English</option>
                  <option value={"fr"}>French</option>
                  <option value={"es"}>Spanish</option>
                </Select>
              </FormControl>
              </div>
              </div>
              <div>
                    <InputLabel  htmlFor="Country" style={{marginTop:10,marginBottom:5,fontSize:20}}>Country</InputLabel>
                    <CountrySelect country={props.country} />
        </div>
        <div>
          
          
                 <InputLabel  htmlFor="Sessions" style={{fontSize:20}}>Sessions</InputLabel>
                 <SessionsSelector name={"Last Sessions"}  action_op={set_L_Session_op} action_value={set_L_Session} />
                 <SessionsSelector name={"First Sessions"}  action_op={set_F_Session_op} action_value={set_F_Session} />
                <div>
                    <InputLabel  htmlFor="Amount Time" style={{marginTop:10,marginBottom:10,fontSize:20}}>Amount Spent</InputLabel>
                    <div style={{display:"inline",marginTop:10,width:285,}}>
                <TextField id="outlined-basic" label="amount spent greater than (min)" variant="outlined" style={{backgroundColor:"#fff",width:285,}} onChange={(e)=>{props.amountSpent( e.target.value)}}/>
               
                
                </div>
              </div>
              <div>
                    <InputLabel  htmlFor="session count" style={{marginTop:10,marginBottom:10,fontSize:20}}>Session Count</InputLabel>
                    <div style={{display:"inline",marginTop:10,width:285,}}>
                <TextField id="outlined-basic" label="session count" variant="outlined" style={{backgroundColor:"#fff",width:285,}} onChange={(e)=>{props.session_count( e.target.value)}}/>
               
                
                </div>
              </div>
              <div>
              <InputLabel  htmlFor="patform" style={{marginTop:10,marginBottom:10,fontSize:20}}>Platforms</InputLabel>
              <FormControl variant="outlined" className={classes.formControl}  style={{backgroundColor:"#fff",marginTop:15,marginBottom:15,width:285}}>
        <InputLabel htmlFor="outlined-platform-native-simple" style={{paddingTop:0,marginBottom:20}}>Platform</InputLabel>
        <Select
        
          style={{width:285}}
          name="platform"
          onChange={props.platform}
          inputProps={{
            name: 'age',
            id: 'outlined-age-native-simple',
          }}
        >
           <MenuItem value={"android"}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <AndroidIcon style={{color:"#3DDC84"}} />
                <div> Android</div>
            </div>
        </MenuItem>
        <MenuItem value={"ios"}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <AppleIcon style={{color:"#666666"}} />
                <div> IOS</div>
            </div>
        </MenuItem>
        <MenuItem value={"all"}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                
                <div> All</div>
            </div>
        </MenuItem>
        </Select>
      </FormControl>
      </div>
      <div>
      <InputLabel  htmlFor="Send After" style={{marginTop:10,marginBottom:10,fontSize:20}}>Send After</InputLabel>
        <DateAndTimePickers time={handleTime} />
      </div>

              </div>
                     
                     
                    </CardContent>
                  
                   
                
                   </Card>
                    
                )}
                    </CardContent>

                <CardActions style={{paddingBottom:100}}>
                    <Button  style={{marginBottom:100}} onClick={()=>{props.first_session(F_session,F_session_op);
                                                                      props.last_session(L_session,L_session_op);
                                                                      props.location(longitude,latitude,raduis);
                                                                      handleEmails()
                                                                      console.log("DT from form", additional)
                                                                      {props.data(additional)}
                                                                      props.time(time)
                                                                      props.click(); }} 
                            variant="contained" color="primary" className={classes.button}>
                        <SendIcon className={classes.rightIcon} />
                        Send
                </Button>
                </CardActions>
                
           
            </div>
        </div >
    );
}


export default NotificationForm;