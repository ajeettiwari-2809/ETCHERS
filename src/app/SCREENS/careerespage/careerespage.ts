import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location }                      from '@angular/common';
import {
  FormBuilder, FormGroup,Validators,AbstractControl,ValidationErrors,FormsModule,ReactiveFormsModule
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { FaqTabIconPipe } from '../landingpage/landingpage';
 
// ── Interfaces ──────────────────────────────────────────────
 
export interface CareerFormValue {
  fullName:       string;
  email:          string;
  phone:          string;
  experience:     string;
  department:     string;
  role:           string;
  workMode:       string;
  joinDate:       string;
  portfolio:      string;
  additionalInfo: string;
  consent:        boolean;
}
 
export interface Perk {
  icon:  string;
  title: string;
  desc:  string;
}
 
export interface ExperienceOption {
  value: string;
  label: string;
}
 
// ── Custom Validators ────────────────────────────────────────
 
/** Validates that the selected date is not in the past. */
function futureDateValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const selected = new Date(control.value);
  const today    = new Date();
  today.setHours(0, 0, 0, 0);
  return selected < today ? { pastDate: true } : null;
}
 
/** Validates URL starts with https:// (optional field). */
function optionalUrlValidator(control: AbstractControl): ValidationErrors | null {
  if (!control.value) return null;
  const urlRegex = /^https?:\/\/.+/;
  return urlRegex.test(control.value) ? null : { pattern: true };
}
 

@Component({
  selector: 'app-careerespage',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './careerespage.html',
  styleUrls: ['./careerespage.scss'],
})
export class Careerespage implements OnInit, OnDestroy {
 
  // ── State ────────────────────────────────────────────────
  careerForm!: FormGroup;
  isSubmitted  = false;
  submitted    = false;   // tracks whether submit was attempted (for template error display)
  isLoading    = false;
  isDragOver   = false;
  resumeFile: File | null = null;
  currentStep  = 1;
  currentYear  = new Date().getFullYear();
  minDate      = new Date().toISOString().split('T')[0];
 
  // ── Subscriptions ────────────────────────────────────────
  private subs = new Subscription();
 
  // ── Lookup Data ─────────────────────────────────────────
  readonly departments: string[] = [
    'Academic',
    'Technology',
    'Operations',
    'Marketing & Admissions',
    'Finance & Admin',
  ];
 
  readonly roleMap: Record<string, string[]> = {
    'Academic': [
      'Mathematics Faculty',
      'Science Teacher',
      'English Faculty',
      'Academic Coordinator',
      'Curriculum Designer',
      'Special Education Trainer',
    ],
    'Technology': [
      'Full Stack Developer',
      'Python Developer',
      'Mobile App Developer',
      'UI / UX Designer',
      'QA Engineer',
      'DevOps Engineer',
    ],
    'Operations': [
      'Operations Manager',
      'Administrative Executive',
      'Facilities Coordinator',
      'Logistics & Supply Officer',
    ],
    'Marketing & Admissions': [
      'Marketing Lead',
      'Admissions Counsellor',
      'Content Writer',
      'Social Media Manager',
      'Brand & Communications Executive',
    ],
    'Finance & Admin': [
      'Finance Analyst',
      'Accounts Executive',
      'HR Executive',
      'Payroll Specialist',
    ],
  };
 
  availableRoles: string[] = [];
 
  readonly experienceOptions: ExperienceOption[] = [
    { value: 'fresher',  label: 'Fresher (0 years)'  },
    { value: '1-2',      label: '1 – 2 Years'        },
    { value: '3-5',      label: '3 – 5 Years'        },
    { value: '6-10',     label: '6 – 10 Years'       },
    { value: '10+',      label: '10+ Years'          },
  ];
 
  readonly workModes: string[] = ['On-site', 'Remote', 'Hybrid'];
 
  readonly openRoles: string[] = [
    'Python Developer',
    'UI / UX Designer',
    'Math Faculty',
    'Science Teacher',
    'Marketing Lead',
    'Admissions Exec',
    'Finance Analyst',
    'Full Stack Dev',
  ];
 
  readonly perks: Perk[] = [
    {
      icon:  'bi-graph-up-arrow',
      title: 'Career Growth',
      desc:  'Structured learning paths and annual appraisals',
    },
    {
      icon:  'bi-people-fill',
      title: 'Collaborative Culture',
      desc:  'Work alongside passionate educators and innovators',
    },
    {
      icon:  'bi-laptop',
      title: 'Flexible Work',
      desc:  'Hybrid options available for most positions',
    },
    {
      icon:  'bi-shield-check',
      title: 'Health Benefits',
      desc:  'Comprehensive medical and wellness programmes',
    },
  ];
 
  // ── Constructor ──────────────────────────────────────────
  constructor(
    private fb:       FormBuilder,
    private location: Location,
  ) {}
 
  // ── Lifecycle ────────────────────────────────────────────
  ngOnInit(): void {
    this.buildForm();
    this.watchStepProgress();
  }
 
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
 
  // ── Form Builder ─────────────────────────────────────────
  private buildForm(): void {
    this.careerForm = this.fb.group({
      // Personal
      fullName: [
        '',
        [Validators.required, Validators.minLength(3),Validators.pattern(/^[a-zA-Z\s'-]+$/),
        ],
      ],
      email: [
        '',
        [Validators.required, Validators.email],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[+]?[\d\s\-()]{10,15}$/),
        ],
      ],
      experience: ['', Validators.required],
 
      // Role
      department: ['', Validators.required],
      role:       ['', Validators.required],
      workMode:   [''],
      joinDate:   ['', [futureDateValidator]],
 
      // Documents
      portfolio:      ['', [optionalUrlValidator]],
      additionalInfo: ['', [Validators.maxLength(500)]],
      consent:        [false, [Validators.requiredTrue]],
    });
  }
 
