import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: 'tabs/(tabHome:tabHome)',
        pathMatch: 'full'
      },
      {
        path: 'tabHome',
        children: [
          {
            path: '',
            loadChildren: './pages/tab-home/tab-home.module#TabHomePageModule'
          }
        ]
      },
      {
        path: 'tabHome/homeDetail',
        loadChildren: './pages/home-detail/home-detail.module#HomeDetailPageModule'
      },
      {
        path: 'tabSettings',
        children: [
          {
            path: '',
            loadChildren: './pages/tab-settings/tab-settings.module#TabSettingsPageModule'
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs/tabHome',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
