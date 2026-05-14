
// @Component({
//   selector: 'app-privacypolicy',
//   imports: [],
//   templateUrl: './privacypolicy.html',
//   styleUrl: './privacypolicy.scss',
// })
// export class Privacypolicy {

// }

import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FaqTabIconPipe } from '../landingpage/landingpage';

@Component({
  selector: 'app-privacypolicy',
  imports: [CommonModule, FormsModule,],
 templateUrl: './privacypolicy.html',
  styleUrls: ['./privacypolicy.scss'],
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class Privacypolicy {

  sections = [
    {
      icon: 'bi-info-circle',
      bg: '#E6F1FB', color: '#185FA5',
      title: 'Information we collect',
      open: true,
      content: `
        <p>We collect information you provide directly when you create an account, enroll in a course, or contact support.</p>
        <ul>
          <li>Account information: name, email address, and password</li>
          <li>Profile information: photo, bio, skills, and learning goals</li>
          <li>Payment information: processed securely via third-party providers — we never store card details</li>
          <li>Usage data: courses viewed, progress, quiz scores, and completion certificates</li>
          <li>Device and browser information collected automatically</li>
        </ul>
        <div class="pp-highlight">
          <i class="bi bi-check-circle-fill me-2"></i>
          We never sell your personal information to advertisers or third parties.
        </div>
      `
    },
    {
      icon: 'bi-database',
      bg: '#E1F5EE', color: '#0F6E56',
      title: 'How we use your data',
      open: false,
      content: `
        <p>We use the information we collect to provide, improve, and personalise your learning experience.</p>
        <ul>
          <li>Deliver and personalise course recommendations based on your interests</li>
          <li>Process payments and issue certificates of completion</li>
          <li>Send important account and course updates (you can opt out of marketing emails)</li>
          <li>Analyse platform performance and fix bugs</li>
          <li>Comply with legal obligations and prevent fraud</li>
        </ul>
      `
    },
    {
      icon: 'bi-share',
      bg: '#FAEEDA', color: '#854F0B',
      title: 'Data sharing & third parties',
      open: false,
      content: `
        <p>We share your data only with trusted partners who help us operate our platform. All third parties are contractually bound to protect your data.</p>
        <ul>
          <li>Payment processors (Razorpay, Stripe) for secure transactions</li>
          <li>Cloud infrastructure providers for hosting and storage</li>
          <li>Analytics tools to understand platform usage (anonymised data only)</li>
          <li>Email service providers to deliver transactional messages</li>
        </ul>
      `
    },
    {
      icon: 'bi-lock',
      bg: '#EEEDFE', color: '#534AB7',
      title: 'Data security',
      open: false,
      content: `
        <p>We implement industry-standard protections for your personal data.</p>
        <ul>
          <li>All data transmitted is encrypted with TLS 1.3</li>
          <li>Passwords are hashed using bcrypt — even we cannot read them</li>
          <li>Regular security audits and penetration testing</li>
          <li>Role-based access controls limit internal data access</li>
          <li>Automated alerts for suspicious login activity</li>
        </ul>
        <div class="pp-highlight">
          <i class="bi bi-shield-check me-2"></i>
          In the event of a data breach, we will notify you within 72 hours.
        </div>
      `
    },
    {
      icon: 'bi-cookie',
      bg: '#EAF3DE', color: '#3B6D11',
      title: 'Cookies & tracking',
      open: false,
      content: `
        <p>We use cookies and similar technologies to keep you logged in, remember preferences, and understand platform usage.</p>
        <ul>
          <li>Essential cookies: required for authentication and core functionality</li>
          <li>Preference cookies: remember your language, theme, and accessibility settings</li>
          <li>Analytics cookies: help us understand which features are most useful (opt-out available)</li>
        </ul>
        <p>Manage or disable non-essential cookies anytime through your browser or account settings.</p>
      `
    },
    {
      icon: 'bi-person-check',
      bg: '#FAECE7', color: '#993C1D',
      title: 'Your rights & choices',
      open: false,
      content: `
        <p>Depending on your location, you may have the following rights:</p>
        <ul>
          <li>Access: request a copy of data we hold about you</li>
          <li>Correction: update inaccurate or incomplete information</li>
          <li>Deletion: request erasure of your account and associated data</li>
          <li>Portability: export your data in a machine-readable format</li>
          <li>Opt-out: unsubscribe from marketing emails at any time</li>
          <li>Objection: object to processing based on legitimate interests</li>
        </ul>
      `
    },
    {
      icon: 'bi-people',
      bg: '#F1EFE8', color: '#5F5E5A',
      title: "Children's privacy",
      open: false,
      content: `
        <p>Our platform is intended for users aged 13 and above. We do not knowingly collect data from children under 13.</p>
        <p>If you are a parent or guardian and believe your child has provided personal data without consent, contact us at <a href="mailto:privacy@yourplatform.com">privacy@yourplatform.com</a> and we will delete it promptly.</p>
      `
    },
    {
      icon: 'bi-envelope',
      bg: '#E6F1FB', color: '#185FA5',
      title: 'Contact us',
      open: false,
      content: `
        <p>For any questions, concerns, or data requests regarding this policy, please contact us.</p>
        <div class="pp-contact-grid">
          <div class="pp-contact-item">
            <i class="bi bi-envelope-fill"></i>
            <div>
              <small>Email</small>
              <span>privacy@yourplatform.com</span>
            </div>
          </div>
          <div class="pp-contact-item">
            <i class="bi bi-clock-fill"></i>
            <div>
              <small>Response time</small>
              <span>Within 48 hours</span>
            </div>
          </div>
          <div class="pp-contact-item">
            <i class="bi bi-geo-alt-fill"></i>
            <div>
              <small>Address</small>
              <span>Bhopal, Madhya Pradesh, IN</span>
            </div>
          </div>
        </div>
      `
    }
  ];

  toggle(i: number) {
    this.sections[i].open = !this.sections[i].open;
  }

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const index = parseInt(id.replace('s', ''));
      if (!this.sections[index].open) this.sections[index].open = true;
    }
  }

  back() {
    window.history.back();
  }
}
