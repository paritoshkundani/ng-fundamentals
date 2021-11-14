import { IEvent } from './../shared/index';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styleUrls: ['./event-thumbnail.component.css']
})
export class EventThumbnailComponent implements OnInit {

  @Input() event: IEvent;

  constructor() { }

  ngOnInit(): void {
  }

  getStartTimeClass(){
    // return an object approach, either is ok
    //const isEarlyStart = this.event && this.event.time === '8:00 am';
    //return {green: isEarlyStart, bold: isEarlyStart};

    // return a string approach
    if (this.event && this.event.time === '8:00 am')
      return 'green bold';  // can also return an array ['green bold';]
    return ''; // if array then []
  }

  // had to use any for typescript, as one property (color) is not a string (in quotes) but the other one font-weight is in quotes since it as a - in it
  getStartTimeStyle(): any {
    if (this.event && this.event.time === '8:00 am')
      return {color: '#003300', 'font-weight': 'bold'};
    return {};
  }

}
