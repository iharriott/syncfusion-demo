import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr";
import { ScheduleComponent } from '@syncfusion/ej2-angular-schedule';
//import { ChartModel } from '../_interfaces/chartmodel.model';
import { EventModel } from '../interfaces/event.model';
import { Event } from '../interfaces/event.model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  public data: Record<string, any>[] =[];
  public broadcastedEventData!:Record<string, any>[];
  public event: {[key: string]: Object} ={};
  public broadcastedEvent: {[key: string]: Object} ={};
  public hubConnection!: signalR.HubConnection;
  public scheduleComponent!: ScheduleComponent;
  public group!: string;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Trace)
    .withUrl('http://localhost:5000/chart')
    .build();

    this.hubConnection
    .start()
    .then(() => console.log('connection started'))
    .catch(err => console.log("Error while starting connectin: " + err));
  }

  // public addTransferChartDataListener = () =>{
  //   this.hubConnection.on('transferchartdata', (data) =>{
  //     this.data = data;
  //     console.log(data);
  //   });
  // }

  public broadcastEvent = () =>{
    console.log('data to be broadcasted ' + JSON.stringify(this.event) )
    this.hubConnection.invoke('broadcastevent', this.event)
    .then((data) => console.log('event broadcasted ' + data))
     .catch(err => console.log(err));
  }

  public broadcastEventData = () =>{
    // debugger;
    // console.log('In broadcastEventData ' + JSON.stringify( this.data));
    this.hubConnection.invoke('broadcasteventdata', this.data)
     .catch(err => console.log(err));
  }

  public broadcastJoinGroupData = () =>{
     debugger;
    // console.log('In broadcastEventData ' + JSON.stringify( this.data));
    if (this.group !== 'undefined'){
      this.hubConnection.invoke('SendtoGroup',this.group, this.data)
      .catch(err => console.log(err));
    }
   
  }

  public broadcastJoinGroup = () =>{
    // debugger;
    console.log('Join group ' + this.group);
    this.hubConnection.invoke('JoinGroup', this.group)
     .catch(err => console.log(err));
  }

  public addBroadcastEventDataListener = () =>{
    this.hubConnection.on('broadcasteventdata', (data) =>{
      this.broadcastedEventData = data as Record<string, any>[];
    })

    console.log(this.broadcastedEventData);

  }

  public addBroadcastEventListener = () =>{
   // debugger;
    this.hubConnection.on('broadcastevent', (data) =>{
      console.log('service event ' + JSON.stringify(data) + new Date());
      this.broadcastedEvent = data as {[key: string]: Object} ;
      //this.scheduleComponent.addEvent(this.broadcastedEvent);
      console.log('service broadcasted event ' + JSON.stringify(this.broadcastedEvent));
    })

    console.log('broadcasted event outside of promise ' + JSON.stringify(this.broadcastedEvent) );

  }



  // public broadcastChartData = () =>{
  //    const data = this.data.map(m =>{
  //       const temp = {
  //         data: m.data,
  //         label: m.label
  //       }
  //     return temp;
  //    });

  //    this.hubConnection.invoke('broadcastchartdata', data)
  //    .catch(err => console.log(err));
  // }

  // public addBroadcastChartDataListener = () =>{
  //   this.hubConnection.on('broadcastchartdata', (data) =>{
  //     this.broadcastedData = data;
  //   })

  // }

  constructor() { }
}
