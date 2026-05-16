import { RouterModule, Routes } from '@angular/router';
import { Landingpage } from './SCREENS/landingpage/landingpage';
import { Privacypolicy } from './SCREENS/privacypolicy/privacypolicy';
import { Loginpage } from './SCREENS/AUTH/loginpage/loginpage';
import { Careerespage } from './SCREENS/careerespage/careerespage';
import { Publicationpage } from './SCREENS/publicationpage/publicationpage';
import { NgModule } from '@angular/core';

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
    ,
    {
        path:'login',
        component:Loginpage
    },
    {
        path:'careers',
        component:Careerespage
    },
    {
        path:'publications',
        component:Publicationpage
    }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
  // AppRoutingModule code can go here if needed
}
