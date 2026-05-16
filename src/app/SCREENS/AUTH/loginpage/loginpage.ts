
import {
  Component, OnInit, OnDestroy, ViewChildren,
  QueryList, ElementRef, ChangeDetectorRef, NgZone
} from '@angular/core';
import { CommonModule }                         from '@angular/common';
import { ReactiveFormsModule, FormsModule,
         FormBuilder, FormGroup, Validators,
         AbstractControl }                       from '@angular/forms';
import { Router }                               from '@angular/router';
import { AuthService } from '../../../SERVICES/authservice';

 
// ── Country data ─────────────────────────────────────────────────
export interface Country {
  name: string;
  flag: string;
  code: string;
  dial: string;
}
 
export const COUNTRIES: Country[] = [
  { name: 'India',          flag: '🇮🇳', code: 'IN', dial: '+91'  },
  { name: 'United States',  flag: '🇺🇸', code: 'US', dial: '+1'   },
  { name: 'United Kingdom', flag: '🇬🇧', code: 'GB', dial: '+44'  },
  { name: 'United Arab Emirates', flag: '🇦🇪', code: 'AE', dial: '+971' },
  { name: 'Singapore',      flag: '🇸🇬', code: 'SG', dial: '+65'  },
  { name: 'Canada',         flag: '🇨🇦', code: 'CA', dial: '+1'   },
  { name: 'Australia',      flag: '🇦🇺', code: 'AU', dial: '+61'  },
  { name: 'Germany',        flag: '🇩🇪', code: 'DE', dial: '+49'  },
  { name: 'France',         flag: '🇫🇷', code: 'FR', dial: '+33'  },
  { name: 'Saudi Arabia',   flag: '🇸🇦', code: 'SA', dial: '+966' },
  { name: 'Bangladesh',     flag: '🇧🇩', code: 'BD', dial: '+880' },
  { name: 'Nepal',          flag: '🇳🇵', code: 'NP', dial: '+977' },
  { name: 'Sri Lanka',      flag: '🇱🇰', code: 'LK', dial: '+94'  },
  { name: 'Pakistan',       flag: '🇵🇰', code: 'PK', dial: '+92'  },
  { name: 'Malaysia',       flag: '🇲🇾', code: 'MY', dial: '+60'  },
];
 
// ── Particle config ───────────────────────────────────────────────
interface Particle { x: number; y: number; size: number; delay: number; duration: number; }
 
@Component({
  selector: 'app-loginpage',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './loginpage.html',
  styleUrls: ['./loginpage.scss'],
})
export class Loginpage implements OnInit, OnDestroy {
 
  // ── UI state ──────────────────────────────────────────────────
  isLoaded       = false;
  loading        = false;
  isSuccess      = false;
  activeTab: 'login' | 'register' = 'login';
 
  // ── Country selector ──────────────────────────────────────────
  countries          = COUNTRIES;
  selectedCountry    = COUNTRIES[0];   // India default
  showCountryDropdown = false;
  countrySearch      = '';
 
  get filteredCountries(): Country[] {
    const q = this.countrySearch.toLowerCase();
    return q
      ? this.countries.filter(c =>
          c.name.toLowerCase().includes(q) ||
          c.dial.includes(q))
      : this.countries;
  }
 
  // ── Forms ─────────────────────────────────────────────────────
  phoneForm!:    FormGroup;
  registerForm!: FormGroup;
  formErrors:    Record<string, string>    = {};
  registerErrors: Record<string, string>  = {};
 
  // ── OTP state ─────────────────────────────────────────────────
  otpSent      = false;
  otpControls  = Array(6).fill(null).map(() => ({ value: '' }));
  otpError     = '';
  otpCountdown = 60;
  private countdownTimer?: ReturnType<typeof setInterval>;
 
  get otpValue(): string {
    return this.otpControls.map(c => c.value).join('');
  }
 
  @ViewChildren('otpRef') otpRefs!: QueryList<ElementRef<HTMLInputElement>>;
 
  // ── Brand sidebar features ────────────────────────────────────
  brandFeatures = [
    { icon: 'bi bi-code-slash',    label: 'Projects Delivered', value: '800+' },
    { icon: 'bi bi-people-fill',   label: 'Freelancers Trained', value: '5,000+' },
    { icon: 'bi bi-palette-fill',  label: 'Design Projects',    value: '1,200+' },
    { icon: 'bi bi-globe2',        label: 'Countries Reached',  value: '15+' },
  ];
 
