import { EventService } from './../shared/event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from '../shared/index';

@Component({
  templateUrl: './events-list.component.html'
})
export class EventsListComponent implements OnInit {
  events: IEvent[];

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.eventService.getEvents().subscribe(events => {
    //   this.events = events;
    // });

    // can getting above with a resolver
    this.events = this.route.snapshot.data['events']; // 'events' comes from the route's resolve setup -> { path: 'events', component: EventsListComponent, resolve: {events: EventsListResolver} }
  }
}
