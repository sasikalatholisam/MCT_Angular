import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  MAT_BOTTOM_SHEET_DATA,
  MatBottomSheetModule,
  MatBottomSheetRef
} from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { CalendarEvent } from '../calendar-event.model';

@Component({
  selector: 'app-event-detail-sheet',
  standalone: true,
  imports: [DatePipe, MatBottomSheetModule, MatButtonModule, MatIconModule, MatDividerModule, MatChipsModule],
  template: `
    <div class="sheet-container">

      <!-- Hero image -->
      @if (ev.img) {
        <div class="sheet-img" [style.background-image]="'url(' + ev.img + ')'">
          <div class="sheet-img-overlay"></div>
          <span class="sheet-cat-badge" [style.background]="catColor">{{ ev.category }}</span>
        </div>
      }

      <!-- Content -->
      <div class="sheet-body">
        <h2 class="sheet-title">{{ ev.title }}</h2>

        <div class="sheet-meta-row">
          <span class="sheet-meta-item">
            <mat-icon>calendar_today</mat-icon>
            {{ ev.date | date:'EEEE, dd MMMM yyyy' }}
          </span>
          @if (ev.time) {
            <span class="sheet-meta-item">
              <mat-icon>schedule</mat-icon>
              {{ ev.time }}
            </span>
          }
          <span class="sheet-meta-item">
            <mat-icon>location_on</mat-icon>
            {{ ev.venue }}
          </span>
        </div>

        <mat-divider></mat-divider>

        <p class="sheet-desc">{{ ev.description }}</p>

        <div class="sheet-actions">
          <button mat-flat-button class="close-btn" (click)="close()">
            <mat-icon>close</mat-icon> Close
          </button>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .sheet-container { overflow: hidden; border-radius: 16px 16px 0 0; }

    .sheet-img {
      width: 100%;
      height: 220px;
      background-size: cover;
      background-position: center;
      position: relative;
    }
    .sheet-img-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.55));
    }
    .sheet-cat-badge {
      position: absolute; bottom: 14px; left: 16px;
      color: white; font-size: 0.75rem; font-weight: 700;
      padding: 0.25rem 0.75rem; border-radius: 12px;
      text-transform: uppercase; letter-spacing: 0.05em;
    }

    .sheet-body {
      padding: 1.25rem 1.5rem 1.5rem;
    }
    .sheet-title {
      font-size: 1.3rem; font-weight: 700;
      color: #1a1a1a; margin: 0 0 1rem;
    }
    .sheet-meta-row {
      display: flex; flex-wrap: wrap; gap: 0.75rem;
      margin-bottom: 1rem;
    }
    .sheet-meta-item {
      display: flex; align-items: center; gap: 0.3rem;
      font-size: 0.85rem; color: #f86f2d; font-weight: 500;
      mat-icon { font-size: 1rem; width: 1rem; height: 1rem; }
    }
    mat-divider { margin-bottom: 1rem; }
    .sheet-desc {
      font-size: 0.95rem; color: #4a5562;
      line-height: 1.8; margin: 0 0 1.5rem;
    }
    .sheet-actions { display: flex; justify-content: flex-end; }
    .close-btn {
      background-color: #f86f2d !important;
      color: white !important;
    }

    @media (max-width: 480px) {
      .sheet-img { height: 160px; }
      .sheet-body { padding: 1rem; }
      .sheet-title { font-size: 1.1rem; }
    }
  `]
})
export class EventDetailSheet {
  ev: CalendarEvent    = inject(MAT_BOTTOM_SHEET_DATA);
  private ref          = inject(MatBottomSheetRef<EventDetailSheet>);

  categoryColor: Record<string, string> = {
    Daily:'#4caf50', Weekly:'#2196f3', Monthly:'#9c27b0',
    Annual:'#f86f2d', Ongoing:'#ff9800', Special:'#e91e63'
  };

  get catColor(): string { return this.categoryColor[this.ev.category] ?? '#f86f2d'; }

  close() { this.ref.dismiss(); }
}
