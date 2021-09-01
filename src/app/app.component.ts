import { Component, Inject, VERSION } from '@angular/core';
import { DadosAulaService } from './dados-aula.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TopicoAula } from './topicoaula';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from "@angular/router";
import { DomSanitizer } from '@angular/platform-browser';
import { Aula } from './aula';

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
      width: '500px',height:'400px',
      data: {dados: this.dados}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }

  constructor(public dialog: MatDialog,public dados : DadosAulaService)
  {

  }
}

@Component({
  selector: 'menu',
  templateUrl: 'menu.html',
})
export class Menu {
  aulaselecionada : Aula;
  constructor(private router: Router,public dados : DadosAulaService,
    public dialogRef: MatDialogRef<Menu>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.aulaselecionada = data.dados.getAulaAtual();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  proxima()
  {
    this.dados.proximaaula();

  }

  selectaula(idTopicoAula)
  {
    this.router.navigate(["aula1/"+ idTopicoAula.toString()]);
    this.dialogRef.close();
  }

}