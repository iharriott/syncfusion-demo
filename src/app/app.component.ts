import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import {DragAndDropEventArgs} from '@syncfusion/ej2-angular-navigations'
import {View, EventSettingsModel,DragEventArgs, ResizeEventArgs, ScheduleComponent, GroupModel, CellClickEventArgs, CellTemplateArgs, getWeekNumber, NavigatingEventArgs, ActionEventArgs} from '@syncfusion/ej2-angular-schedule';
import {DataManager, WebApiAdaptor} from '@syncfusion/ej2-data';
import {L10n} from '@syncfusion/ej2-base';
import {Internationalization} from '@syncfusion/ej2-base';
import { scheduleData } from './data';
import { SignalRService } from './services/signal-r.service';
import * as _ from "lodash";
import * as R from 'ramda';
import { Event } from './interfaces/event.model';


L10n.load({
  'en-US': {
    'schedule': {
     'saveButton': 'Add',
     'cancelButton': 'Close',
   'deleteButton': 'Remove',
   'newEvent': 'Add Event',
    }
 } 
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'demo-scheduler-app';
  public setView: View = 'Day';
  public setViews: View[] = ["Day", "Week", "WorkWeek", "Agenda", "TimelineMonth", "TimelineDay", "TimelineWeek"];
  public setDate: Date = new Date(2021, 10, 9); 
  public data: Record<string, any>[] = scheduleData;
  public eventSettings: EventSettingsModel = { dataSource: this.data };
  joinGroup: string = 'VCA1';

  
 constructor(public signalRService: SignalRService) {}

capitalizeObjectKeys(obj: any) {
  debugger;
   return _.transform(obj, (result: any, val, key: string) => {
     result[key[0].toUpperCase() + key.slice(1)] = val;
   });
 }

 myboject : Event = 
 {id: 1,
  subject: "Testing",  
  startTime: new Date(2021,10,9,4, 0),
  endTime: new Date(2021,10, 9, 6,0 ),
  isAllDay: true,
  categoryColor: "#ffaa00",
  location: "At Yoga Center"};

  firstCharToUpperCase(input: Event){
     return {
       Id: input.id,
       Subject: input.subject,
       StartTime: input.startTime,
       EndTime: input.endTime,
       IsAllDay: input.isAllDay,
       CategoryColor: input.categoryColor,
       Location : input.location
     }
  }

  ngOnInit(): void { 
    this.signalRService.startConnection();
    this.signalRService.hubConnection.onreconnected((connectionId: string | undefined) => {
      console.log(`connected with id ${connectionId}`);
    });

    this.signalRService.hubConnection.onreconnecting((error: any) => {
      console.log(` The following error occurred reconnecting ${error}`);
    });

    this.signalRService.hubConnection.onclose((error: any) => {
      console.log(` The following error occurred closing ${error}`);
    });

    // this.signalRService.group = this.joinGroup;
    // this.signalRService.broadcastJoinGroup();
    
    this.signalRService.hubConnection.on('Send', (data) =>{
       this.joinGroup = data;
       console.log("Send " + this.joinGroup);
    });

    this.signalRService.hubConnection.on('triggerGroup', (data) =>{
      const result = R.map((val: Event) => this.firstCharToUpperCase(val), data );
      this.scheduleInstance.eventSettings.dataSource = result as Record<string, any>[];
    });
  }

  public waitingList: {[key: string]: Object}[] = [
 {
   Id: 1,
   Name: 'Steven'
 },
 {
  Id: 2,
  Name: 'Milan'
 },
 {
  Id: 3,
  Name: 'Laura'
 }];

 public field: Object = {dataSource: this.waitingList, id: 'Id', text: 'Name'};

 public groupData: GroupModel = {
   resources: ['Resources', 'Groups'],
   allowGroupEdit: true
   //enableCompactView: true
   //byDate: true
 };

  // private eventData: DataManager = new DataManager({
  //   url: 'https://js.syncfusion.com/demos/ejservices/api/schedule/LoadData',
  //   adaptor: new WebApiAdaptor,
  //   crossDomain: true
  // });
   
  

  public eventObject: EventSettingsModel = { 
    dataSource: [{
    Id: 1,
      Subject: "Testing",  
      StartTime: new Date(2021,10,9,4, 0),
      EndTime: new Date(2021,10, 9, 6,0 ),
      Location: "At Yoga Center",
      ResourceID: 1,
      GroupID: 1
      // IsAllDay: true,
      // RecurrenceRule: "FREQ=DAILY; INTERVAL=1;COUNT=5",
      // IsReadonly: true,
      // IsBlock: true
    },
    {Id: 2,
      Subject: "Development",  
      StartTime: new Date(2021,10,9,12, 0),
      EndTime: new Date(2021,10, 9, 13,0 ),
      Location: "At Recreation Center",
      ResourceID: 2,
      GroupID: 2
      // IsAllDay: true,
      // RecurrenceRule: "FREQ=DAILY; INTERVAL=1;COUNT=2",
      // IsReadonly: true,
      // IsBlock: true
    },
    {Id: 3,
      Subject: "Tooth Extraction",  
      StartTime: new Date(2021,0,16,4, 0),
      EndTime: new Date(2021,0, 16, 6,0 ),
      Location: "At Dentist Office",
      ResourceID: 2,
      GroupID: 3
      // IsAllDay: true,
      // RecurrenceRule: "FREQ=DAILY; INTERVAL=1;COUNT=2",
      // IsReadonly: true,
      // IsBlock: true
    },
    {Id: 4,
      Subject: "Teeth Cleaning",  
      StartTime: new Date(2021,0,20,9, 0),
      EndTime: new Date(2021,0, 20, 10,0 ),
      Location: "At Dentist Office",
      ResourceID: 2
      // IsAllDay: true,
      // RecurrenceRule: "FREQ=DAILY; INTERVAL=1;COUNT=2",
      // IsReadonly: true,
      // IsBlock: true
    },
  ],
  //   // fields: {
  //   //    subject: {name: 'EventTitle'},
  //   //  startTime: {name: 'EventStart'},
  //   //  endTime: {name: 'EventEnd'}
  //   // }
   }

  @ViewChild('scheduleObj')
  public scheduleInstance!: ScheduleComponent;
  public selectedDate: Date = new Date(2021, 10, 10);
  public currentView: View = 'Week';
  eventData2: {[key: string]: Object} ={};

  groups = [
    {value: 'VCA1', viewValue: 'VCA1'},
    {value: 'VCA2', viewValue: 'VCA2'},
    {value: 'VCA3', viewValue: 'VCA3'},
  ];

  public dateParser(data: string){
    return new Date(data);
   }
   public statusFields: Object = {text: 'StatusText', value: 'StatusText'};
   public StatusData: Object[] = [
    {StatusText: 'New'},
    {StatusText: 'Requested'},
    {StatusText: 'Confirmed'},
   ]

  onDragStart(args : any): void {
    console.log(args);
    //args.scroll.enable = false;
    //args.scroll.scrollBy = 500;
    args.interval = 10;
    args.navigation.enable = true;
    args.excludeSelectors = 'e-all-day-cells, e-work-cells';
  }

  onSelectionChange(data: any){
    this.joinGroup = data.value;
    this.signalRService.group = data.value;
    this.signalRService.broadcastJoinGroup();
  }

  public onNavigating(args: NavigatingEventArgs): void {}

  public onActionComplete(args: ActionEventArgs): void {
    if ((args.requestType === 'eventCreated' || args.requestType === 'eventChanged' || args.requestType === 'eventRemoved')) {
      //this.signalRService.data = this.scheduleInstance.eventSettings.dataSource as Record<string, any>[];
      const data = this.scheduleInstance.eventSettings.dataSource as Record<string, any>[];
      console.log('Group on action complete ' + this.joinGroup);
      this.signalRService.hubConnection.invoke('SendtoGroup',this.joinGroup, data)
      .catch(err => console.log(err));
    }
  }

  onResizeStart(args: any): void {
    args.scroll.enable = true;
    args.scroll.scrollBy = 500;
    args.interval = 10;  //increment by 10 mins
    //args.interval = 1; //free flow drag and resize
  }

  onClick(args: any): void {
    let cellData = args;
    let newData: Record<string, any>[];
    let maxId = this.scheduleInstance.getEventMaxID();
    let evData: {[key: string]: Object} ={};
   
    if(cellData){
      let eventData: {[key: string]: Object} = {
        id: maxId,
        Subject: 'Reserved',
        Location: this.joinGroup,
        StartTime: cellData.startTime,
        EndTime: cellData.endTime,
        IsAllDay: cellData.isAllDay,
        CategoryColor: "#FF0000"
      };
     
      this.signalRService.event = eventData;
      this.scheduleInstance.addEvent(eventData);
      const data = this.scheduleInstance.eventSettings.dataSource as Record<string, any>[];
      console.log('Group on action complete ' + this.joinGroup);
      this.signalRService.hubConnection.invoke('SendtoGroup',this.joinGroup, data)
      .catch(err => console.log(err));

    }
  }

  onTreeDragStop(args: DragAndDropEventArgs): void {
    let cellData: CellClickEventArgs = this.scheduleInstance.getCellDetails(args.target);
    let eventData: {[key: string]: Object} = {
      Subject: args.draggedNodeData.text,
      StartTime: cellData.startTime,
      EndTime: cellData.endTime,
      IsAllDay: cellData.isAllDay
    };
    this.scheduleInstance.addEvent(cellData);
   }

   public instance: Internationalization = new Internationalization();

   getMonthDetails(value: CellTemplateArgs): string {
    return this.instance.formatDate((value as CellTemplateArgs).date, {skeleton: 'yMMM'});
   }

   getWeekDetails(value: CellTemplateArgs): string {
    return 'week ' + getWeekNumber((value as CellTemplateArgs).date);
   }

   public resourceDataSource: Object[] = [ 
    {Name: 'Nancy', Id: 1, Color: '#ffaa00'},
    {Name: 'Steven', Id: 2, Color: '#f8a398'},
    {Name: 'David', Id: 3, Color: '#7499e1'},
   ];

   public GroupDataSource: Object[] = [ 
    {Name: 'Group 1', Id: 1, Color: 'red', GroupID: 1},
    {Name: 'Group 2', Id: 2, Color: 'green', GroupID: 2},
    {Name: 'Group 3', Id: 3, Color: 'yellow', GroupID: 2},
   ];
   public allowMultipleResource = true;

   ngOnDestroy(): void {}
   
}


 
