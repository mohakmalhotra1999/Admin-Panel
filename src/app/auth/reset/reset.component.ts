import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit 
{
  constructor(private toastr: ToastrService,private service:AuthService,private active:ActivatedRoute) { }
  form=new FormGroup({
    newpassword:new FormControl('',[Validators.required,Validators.minLength(7),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
    confirmpassword:new FormControl('',[Validators.required,Validators.minLength(7),
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])
  });

  get f()
  {
    return this.form.controls;
  }
  submit()
  {
    //checking the validatin of form
    if(this.form.valid)
    {
      //checking if new and confirm password are same or not
      if(this.form.value.newpassword == this.form.value.confirmpassword)
      {
        let token;
        //getting the query parameter
        this.active.queryParams.subscribe((res)=>{
          console.log("res========>>",res.token)
          token=res.token;
        })
        console.log("token is ========>>",token);
        //making a field password to send
        let obj={
          password:this.form.value.confirmpassword
        }
        console.log("obj--->>",obj)
        //calling the API
        this.service.reset(obj,token).subscribe((data)=>{
        console.log(data);
        this.toastr.success("Password has been updated");
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
        this.toastr.error("New and Confirm password should be same");
      }
    }
    else
    {
      this.toastr.error("Fill form correctly");
    }
  }

  ngOnInit(): void 
  {
    
  }

}