  // ── Particles ────────────────────────────────────────────────
  particles: Particle[] = Array.from({ length: 22 }, () => ({
    x:        Math.random() * 100,
    y:        Math.random() * 100,
    size:     Math.random() * 4 + 2,
    delay:    Math.random() * 6,
    duration: Math.random() * 8 + 6,
  }));
 
  constructor(
    private fb:   FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cdr:  ChangeDetectorRef,
    private zone: NgZone,
  ) {}
 
  ngOnInit(): void {
    this.buildForms();
    setTimeout(() => { this.isLoaded = true; this.cdr.markForCheck(); }, 80);
  }
 
  ngOnDestroy(): void {
    clearInterval(this.countdownTimer);
  }
 
  // ── Form building ─────────────────────────────────────────────
  private buildForms(): void {
 
    this.phoneForm = this.fb.group({
      phone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{7,15}$/)
      ]],
    });
 
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      lastName:  ['', [Validators.required, Validators.minLength(2), Validators.maxLength(32)]],
      email:     ['', [Validators.email]],
    });
  }
 
  // ── Tab switch ────────────────────────────────────────────────
  switchTab(tab: 'login' | 'register'): void {
    this.activeTab = tab;
    this.resetState();
  }
 
  private resetState(): void {
    this.otpSent    = false;
    this.otpError   = '';
    this.formErrors = {};
    this.registerErrors = {};
    this.loading    = false;
    this.otpControls.forEach(c => c.value = '');
    clearInterval(this.countdownTimer);
    this.otpCountdown = 60;
  }
 
  // ── Country selector ──────────────────────────────────────────
  toggleCountryDropdown(): void { this.showCountryDropdown = !this.showCountryDropdown; }
 
  selectCountry(c: Country): void {
    this.selectedCountry = c;
    this.showCountryDropdown = false;
    this.countrySearch = '';
  }
 
  // ── Form validation helpers ───────────────────────────────────
  private validatePhone(): boolean {
    this.formErrors = {};
    const ctrl = this.phoneForm.get('phone');
    ctrl?.markAsTouched();
    if (ctrl?.hasError('required')) {
      this.formErrors['phone'] = 'Mobile number is required.';
      return false;
    }
    if (ctrl?.hasError('pattern')) {
      this.formErrors['phone'] = 'Enter a valid mobile number (7–15 digits).';
      return false;
    }
    return true;
  }
 
  private validateRegister(): boolean {
    this.registerErrors = {};
    let valid = true;
    const f = this.registerForm;
    f.markAllAsTouched();
 
    const fnCtrl = f.get('firstName');
    if (fnCtrl?.hasError('required'))   { this.registerErrors['firstName'] = 'First name is required.'; valid = false; }
    else if (fnCtrl?.hasError('minlength')) { this.registerErrors['firstName'] = 'Min 2 characters.'; valid = false; }
 
    const lnCtrl = f.get('lastName');
    if (lnCtrl?.hasError('required'))   { this.registerErrors['lastName'] = 'Last name is required.'; valid = false; }
    else if (lnCtrl?.hasError('minlength')) { this.registerErrors['lastName'] = 'Min 2 characters.'; valid = false; }
 
    const emailCtrl = f.get('email');
    if (emailCtrl?.value && emailCtrl?.hasError('email')) {
      this.registerErrors['email'] = 'Enter a valid email address.'; valid = false;
    }
    return valid;
  }
 
  // ── Send OTP ──────────────────────────────────────────────────
  async sendOtp(): Promise<void> {
    if (!this.validatePhone()) return;
    if (this.activeTab === 'register' && !this.validateRegister()) return;
 
    this.loading = true;
    const fullPhone = `${this.selectedCountry.dial}${this.phoneForm.get('phone')!.value.replace(/\s/g, '')}`;
 
    try {
      await this.auth.sendPhoneOtp(fullPhone, 'recaptcha-container');
      this.zone.run(() => {
        this.otpSent = true;
        this.startOtpCountdown();
        this.loading = false;
        this.cdr.markForCheck();
        // Focus first OTP box after render
        setTimeout(() => {
          const boxes = this.otpRefs?.toArray();
          if (boxes?.length) boxes[0].nativeElement.focus();
        }, 120);
      });
    } catch (err: any) {
      console.log(err)
      this.zone.run(() => {
        this.formErrors['phone'] = err.message ?? 'Failed to send OTP. Please try again.';
        this.loading = false;
        this.cdr.markForCheck();
      });
    }
  }
 
  // ── OTP Input handling ────────────────────────────────────────
  onOtpInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const val   = input.value.replace(/\D/g, '').slice(-1);
    this.otpControls[index].value = val;
    this.otpError = '';
 
    if (val && index < 5) {
      setTimeout(() => this.otpRefs.toArray()[index + 1]?.nativeElement.focus(), 0);
    }
    if (index === 5 && this.otpValue.length === 6) {
      // Auto-verify when all digits entered
      setTimeout(() => this.verifyOtp(), 100);
    }
  }
 
  onOtpKeydown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace' && !this.otpControls[index].value && index > 0) {
      this.otpControls[index - 1].value = '';
      setTimeout(() => this.otpRefs.toArray()[index - 1]?.nativeElement.focus(), 0);
    }
  }
 
  onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const text = event.clipboardData?.getData('text') ?? '';
    const digits = text.replace(/\D/g, '').slice(0, 6);
    digits.split('').forEach((d, i) => {
      if (this.otpControls[i]) this.otpControls[i].value = d;
    });
    const last = Math.min(digits.length, 5);
    setTimeout(() => this.otpRefs.toArray()[last]?.nativeElement.focus(), 0);
    if (digits.length === 6) setTimeout(() => this.verifyOtp(), 200);
  }
 
  // ── Verify OTP ────────────────────────────────────────────────
  async verifyOtp(): Promise<void> {
    if (this.otpValue.length < 6) {
      this.otpError = 'Please enter all 6 digits.'; return;
    }
    this.loading  = true;
    this.otpError = '';
 
    try {
      const user = await this.auth.verifyPhoneOtp(this.otpValue);
      this.zone.run(() => {
        if (this.activeTab === 'register') {
          const { firstName, lastName, email } = this.registerForm.value;
          this.auth.updateProfile(user, `${firstName} ${lastName}`, email).catch(() => {});
        }
        this.loading   = false;
        this.isSuccess = true;
        clearInterval(this.countdownTimer);
        this.cdr.markForCheck();
        setTimeout(() => this.router.navigate(['/dashboard']), 1800);
      });
    } catch (err: any) {
      this.zone.run(() => {
        this.otpError = err.code === 'auth/invalid-verification-code'
          ? 'Invalid OTP. Please try again.'
          : err.message ?? 'Verification failed. Please try again.';
        this.loading = false;
        // Shake boxes
        this.otpControls.forEach(c => c.value = '');
        setTimeout(() => this.otpRefs.toArray()[0]?.nativeElement.focus(), 0);
        this.cdr.markForCheck();
      });
    }
  }
 
  // ── Resend OTP ────────────────────────────────────────────────
  resendOtp(): void {
    this.otpControls.forEach(c => c.value = '');
    this.otpError = '';
    this.otpSent  = false;
    setTimeout(() => this.sendOtp(), 80);
  }
 
  resetPhoneEntry(): void {
    this.otpSent  = false;
    this.otpError = '';
    clearInterval(this.countdownTimer);
  }
 
  private startOtpCountdown(): void {
    this.otpCountdown = 60;
    clearInterval(this.countdownTimer);
    this.countdownTimer = setInterval(() => {
      this.zone.run(() => {
        this.otpCountdown > 0 ? this.otpCountdown-- : clearInterval(this.countdownTimer);
        this.cdr.markForCheck();
      });
    }, 1000);
  }
 
  // ── Google Sign In ─────────────────────────────────────────────
  async signInWithGoogle(): Promise<void> {
    this.loading = true;
    try {
      await this.auth.signInWithGoogle();
      this.zone.run(() => {
        this.loading   = false;
        this.isSuccess = true;
        this.cdr.markForCheck();
        setTimeout(() => this.router.navigate(['/dashboard']), 1800);
      });
    } catch (err: any) {
      this.zone.run(() => {
        this.formErrors['google'] = err.message ?? 'Google sign-in failed.';
        this.loading = false;
        this.cdr.markForCheck();
      });
    }
  }


  // For back
  back()
  {
    window.history.back();
  }
}
 
