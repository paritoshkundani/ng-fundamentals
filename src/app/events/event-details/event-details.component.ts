import { EventService } from './../shared/event.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IEvent, ISession } from '../shared/index';

@Component({
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  addMode: boolean;
  event: IEvent;
  filterBy: string = 'all';
  sortBy: string = 'name';

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // original way was using snapshot, but that does not update the content when route changes, we need to use observable way
    // this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);
    this.route.data.forEach((data) => {
      this.event = data['event']; // getting from EventResolver
      this.addMode = false; // reset this as well, otherwise if addMode is true and you search and navigate to another event they will remain in previous state
      this.filterBy = 'all';
      this.sortBy = 'name';
    });
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));

    session.id = nextId + 1;
    this.event.sessions.push(session);
    this.eventService.saveEvent(this.event).subscribe();
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }

}
