

/***
 * cet classe définit le graphique qui affiche les les données de notification 
 */




import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';


export default class Chart extends Component {



  /**supprimer une valeur d'un tableau */
   arrayRemove=(arr, value)=> { 
    
    return arr.filter(function(ele){ 
        return ele !== value; 
    });
    }

/*filterer et structurer l'objet json à un objet avec deux valeur time et success 
(time pour la date de la notif et success c'est pour le nombre des notifs qui ont été envoyées avec succées)*/
  sortingarray=(arr)=>{
    //getDaysArray retoutn tout les jour entre la premier notification envoyées et la dernière 
    var getDaysArray = function(s,e) {for(var a=[],d=new Date(s);d<=e;d.setDate(d.getDate()+1)){ a.push(new Date(d).toLocaleDateString("fr-FR"));}return a;};
    var daylist = getDaysArray(new Date(arr[0].queued_at*1000),new Date());
  
    let res = [] 
    //enregistrer les dates de chaque notification dans le nouveau tableau et supprimer les memes dates du tableau générer par getDaysArray
    arr.forEach(element => {
      
     
        res.push({time : new Date(element.queued_at*1000).toLocaleDateString("fr-Fr"),success : element.successful});
        if(this.props.Global){
        this.arrayRemove(daylist,new Date(element.queued_at*1000).toLocaleDateString("fr-FR"))
        }
     
    });
    //ajouter ce qui reste du daylist dans le tableau res 
    if(this.props.Global){
    daylist.forEach(e=>{
      res.push({time : e,success : 0});
    })
  }
    return res;

  }
   toTimestamp=(strDate)=>{
    var datum = Date.parse(strDate);
    return datum/1000;
 }
//filtrer les dates du tableau par variable time
compare=( a, b )=> {
  if ( this.toTimestamp(a.time) < this.toTimestamp(b.time) ){
    return -1;
  }
  if ( this.toTimestamp(a.time).times > this.toTimestamp(b.time) ){
    return 1;
  }
  return 0;
}
//supprimer les redoublon du tableau 
  sorting=(array)=> {
    var arr=this.sortingarray(array)
    
    var a = [],
      b = [],
      prev={};
  
      arr.sort( this.compare );
      arr.reverse()
      //ajouter les résultat des dates qui sont égaux ex : {13/06/2021,6} et {13/06/2021,3} ===> {13/06/2021,9}
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].time !== prev.time) {
        a.push(arr[i].time);
        b.push(arr[i].success);
      } else {
        b[b.length - 1] += arr[i].success;
      }
      prev = arr[i];
    }
    // retourner les dates et les données séparement

    return [a, b];
   
  }
  
  
  

  constructor(){
    super();
    this.state={
      labels:[],
      dataLabels:[],

    }
  }
  UNSAFE_componentWillMount(){
    let initLabels =[]
    
    if(this.props.data.length!==0){
      
        this.props.data.map(e => {
          let date = new Date(e.queued_at*1000).toLocaleDateString("fr-FR")
          
          initLabels.push(date)
        });
    
        //si le graphique et globale alors global (afficher toutes les notification succefull ou pas) sera TRUE
        if(this.props.Global){
         
          initLabels =this.sorting(this.props.data);
          this.setState({labels:initLabels[0]});
          this.setState({dataLabels:initLabels[1]})

        }else{
          
          initLabels = this.sorting(this.props.data)
          this.setState({labels:initLabels[0]});
          this.setState({dataLabels:initLabels[1]})
        }
       
       

   
     
    }
  }
  
  render() 
  {

    
    const data = {
  labels: this.state.labels, //X-axis data
  datasets: [
    {
      label:   this.props.Name, 
      fill: false,
      lineTension: 0.1,
      backgroundColor: this.props.color,//couleur de chaque graph 
      borderColor: this.props.color,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.1,
      borderJoinStyle: 'miter',
      pointBorderColor: this.props.color,
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: this.props.color,
      pointHoverBorderColor: this.props.color,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: this.state.dataLabels,  //Y-axis data
      
    
    },
  ],
};

const options = {
  scales: {
    
    yAxes: [
      {
        ticks: {
          min: 0,
          max : 30
        }
      }
    ]
  }
,
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
};




    return (
      <>
           <Line data={data} options={options} style={{backgroundColor:"#fff"}} />   
            
         
      </>
    )
  }
}

 /*<Line data={data} options={options} style={{backgroundColor:"#fff"}} /><ChartCard
              chart={
                <ChartistGraph
                  className="ct-chart"
                  data={dailySalesChart.data}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              }
              chartColor="green"
              title="Daily Sales"
              text={
                <strong>Last 50 Notifications </strong>
              }
              statIcon={AccessTime}
              
            />*/