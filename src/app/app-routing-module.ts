import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectionComponent } from './selection-component/selection-component';
import { BoardComponent } from './board-component/board-component';

const routes: Routes = [
  { path: '', component: SelectionComponent },
  { path: 'board', component: BoardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }