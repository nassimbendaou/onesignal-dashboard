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

import PersonIcon from '@material-ui/icons/Person';
import NotificationsIcon from '@material-ui/icons/Notifications';
import tasksCardStyle from "../../Utils/taskCardStyle";
import PlayerNotificationsTabs from "./PlayerNotificationsTabs";

import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
class NotificationsCard extends React.Component {
  state = {
    value: 0,
    data : {},
    load : true,
    users : [],
    rowsData : [],
    rowsNOP : [],
    rowsRE : []
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
  
 

  render() {
    const { classes,data } = this.props;
    console.log("data ", data)
    return (
      
    <div style={{display:'block',backgroundColor:"#f8f9fa",marginBottom:100}}>
      <Card className={classes.card}>
          
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
                icon={<NotificationsActiveOutlinedIcon className={classes.tabIcon} />}
                label={"Last Notififcation Opened"}
              />
              <Tab
                classes={{
                  wrapper: classes.tabWrapper,
                  rootLabelIcon: classes.labelIcon,
                  label: classes.label,
                  rootInheritSelected: classes.rootInheritSelected
                }}
                icon={<NotificationsIcon className={classes.tabIcon} />}
                label={"Last Notification Recieved"}
              />
             
              
            </Tabs>
          }
        />
        <CardContent>
          {this.state.value === 0 && (
            <Typography component="div">
           <PlayerNotificationsTabs data={data.LastNoticationOpened} opened={true} />
            </Typography>
          )}
          {this.state.value === 1 && (
            <Typography component="div">
              <PlayerNotificationsTabs data={data.LastNotificationRecieved} opened={false} />
            
            
            </Typography>
          )}
         
        </CardContent>
      </Card>      
        </div>
    );
  }
}

NotificationsCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(tasksCardStyle)(NotificationsCard);
