import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-nft',
  templateUrl: './list-nft.component.html',
  styleUrls: ['./list-nft.component.css']
})
export class ListNftComponent implements OnInit 
{
  dtOptions: DataTables.Settings = {};
  //definning the array--------------------------
  dataa = [
    {name: 'Abc', email: 'abc@gmail.com'},
    {name: 'Def', email: 'def@gmail.com'},
    {name: 'Ijk', email: 'ijk@gmail.com'},
    {name: 'Lmn', email: 'lmn@gmail.com'},
    {name: 'Opq', email: 'opq@gmail.com'},
    {name: 'Rst', email: 'rst@gmail.com'},
    {name: 'Uvw', email: 'uvw@gmail.com'},
  {name: 'Xyz', email: 'xyz@gmail.com'},
    {name: '123', email: '123@gmail.com'},
    {name: '456', email: '456@gmail.com'},
  ];
  constructor() { }

  ngOnInit(): void 
  {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5,10,15]
    };
  }

}
