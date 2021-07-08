import firebase from "firebase"; // 4.8.1
import Ref from './Ref'


class Fire {
  constructor() {
    this.init();

   
  }

  //connection avec la BD firebase
  init = () =>{
    Ref.shared.Connect();
  }
    
    //ajouter dans la bd

  push = (notification) => {
    this.ref.push(notification);
  };
  getKey=async(email)=>{
   
    let snapshot = await firebase.database().ref(`Users`).get();
    let data = snapshot.val();
    //console.log("data fire",data)
    for (var key in data) {
     // console.log(email,data[key].email,key)
     if (data[key].email === email )   {
      // console.log("key",key)
       return key;
     }
      
    }
    return undefined
  }
  /**
   * 
   * @param {user email} email 
   * 
     getKey=(email)=>{
    
    firebase.database().ref(`Users`).get().then( (snapshot) => {

      let data = snapshot.val();
      //console.log("data fire",data)
      for (var key in data) {
       // console.log(email,data[key].email,key)
       if (data[key].email === email )   {
        // console.log("key",key)
         return key;
       }
        
      }
    });
  }
   */

  TotalNotifications=(email)=>{
    this.getKey(email).then(key=>{
      firebase.database().ref(`Users/${key}/TotalNotifications`).get().then( (snapshot) => {
         
       if(snapshot.exists()){
        let num = snapshot.val()
       
        firebase.database().ref(`Users/${key}/TotalNotifications`).set(num+1);
       }else{
     //   let num = snapshot.val()
       
        firebase.database().ref(`Users/${key}/TotalNotifications`).set(1);
       }
      
        })
    })
  
   
  }

  NotificationPerDay=(email)=>{
    // je recupére l'id d'objet de l'utilisateur 
    this.getKey(email).then(key=>{
      //puis j'augmente le nombre des notification par jour 
      firebase.database().ref(`Users/${key}/Notification_${new Date(new Date().toLocaleDateString("fr-FR")).getTime()/1000}`).get().then((snapshot) => {
       
          if( snapshot.exists()){
           /** si l'objet des notificationn d'aujourd'hui exist donc en augmente ce dernier sinon en doit creer cet onjet et l'initialiser avec 1 */
         /*le nombre des notification par jour et pour spécifier chaque jour j'ai ajouté l'objet Date puis j l'ai converti en timestamp (car firebase n'accepte pas le '/' dans les path 
           donc l'écriture Notification_01/07/2021 n'est pas valide )*/
           let num = snapshot.val()
            console.log("lo",num)
            firebase.database().ref(`Users/${key}/Notification_${new Date(new Date().toLocaleDateString("fr-FR")).getTime()/1000}`).set((num+1));
          }else{
            firebase.database().ref(`Users/${key}/Notification_${new Date(new Date().toLocaleDateString("fr-FR")).getTime()/1000}`).set((1));
          }
     
         /// et après j'augmente le total
          this.TotalNotifications(email)
        
      }).catch((error) => {
        console.error(error);
      });
    })
  

    
   
  }
  updateLastNotificationRecieved=(notification,email)=>{
    
    this.getKey(email).then(key=>{
      // recuperer l'id d'objet de client s'il n'existe pas 
     // console.log("email key",key)
      if(key === undefined){
        //console.log("email undefined key",key)
        // on ajoute cet objet et on initialise ces proprietes avec les nv valeurs
        firebase.database().ref(`Users`).push({
           "email":email,
           
           "LastNotificationRecieved": notification,
           "LastNoticationOpened":null
         });
         //
         this.NotificationPerDay(email)
       }
       else {
         
        console.log("email key",key)
         firebase.database().ref(`Users/${key}/LastNotificationRecieved`).set( notification );
         this.NotificationPerDay(email)
       }
     
    })
   
  // console.log(this.getKey(email))
  }
  getUserByEmail=async(email)=>{
   console.log(email)
    let snapshot = await firebase.database().ref(`Users`).get();
    let data = snapshot.val();
    //console.log("data fire",data)
    for (var key in data) {
     // console.log(email,data[key].email,key)
     //si la propriete email de cet objet egal à l'email de l'utilisateur j'envoi l'id de l'objet 
     if (data[key].email === email )   {
      // console.log("key",key)
       return data[key];
     }
      
    }
    return undefined
  }
  

  // getter de la ref firebse
  get ref() {
    return firebase.database().ref("Notifications");
  }
 
}
//objet statiques pour utiliser qu'un seul objet de cette class
Fire.shared = new Fire();
export default Fire;