import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {Token} from '../app/model/token'
 
@Injectable({providedIn: 'root'})
export class UserService {
  private userSubject: BehaviorSubject<Token>;
  public user: Observable<Token>;
  constructor(
    private router: Router,
    private http: HttpClient) 
    { 
      this.userSubject = new BehaviorSubject<Token>(JSON.parse(localStorage.getItem('user')));
      this.user = this.userSubject.asObservable();
    }


    public get userValue(): Token {
      return this.userSubject.value;
  }
    /**
     * 
     * @param username 
     * @param password 
     */
    login(username, password) {
      return this.http.post<Token>(`http://localhost:8080/api/authenticate`, { username, password })
          .pipe(map(user => {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('user', JSON.stringify(user));
              this.userSubject.next(user);
              return user;
          }));
  }
}
