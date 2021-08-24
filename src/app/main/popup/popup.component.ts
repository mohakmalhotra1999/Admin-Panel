import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


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
    console.log("submitted")
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void 
  {

    console.log("passed============>>",this.data)
    //receiving the value and equatting it so that we can bind it in the form------
    this.name=this.data.name;
    this.description=this.data.description;
    this.type=this.data.type;
    this.file=this.data.file
  }

}
