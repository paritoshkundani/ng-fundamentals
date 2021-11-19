import { ISession } from './../shared/index';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html',
  styleUrls: ['./session-list.component.css']
})
export class SessionListComponent implements OnInit {

  @Input() sessions: ISession[];

  constructor() { }

  ngOnInit(): void {
  }

}
