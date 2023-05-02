import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../models/auth-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrlRegister = 'http://localhost:3000/registers'; //Kayıt olma formu api'si
  apiUrlLogin = 'http://localhost:3000/users'; //Kullanıcı sayfası api'si
  constructor(private http: HttpClient) {}

  register(registerModel: AuthModel): Observable<AuthModel> {
    return this.http.post<AuthModel>(this.apiUrlRegister, registerModel); //Kayıt olma
  }
  login(userModel: AuthModel): Observable<AuthModel> {
    return this.http.post<AuthModel>(this.apiUrlLogin, userModel);
  }

  isAuthhenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
