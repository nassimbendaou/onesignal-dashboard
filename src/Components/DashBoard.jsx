/****
 * l'interface dashboard :
 * affichage des graphes, données des notif et utilisateur ,...
 */


import React, { Component } from 'react'
import '../App.css';
import styled from 'styled-components';
import Chart from "./Chart"
import Table from "./Table"
import axios from 'axios';

import {

  Update,
  NotificationsNoneOutlined,
  Accessibility
} from "@material-ui/icons";
import StatesCard from "./StatesCard"


 
 // requetes pour retourner les données de toutes les utilisateurs
const getUsers=()=>{

  var paramsUsers = {

    method: 'get',
        //retourner les utilisateurs de l'app id = .... en se limitant dans 300 utilisateur
    url: 'https://onesignal.com/api/v1/players?app_id=e88e0d46-c05a-45d7-a0fe-9e82eb884f88&limit=300&offset=0',

    headers: {

      'Content-Type': 'application/json',
                            // rest api key de onesignal
      Authorization: 'Basic***************************'

    }

  }
    return axios(paramsUsers);
}


 

export default class DashBoard extends Component {
  constructor(){
    super();
    this.state={
      users:0,
      notifications:0,
      notificationsData:[],
      succefullNotifications: [],
      loading:true
    }
  }/*** requetes pour retourner toutes les notifications dans la bd onesignal la limite de cette requetes est 50 notifs */
   getNotifications=()=>{
    axios.get('https://onesignal.com/api/v1/notifications?app_id=e88e0d46-c05a-45d7-a0fe-9e82eb884f88',  { headers: {
  
      'Content-Type': 'application/json',
                // clé rest de onesignal
      Authorization: 'Basic *******************************'
  
    }}).then(d=>{
      //console.log("success1",d.data);
      this.setState({notifications:d.data.total_count,notificationsData:d.data.notifications})
      let succefullData = [];
        // enregister toutes les notifs qui ont été reçu avec succées 
      d.data.notifications.forEach(notification => {
        if(notification.successful>0){
          succefullData.push(notification)
        }
      });

      this.setState({succefullNotifications:succefullData})
     
    })}
    
    UNSAFE_componentWillMount(){
      this.getNotifications();
      getUsers().then(d=> {console.log("players data",d);this.setState({users:d.data.total_count,loading:false})});
      
      
    }
  render() {

    //définir le style des composent html en utilisant le package styled-components
    const Containor= styled.div`     
     display: inline-block; 
     left:0px; 
     margin-left:${this.props.left}px;
     width:250px !important; 
     height :170px !important;
 
`;
    const Title = styled.p`
    position: relative;
    text-transform: uppercase;  
    font-size: 40px;
    font-family: 'Catamaran', sans-serif;
    color:#4051b5
    `
    const ChartContainer= styled.div`   
    margin-top:50px;
    left:0px;    
    width:${window.innerWidth-20}; 
    margin-left:${this.props.left}px;
    margin-right:20px;
    border-radius: 15px;
    border: solid 3px #ffffff;
    box-shadow: 10px 5px 5px #D0D0D0;
 
`;

    return (
     <div style={{display:'block',backgroundColor:"#f8f9fa",marginBottom:100}}>
      <Title style={{marginLeft:this.props.left}}  >Global Outcomes</Title>
      <ChartContainer> <Chart data={this.state.notificationsData} color={"#3f51b7"} Name={"Notifications"} Global={true}/></ChartContainer>
      <ChartContainer> <Chart data={this.state.succefullNotifications} color={"#26c6da"}  Name={"Succefull Notifications"}  /></ChartContainer>
     <div style={{marginRight:40,marginBottom:40}} > 
      <Containor style={{padding:0}} >
                   
                   
                
      <div  style={{float:"left",padding:0,height:180,width:250}}>
          <StatesCard
               icon={NotificationsNoneOutlined}
              iconColor="red"
              title="Notifications"
              description={this.state.notifications}
              statIcon={Update}
              statText="Just Updated"
              
            />
       </div>
            
     </Containor>                
        <div  style={{float:"right",padding:0,height:180,width:250}}>
          <StatesCard
              icon={Accessibility}
              iconColor="blue"
              title="Users"
              description={this.state.users}
              statIcon={Update}
              statText="Just Updated"
           />
            </div>
        </div>
   
      
       <ChartContainer style={{marginTop:100}}><Table data={this.state.notificationsData}/>
       </ChartContainer>

       <div style={{height:100}}></div> 
      
      
       </div>
 
    )
  }
}
