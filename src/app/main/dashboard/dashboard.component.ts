import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, ReplaySubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit 
{
  base64Output : string;
  //converting the file to base 64-------------------------------------------
  onFileSelected(event) 
  {
    console.log("event--------->>",event.target.files)
    this.convertFile(event.target.files[0]).subscribe(base64 => {
      this.base64Output = base64;
      console.log("64=============>>",this.base64Output)
    });
  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => result.next(btoa(event.target.result.toString()));
    return result;
  }
  //base 64 conversion over-----------------------------------------------------
  //starting the form----------------------
  form =new FormGroup({
    name:new FormControl('',[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(7),
    ]),
    description:new FormControl('',[Validators.required]),
    type:new FormControl('',Validators.required),
    file: new FormControl('',Validators.required)
  })
  get f() {
    return this.form.controls;
  }
  //form validation ended-----------------------
 submit()
 {
   if(this.form.valid==true)
   {
    //this.form.value.file=this.base64Output;
    this.form.value.file="XYZ";
    console.log(this.form.value);
    this.service.sendnft(this.form.value).subscribe((data)=>{
      console.log("sended========>>",data);
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
    this.toastr.success("Form submitted successfully");
   }
   else
   {
     console.log("cannot be submitted");
     this.toastr.error("Please fill all the details correctly");

   }

 }
  constructor(private toastr:ToastrService,private service:MainService) { }

  ngOnInit(): void
  {

  }

}
