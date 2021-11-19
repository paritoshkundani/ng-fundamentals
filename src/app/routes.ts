import { Routes } from '@angular/router';

import {
  CreateEventComponent,
  EventDetailsComponent,
  EventsListComponent,
  EventRouteActivator,
  EventsListResolver,
  CreateSessionComponent
} from './events/index' // from barrel
import { Error404Component } from './errors/not-found404/not-found404.component';

export const appRoutes: Routes = [
  { path: 'events', component: EventsListComponent, resolve: {events: EventsListResolver} },  // this will make events a property in the route
  { path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent']},  // canDeactivate first param is the component that it is setup with, here we used a method for canDeactivate so use ''
  { path: 'events/:id', component: EventDetailsComponent, canActivate: [EventRouteActivator] }, // for canActiviate and canDeactivate can use Service (like we did here) or method like above
  { path: 'events/session/new', component: CreateSessionComponent},
  { path: '404', component: Error404Component },
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule)
  }
]
