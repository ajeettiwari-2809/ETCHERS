/**
 * auth.service.ts
 * Firebase Authentication Service — ETCHERS
 *
 * Handles:
 *  • Google Sign-In (popup)
 *  • Phone/OTP Auth (Firebase reCAPTCHA v2 + SMS)
 *  • Profile update (displayName + email link)
 *  • Auth state stream
 *
 * Setup:
 *  1. npm install firebase @angular/fire
 *  2. Add your Firebase config to environment.ts  (see bottom of this file)
 *  3. In app.config.ts: provideFirebaseApp(() => initializeApp(environment.firebase))
 *                       provideAuth(() => getAuth())
 */


import { Auth, User,
         RecaptchaVerifier,
         signInWithPhoneNumber,
         ConfirmationResult,
         GoogleAuthProvider,
         signInWithPopup,
         updateProfile,
         updateEmail,
         onAuthStateChanged,
         signOut }                           from '@angular/fire/auth';
import { BehaviorSubject, Observable }       from 'rxjs';
import { Injectable }                 from '@angular/core';

@Injectable({ providedIn: 'root' })

export class AuthService {

  // ── Auth state ───────────────────────────────────────────────
  private _user$ = new BehaviorSubject<User | null>(null);
  readonly user$: Observable<User | null> = this._user$.asObservable();
  get currentUser(): User | null { return this._user$.value; }
  get isLoggedIn(): boolean      { return !!this._user$.value; }

  // ── Internal ─────────────────────────────────────────────────
  private recaptchaVerifier?: RecaptchaVerifier;
  private confirmationResult?: ConfirmationResult;

  constructor(private fireAuth: Auth) {
    // Subscribe to Firebase auth state globally
    onAuthStateChanged(this.fireAuth, user => this._user$.next(user));
  }

  // ================================================================
  //  GOOGLE SIGN-IN
  // ================================================================
  async signInWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    provider.addScope('profile');
    // Optional: pre-select account picker every time
    provider.setCustomParameters({ prompt: 'select_account' });

    const result = await signInWithPopup(this.fireAuth, provider);
    return result.user;
  }

  // ================================================================
  //  PHONE AUTH — Step 1: Send OTP
  // ================================================================
  async sendPhoneOtp(phoneNumber: string, recaptchaContainerId: string): Promise<void> {
    // Destroy old verifier if it exists (e.g. on resend)
    this.destroyRecaptcha();

    this.recaptchaVerifier = new RecaptchaVerifier(
      this.fireAuth,
      recaptchaContainerId,
      {
        size: 'invisible',          // invisible reCAPTCHA — no checkbox shown to user
        callback: () => {},         // auto-continues after solve
        'expired-callback': () => {
          this.destroyRecaptcha();  // force fresh verifier on expiry
        },
      }
    );

    this.confirmationResult = await signInWithPhoneNumber(
      this.fireAuth,
      phoneNumber,
      this.recaptchaVerifier
    );
  }

  // ================================================================
  //  PHONE AUTH — Step 2: Verify OTP
  // ================================================================
  async verifyPhoneOtp(otp: string): Promise<User> {
    if (!this.confirmationResult) {
      throw new Error('No OTP request in progress. Please send OTP first.');
    }
    const result = await this.confirmationResult.confirm(otp);
    this.destroyRecaptcha();
    return result.user;
  }

  // ================================================================
  //  UPDATE PROFILE (after registration)
  // ================================================================
  async updateProfile(user: User, displayName: string, email?: string): Promise<void> {
    // Update display name
    await updateProfile(user, { displayName });

    // Link email if provided (best-effort — may fail if email exists)
    if (email && email.trim()) {
      try {
        await updateEmail(user, email.trim());
      } catch {
        // Non-critical — phone auth works without email
      }
    }
  }

  // ================================================================
  //  SIGN OUT
  // ================================================================
  async signOut(): Promise<void> {
    await signOut(this.fireAuth);
  }

  // ================================================================
  //  INTERNAL HELPERS
  // ================================================================
  private destroyRecaptcha(): void {
    if (this.recaptchaVerifier) {
      try { this.recaptchaVerifier.clear(); } catch { /* ignore */ }
      this.recaptchaVerifier = undefined;
    }
  }
}

// ================================================================
//  FIREBASE CONFIG  — src/environments/environment.ts
// ================================================================
/*
  export const environment = {
    production: false,
    firebase: {
      apiKey:            "YOUR_API_KEY",
      authDomain:        "YOUR_PROJECT.firebaseapp.com",
      projectId:         "YOUR_PROJECT_ID",
      storageBucket:     "YOUR_PROJECT.appspot.com",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId:             "YOUR_APP_ID",
    }
  };
*/

// ================================================================
//  APP CONFIG SETUP  — src/app/app.config.ts
// ================================================================
/*
  import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
  import { getAuth, provideAuth }              from '@angular/fire/auth';
  import { environment }                        from '../environments/environment';

  export const appConfig: ApplicationConfig = {
    providers: [
      provideFirebaseApp(() => initializeApp(environment.firebase)),
      provideAuth(() => getAuth()),
      provideRouter(routes),
    ]
  };
*/

// ================================================================
//  FIREBASE CONSOLE SETUP CHECKLIST
// ================================================================
/*
  1. Go to https://console.firebase.google.com
  2. Create / select your project
  3. Authentication → Sign-in method → Enable:
       ✅ Google
       ✅ Phone
  4. Authentication → Settings → Authorized domains → add your domain
  5. For phone auth in development:
       Authentication → Sign-in method → Phone → Test phone numbers
       Add: +91 9999999999  →  OTP: 123456
  6. For production:
       Ensure SHA-1 / SHA-256 fingerprints added for Android
       Domain verified for web app
*/