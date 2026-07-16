import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpServices {

  api = "http://localhost:3000/api";

  constructor(private http:HttpClient){}

  get(url:string){
    return this.http.get(`${this.api}/${url}`);
  }

  post(url:string, data:any){
    return this.http.post(`${this.api}/${url}`, data);
  }

  put(url:string, data:any){
    return this.http.put(`${this.api}/${url}`, data);
  }

  patch(url:string, data:any){
    return this.http.patch(`${this.api}/${url}`, data)
  }

  delete(url:string, data:any){
    return this.http.delete(`${this.api}/${url}`)
  }
}
