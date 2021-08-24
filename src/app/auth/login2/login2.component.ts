import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrls: ['./login2.component.css']
})
export class Login2Component implements OnInit 
{
  constructor(private router:Router,private toastr: ToastrService,private service:AuthService) { }
  signup()
  {
    this.router.navigate(['./signup2']);
  }
  forgot()
  {
    this.router.navigate(['/forgot']);
  }
  reset()
  {
    this.router.navigate(['/reset']);
  }

  form=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
  });

  get f()
  {
    return this.form.controls;
  }
  submit()
  {
    if(this.form.valid==true)
    { 
     console.log(this.form.valid);
     console.log(this.form.value);
     this.service.login(this.form.value).subscribe((data)=>{
       console.log("data is ===================>>",data)
       this.router.navigate(['/main/dashboard'])
       //making the object to store the data of the user------
       let user={
         name:data.user.name,
         createdAt:data.user.createdAt,
         role:data.user.role,
         status:data.user.status,
         is_email_verified:data.user.is_email_verified,
         email:data.user.email,
         id:data.user.id,
         updatedAt:data.user.updatedAt,
         wallet_address:data.user.wallet_address
       }
       //making the object to store the tokens of the user-------
       let tokens={
         access:{
           token:data.tokens.access.token,
           expires:data.tokens.access.expires
         },
         refresh:{
           token:data.tokens.refresh.token,
           expires:data.tokens.refresh.expires
         }
       }

       console.log("user------------->>>",user)
       const userData = JSON.stringify(user)
       console.log("userdata----------->>",userData)
       localStorage.setItem('user',userData);
       console.log("tokens-------->>",tokens)
       const tokenData=JSON.stringify(tokens)
       console.log("tokendata------>>",tokenData)
       localStorage.setItem('token',tokenData);

     },
     (err) => {
      if(err.error.message==undefined)
      {
        console.log("undefined===========>>");
        this.toastr.error("API is not working");
      }
      else
      {
        this.toastr.error(err.error.message);
        console.log("error we are getting=============>>",err.error.message);
        //this.spinner.hide();
      }
     })    
    }
    else
    {
      console.log("fill form correctly");
      this.toastr.error('Please fill form correctly');
    }
  }
  

  ngOnInit(): void {
  }

}
