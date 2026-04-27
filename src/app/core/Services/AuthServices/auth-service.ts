import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../Model/iuser';
import { environment } from '../../../environment/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // Method for login
  login(user:IUser):Observable<any> {
    return this.http.post(`${environment.api}/api/Auth/Login`, user);
  }

  // Method for registration
  register(user:IUser): Observable<any> {
    return this.http.post(`${environment.api}/api/Auth/Register`, user,
      { responseType: 'text' }
    );
  }
}
