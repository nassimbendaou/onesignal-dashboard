

 import React, { useState } from 'react';
/* import MobileShape from './MobileShape';
 import NotificationDupForm from './subComponent/NotificationDupForm';
 import ProgressIndicator from './ProgressIndicator';*/
 import { useLocation } from "react-router-dom";
 import Fire from "../Data/firebase"
 import PlayerTanInfos from "./subComponent/PlayerTabInfos"
 import '../App.css';
 import styled from 'styled-components';

 
 import {
 
   Update,
   NotificationsNoneOutlined,
   Accessibility
 } from "@material-ui/icons";
 import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';
 import StatesCard from "./StatesCard"
 
const UserDataView = (props) => {
    const loc = useLocation();
   
    const [data,setData]=useState({});
    const [TotalNotifications,setTotalNotifications]=useState(0);
    const [NotificationPerDay,setNotificationPerDay]=useState(0);
    
    React.useEffect(()=>{
        console.log("hhahhah")
        Fire.shared.getUserByEmail( loc.state.email).then(e=>{
            setData(e);
            setTotalNotifications(e.TotalNotifications)
            if(e[`Notification_${new Date(new Date().toLocaleDateString("fr-FR")).getTime()/1000}}`] === undefined ){
                setNotificationPerDay(0)
               
            }else  setNotificationPerDay(e[`Notification_${new Date(new Date().toLocaleDateString("fr-FR")).getTime()/1000}}`]) 
           // console.log("hhahhah",e[`Notification_${new Date(new Date().toLocaleDateString("fr-FR")).getTime()/1000}}`],NotificationPerDay)
            console.log(e)
        });
    },[]);

    const Containor= styled.div`     
    display: inline-block; 
    left:0px; 

    width:250px !important; 
    height :170px !important;

`;
    return(
       < div style={{marginLeft:props.left}}>
           <div style={{marginRight:40,marginBottom:40,display:"inline-flex",flexDirection:"column"}} > 
        <Containor style={{padding:0}} >
                     
                     
                  
        <div  style={{padding:0,height:180,width:window.innerWidth-(props.left+50),marginBottom:100,alignSelf:"center"}}>
            <StatesCard
                 icon={NotificationsNoneOutlined}
                iconColor="red"
                title="Total Notification"
                description={TotalNotifications}
                statIcon={Update}
                statText="Just Updated"
                
              />
         </div>
              
       </Containor>                
       <div  style={{padding:0,height:180,width:window.innerWidth-(props.left+50),marginBottom:100,alignSelf:"center",marginTop:70}}>
            <StatesCard
                icon={NotificationsActiveOutlinedIcon}
                iconColor="blue"
                title="Notification this Day"
                description={NotificationPerDay}
                statIcon={Update}
                statText="Just Updated"
             />
              </div>
              <div  style={{padding:0,height:180,width:window.innerWidth-(props.left+50),marginBottom:100,alignSelf:"center",marginTop:70}}>
                  <PlayerTanInfos data={data}/>
              </div>
          </div>
          </div>
    )
}

export default UserDataView
