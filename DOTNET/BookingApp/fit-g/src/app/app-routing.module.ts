import { AuthGuard } from './tabs/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./landing-page/landing-page.module').then( m => m.LandingPagePageModule)

  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login-modal/login-page.module').then( m => m.LoginPagePageModule)
  },  {
    path: 'loading-modal',
    loadChildren: () => import('./modals/loading-modal/loading-modal/loading-modal.module').then( m => m.LoadingModalPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
