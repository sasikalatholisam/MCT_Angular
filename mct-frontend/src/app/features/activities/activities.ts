import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { LanguageService } from '../../core/services/language.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-activities',
  standalone: true,
  imports: [RouterLink, TranslatePipe, MatCardModule, MatIconModule, MatButtonModule, MatChipsModule],
  templateUrl: './activities.html',
  styleUrl: './activities.scss'
})
export class Activities {
  lang = inject(LanguageService);

  get activities(): { title: string; desc: string }[] {
    return this.lang.translations()?.['home']?.['activities'] ?? [];
  }

  activityIcons = ['self_improvement','water_drop','volunteer_activism','spa','menu_book','fitness_center'];

  cards = [
    { img: 'images/ashrm/aboutPageImages/kolatam.png',              titleKey: 'about.activities_title',       descKey: 'about.activities_text1' },
    { img: 'images/ashrm/aboutPageImages/drinkingwater.png',         titleKey: 'about.outreach_rural_title',   descKey: 'about.outreach_rural_desc' },
    { img: 'images/ashrm/aboutPageImages/clothes_distribution.png',  titleKey: 'about.outreach_school_title',  descKey: 'about.outreach_school_desc' },
    { img: 'images/ashrm/aboutPageImages/plantation_1.png',          titleKey: 'about.outreach_plantation_title', descKey: 'about.outreach_plantation_desc' },
    { img: 'images/ashrm/aboutPageImages/annadanam_rajampet1.png',   titleKey: 'about.edu_welfare_title',      descKey: 'about.edu_welfare_desc' },
    { img: 'images/ashrm/aboutPageImages/books_distribution3.png',   titleKey: 'about.edu_veda_title',         descKey: 'about.edu_veda_desc' },
  ];
}
