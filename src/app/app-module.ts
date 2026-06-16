import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BoardComponent } from './board-component/board-component';
import { SelectionComponent } from './selection-component/selection-component';
import { MeusQuadrosComponent } from './meus-quadros-component/meus-quadros-component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [App, BoardComponent, SelectionComponent, MeusQuadrosComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, ReactiveFormsModule, HttpClientModule, DragDropModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}