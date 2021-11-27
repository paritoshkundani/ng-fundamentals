import { EventService } from './event.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventsListResolver implements Resolve<any> {

  constructor(private eventService: EventService) { }

  resolve() {
    // typically we would call subscribe on getEvents() as that is an Observable, but because this is a Resolver we need to return the observable, it will call subscribe automatically in Resolvers
    return this.eventService.getEvents();
  }
}
