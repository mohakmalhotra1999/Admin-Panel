import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainService 
{

  constructor(private http:HttpClient,private router:Router) { }

  private getHeader() {
    let httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.gettoken()}`
      }),
    };
    return httpOptions;
  }

  updateuser(obj,id)
  {
    let httpOptions = this.getHeader();
    let url=`https://coinapi.seekware.in/v1/users/${id}`;
    return this.http.patch<any>(url,obj,httpOptions);
  }
  getnft()
  {
    let httpOptions = this.getHeader();
    let url='https://coinapi.seekware.in/v1/nfts';
    return this.http.get(url,httpOptions);
  }
  sendnft(obj)
  {
    let httpOptions = this.getHeader();
    let url='https://coinapi.seekware.in/v1/nfts';
    return this.http.post<any>(url,obj,httpOptions);
  }
  updatenft(obj,id)
  {
    let httpOptions = this.getHeader();
    let url=`https://coinapi.seekware.in/v1/nfts/${id}`;
    return this.http.patch<any>(url,obj,httpOptions)
  }
  // rerender()
  // {
  //   this.getnft();
  // }
  gettoken()
  {
    var x=localStorage.getItem('token');
    console.log("inside get token-====================---->>",JSON.parse(x).access.token)
    return JSON.parse(x).access.token;
    
  }
}
