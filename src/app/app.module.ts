import { AuthService } from './user/auth.service';
import { Error404Component } from './errors/not-found404/not-found404.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  CreateEventComponent,
  EventDetailsComponent,
  EventRouteActivator,
  EventService,
  EventThumbnailComponent,
  EventsListComponent,
  EventsListResolver,
  CreateSessionComponent,
  SessionListComponent,
  DurationPipe,
  UpvoteComponent,
  VoterService,
  LocationValidator
} from './events/index' // getting from a barrel

import {
  Toastr,
  TOASTR_TOKEN,
  CollapsibleWellComponent,
  JQ_TOKEN,
  SimpleModalComponent,
  ModalTriggerDirective
} from './common/index'

import { EventsAppComponent } from './events-app.component';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

let toastr : Toastr = window['toastr'];
let jQuery = window['$'];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavbarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    DurationPipe,
    SimpleModalComponent,
    ModalTriggerDirective,
    UpvoteComponent,
    LocationValidator
  ],
  providers: [
    EventService, // same as writing {provide: EventService, useValue: EventService}
    {
      provide: TOASTR_TOKEN,
      useValue: toastr
    },,
    {
      provide: JQ_TOKEN,
      useValue: jQuery
    },
    EventRouteActivator,
    EventsListResolver,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    },
    AuthService,
    VoterService
  ],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

// canDeactivate first param is the component that it is setup with, we connected canDeactivateCreateEvent with canDeactivate in routes.ts { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']}
export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you want really want to cancel?');
  }
  return true;
}
