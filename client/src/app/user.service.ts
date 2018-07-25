import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { IUser } from './IUser';
import { throwError as ObservableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  errorHandler(error: HttpErrorResponse){
    return ObservableThrowError(error.message || 'server error');
  }

  constructor(private http: HttpClient) { }
  
  public registerUser(info: IUser): Observable<IUser>{
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    }
    // http post request
    return this.http.post<IUser>('https://reqres.in/api/users', info, options)
      .pipe(catchError(this.errorHandler));
  }
}
