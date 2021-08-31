import { Component, Inject, VERSION } from '@angular/core';
import { DadosAulaService } from './dados-aula.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TopicoAula } from './topicoaula';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from "@angular/router";



export interface DialogData {


  dados: DadosAulaService;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  animal: string;


  openDialog(): void {
    const dialogRef = this.dialog.open(Menu, {
      width: '400px',height:'400px',
      data: {dados: this.dados}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  constructor(public dialog: MatDialog,public dados : DadosAulaService)
  {
    console.log("as");
  }
}

@Component({
  selector: 'menu',
  templateUrl: 'menu.html',
})
export class Menu {

  constructor(private router: Router,
    public dialogRef: MatDialogRef<Menu>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectaula(idTopicoAula)
  {
    this.router.navigate(["aula1/"+ idTopicoAula.toString()]);
    this.dialogRef.close();
  }

}