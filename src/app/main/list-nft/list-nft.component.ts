import { Component, OnInit, ViewChild } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { ToastrService } from 'ngx-toastr';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import {MatDialog,MatDialogRef,MatDialogConfig } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
@Component({
  selector: 'app-list-nft',
  templateUrl: './list-nft.component.html',
  styleUrls: ['./list-nft.component.css']
})
export class ListNftComponent implements OnInit 
{
  //variables for data tables-------------------
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  //definning the variables--------------------------
  nftArray=[];
  name;
  description;
  type;
  file;
  id;
  constructor(private service:MainService,private toastr:ToastrService,public dialog: MatDialog) { }

  ngOnInit(): void 
  {
    this.loaddata();
  }

  //opening the dialogue box-------
  openDialog() :void {
    const dialogRef =this.dialog.open(PopupComponent,{
      //setting width and height of dialog box-------
      width: '600px',
      height: '500px',
      //passing the data------------
      data: {
        name: this.name,
        description:this.description,
        type:this.type,
        file:this.file,
        id:this.id
      }
    })
    dialogRef.afterClosed().subscribe((res)=>{
      console.log("the dialog is closed");
      //this.service.getnft();
      this.ngOnInit();
    });
  }

  //binding the values to be send to the modal
  bind(value)
  {
    console.log("values----------------->>",value)
    this.name=value.name;
    this.description=value.description;
    this.type=value.type;
    this.file=value.file;
    this.id=value.id;
  }

  //loading the data
  loaddata()
  {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5,10,15]
    };
    //this.dtTrigger.next();
    this.service.getnft().subscribe((res)=>{
      console.log("our nfts are==========>>>",res['results']);
      this.nftArray=res['results'];
      console.log("nft array----------------->>",this.nftArray)
      this.rerender();
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

  //rerendering the table-------------------
  rerender(): void {
    //this.loaddata();
    console.log("rerendering the table========>>");
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        lengthMenu: [5,10,15]
      };
      //destroying the first table
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }
  
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
