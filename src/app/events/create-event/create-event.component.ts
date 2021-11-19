import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '..';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {

  isDirty:boolean = true;
  newEvent: any;

  constructor(private router: Router, private eventService: EventService) { }

  ngOnInit(): void {
  }

  cancel() {
    this.router.navigate(['/events']);
  }

  saveEvent(formValues) {
    this.eventService.saveEvent(formValues);
    this.isDirty = false;
    this.router.navigate(['/events']);
  }

}
