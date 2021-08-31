import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { Aula1Component } from './aula1/aula1.component';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';
import { DadosAulaService } from './dados-aula.service';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {Menu} from './app.component';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  imports:      [ MatMenuModule,MatListModule,MatDialogModule, BrowserAnimationsModule,MatCardModule,MatRadioModule,MatButtonModule,MatToolbarModule, MatProgressBarModule, MatIconModule,BrowserModule, FormsModule,  RouterModule.forRoot([
    {path: "aula1/:id", component: Aula1Component},
  ]), ],
  declarations: [ Menu,AppComponent, HelloComponent,Aula1Component ],
  bootstrap:    [ AppComponent ],
  providers: [
    DadosAulaService
  ]  
})
export class AppModule { }
