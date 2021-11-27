import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IUser } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: IUser;

  constructor(private http: HttpClient) { }

  loginUser(userName: string, pasword: string) {

    let loginInfo = {
      username: userName,
      password: pasword
    };
    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    // we don't want to subscribe here, so use tap that will run once data returns from the call (subscribe is called in login.component.ts)
    return this.http.post('/api/login', loginInfo, options)
      .pipe(tap(data => {
        this.currentUser = <IUser>data['user'];
      }))
      .pipe(catchError(err => {
        return of(false);
      }));

    // this.currentUser = {
    //   id: 1,
    //   userName: userName,
    //   firstName: 'John',
    //   lastName: 'Papa'
    // };
  }

  isAuthenticated() {
    return !!this.currentUser;
  }

  updateCurrentUser(firstName: string, lastName: string) {
    this.currentUser.firstName = firstName;
    this.currentUser.lastName = lastName;

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put(`/api/users/${this.currentUser.id}`, this.currentUser, options);
  }

  checkAuthenticationStatus() {
    // this call will return the current logged in user
    return this.http.get('/api/currentIdentity')
      .pipe(tap(data => {
        if (data instanceof Object) {
          this.currentUser = <IUser>data;
        }
      }));
       // we could have done without pipe(tap) and just used subscribe direclty with the same inside code
      // but the above approach allows us to let the caller also subscribe and trigger this, here we just subscribed but that can
      // happen in the caller and let the caller handle the response
  }

  logout() {
    this.currentUser = undefined;

    let options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post('/api/logout', {}, options);
  }
}
