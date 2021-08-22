import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  constructor(private http:HttpClient,private router:Router) { }
  
  login(user)
  {
    let url="https://coinapi.seekware.in/v1/auth/login";
    return this.http.post<any>(url,user);
  }

  signup(user)
  {
    let url="https://coinapi.seekware.in/v1/auth/register";
    return this.http.post<any>(url,user);
  }

  forgot(email)
  {
    let url="https://coinapi.seekware.in/v1/auth/forgot-password";
    return this.http.post<any>(url,email);
  }

  reset(newpassword,token)
  {
    let url=`https://coinapi.seekware.in/v1/auth/reset-password?token=${token}`;
    return this.http.post<any>(url,newpassword);
  }
  autologin()
  {
    if(localStorage.getItem('token'))
    {
      this.router.navigate(['/main']);
    }
    else
    {
      this.router.navigate(['/login2']);
    }
  }
  logout()
  {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['/login2'])
  }
  loggedin()
  {
    return !!localStorage.getItem('token')
  }

}
