import { Error404Component } from './errors/not-found404/not-found404.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { ToastrService } from './common/toastr.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  CreateEventComponent,
  EventDetailsComponent,
  EventRouteActivator,
  EventService,
  EventThumbnailComponent,
  EventsListComponent,
  EventsListResolver
} from './events/index' // getting from a barrel

import { EventsAppComponent } from './events-app.component';
import { NavbarComponent } from './nav/navbar/navbar.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    NavbarComponent,
    EventDetailsComponent,
    CreateEventComponent,
    Error404Component
  ],
  providers: [
    EventService, // same as writing {provide: EventService, useValue: EventService}
    ToastrService,
    EventRouteActivator,
    EventsListResolver,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }
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
