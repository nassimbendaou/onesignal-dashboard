import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import grey from '../assets/grey.svg';

export default function DropDownText(props) {
    const [left, setLeft] = useState(props.left)
    const [right, setRight] = useState(props.right)
    const [show, setShow] = useState(true)
    const Arrow = styled.img`
    width: 24px;
    height: 24px;
    margin: 6px 0 6px 15px;
   }
    `;
    const MyText= styled.p`
    width: 599px;
    height: 110px;
    margin: 20px 71px 80px 156px;
    font-family: InterUI;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.63;
    letter-spacing: normal;
    color: #717c87;
    transition: 0.3s;
    text-align: left;
    margin-left:${left}px;
    margin-right:${right}px;

  
  `;
  

  useEffect(() => { setLeft(props.left); setRight(props.right)}, [props.left,props.right]);
  return (
    <div  onClick={()=>{setShow(!show)}}>
         <div  style={{marginLeft:left,display:"flex",flexDirection:"row"}}><div className="M-Rectangle"><p className="rec-id">{props.id}</p></div> 
         
         <h2 className="h2-titre">{props.title}</h2> <Arrow src={grey}    /></div>
         <div style={{borderBottomColor:"#e0e5e9",borderBottomWidth:1,borderBottomStyle:"solid",width:"100%",marginBottom:20}}></div>
        {show && (<MyText >{props.text}</MyText>) }
        
    </div>
  );
}
