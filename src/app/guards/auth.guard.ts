import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate 
{
  constructor(private router:Router,private service:AuthService){}
  
  canActivate():boolean
  {
    if(this.service.loggedin())
    {
      return false;
    }
    else
    {
      //this.router.navigate(['/login2'])
      return true;
    }
  }
}
