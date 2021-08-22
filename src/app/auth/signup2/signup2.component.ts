import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup2',
  templateUrl: './signup2.component.html',
  styleUrls: ['./signup2.component.css'],
})
export class Signup2Component implements OnInit
{
  constructor(private toastr: ToastrService,private service:AuthService) { }
  //form validation started----------------------------------------------
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(7),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl ('', [
      Validators.required,
      Validators.minLength(7),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ]),
    confirmpassword:new FormControl ('', [
      Validators.required,
      Validators.minLength(7),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}') ])
  });
  //form validation ended-----------------------------------------------------

  get f() {
    return this.form.controls;
  }
  submit() 
  {
    //checking the validation of the form
    if (this.form.valid == true) 
    {
      //checking whether password and confirm password are same or not
      if (this.form.value.password == this.form.value.confirmpassword)
      {
        //making an object to send the value to server 
        let obj={
          email:this.form.value.email,
          password:this.form.value.password,
          name:this.form.value.name,
          role: 'user'
        }
        console.log("object =============>>",obj)
        //calling the api for signup
        this.service.signup(obj).subscribe((data)=>{
          console.log("responsed=============>>");
          this.toastr.success("Registered Successfully");
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
        console.log('password not same');
        this.toastr.error('Password and Confirm Password must be same');
      }
    } 
    else 
    {
      console.log('please fill form correctly');
      this.toastr.error('Please fill the form correctly');
    }
  }
  

  ngOnInit(): void { }
}
