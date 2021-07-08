/**
 * l'interface send : 
 * envoyer les notifications
 */


 import axios from 'axios';
 import React, { useState } from 'react';
 import MobileShape from './MobileShape';
 import NotificationDupForm from './subComponent/NotificationDupForm';
 import ProgressIndicator from './ProgressIndicator';
 import { useLocation } from "react-router-dom";


 const NotificationDuplication = props => {
   const [notificationState, setNotificationState] = useState({
     title: '',
     subtitle: '',
    
     url:"",
     imageUrl:"",
     tag:"",
     additionnalData : [],
     
   });
   
 const loc = useLocation();
 
   const notifiction = React.useRef(notificationState)
   const [ios, setIos] = useState(true);
   const [notif, setNotifData] = useState({});
   const [emails, setEmails] = useState([]);
   const [android, setAndroid] = useState(true);
   const [country, setCountry] = useState({});
     const [location, setLocation] = useState({});
     const [langage, setLanguage] = useState({});
     const [F_session, set_F_Session] = useState({});
     const [L_session, set_L_Session] = useState({});
     const [amountTime, setAmountTime] = useState({});
     const [sessionCount, setSessionCount] = useState({});
     const [time, setTime] = useState(undefined);
   const path = "https://onesignal.com/api/v1/notifications";
   React.useEffect(() => {
       
     //notifiction.current = result
     //test
     axios.get(`https://onesignal.com/api/v1/notifications/${loc.state.notifId}?app_id=e88e0d46-c05a-45d7-a0fe-9e82eb884f88`,  { headers: {
  
        'Content-Type': 'application/json',
        /* /ZDI0ZTYyOGMtZmU5Mi00ZDM5LWJmZjEtZDhhMjdhN2NhMzIx/ REST API KEY de OneSignal   */
        Authorization: 'Basic ZDI0ZTYyOGMtZmU5Mi00ZDM5LWJmZjEtZDhhMjdhN2NhMzIx'
    
      }}).then(data=>{
      
        setNotifData(data.data);
        console.log(notif.filters)
        setNotificationState({
            title:data.data.headings.en,
            subtitle: data.data.contents.en,     
            url:data.data.url,
            imageUrl:data.data.big_picture,
            tag:data.data.data.value,
            additionnalData : data.data.data.additionnalData
          });
        
      });

   }, [])
   const [loadingState, setLoadingState] = useState({
     isLoading: false
   });
 
   const _resetFields = () => {
     setNotificationState({
       title: '',
       subtitle: '',
       url:'',
       imageUrl:'',
       tag:'',
       additionnalData : ''
     });
   }
 
   const _handleTitleChange = (e) => {
     setNotificationState({
       title: e.target.value,
       subtitle: notificationState.subtitle,     
       url:notificationState.url,
       imageUrl:notificationState.imageUrl,
       tag:notificationState.tag,
       additionnalData : notificationState.additionnalData
     });
   }
 
   const _handleSubtitleChange = (e) => {
     setNotificationState({
       title: notificationState.title,
       subtitle:  e.target.value, 
       url:notificationState.url,
       imageUrl:notificationState.imageUrl,
       tag:notificationState.tag,
       additionnalData : notificationState.additionnalData
     });
     }
     const _handleImageUrlChange = (e) => {
       console.log(e.target.value)
       setNotificationState({
         title: notificationState.title,
         subtitle:  notificationState.subtitle, 
         url:notificationState.url,
         imageUrl:e.target.value,
         tag:notificationState.tag,
         additionnalData : notificationState.additionnalData
       });
     }
     const _handleUrlChange = (e) => {
       setNotificationState({
         title: notificationState.title,
         subtitle:  notificationState.subtitle,
        
         url:e.target.value,
         imageUrl:notificationState.imageUrl,
         tag:notificationState.tag,
         additionnalData : notificationState.additionnalData
       });
     }
     const _handleCampagne = (e) => {
       
       setNotificationState({
         title: notificationState.title,
         subtitle:   notificationState.subtitle,
       
         url:notificationState.url,
         imageUrl:notificationState.imageUrl,
         tag:e.target.value,
         additionnalData : notificationState.additionnalData
       });
     }
     const _handledata = (additionnaldata) => {
         // fonction d'ajout des metadata
         console.log("data",additionnaldata)
         setNotificationState(notificationState => 
           setNotificationState({
           title: notificationState.title,
           subtitle:   notificationState.subtitle,
        
           url:notificationState.url,
           imageUrl:notificationState.imageUrl,
           tag:notificationState.tag,
           additionnalData : additionnaldata
         }));
       
       console.log("new data /*additional data*/", notificationState)
     }
     
 const  _handleEmails = (mails) =>{
 
   let filters  =[]
   console.log("filters",mails)
   mails.map(e=>{
     filters.push({ "key": "value",
       "field": "email",
       "value": e,
       "relation": "="
    })
    
    filters.push({"operator": "OR"})
        
   })
   // éliminer le dérnier OR 
   filters.pop();
 
     //filtrer par emails
  
   console.log("emails",filters)
   setEmails(filters)
   /*setNotificationState(notificationState =>  setNotificationState({
     title: notificationState.title,
     subtitle:   notificationState.subtitle,
     filter: filters,
     url:notificationState.url,
     imageUrl:notificationState.imageUrl,
     tag:notificationState.tag,
     additionnalData : notificationState.additionnalData
   }));*/
 
 }
 const _handleTime=(time)=>{
     setTime(time)
 }
 const  _handleLocation = (long,lat,r) =>{
     //filtrer par localisation
   if(lat !== 0 && lat !== 0 && r !== 0){
   let filters={ "radius" : r,
       "lat":lat,
       "long" : long
    };
    setLocation(filters)
     
   }
 }
   const  _handleLanguage = (lang) =>{
     let filters={ 
         "field": "language",
         "value": lang.target.value,
         "relation": "="
      };
     setLanguage(filters)
          
   
 
 }
 const  _handleCountry = (country) =>{
   let filters={ 
       "field": "country",
       "value": country.target.value,
       "relation": "="
    }
    setCountry(filters)
        
 
 }
 const  _handleAmountSpent = (time) =>{
     //filtrer par combien de minute l'utilisateur à passer dans l'application
   let filters={ 
       "field": "amount_spent",
       "value": time,
       "relation": ">"
    }
        
 
    setAmountTime(filters)
 }
 const  _handlePlatfrom = (p) =>{
   //filtre d'OS (IOS, Android ou les deux ) il y a la possibilité d'ajouté d'autres platformes ...
   switch (p.target.value) {
     case "ios":
       setAndroid(false)
       break;
     case "android" : 
       setIos(false)
       break;
     case "all" : 
      
       break;
   }
   }
 const  _handleSessionCount = (nb) =>{
   
     //filtre des nombres des sessions l'utilisateur
     let filters={ 
       "field": "session_count",
       "value": nb,
       "relation": "="
    };
    setSessionCount(filters)
        
 
 
 }
 
 const  _handle_Last_Session = (time,rel) =>{
   //filtre de la dernier session
   if(rel.target !== undefined){
   let filters={ 
       "field": "last_session",
       "value": time,
       "relation": rel.target.value
    }
    set_L_Session(filters)
        
 }
 }
 const  _handle_First_Session = (time,rel) =>{
   if(rel.target !== undefined){
     //filtre de la premiere session
   let filters={ 
       "field": "first_session",
       "value": time,
       "relation": rel.target.value
    }
    set_F_Session(filters)
        
 
 }
 }
   const _handleSend = () => {
     let filters  = [];
    emails.forEach(e=>filters.push(e))
    filters.push(location);
    filters.push(country);
    filters.push(langage);
    filters.push(sessionCount);
    filters.push(amountTime);
    filters.push(F_session);
    filters.push(L_session);
    //annuler les objets vides
    filters =  filters.filter(value => JSON.stringify(value) !== '{}');
    console.log("filters", filters)
     setNotificationState(notificationState =>  setNotificationState({
       title: notificationState.title,
       subtitle:   notificationState.subtitle,
       url:notificationState.url,
       imageUrl:notificationState.imageUrl,
       tag:notificationState.tag,
       additionnalData : notificationState.additionnalData
     }));
     setLoadingState({
       isLoading: true
     });
     //paramétres de la requetes http
     var params = {
 
       method: 'post',
 
       url: path,
 
       headers: {
 
         'Content-Type': 'application/json',
           // clé secret de l'api rest 
         Authorization: 'Basic ZDI0ZTYyOGMtZmU5Mi00ZDM5LWJmZjEtZDhhMjdhN2NhMzIx'
 
       },
      
 
       data: {
           // id de l'application
         app_id: 'e88e0d46-c05a-45d7-a0fe-9e82eb884f88',
 
         headings: {
           en: notificationState.title, 
         },
         contents: {
           en: notificationState.subtitle,
         },
         url: notificationState.url,
         //URL de l'image qui s'affiche sur la notif (big picture c'est un parametre des appareil Android )
         big_picture : notificationState.imageUrl,
         send_after: time === undefined ? new Date() : time,
         //l'alternative de big_picture sur ios 
         /**https://documentation.onesignal.com/docs/rich-media#media-attachments
          * https://documentation.onesignal.com/reference/create-notification#attachments (goto ios_attachement)
          */
         ios_attachments : {id :notificationState.imageUrl, },
         //si aucun filtre n'est choisie on doit spécifier le segment par defaut pour envoyer la notification à tout les users (dans onesignal on doit configurer le segment par defaut à all subscribed users)
         included_segments: notif.filters.length > 0 ? [] : ["Default Segment"] ,
         filters :notif.filters,
         isIos : ios,
         isAndroid : android,
         data:{"key":"campagne",value:notificationState.tag,additionnalData : notificationState.additionnalData}
       }
 
     }
     console.log(params)
     //appeler l'api par axios
     axios(params).then((e)=>
    { setLoadingState({
       isLoading: false
     })
     console.log("resp",e);
      _resetFields();
     }
     )
   }
 
   return loadingState.isLoading
     ?<div > <ProgressIndicator left={props.left}/></div>
     : <div >
       <div style={{marginBottom:200,backgroundColor:"#FDFDFD",float:"left"}}><NotificationDupForm left={props.left}
     titleChange={_handleTitleChange}
     subtitleChange={_handleSubtitleChange}
     emails={_handleEmails}
     urlChange={_handleUrlChange}
     imageUrl={_handleImageUrlChange}
     click={_handleSend}
     campagne={_handleCampagne}
     data={_handledata}
     language = {_handleLanguage}
     session_count={_handleSessionCount}
     amountSpent={_handleAmountSpent}
     country={_handleCountry}
     platform={_handlePlatfrom}
     location={_handleLocation}
     first_session={_handle_First_Session}
     last_session={_handle_Last_Session}
     titleDup={notificationState.title}
     messageDup={notificationState.subtitle}
     imageDup={notificationState.imageUrl}
     urlDup={notificationState.url}
     campagneDup={notificationState.tag}
     time={_handleTime}
   /></div><MobileShape image={notificationState.imageUrl} 
                         title={notificationState.title}
                         text={notificationState.subtitle}
   /></div>
 }
 
 export default NotificationDuplication;