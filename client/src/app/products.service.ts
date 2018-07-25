import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPosts } from './IPosts'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // public prods;
  constructor(private http: HttpClient) { }

  public getPosts(): Observable<IPosts[]>{
    return this.http.get<IPosts[]>('https://jsonplaceholder.typicode.com/posts');
  }

  public getPost(num): Observable<IPosts>{
    return this.http.get<IPosts>('https://jsonplaceholder.typicode.com/posts/'+num);
  }

}
