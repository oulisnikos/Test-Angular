import { BackEndService } from './../../Services/backend-service';
import { Maths, DataAction } from './../../Models/programm.interface';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  action:string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private backEnd: BackEndService,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: DataAction) {
    console.log("this is my data ", data);
    this.local_data = data.maths;
    console.log("this is my data2  ", this.local_data);
    this.action = data.action;
  }

  ngOnInit(): void {
  }


  doAction(){
    this.dialogRef.close({
      event:this.action,
      data:this.local_data
    });
    console.log("last data " + JSON.stringify(this.data))
    this.backEnd.editProg(this.data).subscribe(res => {
      console.log('Data Sent');
    });
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}
