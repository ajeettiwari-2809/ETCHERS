import { Component, HostListener, OnInit, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";


 @Pipe({ name: 'faqTabIcon', standalone: true })
export class FaqTabIconPipe implements PipeTransform {
  transform(tabs: { key: string; icon: string }[], key: string): string {
    return tabs.find(t => t.key === key)?.icon ?? 'bi bi-question-circle';
  }
}
  
@Component({
  selector: 'app-landingpage',
  imports: [CommonModule, FormsModule, FaqTabIconPipe, RouterLink],
  templateUrl: './landingpage.html',
  styleUrls: ['./landingpage.scss'],
})
export class Landingpage implements OnInit

{

  showScrollTop = false;
  selectedAmount = 500;
  customAmount: number | null = null;

  donationAmounts = [100, 500, 1000, 2500, 5000, 10000];

  causesDummy = [
    {
      title: 'Education for Children',
      description: 'Providing quality education, books, and scholarships to underprivileged children across rural India.',
      icon: 'bi bi-book-half',
      colorClass: 'cause-blue',
      percent: 78,
      dashOffset: Math.round(163 * (1 - 0.78)),
      beneficiaries: '12,000 Children',
      locations: '8 States',
      raised: '₹48L'
    },
    {
      title: 'Healthcare & Medical Aid',
      description: 'Free medical camps, medicines, and health screenings in remote villages without hospital access.',
      icon: 'bi bi-heart-pulse-fill',
      colorClass: 'cause-red',
      percent: 65,
      dashOffset: Math.round(163 * (1 - 0.65)),
      beneficiaries: '30,000+ Patients',
      locations: '12 Districts',
      raised: '₹72L'
    },
    {
      title: 'Clean Water Initiative',
      description: 'Installing clean water systems and teaching hygiene practices in areas facing water scarcity.',
      icon: 'bi bi-droplet-fill',
      colorClass: 'cause-cyan',
      percent: 55,
      dashOffset: Math.round(163 * (1 - 0.55)),
      beneficiaries: '8,500 Families',
      locations: '45 Villages',
      raised: '₹25L'
    },
    {
      title: 'Women Empowerment',
      description: 'Skill development, micro-finance, and legal aid to enable women to lead independent lives.',
      icon: 'bi bi-gender-female',
      colorClass: 'cause-purple',
      percent: 82,
      dashOffset: Math.round(163 * (1 - 0.82)),
      beneficiaries: '6,200 Women',
      locations: '6 States',
      raised: '₹38L'
    },
    {
      title: 'Environmental Conservation',
      description: 'Tree plantation drives, waste management, and eco-awareness campaigns in urban and rural areas.',
      icon: 'bi bi-tree-fill',
      colorClass: 'cause-green',
      percent: 70,
      dashOffset: Math.round(163 * (1 - 0.70)),
      beneficiaries: '50,000+ Trees',
      locations: '20 Cities',
      raised: '₹15L'
    },
    {
      title: 'Shelter & Disaster Relief',
      description: 'Emergency shelter, food, and rehabilitation support for disaster-affected communities.',
      icon: 'bi bi-house-heart-fill',
      colorClass: 'cause-orange',
      percent: 90,
      dashOffset: Math.round(163 * (1 - 0.90)),
      beneficiaries: '4,000 Families',
      locations: '3 States',
      raised: '₹60L'
    }
  ];
  causes = [
  {
    title: 'Graphic Design',
    description: 'Creative branding, posters, social media creatives, and marketing designs for businesses and NGOs.',
    icon: 'bi bi-palette-fill',
    colorClass: 'cause-blue',
    percent: 85,
    dashOffset: Math.round(163 * (1 - 0.85)),
    beneficiaries: '1,200+ Projects',
    locations: 'Global Clients',
    raised: '5'
  },
  {
    title: 'Mobile & Website Development',
    description: 'Building modern mobile apps and responsive websites for startups, NGOs, and businesses.',
    icon: 'bi bi-code-slash',
    colorClass: 'cause-purple',
    percent: 92,
    dashOffset: Math.round(163 * (1 - 0.92)),
    beneficiaries: '800+ Apps/Websites',
    locations: '10+ Countries',
    raised: '3'
  },
  {
    title: 'Freelancing Support',
    description: 'Helping individuals start freelancing careers with training, projects, and portfolio building.',
    icon: 'bi bi-laptop',
    colorClass: 'cause-green',
    percent: 76,
    dashOffset: Math.round(163 * (1 - 0.76)),
    beneficiaries: '5,000+ Freelancers',
    locations: 'India & Remote',
    raised: '10'
  },
  {
    title: 'UI/UX Design',
    description: 'User-centered interface design for apps and websites focusing on usability and experience.',
    icon: 'bi bi-bezier',
    colorClass: 'cause-cyan',
    percent: 88,
    dashOffset: Math.round(163 * (1 - 0.88)),
    beneficiaries: '600+ Designs',
    locations: 'Global Clients',
    raised: '10'
  },
  {
    title: 'Productivity & Digital Skills',
    description: 'Training in tools, productivity systems, and digital literacy for students and professionals.',
    icon: 'bi bi-graph-up-arrow',
    colorClass: 'cause-orange',
    percent: 70,
    dashOffset: Math.round(163 * (1 - 0.70)),
    beneficiaries: '10,000+ Learners',
    locations: '15 States',
    raised: '11'
  },
  {
    title: 'Photography & Fine Art',
    description: 'Professional photography, editing, and fine art creation for brands, events, and exhibitions.',
    icon: 'bi bi-camera-fill',
    colorClass: 'cause-red',
    percent: 80,
    dashOffset: Math.round(163 * (1 - 0.80)),
    beneficiaries: '2,000+ Projects',
    locations: 'Major Cities',
    raised: '15'
  }
];

  impactStatsDummy = [
    { icon: 'bi bi-people-fill', value: '50,000+', label: 'Lives Impacted', barPct: 85 },
    { icon: 'bi bi-book-fill', value: '12,000+', label: 'Children Educated', barPct: 70 },
    { icon: 'bi bi-heart-pulse-fill', value: '200+', label: 'Medical Camps', barPct: 60 },
    { icon: 'bi bi-droplet-fill', value: '45', label: 'Water Projects', barPct: 55 },
    { icon: 'bi bi-tree-fill', value: '50,000', label: 'Trees Planted', barPct: 75 },
    { icon: 'bi bi-geo-alt-fill', value: '120+', label: 'Villages Reached', barPct: 80 },
    { icon: 'bi bi-cash-stack', value: '₹2Cr+', label: 'Funds Raised', barPct: 90 },
    { icon: 'bi bi-award-fill', value: '15+', label: 'Awards Won', barPct: 65 }
  ];
  impactStats = [
  { icon: 'bi bi-code-slash', value: '800+', label: 'Web & App Projects Delivered', barPct: 92 },
  { icon: 'bi bi-palette-fill', value: '1,200+', label: 'Design Projects Completed', barPct: 88 },
  { icon: 'bi bi-people-fill', value: '5,000+', label: 'Freelancers Trained', barPct: 80 },
  { icon: 'bi bi-bezier', value: '600+', label: 'UI/UX Designs Created', barPct: 85 },
  { icon: 'bi bi-laptop', value: '10,000+', label: 'Digital Learners Supported', barPct: 78 },
  { icon: 'bi bi-globe2', value: '15+', label: 'Countries Reached', barPct: 70 },
  { icon: 'bi bi-cash-stack', value: '₹1.5Cr+', label: 'Project Value Delivered', barPct: 90 },
  { icon: 'bi bi-trophy-fill', value: '25+', label: 'Industry Recognitions', barPct: 65 }
];

  programsDummy = [
    {
      title: 'Education Program',
      icon: 'bi bi-mortarboard-fill',
      bg: 'prog-bg-blue',
      desc: 'Scholarships, digital learning centres, and teacher training to uplift education quality.',
      points: ['Free books & uniforms', 'Digital classrooms', 'Scholarship portal', 'Dropout prevention']
    },
    {
      title: 'Health & Wellness',
      icon: 'bi bi-activity',
      bg: 'prog-bg-red',
      desc: 'Mobile health units, nutrition programmes and mental health awareness drives.',
      points: ['Mobile medical vans', 'Nutrition counselling', 'Mental health camps', 'Maternal care']
    },
    {
      title: 'Livelihood Skills',
      icon: 'bi bi-briefcase-fill',
      bg: 'prog-bg-green',
      desc: 'Vocational training, self-help groups, and micro-finance to create self-reliant communities.',
      points: ['Skill training centres', 'Micro-finance access', 'Market linkages', 'SHG support']
    },
    {
      title: 'Environment & Climate',
      icon: 'bi bi-flower1',
      bg: 'prog-bg-teal',
      desc: 'Sustainable farming, renewable energy adoption and biodiversity protection projects.',
      points: ['Solar installations', 'Organic farming', 'Watershed management', 'Eco-education']
    }
  ];

  programs = [
  {
    title: 'Web & App Development',
    icon: 'bi bi-code-slash',
    bg: 'prog-bg-blue',
    desc: 'Full-stack development training and real-world project building for websites and mobile apps.',
    points: [
      'Frontend & Backend training',
      'Real client projects',
      'API integration skills',
      'Deployment & hosting'
    ]
  },
  {
    title: 'UI/UX Design',
    icon: 'bi bi-bezier',
    bg: 'prog-bg-purple',
    desc: 'User-centered design training focused on modern interfaces, experience design, and prototyping.',
    points: [
      'Figma & design tools',
      'Mobile & web UI systems',
      'Prototyping & wireframing',
      'Design systems creation'
    ]
  },
  {
    title: 'Freelancing & Career Growth',
    icon: 'bi bi-laptop',
    bg: 'prog-bg-green',
    desc: 'Help individuals build income through freelancing platforms and remote digital work.',
    points: [
      'Profile building (Upwork/Fiverr)',
      'Client communication skills',
      'Portfolio development',
      'Real earning strategies'
    ]
  },
  {
    title: 'Digital Productivity & Skills',
    icon: 'bi bi-graph-up-arrow',
    bg: 'prog-bg-teal',
    desc: 'Essential digital skills, tools, and productivity systems for students and professionals.',
    points: [
      'Time management systems',
      'AI tools & automation',
      'Google Workspace mastery',
      'Digital workflow setup'
    ]
  }
];

  teamMembers = [
  {
    name: 'Ajeet Tiwari',
    role: 'Founder & Technology Director',
    bio: 'Flutter and Angular developer leading digital education, software development training, and community-focused technology initiatives.'
  },
  {
    name: 'Rahul Singh',
    role: 'Head of Web & App Development',
    bio: 'Specialist in full-stack web and mobile application development with experience in live projects, Firebase integration, and deployment systems.'
  },
  {
    name: 'Priya Sharma',
    role: 'UI/UX & Creative Design Lead',
    bio: 'Creative designer focused on modern UI/UX systems, responsive interfaces, branding, and user-centered digital experiences.'
  },
  {
    name: 'Neha Verma',
    role: 'Career & Freelancing Mentor',
    bio: 'Guides students and professionals in freelancing platforms, portfolio building, remote work opportunities, and career growth strategies.'
  },
  {
    name: 'Rohit Patel',
    role: 'AI & Digital Productivity Trainer',
    bio: 'Works on AI tools, automation systems, and digital productivity training to help individuals improve efficiency and smart workflows.'
  },
  {
    name: 'Sanjay Mishra',
    role: 'Community Skill Development Coordinator',
    bio: 'Leads youth empowerment and digital literacy programs focused on rural development, computer education, and community engagement.'
  }
];

  testimonialsDummy = [
    {
      text: 'Thanks to HopeForward, my daughter got a scholarship and today she is in college. I never imagined this was possible.',
      name: 'Sunita Devi',
      location: 'Rajasthan'
    },
    {
      text: 'The medical camp came to our village just in time. My husband got the surgery he needed — free of cost. God bless them.',
      name: 'Kalavati Bai',
      location: 'Chhattisgarh'
    },
    {
      text: 'After joining the women\'s skill training programme, I now run my own tailoring unit. I am independent and proud.',
      name: 'Rekha Kumari',
      location: 'Bihar'
    }
  ];
  testimonials = [
  {
    text: 'I joined HopeForward and learned web development. Today I build websites for clients and earn online as a freelancer.',
    name: 'Aman Sharma',
    role: 'Web Developer (Freelancer)'
  },
  {
    text: 'The UI/UX training helped me get my first design project. Now I work with international clients remotely.',
    name: 'Priya Mehta',
    role: 'UI/UX Designer'
  },
  {
    text: 'Before joining, I had no direction. Now I earn through freelancing and have completed multiple real-world projects.',
    name: 'Rahul Verma',
    role: 'Full-Stack Developer'
  }
];

  eventsDummy = [
    {
      day: '15', month: 'Jun', title: 'Annual Fundraising Gala 2025',
      type: 'Fundraiser', icon: 'bi bi-stars',
      location: 'Taj Hotel, Mumbai', time: '7:00 PM IST',
      spots: 50, colorClass: 'badge-gold'
    },
    {
      day: '22', month: 'Jun', title: 'Community Health Mega Camp',
      type: 'Health Camp', icon: 'bi bi-heart-pulse-fill',
      location: 'Dharavi, Mumbai', time: '9:00 AM IST',
      spots: 200, colorClass: 'badge-red'
    },
    {
      day: '05', month: 'Jul', title: 'Tree Plantation Drive',
      type: 'Environment', icon: 'bi bi-tree-fill',
      location: 'Sanjay Gandhi NP', time: '6:30 AM IST',
      spots: 120, colorClass: 'badge-green'
    }
  ];
  events = [
  {
    day: '15', month: 'Jun', title: 'Full-Stack Web Development Bootcamp',
    type: 'Coding Bootcamp', icon: 'bi bi-code-slash',
    location: 'Online Live Class', time: '7:00 PM IST',
    spots: 100, colorClass: 'badge-gold'
  },
  {
    day: '22', month: 'Jun', title: 'UI/UX Design Masterclass',
    type: 'Design Workshop', icon: 'bi bi-bezier',
    location: 'Virtual Workshop', time: '6:00 PM IST',
    spots: 80, colorClass: 'badge-red'
  },
  {
    day: '05', month: 'Jul', title: 'Freelancing & Remote Income Session',
    type: 'Career Training', icon: 'bi bi-laptop',
    location: 'Online Webinar', time: '5:30 PM IST',
    spots: 150, colorClass: 'badge-green'
  }
];

  partnersDummy = [
    { name: 'UNICEF India', icon: 'bi bi-globe-asia-australia' },
    { name: 'Tata Trusts', icon: 'bi bi-buildings-fill' },
    { name: 'Bill & Melinda Gates', icon: 'bi bi-bank2' },
    { name: 'Government of India', icon: 'bi bi-flag-fill' },
    { name: 'Infosys Foundation', icon: 'bi bi-cpu-fill' },
    { name: 'WHO India', icon: 'bi bi-hospital-fill' }
  ];

  partners = [
  { name: 'Angular', icon: 'bi bi-code-slash' },
  { name: 'Figma', icon: 'bi bi-bezier' },
  { name: 'Flutter', icon: 'bi bi-phone' },
  { name: 'Firebase', icon: 'bi bi-fire' },
  { name: 'GitHub', icon: 'bi bi-github' },
  { name: 'VS Code', icon: 'bi bi-terminal-fill' },
  { name: 'Canva', icon: 'bi bi-palette-fill' },
  { name: 'Notion', icon: 'bi bi-journal-text' }

];

  footerUpdatesDummy = [
    {
      icon: 'bi bi-newspaper text-primary',
      text: '200 children enrolled in Pune digital literacy programme',
      date: 'May 2025'
    },
    {
      icon: 'bi bi-heart-pulse-fill text-danger',
      text: 'Free eye camp conducted in Vidarbha — 500 beneficiaries',
      date: 'April 2025'
    },
    {
      icon: 'bi bi-award-fill text-warning',
      text: 'HopeForward wins State NGO Excellence Award 2025',
      date: 'March 2025'
    }
  ];
  footerUpdates = [
  {
    icon: 'bi bi-code-slash text-primary',
    text: '300+ developers completed full-stack web development training',
    date: 'May 2025'
  },
  {
    icon: 'bi bi-bezier text-purple',
    text: 'UI/UX design cohort completed 150+ real-world project designs',
    date: 'April 2025'
  },
  {
    icon: 'bi bi-laptop text-success',
    text: 'Freelancing program helped 500+ learners start earning online',
    date: 'March 2025'
  }
];


  // ── FAQ DATA ────────────────────────────────────────────────────
  activeFaqTab = 'about';
  openFaqIndex: number | null = 0;
 
  faqTabs = [
    { key: 'about',      label: 'About ETCHERS',        icon: 'bi bi-info-circle-fill' },
    { key: 'services',   label: 'Web & App Dev',         icon: 'bi bi-code-slash' },
    { key: 'design',     label: 'Design Services',       icon: 'bi bi-palette-fill' },
    { key: 'freelance',  label: 'Freelancing & Career',  icon: 'bi bi-person-workspace' },
    { key: 'learning',   label: 'Digital Learning',      icon: 'bi bi-laptop' },
    { key: 'pricing',    label: 'Pricing & Payments',    icon: 'bi bi-cash-stack' },
  ];
 
  faqData: Record<string, { q: string; a: string; icon: string }[]> = {
    about: [
      {
        icon: 'bi bi-buildings',
        q: 'What is ETCHERS?',
        a: 'ETCHERS is a full-service digital agency and skill development platform. We deliver high-quality web & app projects, UI/UX designs, and professional freelancing training — having touched 10,000+ digital learners across 15+ countries and delivered over ₹1.5Cr+ in project value.'
      },
      {
        icon: 'bi bi-trophy-fill',
        q: 'What recognitions has ETCHERS received?',
        a: 'ETCHERS has earned 25+ industry recognitions for excellence in digital services and freelancer training. Our work spans 800+ web & app projects and 1,200+ design projects, earning us a trusted reputation among global clients and learners alike.'
      },
      {
        icon: 'bi bi-globe2',
        q: 'Where does ETCHERS operate?',
        a: 'We operate across 15+ countries with a strong remote-first model. Our core team and trainers are based in India, while our clients and trained freelancers span South Asia, the Middle East, Europe, and North America.'
      },
      {
        icon: 'bi bi-shield-check',
        q: 'Is ETCHERS a reliable partner for my project?',
        a: 'Absolutely. With 800+ successfully delivered web & app projects, a client satisfaction rate above 95%, and ₹1.5Cr+ in total project value, ETCHERS has a proven delivery track record. We follow agile workflows with clear milestones and transparent communication throughout.'
      },
    ],
    services: [
      {
        icon: 'bi bi-code-slash',
        q: 'What web and app development services does ETCHERS offer?',
        a: 'We offer end-to-end web development (React, Angular, Next.js, WordPress), mobile app development (Flutter, React Native), backend APIs, e-commerce stores, SaaS platforms, and custom web portals. We have delivered 800+ projects across these categories.'
      },
      {
        icon: 'bi bi-phone',
        q: 'Do you build mobile apps for both Android and iOS?',
        a: 'Yes. We build cross-platform apps using Flutter and React Native, delivering apps for both Android and iOS from a single codebase — saving cost and time. We also handle Play Store and App Store submission and post-launch support.'
      },
      {
        icon: 'bi bi-clock-history',
        q: 'How long does a typical web project take?',
        a: 'A standard business website takes 2–4 weeks. A complex web application or e-commerce platform typically takes 6–12 weeks depending on scope. We provide a detailed timeline after your free discovery call.'
      },
      {
        icon: 'bi bi-arrow-repeat',
        q: 'Do you offer post-launch maintenance and support?',
        a: 'Yes. We offer monthly maintenance plans covering bug fixes, performance monitoring, security updates, and feature enhancements. Our support team is available Mon–Sat 9AM–6PM IST with a guaranteed 24-hour response SLA.'
      },
    ],
    design: [
      {
        icon: 'bi bi-palette-fill',
        q: 'What design services does ETCHERS provide?',
        a: 'We offer brand identity design (logos, style guides), UI/UX design for websites and apps, social media creatives, pitch deck design, product packaging, and motion graphics. We have completed 1,200+ design projects and 600+ UI/UX designs.'
      },
      {
        icon: 'bi bi-bezier',
        q: 'What tools do your designers use?',
        a: 'Our designers work with Figma (primary), Adobe XD, Illustrator, Photoshop, and After Effects. All UI/UX deliverables include organised Figma files with auto-layout, components, and developer handoff specs.'
      },
      {
        icon: 'bi bi-layers',
        q: 'Can I get only a UI design without development?',
        a: 'Yes, absolutely. We offer design-only engagements — from wireframes and prototypes to fully polished high-fidelity UI screens. You receive all Figma source files and export assets ready for your dev team.'
      },
      {
        icon: 'bi bi-chat-dots',
        q: 'How many design revisions are included?',
        a: 'Our standard design packages include 3 rounds of revisions. Additional revisions are available at a nominal per-round cost. We also offer unlimited-revision plans for long-term retainer clients.'
      },
    ],
    freelance: [
      {
        icon: 'bi bi-person-workspace',
        q: 'What is the ETCHERS Freelancing Programme?',
        a: 'The ETCHERS Freelancing Programme is a structured training course that has empowered 5,000+ freelancers to build sustainable careers. It covers client acquisition, proposal writing, pricing, project management, platform mastery (Upwork, Fiverr, Toptal), and portfolio building.'
      },
      {
        icon: 'bi bi-mortarboard',
        q: 'Who is the freelancing training suitable for?',
        a: 'It is suitable for beginners with zero freelancing experience, designers and developers wanting to go independent, and working professionals seeking a side income. We offer batches in English, Hindi, and regional languages.'
      },
      {
        icon: 'bi bi-currency-rupee',
        q: 'What does a freelancer typically earn after ETCHERS training?',
        a: 'Our trained freelancers report average earnings of ₹30,000–₹1,50,000 per month within 6 months of completing the programme — depending on their skill level, niche, and effort. Many of our alumni now earn in USD and GBP working with international clients.'
      },
      {
        icon: 'bi bi-patch-check',
        q: 'Do I get a certificate after completing the course?',
        a: 'Yes. All programme graduates receive an ETCHERS-verified certificate of completion, which is recognised by leading freelancing platforms and is shareable on LinkedIn. Top performers also get featured on the ETCHERS alumni showcase.'
      },
    ],
    learning: [
      {
        icon: 'bi bi-laptop',
        q: 'What can I learn through ETCHERS digital programmes?',
        a: 'ETCHERS offers digital learning tracks in web development, UI/UX design, graphic design, no-code tools, digital marketing, and freelancing. We have supported 10,000+ digital learners with live classes, recorded modules, and mentorship sessions.'
      },
      {
        icon: 'bi bi-play-circle',
        q: 'Are the courses live or self-paced?',
        a: 'We offer both. Live cohort-based batches run 3–4 times a year with real-time Q&A and peer interaction. Self-paced recorded courses are available for learners who prefer flexibility. All purchases include lifetime access to recordings.'
      },
      {
        icon: 'bi bi-globe2',
        q: 'Are the programmes available internationally?',
        a: 'Yes. Our digital programmes are available to learners in all 15+ countries we serve. International pricing (USD/GBP/AED) is available on request. Live sessions are conducted in IST with recordings available within 24 hours for other time zones.'
      },
      {
        icon: 'bi bi-headset',
        q: 'What support do learners receive during the programme?',
        a: 'Learners get access to a private community, weekly doubt-clearing sessions, 1-on-1 mentor calls (for premium plans), project feedback, and a dedicated support chat. Our average query resolution time is under 4 hours.'
      },
    ],
    pricing: [
      {
        icon: 'bi bi-cash-stack',
        q: 'How is ETCHERS project pricing structured?',
        a: 'We offer three models: fixed-price (defined scope), time & material (flexible scope), and monthly retainer (ongoing work). Prices start at ₹15,000 for a basic website and scale based on complexity. All quotes are detailed with line-item breakdowns — no hidden costs.'
      },
      {
        icon: 'bi bi-credit-card',
        q: 'What payment methods does ETCHERS accept?',
        a: 'We accept UPI, NEFT/RTGS, credit/debit cards, PayPal, Wise, and Stripe for international clients. For projects above ₹50,000, we work on a 50% advance and 50% on delivery milestone schedule.'
      },
      {
        icon: 'bi bi-receipt-cutoff',
        q: 'Do you provide GST invoices?',
        a: 'Yes. ETCHERS is a GST-registered entity. All projects and course purchases include a proper GST invoice. For corporate clients, we also provide vendor registration documents and are empanelled with several MNCs for procurement compliance.'
      },
      {
        icon: 'bi bi-arrow-counterclockwise',
        q: 'What is your refund policy for courses?',
        a: 'We offer a 7-day no-questions-asked refund for all self-paced course purchases if you have not completed more than 20% of the content. For live cohort programmes, refund requests made 48+ hours before the start date are eligible for a full refund.'
      },
    ],
  };
 
  get activeFaqs() {
    return this.faqData[this.activeFaqTab] || [];
  }
 
  switchFaqTab(key: string): void {
    this.activeFaqTab = key;
    this.openFaqIndex = 0;
  }
 
  toggleFaq(index: number): void {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }
 
  // ── END FAQ ─────────────────────────────────────────────────────

  ngOnInit(): void {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.showScrollTop = window.scrollY > 400;
  }

  selectAmount(amt: number): void {
    this.selectedAmount = amt;
    this.customAmount = null;
  }
}