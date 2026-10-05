import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { LanguageService } from '../../core/services/language.service';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, DecimalPipe, TranslatePipe, MatButtonModule, MatIconModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  lang = inject(LanguageService);

  showMore = signal(false);
  toggleShowMore() { this.showMore.set(!this.showMore()); }

  activeSlide        = signal(0);
  activeProjectSlide = signal(0);

  activitySlides = [
    { img: 'images/ashrm/aboutPageImages/kolatam.png',               caption: 'MCT Meditation Hall at Rajampet.' },
    { img: 'images/ashrm/aboutPageImages/drinkingwater.png',          caption: 'MCT Free Drinking Water At Mellacheruvu.' },
    { img: 'images/ashrm/aboutPageImages/clothes_distribution.png',   caption: 'Clothes Distribution At Mellacheruvu.' },
    { img: 'images/ashrm/aboutPageImages/momentos1.png',              caption: 'Presentation Memento Trophy At Mellacheruvu.' },
    { img: 'images/ashrm/aboutPageImages/harikatha-12.png',           caption: 'TARIGONDA VENGAMAMBA - HARIKATHA At Mellacheruvu.' },
    { img: 'images/ashrm/aboutPageImages/koneru.png',                 caption: 'Srivari Pushkarini At Mellacheruvu.' },
    { img: 'images/ashrm/aboutPageImages/rathostavam_21.png',         caption: 'Annual Rathostavam At Mellacheruvu.' },
    { img: 'images/ashrm/aboutPageImages/activities_2.png',           caption: 'Varuna Yagnam Chaturmasya Deeksha At Mellacheruvu.' },
    { img: 'images/ashrm/aboutPageImages/srihari.png',                caption: 'Srinivasa Kalynam At Mellacheruvu.' }
  ];

  projectSlides = [
    { img: 'images/ashrm/aboutPageImages/goshala_mct.png',          caption: 'GOSHALA' },
    { img: 'images/ashrm/aboutPageImages/planting_3.png',            caption: 'PLANTING' },
    { img: 'images/ashrm/aboutPageImages/annadanam_rajampet1.png',   caption: 'NITHYA ANNADHANAM' },
    { img: 'images/ashrm/aboutPageImages/swach_bharat_Mct.png',      caption: 'SWACHH BHARAT' },
    { img: 'images/ashrm/aboutPageImages/spxl_events4.png',          caption: 'SPIRITUAL ACTIVITIES' }
  ];

  outreachCards = [
    { img: 'images/ashrm/aboutPageImages/plantation_1.png', titleKey: 'about.outreach_plantation_title', descKey: 'about.outreach_plantation_desc' },
    { img: 'images/ashrm/aboutPageImages/welfare.png',      titleKey: 'about.outreach_rural_title',       descKey: 'about.outreach_rural_desc' },
    { img: 'images/ashrm/aboutPageImages/schooling.png',    titleKey: 'about.outreach_school_title',      descKey: 'about.outreach_school_desc' }
  ];

  educationCards = [
    { img: 'images/ashrm/aboutPageImages/vedadym.png',           titleKey: 'about.edu_veda_title',    descKey: 'about.edu_veda_desc' },
    { img: 'images/ashrm/aboutPageImages/getabodha_ashrm.png',   titleKey: 'about.edu_geetha_title',  descKey: 'about.edu_geetha_desc' },
    { img: 'images/ashrm/aboutPageImages/books_distribution3.png', titleKey: 'about.edu_welfare_title', descKey: 'about.edu_welfare_desc' }
  ];

  prevSlide()        { const l = this.activitySlides.length; this.activeSlide.set((this.activeSlide() - 1 + l) % l); }
  nextSlide()        { this.activeSlide.set((this.activeSlide() + 1) % this.activitySlides.length); }
  prevProjectSlide() { const l = this.projectSlides.length; this.activeProjectSlide.set((this.activeProjectSlide() - 1 + l) % l); }
  nextProjectSlide() { this.activeProjectSlide.set((this.activeProjectSlide() + 1) % this.projectSlides.length); }
  goToSlide(i: number)        { this.activeSlide.set(i); }
  goToProjectSlide(i: number) { this.activeProjectSlide.set(i); }

  get projects(): string[] { return this.lang.translations()?.['about']?.['projects'] ?? []; }
  get ongoing():  string[] { return this.lang.translations()?.['about']?.['ongoing']  ?? []; }
  get future():   string[] { return this.lang.translations()?.['about']?.['future']   ?? []; }
}
