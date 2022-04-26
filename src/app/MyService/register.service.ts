import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url: string = '';
  constructor(private http: HttpClient) { }

  Register(userData: any){
    return this.http.post(this.url, userData);
  }
}
