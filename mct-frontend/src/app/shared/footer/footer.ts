import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../pipes/translate.pipe';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  lang = inject(LanguageService);
  currentYear = new Date().getFullYear();

  // Replaces {year} token in the rights string with the actual current year
  rights = computed(() =>
    this.lang.get('footer.rights').replace('{year}', String(this.currentYear))
  );
}