import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {TreeViewModule} from '@syncfusion/ej2-angular-navigations';
import {DropDownListModule} from '@syncfusion/ej2-angular-dropdowns';
import {DateTimePickerModule} from '@syncfusion/ej2-angular-calendars';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './shared/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ScheduleModule,
       RecurrenceEditorModule,
       DayService, 
       WeekService, 
       WorkWeekService, 
       MonthService, 
       AgendaService, 
       TimelineViewsService, 
       TimelineMonthService,
       DragAndDropService, 
       ResizeService} from '@syncfusion/ej2-angular-schedule';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScheduleModule,
    RecurrenceEditorModule,
    TreeViewModule,
    DropDownListModule,
    DateTimePickerModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [DayService, 
             WeekService, 
             WorkWeekService, 
             MonthService, 
             TimelineMonthService, 
             TimelineViewsService, 
             AgendaService,
             DragAndDropService,
             ResizeService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
