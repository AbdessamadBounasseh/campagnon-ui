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
        loadComponent: () => import('./components/create-campaign/create-campaign.component')
          .then(m => m.CreateCampaignComponent)
      }
    ]
  },
];
