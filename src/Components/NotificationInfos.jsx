import React, { useEffect } from 'react'
import Notification from "./Notification"
import { useLocation } from "react-router-dom";
function NotificationInfos(props){
    //useLocation l'objet de react-router-dom pour la récupération des données de la session
    const location = useLocation();
    useEffect(() => {
        

        console.log(location.state.id)
    }, []);
  
    return (
           <div style={{display:'block',backgroundColor:"#f8f9fa",marginBottom:100}}>
               <div style={{marginLeft:window.innerWidth*0.25}}><Notification id={location.state.id} /> </div>  
      
            </div>
    )
}
export default NotificationInfos;
