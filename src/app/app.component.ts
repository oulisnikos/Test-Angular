import { DataAction } from './../Models/programm.interface';
import { BackEndService } from './../Services/backend-service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Maths } from 'src/Models/programm.interface';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';

const Times_Schema = {
  "time": "text",
  "math1": "text",
  "math2": "text",
  "math3": "text",
  "math4": "text",
  "math5": "text",
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  Prog2 : Maths[] = [];

  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;

  constructor(
    private service: BackEndService,
    public dialog: MatDialog
  ){}
  //datasource = new MatTableDataSource<Times>([])
  ngOnInit(): void {
    this.service.getProg('law_schedule').subscribe((responseList) =>{
      this.Prog2 = responseList;
      console.log(responseList);

    });
  }
  displayedColumns: string[] = ['time', 'math1', 'math2', 'math3','math4', 'math5', 'actions'];
  dataSource = this.Prog2;
  dataSchema = Times_Schema;
  //datasource = new MatTableDataSource<Times>(this.Prog2);
  //@ViewChild(MatPaginator)
  //paginator!: MatPaginator;

  update(obj: Maths) {
    let allData: DataAction = {
      maths: obj,
      action: "update"
    };
    this.openDialogInternal(allData);

  }

  openDialogInternal(allData: DataAction) {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data:allData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result){
        if(result.event == 'Update'){
          this.updateRowData(result.data);
        }
        else if(result.event == 'Add') {
          this.dataSource.push(result.data);
        }
      }
    });
  }

  updateRowData(row_obj: { start_time: any; end_time:any; math1: any; math2:any; math3: any; math4: any; math5: any;}){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.start_time === row_obj.start_time && value.end_time === row_obj.end_time){
        value.math1 = row_obj.math1;
        value.math2 = row_obj.math2;
        value.math3 = row_obj.math3;
        value.math4 = row_obj.math4;
        value.math5 = row_obj.math5;
        console.log("Im here");
      }
      console.log("value " + value)
      return true;
    });
  }

  addRow() {
    let allData: DataAction = {
      maths: {
        start_time: "",
        end_time: "",
        math1: "",
        math2: "",
        math3: "",
        math4: "",
        math5: ""
      },
      action: "Add"
    };
    this.openDialogInternal(allData);
  }

  title = 'Test-angular';
}
