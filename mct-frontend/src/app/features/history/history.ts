import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { LanguageService } from '../../core/services/language.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [RouterLink, TranslatePipe, MatCardModule, MatIconModule, MatButtonModule, MatDividerModule, MatChipsModule],
  templateUrl: './history.html',
  styleUrl: './history.scss'
})
export class History {
  lang = inject(LanguageService);

  get milestones(): { year: string; event: string }[] {
    return this.lang.translations()?.['history']?.['milestones'] ?? [];
  }
}
