import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthCanLoad } from './auth/auth-can-load.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/articles.module').then(mod => mod.ArticlesModule),
    canLoad: [AuthCanLoad]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
