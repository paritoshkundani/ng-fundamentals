import { AuthService } from './../../user/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // made auth public so we can use it in html
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }

}
