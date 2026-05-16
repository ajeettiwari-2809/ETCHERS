


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Publication {
  title: string;
  icon: string;
  coverClass: string;
  desc: string;
  rating?: number;
  pages?: number;
  hours?: string;
  students?: string;
  price?: string;
  originalPrice?: string;
  free: boolean;
  bestseller: boolean;
  features: string[];
}

@Component({
  selector: 'app-publicationpage',
  imports: [FormsModule, CommonModule,],
  templateUrl: './publicationpage.html',
  styleUrls: ['./publicationpage.scss'],
})
export class Publicationpage implements OnInit {

  activeTab = 'all';

  tabs = [
    { key: 'all',         label: 'All',         icon: 'bi-grid' },
    { key: 'ebooks',      label: 'Ebooks',      icon: 'bi-book' },
    { key: 'courses',     label: 'Courses',     icon: 'bi-play-btn' },
    { key: 'free',        label: 'Free',        icon: 'bi-gift' },
    { key: 'bestsellers', label: 'Bestsellers', icon: 'bi-graph-up-arrow' }
  ];

  ebooks: Publication[] = [
    {
      title: 'UI/UX Design Mastery',
      icon: 'bi-palette',
      coverClass: 'ebook-cover-1',
      desc: 'Figma, prototyping, user research & client presentation skills',
      rating: 4.8, pages: 240,
      price: '₹349', originalPrice: '₹799',
      free: false, bestseller: true,
      features: ['240 pages PDF', 'Figma templates included', 'Lifetime access']
    },
    {
      title: 'Freelance Income Blueprint',
      icon: 'bi-currency-rupee',
      coverClass: 'ebook-cover-2',
      desc: 'Build a sustainable freelance business from scratch in 90 days',
      rating: 4.9, pages: 180,
      price: '₹299', originalPrice: '₹699',
      free: false, bestseller: true,
      features: ['180 pages PDF + EPUB', 'Proposal templates', 'Client scripts']
    },
    {
      title: 'Figma for Beginners',
      icon: 'bi-vector-pen',
      coverClass: 'ebook-cover-3',
      desc: 'Your first steps into professional UI design with Figma',
      rating: 4.7, pages: 80,
      free: true, bestseller: false,
      features: ['80 pages PDF', 'Starter Figma file', '100% free']
    },
    {
      title: 'Digital Marketing 101',
      icon: 'bi-graph-up-arrow',
      coverClass: 'ebook-cover-4',
      desc: 'SEO, social media, email campaigns and paid ads explained simply',
      rating: 4.6, pages: 200,
      price: '₹399', originalPrice: '₹899',
      free: false, bestseller: false,
      features: ['200 pages PDF', 'Campaign templates', 'Lifetime access']
    },
    {
      title: 'Python for Automation',
      icon: 'bi-terminal',
      coverClass: 'ebook-cover-1',
      desc: 'Automate your daily tasks and build income-generating scripts',
      rating: 4.8, pages: 160,
      price: '₹449', originalPrice: '₹999',
      free: false, bestseller: true,
      features: ['160 pages PDF', 'Code files included', 'Discord community']
    },
    {
      title: 'Content Writing Handbook',
      icon: 'bi-pencil-square',
      coverClass: 'ebook-cover-2',
      desc: 'Write compelling content that ranks on Google and converts readers',
      rating: 4.5, pages: 140,
      price: '₹199', originalPrice: '₹499',
      free: false, bestseller: false,
      features: ['140 pages PDF', '50 writing prompts', 'SEO checklist']
    }
  ];

  courses: Publication[] = [
    {
      title: 'Full Stack Web Development',
      icon: 'bi-code-slash',
      coverClass: 'course-cover-1',
      desc: 'HTML → CSS → JS → React → Node → MongoDB. Complete roadmap',
      hours: '48', students: '1.2K',
      price: '₹1,499', originalPrice: '₹3,999',
      free: false, bestseller: true,
      features: ['48 hours video', 'Live projects', 'Certificate']
    },
    {
      title: 'Graphic Design Pro',
      icon: 'bi-brush',
      coverClass: 'course-cover-2',
      desc: 'Photoshop, Illustrator, Canva Pro and brand identity design',
      hours: '32', students: '890',
      price: '₹1,199', originalPrice: '₹2,999',
      free: false, bestseller: true,
      features: ['32 hours video', 'Design assets', 'Portfolio projects']
    },
    {
      title: 'Freelancing Masterclass',
      icon: 'bi-laptop',
      coverClass: 'course-cover-3',
      desc: 'Land your first client and earn online — free starter course',
      hours: '8', students: '3.4K',
      free: true, bestseller: false,
      features: ['8 hours video', 'Profile templates', '100% free']
    },
    {
      title: 'Photography & Reels Creation',
      icon: 'bi-camera',
      coverClass: 'course-cover-4',
      desc: 'Shoot, edit and publish professional content for social media',
      hours: '20', students: '560',
      price: '₹899', originalPrice: '₹2,499',
      free: false, bestseller: false,
      features: ['20 hours video', 'Editing presets', 'Certificate']
    },
    {
      title: 'Animation & Motion Design',
      icon: 'bi-play-circle',
      coverClass: 'course-cover-1',
      desc: 'After Effects, Lottie and CSS animations for web and mobile',
      hours: '28', students: '420',
      price: '₹1,299', originalPrice: '₹3,499',
      free: false, bestseller: false,
      features: ['28 hours video', 'Project files', 'Certificate']
    },
    {
      title: 'Productivity Bootcamp',
      icon: 'bi-lightning-charge',
      coverClass: 'course-cover-2',
      desc: 'Notion, time-blocking, deep work systems for digital workers',
      hours: '12', students: '2.1K',
      free: true, bestseller: false,
      features: ['12 hours video', 'Notion templates', '100% free']
    }
  ];

  get filteredEbooks(): Publication[] {
    switch (this.activeTab) {
      case 'free':        return this.ebooks.filter(e => e.free);
      case 'bestsellers': return this.ebooks.filter(e => e.bestseller);
      case 'courses':     return [];
      default:            return this.ebooks;
    }
  }

  get filteredCourses(): Publication[] {
    switch (this.activeTab) {
      case 'free':        return this.courses.filter(c => c.free);
      case 'bestsellers': return this.courses.filter(c => c.bestseller);
      case 'ebooks':      return [];
      default:            return this.courses;
    }
  }

  setTab(key: string) {
    this.activeTab = key;
  }

  ngOnInit(): void {}
}