import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit
{
  userName;
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private service:AuthService,private router:Router) { }

  ngOnInit(): void 
  {
    //getting the user data from local storage-------
    var x = localStorage.getItem("user");
    console.log("x-------------->>",JSON.parse(x));
    //parsing the local storage data-------------
    let obj=JSON.parse(x);
    console.log("obj------>>",obj)
    //equating the name------------
    this.userName=obj.name
    console.log("username--->>",this.userName)
  }
  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

  logout()
  {
    console.log("logout------>>");
    this.service.logout();
  }
}
