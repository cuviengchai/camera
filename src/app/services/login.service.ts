import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  getLogin() {
    this.http.get('https://api.github.com/users/seeschweiler').subscribe(data => {
      console.log(data);
    },
      error => {

      });
  }

  myPrint() {
    console.log('Hello');
  }
}
