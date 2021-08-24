import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit 
{
  constructor(private toastr: ToastrService,private service:AuthService,private router:Router) { }
  form=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email])
  });

  get f()
  {
    return this.form.controls;
  }
  submit()
  {
    if(this.form.valid)
    {
      console.log(this.form.valid);
      console.log(this.form.value)
      this.service.forgot(this.form.value).subscribe((data)=>{
      console.log("response is ===============>>",data);
      this.toastr.success("Email has been send successfully");
      },
      (err) => {
       if(err.error.message==undefined)
       {
         console.log("undefined===========>>");
         this.toastr.error("API is not working");
         //this.router.navigate(['/main']);
         //this.spinner.hide();
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
      this.toastr.error("Please enter the email to receive the mail");
    }
  }
  signin()
  {
    this.router.navigate(['login2'])
  }
  

  ngOnInit(): void {
  }

}
