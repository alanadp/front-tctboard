import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectionComponent } from './selection-component/selection-component';
import { BoardComponent } from './board-component/board-component';
import { MeusQuadrosComponent } from './meus-quadros-component/meus-quadros-component';

const routes: Routes = [
  { path: '', component: SelectionComponent },
  { path: 'board', component: BoardComponent },
  { path: 'meus-quadros', component: MeusQuadrosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }