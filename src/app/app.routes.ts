import { Routes } from '@angular/router';
import { Landingpage } from './SCREENS/landingpage/landingpage';
import { Privacypolicy } from './SCREENS/privacypolicy/privacypolicy';

export const routes: Routes = [
    {
       path: '',
       component: Landingpage
    }
    ,
    {
        path:'privacy-policy',
        component:Privacypolicy
    }
];
