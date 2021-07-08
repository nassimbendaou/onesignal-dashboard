import firebase from "firebase"; 
class Ref {
    constructor() {
       
    }
    // ref de la BD RealTime de Firebase l'objet est générer depuis Firebase
    Connect = () =>
    firebase.initializeApp({
        apiKey: "**********************",
        authDomain: "**********************",
        databaseURL: "************************",
        projectId: "*******************",
        storageBucket: "*******************",
        messagingSenderId: "***************",
        appId: "************************",
        measurementId: "********************"
    });
}
// initialiser l'objet statique pour ne pas refaore la connexion + qu'une fois
Ref.shared = new Ref();
export default Ref;