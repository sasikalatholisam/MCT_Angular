import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { LanguageService } from '../../core/services/language.service';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

// Data & model — edit events.data.ts to manage events
import { CalendarEvent } from './calendar-event.model';
import { MCT_EVENTS } from './events.data';

import { EventDetailSheet } from './event-detail/event-detail-sheet';

// Re-export model so detail sheet can import from one place
export type { CalendarEvent };

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    RouterLink, DatePipe, TranslatePipe, FormsModule,
    MatCardModule, MatButtonModule, MatIconModule,
    MatChipsModule, MatTooltipModule, MatBottomSheetModule,
    MatDividerModule, MatSelectModule, MatFormFieldModule,
  ],
  templateUrl: './events.html',
  styleUrl: './events.scss'
})
export class Events {
  lang          = inject(LanguageService);
  private sheet = inject(MatBottomSheet);

  /* ── Calendar navigation ── */
  today        = new Date();
  todayYear    = this.today.getFullYear();
  todayMonth   = this.today.getMonth();

  currentYear  = signal(this.todayYear);
  currentMonth = signal(this.todayMonth);

  monthNames = ['January','February','March','April','May','June',
                'July','August','September','October','November','December'];
  dayNames   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  /** Months selectable for the chosen year */
  selectableMonths = computed(() => {
    return this.monthNames.map((name, idx) => ({
      idx,
      name,
      // in current year: all months Jan–Dec are allowed
      disabled: false
    }));
  });

  onMonthChange(month: number)  { this.currentMonth.set(month); }
  onYearChange(year: number)    { this.currentYear.set(year); }

  /* ── Events — sourced from events.data.ts ── */
  readonly events = MCT_EVENTS;

  /* ── Category filter ── */
  categories     = ['All','Daily','Weekly','Monthly','Annual','Ongoing','Special'];
  activeCategory = signal('All');

  filteredEvents = computed(() => {
    const cat = this.activeCategory();
    return cat === 'All' ? this.events : this.events.filter(e => e.category === cat);
  });

  categoryColor: Record<string, string> = {
    Daily:   '#4caf50',
    Weekly:  '#2196f3',
    Monthly: '#9c27b0',
    Annual:  '#f86f2d',
    Ongoing: '#ff9800',
    Special: '#e91e63'
  };

  /* ── Calendar computed ── */
  calendarDays = computed(() => {
    const y = this.currentYear(), m = this.currentMonth();
    const firstDay    = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  });

  eventsOnDay(day: number): CalendarEvent[] {
    return this.events.filter(e => e.date === this.isoDate(day));
  }

  isToday(day: number): boolean {
    return this.isoDate(day) === this.today.toISOString().slice(0, 10);
  }

  private isoDate(day: number): string {
    return `${this.currentYear()}-${String(this.currentMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  prevMonth() {
    if (this.currentMonth() === 0) { this.currentMonth.set(11); this.currentYear.update(y => y - 1); }
    else this.currentMonth.update(m => m - 1);
  }

  nextMonth() {
    if (this.currentMonth() === 11) { this.currentMonth.set(0); this.currentYear.update(y => y + 1); }
    else this.currentMonth.update(m => m + 1);
  }

  /* ── Detail bottom sheet ── */
  openDetail(event: CalendarEvent) {
    this.sheet.open(EventDetailSheet, {
      data: event,
      panelClass: 'event-detail-sheet'
    });
  }

  onDayClick(day: number | null) {
    if (!day) return;
    const evts = this.eventsOnDay(day);
    if (evts.length > 0) this.openDetail(evts[0]);
  }
}
