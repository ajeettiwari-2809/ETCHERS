import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
 
// AngularFire v17 — must use importProvidersFrom for stable Auth DI
import { importProvidersFrom } from '@angular/core';

import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from '../environments/environment';
//import { environment } from '../environments/environment.development';
import { initializeApp, getApps, getApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAnimations } from '@angular/platform-browser/animations'; // ← required for @angular/animations
import { getFirestore, provideFirestore } from '@angular/fire/firestore'; // ← add
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
const firebaseApp = getApps().length === 0
  ? initializeApp(environment.firebase)
  : getApp();

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(),   // ← add this

    provideFirebaseApp(() => initializeApp(environment.firebase)),
  
    provideAuth(() => getAuth()),  
    provideFirestore(() => getFirestore()), 

    // provideToastr({
    //   timeOut:          1000,
    //   positionClass:   'toast-top-right',
    //   preventDuplicates: true,
    //   progressBar:      true,
    //   closeButton:      true,
    // }),
    // provideFirestore(() => {
    //   const app = initializeApp(environment.firebase);
    //   return getFirestore(app);
    // }),
    
  ]
};
