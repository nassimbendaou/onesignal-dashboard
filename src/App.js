
import './App.css';
import Sidebar from './Components/Sidebar'
import React,{useState} from 'react';
import menu from './assets/menu.svg';
import NotificationSender from "./Components/NotificationSender"
import NotificationInfos from "./Components/NotificationInfos"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";

import DashBoord from './Components/DashBoard';
import PlayerTab from './Components/PlayerTab';
import NotificationDuplication from './Components/NotificationDuplication';
import UserDataView from './Components/UserDataView';
function App() {

 
  
  const [left, setLeft] = useState(window.innerWidth*0.25);
  const [clicked, setClicked] = useState(true);
  const [blurdiv, setBlur] = useState(false);
  const [right, setRight] = useState(window.innerWidth*0.37);
  //gestion de la vue responsive
  function handleLeft(){
    if(window.innerWidth<1100){
      setLeft(window.innerWidth*0.10);
    }else{
      setLeft(window.innerWidth*0.37);
    }
  }
  function handleWidth(){
    if(window.innerWidth>1100){
      setBlur(false);
      setClicked(false);
      
    }
     if(window.innerWidth<1100){
      setBlur(true);
      
    }
  }

  function handleRight(){
    if(window.innerWidth<1100){
      setRight(window.innerWidthidth*0.37);
    }else{
      setRight(window.innerWidth*0.20);
    }
  }
  window.addEventListener('resize', ()=>{ handleWidth(); handleLeft(); handleRight();});
  


  return (
    <Router>
       
    <div className="app"  style={{backgroundColor:"#f8f9fa"}}>
    <Sidebar show={clicked}/>
    {window.innerWidth< 1100 &&  (<div className="topnav" onClick={()=>setClicked(!clicked)} >
      <img src={menu} className="topnav-menu" alt="icon"/>
    </div> )} 
    
    <div style={{filter:(blurdiv&&clicked)?"blur(4px)":"blur(0px)",height:window.innerHeight}} >
   
    <Switch >
          
          <Route  path="/Send" >
            <NotificationSender left={left} right={right}/>
          </Route>
          <Route  path="/DashBoard">
            <DashBoord left={left} right={right} />
          </Route>
          <Route  path="/NotifInfo">
            <NotificationInfos left={left} right={right} />
          </Route>
          <Route  path="/NotifDuplicate">
            <NotificationDuplication left={left} right={right} />
          </Route>
          <Route  path="/Players">
            <PlayerTab left={left} right={right} />
          </Route>
          <Route  path="/PlayerInfo">
            <UserDataView left={left} right={right} />
          </Route>
        </Switch>
        
     </div>
     
    </div>
    </Router>
  );
}

export default App;
