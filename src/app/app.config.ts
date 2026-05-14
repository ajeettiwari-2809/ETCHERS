import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore'; // ← add
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(),   // ← add this
    provideFirebaseApp(() => initializeApp(environment.firebase)),  
    provideFirestore(() => getFirestore()), 

    provideToastr({
      timeOut:          1000,
      positionClass:   'toast-top-right',
      preventDuplicates: true,
      progressBar:      true,
      closeButton:      true,
    }),
    // provideFirestore(() => {
    //   const app = initializeApp(environment.firebase);
    //   return getFirestore(app);
    // }),
    
  ]
};
