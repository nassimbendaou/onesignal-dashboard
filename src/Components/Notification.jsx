import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Tabs,
  Tab
} from "@material-ui/core";
import ProgressIndicator from './ProgressIndicator';
import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
import TableNotif from './TabNotif';
import axios from 'axios';
import MobileShape from './MobileShape';
import tasksCardStyle from "../Utils/taskCardStyle";
import UserTable from "./UserNotif";
import GetAppIcon from '@material-ui/icons/GetApp';
import Fire from '../Data/firebase';

class NotificationsCard extends React.Component {
  state = {
    value: 0,
    data : {},
    load : true,
    users : [],
    rowsData : []
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleData = () =>{
      return this.state.data
  }
   createData=(email, screen,openTime)=> {
    return { email, screen,openTime };
  }
  //fonction pour transformer les données du tableau à un ficher csv
   exportToCsv = (array,filename) => {
    
     var csvFile = '';
     array.forEach(function(rowArray) {
      let row = rowArray.email+",\t"+rowArray.screen+",\t"+rowArray.openTime+",";
      csvFile += row + "\r\n";
  });

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob,  `Notification${filename}.csv`);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `Notification${filename}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
 
async UNSAFE_componentWillMount(){
 
    /*this.props.id : l'id de notif qui est passé dans les props
     /e88e0d46-c05a-45d7-a0fe-9e82eb884f88/ est l'ID de l'application  */
    axios.get(`https://onesignal.com/api/v1/notifications/${this.props.id}?app_id=e88e0d46-c05a-45d7-a0fe-9e82eb884f88`,  { headers: {
  
        'Content-Type': 'application/json',
        /* /ZDI0ZTYyOGMtZmU5Mi00ZDM5LWJmZjEtZDhhMjdhN2NhMzIx/ REST API KEY de OneSignal   */
        Authorization: 'Basic ZDI0ZTYyOGMtZmU5Mi00ZDM5LWJmZjEtZDhhMjdhN2NhMzIx'
    
      }}).then(data=>{
      
        this.setState({data:data.data,load : false});
        
      });

      let rows = []
      

      //le listenner firebase sur la bd realtime pour récuperer chaque valeur ajouté à la bd en temps réel
      Fire.shared.ref.on('value', (snapshot) => {
         
       
        let data = snapshot.val()
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            if(this.props.id=== data[key].key ){
            
              //si l'application et dans le premier-plan ou non
              if(data[key].notification.notification.lockScreenVisibility === 1){
                
                rows.push(  this.createData(data[key].userEmail, "foreGround",data[key].openTime))
            }else
            {
                rows.push(  this.createData(data[key].userEmail, "backGround",data[key].openTime))
            }
            
            
             
          }}}
          this.setState({rowsData:rows})
        })
     
}
  render() {
    const { classes } = this.props;
    return (
       this.state.load
        ? <div > <ProgressIndicator /></div>
    :
    <div style={{display:'block',backgroundColor:"#f8f9fa",marginBottom:100}}>
      <Card  style={{marginTop:100,marginBottom:100,width:window.innerWidth*0.45,float:"left"}}className={classes.card}>
          
        <CardHeader
          style={{zIndex:1,position:'relative'}}
          classes={{
            root: classes.cardHeader,
            title: classes.cardTitle,
            content: classes.cardHeaderContent
          }}
          title="INFORMATIONS :"

          action={
            <Tabs
              classes={{
                flexContainer: classes.tabsContainer
              }}
              value={this.state.value}
              onChange={this.handleChange}
              indicatorClassName={classes.displayNone}
              textColor="inherit"
            >
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  rootLabelIcon: classes.labelIcon,
                  label: classes.label,
                  rootInheritSelected: classes.rootInheritSelected
                }}
                icon={<NotificationsIcon className={classes.tabIcon} />}
                label={"Notifications Infos"}
              />
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  rootLabelIcon: classes.labelIcon,
                  label: classes.label,
                  rootInheritSelected: classes.rootInheritSelected
                }}
                icon={<PersonIcon className={classes.tabIcon} />}
                label={"Who clicked"}
              />
             
              
            </Tabs>
          }
        />
        <CardContent>
          {this.state.value === 0 && (
            <Typography component="div">
           <TableNotif data={this.state.data} />
            </Typography>
          )}
          {this.state.value === 1 && (
            <Typography component="div">
              <UserTable rows={this.state.rowsData} />
              <Button variant="contained" color="primary" style={{float:"right",marginTop:10,marginBottom:10}} 
              onClick={()=>{this.exportToCsv(this.state.rowsData,this.props.id)}} >
              <GetAppIcon className={classes.rightIcon} />
              Download Data
              </Button>
            
            </Typography>
          )}
         
        </CardContent>
      </Card>      
         <MobileShape image={''} 
                        title={this.state.data.headings.en}
                        text={this.state.data.contents.en}
  /></div>
    );
  }
}

NotificationsCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(tasksCardStyle)(NotificationsCard);
