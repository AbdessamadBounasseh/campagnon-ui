import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'campaigns',
    pathMatch: 'full',
  },
  {
    path: 'campaigns',
    loadComponent: () => import('./components/campaign-list/campaign-list.component')
      .then(m => m.CampaignListComponent),
  }
];
