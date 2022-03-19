import { Tab1Page } from './../tab1/tab1.page';
import { TabsPageModule } from './tabs.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    canActivate:[AuthGuard],


    children: [
      {
        path: 'tab1',
        loadChildren: () =>
          import('../tab1/tab1.module').then((m) => m.Tab1PageModule),
          canActivate: [AuthGuard]

      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
          canActivate: [AuthGuard]

      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
          canActivate: [AuthGuard]

      },
      {
        path: 'tabs',
        redirectTo: '/tabs',
        pathMatch: 'full',
        canActivate: [AuthGuard]

      },

    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
