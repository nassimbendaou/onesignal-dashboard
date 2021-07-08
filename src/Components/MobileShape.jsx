/**
 * le mobile qui est affiché dans les interfaces
 * https://www.webtipstricks.com/2017/09/html-css-create-iphone-mobile-layout.html
 */




import React, { Component } from 'react'
import "../mobileShape.css"

export default class MobileShape extends Component {
    constructor()
    {
        super();
        this.state={
            title :"",
            text :'',
            image :'',
            date: new Date()
        }
    }
    componentDidMount(){
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
    }
    componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    tick() {
      this.setState({
        date: new Date()
      });
    }
    handleText(txt){
      var mytext;
      var lines = txt.split("\n");
      var numLines = lines.length;
      for(var i = 0; i<numLines;i++){
         mytext += <><p>{lines[0]}</p><br/></>
      }
    }
    handleTime(){
   return   new Date().toLocaleDateString("fr-FR")+" "+this.state.date.toLocaleTimeString()
    }
    render() {
        return (
            <div style={{display:"flow-root"}}>
                <div class="mobile" style={{marginTop:150}}> 
                <div class="dialog-box" style={{height: this.props.image? 260 : 110}}>
    <div class="background-blur" style={{height: this.props.image? 200 : 110}}></div>
    <div class="header">
      <div class="background-blur"></div>
      <div class="contents">
      <div class="left">
        <i class="far fa-comment"></i> Notification
      </div>
      <div class="right">
        {this.handleTime()}
      </div>
      </div>
    </div>
    <div class="contents main-content">
      <strong>
         {this.props.title}
      </strong>
      <br/>
      {this.props.text}
    </div>
    {this.props.image &&  (<img src={this.props.image}   style={{width:240,height:150,position:"relative" , justifyContent: 'center',
        alignItems: 'center'}} alt="Logo" />)}
  
   
  </div>
                </div>
            </div>
        )
    }
}
