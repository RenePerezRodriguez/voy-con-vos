import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { MainAdminComponent } from './admin/main-admin/main-admin.component';
import { MainComponent } from './auth/main/main.component';
import { MainComponent as Main} from './pages/main/main.component';

const routes: Routes = [
  {
    path: 'auth',
    component:MainComponent,
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path:'main',
    component:Main,
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule)
  },
  {
    path:'admin',
    component:MainAdminComponent,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path:'**',
    redirectTo:'main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
