import React,{useState,useEffect} from 'react';
import DropDown from "./DropDown"
import user from '../assets/gamer.svg'
import send from '../assets/paper-plane-1.svg'
import dashboard from '../assets/business-report.svg'
import { useHistory } from 'react-router-dom';
export default function SideBar(props) {
  
  // le tableau qui définit les button ou les dropdown de la sidebar 
    const data=[

      {
        key:1,
         img:dashboard,
        border:true,
        backgroungc:"#fff",
        text:"Dashboard",
        path:"Dashboard",
        elements:[]
      },
    
      
        {
        key:2,
        img:send,
        border:true,
        backgroungc:"#ff",
        text:"Send a notification",
        path:"Send",

        elements:[]
      },
      {
        key:3,
        img:user,
        border:true,
        backgroungc:"#ff",
        text:"Users",
        path:"Players",

        elements:[]
      }
    ];
    const history = useHistory();
    const [clicked, setClicked] = useState(props.show);
    useEffect(() => { setClicked(props.show); }, [props.show]);
  return (
  
    <div  className="sidenav" style={{display:clicked?"block":"none",height:window.innerHeight,width:window.innerWidth*0.23}}>
        
         { data.map((element) =>(   <DropDown  img={element.img} backgroundColor={element.backgroungc}
          border={element.border} text={element.text} onClick={()=>{history.push('/'+element.path)}} data={element.elements}/>
    ) )}
        
        
        
    </div>
  );
}
