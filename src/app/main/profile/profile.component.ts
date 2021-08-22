import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName;
  email;
  id;
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email])
  });

  get f() {
    return this.form.controls;
  }
  submit() {
    if (this.form.valid) {
      //making the object to send the patch----------
      let obj = {
        email: this.form.value.email,
        name: this.form.value.name,
        role: 'user',
        status: 'ACTIVE'
      }
      console.log("obj----->>", obj)
      console.log(this.form.value);
      this.service.updateuser(obj, this.id).subscribe((data) => {
        console.log("data is ----->>", data)
        //making the object to store the data of the user------
       let user={
        name:data.name,
        createdAt:data.createdAt,
        role:data.role,
        status:data.status,
        is_email_verified:data.is_email_verified,
        email:data.email,
        id:data.id,
        updatedAt:data.updatedAt,
        wallet_address:data.wallet_address
      }
      console.log("user------------->>>",user)
       const userData = JSON.stringify(user)
       console.log("userdata----------->>",userData)
       localStorage.setItem('user',userData);
       //for reloading------
       window.location.reload();
       console.log("worked----->>")

      },
        (err) => {
          if (err.error.message == undefined) {
            console.log("undefined===========>>");
            //this.toastr.error("API is not working");
            //this.router.navigate(['/main']);
            //this.spinner.hide();
          }
          else {
            //his.toastr.error(err.error.message);
            console.log("error we are getting=============>>", err.error.message);
            //this.spinner.hide();
          }
        })
    }
    else {
      console.log("Fill the form correctly");
    }
  }
  constructor(private service: MainService) { }

  ngOnInit(): void {
    //getting the user data from local storage-------
    let x = localStorage.getItem("user");
    console.log("x-------------->>", JSON.parse(x));
    //parsing the local storage data-------------
    let obj = JSON.parse(x);
    console.log("obj------>>", obj)
    //equating the name------------
    this.userName = obj.name
    console.log("username--->>", this.userName)
    //equating the email------
    this.email = obj.email
    console.log("username--->>", this.email)
    //equating the id---------
    this.id = obj.id;
    console.log("id---->", this.id)
  }

}
