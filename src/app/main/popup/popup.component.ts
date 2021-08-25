import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MainService } from 'src/app/services/main.service';
import { ListNftComponent } from '../list-nft/list-nft.component';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit 
{
  //definning the variables--------------
  name;
  description;
  type;
  file;
  id;

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
  
  //submitting the form------------------------
  submit()
  {
    if(this.form.valid)
    {
      this.form.value.file="XYZ"
      //equatting the id-----
      this.id=this.data.id;
      console.log("id--------->>",this.id)
      console.log("values after submitting dialog----------->>",this.form.value);
      this.service.updatenft(this.form.value,this.data.id).subscribe((res)=>{
      console.log("modal responded correctly------------>>",res)
      //closing the dialog------
      this.dialogRef.close(); 
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
      this.toastr.error("Fill the form correctly");
    }
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private service:MainService,private toastr:ToastrService,private router:Router,private dialogRef:MatDialogRef<ListNftComponent>) { }

  ngOnInit(): void 
  {

    console.log("passed============>>",this.data)
    //receiving the value and equatting it so that we can bind it in the form------
    this.name=this.data.name;
    this.description=this.data.description;
    this.type=this.data.type;
    this.file=this.data.file;
  }

}
