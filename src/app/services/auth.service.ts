import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class authService {
  constructor(private http: HttpClient, private router: Router) {}
  public tokenChecked = false;
  public authenticationState = new BehaviorSubject(false);
  public tokenSubject = new BehaviorSubject<string>(null!);
  // private currentUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(
  //   null!
  // );
  public currentUser: Observable<User>;

  login(form): Observable<any> {
    return this.http
      .post<any>(`${environment.api}/admin/auth/login`, form)
      .pipe(
        tap((res) => {
          if (res.success == true) {
            this.setStorage(res);
          }
        }),
        catchError((e: HttpErrorResponse) => {
          throw e;
        })
      );
  }

  register(form): Observable<any> {
    return this.http
      .post<any>(`${environment.api}/front/auth/registro`, form)
      .pipe(
        tap((res) => {
          if (res.success == true) {
            this.setStorage(res);
          }
        }),
        catchError((e: HttpErrorResponse) => {
          throw e;
        })
      );
  }

  lostPassword(form): Observable<any> {
    return this.http.post<any>(`${environment.api}/front/auth/nuevo-password`, form);
  }

  setStorage(token?: any) {
    // if (user) {
    //   var userString = JSON.stringify(user);
    //   localStorage.setItem('user', userString);
    //   this.currentUserSubject.next(user);
    // }

    if (token) {
      console.log(token);

      localStorage.setItem('auth', token.data);
      this.tokenSubject.next(token.data);
    }

    this.authenticationState.next(true);
  }

  // public get currentUserValue() {
  //   return this.currentUserSubject.value;
  // }

  public get isAuthenticated() {
    if (localStorage.getItem('auth')) {
      this.authenticationState.next(true);
      return true;
    }
    return this.authenticationState.value;
  }

  public get _token() {
    return this.tokenSubject.value;
  }

  async checkToken() {
    if (!this.tokenChecked) {
      let token: any = await localStorage.getItem('auth');
      if (token) {
        //let isExpired = this.helper.isTokenExpired(token);
        //if(!isExpired) {
        //user autenticated, get user info from storage
        // let user = await localStorage.getItem('user');
        // if (user) {
        //   let userJson = JSON.parse(user);
        //   this.currentUserSubject.next(userJson);
        // }
        this.authenticationState.next(true);
        this.tokenSubject.next(token);
        //preguntar servidor por actualizaciones
        //this.http.get(`${environment.apiUrl2}request-user-refresh`).subscribe((_t: string) => this.refreshUserJWT(_t));
        /*} else {
          this.storage.remove(TOKEN_KEY);
          this.storage.remove(USER_KEY);
        }*/
      }
    }
    this.tokenChecked = true;
  }

  async logout() {
    //remove user storage
    this.authenticationState.next(false);
    localStorage.clear();
    // this.router.navigateByUrl("/login");
    window.location.href = environment.location;
    // window.location.href = "/admin.rogerio/login";
  }
}
