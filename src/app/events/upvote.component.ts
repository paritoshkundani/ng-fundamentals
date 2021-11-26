import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'upvote',
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.css']
})
export class UpvoteComponent implements OnInit {

  @Input() count: number;

  // we want iconColor to change when voted is changed, we could have done that
  // with ngOnChanges event (like in session-list.component.ts)
  // but here was showing can do that with setter as well
  @Input() set voted(val) {
    this.iconColor = val ? 'red' : 'white';
  }
  @Output() vote = new EventEmitter();
  iconColor: string;

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.vote.emit({});
  }

}
