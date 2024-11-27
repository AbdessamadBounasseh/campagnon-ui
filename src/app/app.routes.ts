import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'campaigns',
    pathMatch: 'full'
  },
  {
    path: 'campaigns',
    children: [
      {
        path: '',
        loadComponent: () => import('./components/campaign-list/campaign-list.component')
          .then(m => m.CampaignListComponent),
      },
      {
        path: 'create',
        loadComponent: () => import('./components/campaign-form/campaign-form.component')
          .then(m => m.CampaignFormComponent)
      },
      {
        path: ':name/update',
        loadComponent: () => import('./components/campaign-form/campaign-form.component')
          .then(m => m.CampaignFormComponent)
      }
    ]
  },
];