  // ── Step Progress Watcher ────────────────────────────────
  private watchStepProgress(): void {
    const personalFields = ['fullName', 'email', 'phone', 'experience'];
    const roleFields     = ['department', 'role'];
 
    const update = () => {
      const personalDone = personalFields.every(f => this.careerForm.get(f)?.valid);
      const roleDone     = roleFields.every(f => this.careerForm.get(f)?.valid);
 
      if (roleDone)     this.currentStep = 3;
      else if (personalDone) this.currentStep = 2;
      else              this.currentStep = 1;
    };
 
    const sub = this.careerForm.valueChanges.subscribe(update);
    this.subs.add(sub);
  }
 
  // ── Department → Role cascade ────────────────────────────
  onDepartmentChange(): void {
    const dept = this.careerForm.get('department')?.value as string;
    this.availableRoles = dept ? (this.roleMap[dept] ?? []) : [];
    this.careerForm.patchValue({ role: '' });
  }
 
  // ── Validation Helpers ───────────────────────────────────
 
  /** Returns true if a field is invalid AND (dirty OR touched OR form submitted). */
  isInvalid(field: string): boolean {
    const ctrl = this.careerForm.get(field);
    return !!(ctrl && ctrl.invalid && (ctrl.dirty || ctrl.touched || this.submitted));
  }
 
  /** Returns true if a field is valid AND the user has interacted with it. */
  isValid(field: string): boolean {
    const ctrl = this.careerForm.get(field);
    return !!(ctrl && ctrl.valid && (ctrl.dirty || ctrl.touched));
  }
 
  // ── Char Count ───────────────────────────────────────────
  get charCount(): number {
    return (this.careerForm.get('additionalInfo')?.value as string)?.length ?? 0;
  }
 
  // ── File Handling ────────────────────────────────────────
  private readonly allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];
  private readonly maxFileSizeBytes = 5 * 1024 * 1024; // 5 MB
 
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.processFile(input.files[0]);
    }
  }
 
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }
 
  onDragLeave(): void {
    this.isDragOver = false;
  }
 
  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
    const file = event.dataTransfer?.files[0];
    if (file) this.processFile(file);
  }
 
  private processFile(file: File): void {
    if (!this.allowedTypes.includes(file.type)) {
      alert('Invalid file type. Please upload a PDF, DOC, or DOCX file.');
      return;
    }
    if (file.size > this.maxFileSizeBytes) {
      alert(`File is too large (${this.formatFileSize(file.size)}). Maximum allowed size is 5 MB.`);
      return;
    }
    this.resumeFile = file;
  }
 
  removeFile(event: MouseEvent): void {
    event.stopPropagation();
    this.resumeFile = null;
  }
 
  formatFileSize(bytes: number): string {
    if (bytes < 1024)       return `${bytes} B`;
    if (bytes < 1048576)    return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(2)} MB`;
  }
 
  // ── Navigation ───────────────────────────────────────────
  goBack(): void {
    if (window.history.length > 1) {
     window.history.back();
    } else {
      window.location.href = '/';
    }
  }
 
  // ── Form Submission ──────────────────────────────────────
  onSubmit(): void {
    this.submitted = true;
 
    // Mark all fields as touched to trigger validation display
    this.careerForm.markAllAsTouched();
 
    if (this.careerForm.invalid || !this.resumeFile) {
      this.scrollToFirstError();
      return;
    }
 
    this.isLoading = true;
 
    // Simulate API submission (replace with actual HTTP call)
    const payload = this.buildPayload();
    console.log('[CareerComponent] Submitting application:', payload);
 
    setTimeout(() => {
      this.isLoading   = false;
      this.isSubmitted = true;
      this.currentStep = 4; // all steps done
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1800);
 
    /*
    // ── Real API call example ──────────────────────────────
    // Replace the setTimeout block above with:
    //
    // const formData = new FormData();
    // Object.entries(payload).forEach(([k, v]) => formData.append(k, String(v)));
    // if (this.resumeFile) formData.append('resume', this.resumeFile);
    //
    // this.http.post('/api/careers/apply', formData).subscribe({
    //   next: () => {
    //     this.isLoading   = false;
    //     this.isSubmitted = true;
    //     this.currentStep = 4;
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    //   },
    //   error: (err) => {
    //     this.isLoading = false;
    //     console.error('[CareerComponent] Submission error:', err);
    //     alert('Something went wrong. Please try again later.');
    //   }
    // });
    */
  }
 
  private buildPayload(): Partial<CareerFormValue> & { resumeFileName?: string } {
    const v = this.careerForm.value as CareerFormValue;
    return {
      fullName:       v.fullName.trim(),
      email:          v.email.trim().toLowerCase(),
      phone:          v.phone.trim(),
      experience:     v.experience,
      department:     v.department,
      role:           v.role,
      workMode:       v.workMode   || undefined,
      joinDate:       v.joinDate   || undefined,
      portfolio:      v.portfolio  || undefined,
      additionalInfo: v.additionalInfo || undefined,
      resumeFileName: this.resumeFile?.name,
    };
  }
 
  private scrollToFirstError(): void {
    setTimeout(() => {
      const el = document.querySelector('.field-error, .drop-zone.drop-error');
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }
 
  // ── Reset ────────────────────────────────────────────────
  resetForm(): void {
    this.careerForm.reset({ consent: false });
    this.resumeFile    = null;
    this.isSubmitted   = false;
    this.submitted     = false;
    this.isLoading     = false;
    this.availableRoles = [];
    this.currentStep   = 1;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
