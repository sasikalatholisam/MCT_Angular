import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { KeyValuePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { LanguageService } from '../../core/services/language.service';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';

// Events data
import { MCT_EVENTS } from '../events/events.data';
import { CalendarEvent } from '../events/calendar-event.model';

function phoneValidator(ctrl: AbstractControl) {
  const val = (ctrl.value ?? '').toString().replace(/\s/g, '');
  return /^[6-9]\d{9}$/.test(val) ? null : { phone: true };
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink, ReactiveFormsModule, TranslatePipe,
    KeyValuePipe,
    MatCardModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatSnackBarModule,
    MatTooltipModule, MatChipsModule, MatTabsModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, OnDestroy {
  lang = inject(LanguageService);
  private fb       = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  /* ── Split Hero ── */
  readonly heroSlides = [
    { img: 'images/ashrm/homePageImages/meditation.png',          caption: 'Yoga & Meditation' },
    { img: 'images/ashrm/homePageImages/trust_1.png',             caption: 'Charitable Activities' },
    { img: 'images/ashrm/homePageImages/trust_2.png',             caption: 'Serving Communities' },
    { img: 'images/ashrm/homePageImages/books_distribution1.png', caption: 'Books Distribution' },
    { img: 'images/ashrm/homePageImages/drinkwtr.png',            caption: 'Clean Water Initiative' },
    { img: 'images/ashrm/homePageImages/yoga_school.png',         caption: 'Yoga Schools' },
  ];
  heroSlide    = signal(0);
  heroVisible  = signal(true);   // drives the fade-in class
  private heroTimer?: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.heroTimer = setInterval(() => {
      // fade out → swap → fade in
      this.heroVisible.set(false);
      setTimeout(() => {
        this.heroSlide.set((this.heroSlide() + 1) % this.heroSlides.length);
        this.heroVisible.set(true);
      }, 400);
    }, 4000);
  }

  ngOnDestroy() {
    if (this.heroTimer) clearInterval(this.heroTimer);
  }

  goHeroSlide(i: number) {
    this.heroVisible.set(false);
    setTimeout(() => { this.heroSlide.set(i); this.heroVisible.set(true); }, 300);
  }

  /* ── Data from i18n ── */
  get activities(): { title: string; desc: string }[] {
    return this.lang.translations()?.['home']?.['activities'] ?? [];
  }
  get blogPosts(): { title: string; desc: string }[] {
    return this.lang.translations()?.['home']?.['blog_posts'] ?? [];
  }

  /* ══════════════════════════════════════════════════
     HOME CALENDAR — Day Schedules (Tirumala-style)
  ══════════════════════════════════════════════════ */
  private today         = new Date();
  calYear               = signal(this.today.getFullYear());
  calMonth              = signal(this.today.getMonth());
  selectedDay           = signal<number | null>(this.today.getDate());

  readonly monthNames   = ['January','February','March','April','May','June',
                           'July','August','September','October','November','December'];
  readonly dayNames     = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  readonly allEvents: CalendarEvent[] = MCT_EVENTS;

  readonly categoryColor: Record<string, string> = {
    Daily:   '#4caf50',
    Weekly:  '#2196f3',
    Monthly: '#9c27b0',
    Annual:  '#f86f2d',
    Ongoing: '#ff9800',
    Special: '#e91e63'
  };

  calendarDays = computed(() => {
    const y = this.calYear(), m = this.calMonth();
    const firstDay    = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  });

  scheduledEvents = computed(() => {
    const day = this.selectedDay();
    if (!day) return [];
    const iso = this.isoDate(day);
    return this.allEvents.filter(e => e.date === iso)
      .sort((a, b) => a.time.localeCompare(b.time));
  });

  upcomingEvents = computed(() => {
    const todayIso = this.today.toISOString().slice(0, 10);
    return [...this.allEvents]
      .filter(e => e.date >= todayIso)
      .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))
      .slice(0, 5);
  });

  isToday(day: number): boolean {
    return this.isoDate(day) === this.today.toISOString().slice(0, 10);
  }

  hasEvents(day: number): boolean {
    return this.allEvents.some(e => e.date === this.isoDate(day));
  }

  eventsOnDay(day: number): CalendarEvent[] {
    return this.allEvents.filter(e => e.date === this.isoDate(day));
  }

  selectDay(day: number | null) {
    if (!day) return;
    this.selectedDay.set(day);
  }

  calPrevMonth() {
    if (this.calMonth() === 0) { this.calMonth.set(11); this.calYear.update(y => y - 1); }
    else this.calMonth.update(m => m - 1);
    this.selectedDay.set(null);
  }

  calNextMonth() {
    if (this.calMonth() === 11) { this.calMonth.set(0); this.calYear.update(y => y + 1); }
    else this.calMonth.update(m => m + 1);
    this.selectedDay.set(null);
  }

  goToday() {
    this.calYear.set(this.today.getFullYear());
    this.calMonth.set(this.today.getMonth());
    this.selectedDay.set(this.today.getDate());
  }

  private isoDate(day: number): string {
    return `${this.calYear()}-${String(this.calMonth() + 1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
  }

  formatTime(time: string): string {
    const [h, m] = time.split(':').map(Number);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${h12}:${String(m).padStart(2,'0')} ${ampm}`;
  }

  activityIcons = [
    'self_improvement', 'water_drop', 'volunteer_activism',
    'spa', 'menu_book', 'fitness_center'
  ];

  /* ── Activity image carousel ── */
  activitySlides = [
    { img: 'images/ashrm/homePageImages/meditation.png',          title: 'Introduce Yoga Practices' },
    { img: 'images/ashrm/homePageImages/drinkwtr.png',            title: 'Clean Water for Rural Area' },
    { img: 'images/ashrm/homePageImages/trust_1.png',             title: 'Charitable Activities' },
    { img: 'images/ashrm/homePageImages/trust_2.png',             title: 'Start Yoga Centres' },
    { img: 'images/ashrm/homePageImages/books_distribution1.png', title: 'Books Distribution' },
    { img: 'images/ashrm/homePageImages/yoga_school.png',         title: 'Yoga Schools' },
  ];

  activeSlide = signal(0);
  prevSlide() { const l = this.activitySlides.length; this.activeSlide.set((this.activeSlide() - 1 + l) % l); }
  nextSlide() { this.activeSlide.set((this.activeSlide() + 1) % this.activitySlides.length); }
  goTo(i: number) { this.activeSlide.set(i); }

  /* ── Blog Tab data ── */
  readonly blogTabs = [
    {
      label: 'Latest News',
      icon: 'newspaper',
      posts: [
        { img: 'images/ashrm/homePageImages/annadanammct.png',    title: 'Nithya AnnaDhana Seva',           desc: 'Every Day Nithya Annadhana Seva Pathakam at Mellacheruvu.', date: 'Oct 2026', tag: 'Service' },
        { img: 'images/ashrm/homePageImages/Rajampet_temple3.png',title: 'MCT Meditation Hall At Rajampet', desc: 'MCT Meditation Hall At Rajampet inaugurated.',              date: 'Sep 2026', tag: 'Infrastructure' },
        { img: 'images/ashrm/homePageImages/Rajampet_temple.png', title: 'MCT Meditation Hall At Badvel',   desc: 'MCT Meditation Hall At Badvel established.',               date: 'Aug 2026', tag: 'Infrastructure' },
      ]
    },
    {
      label: 'Spiritual',
      icon: 'self_improvement',
      posts: [
        { img: 'images/ashrm/homePageImages/meditation.png',          title: 'Yoga & Meditation Programme', desc: 'Weekly meditation and yoga classes at Mellacheruvu and K.V. Palli.', date: 'Oct 2026', tag: 'Yoga' },
        { img: 'images/ashrm/homePageImages/yoga_school.png',         title: 'Yoga School Initiative',       desc: 'Training centres for youth, men, women and social workers.',           date: 'Sep 2026', tag: 'Education' },
        { img: 'images/ashrm/homePageImages/trust_2.png',             title: 'Weekly Pravachanam',           desc: 'Swamiji delivers spiritual discourse every Saturday evening.',           date: 'Aug 2026', tag: 'Discourse' },
      ]
    },
    {
      label: 'Social Service',
      icon: 'volunteer_activism',
      posts: [
        { img: 'images/ashrm/homePageImages/books_distribution1.png', title: 'Books Distribution Drive',    desc: 'Annual books distribution to school children in Mellacheruvu.',      date: 'Oct 2026', tag: 'Education' },
        { img: 'images/ashrm/homePageImages/drinkwtr.png',            title: 'Clean Water for Villages',    desc: 'Free drinking water supply for rural areas lacking facilities.',       date: 'Sep 2026', tag: 'Rural Dev' },
        { img: 'images/ashrm/homePageImages/trust_1.png',             title: 'Charitable Activities',       desc: 'Activities purely charitable in nature for the welfare of society.',   date: 'Aug 2026', tag: 'Charity' },
      ]
    },
    {
      label: 'Events',
      icon: 'celebration',
      posts: [
        { img: 'images/ashrm/homePageImages/rajmpet_temple2.png',     title: 'Varuna Yagnamu 2026',         desc: 'Annual Varuna Yagnam performed before the rainy season at MCT.',      date: 'Oct 2026', tag: 'Annual' },
        { img: 'images/ashrm/homePageImages/badvel temple3.png',      title: 'Poornima Pooja',              desc: 'Full moon day celebration held every Poornima at Naimisharanya.',     date: 'Sep 2026', tag: 'Monthly' },
        { img: 'images/ashrm/homePageImages/ramanavami-1.png',        title: 'Sri Rama Navami Celebrations',desc: 'Sita Rama Kalyanotsavam at Naimisharanya Ashramam.',                   date: 'Apr 2026', tag: 'Special' },
      ]
    },
  ];

  /* ── Volunteer form ── */
  submitted = signal(false);
  volunteerForm = this.fb.group({
    name:    ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    phone:   ['', [Validators.required, phoneValidator]],
    email:   ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.maxLength(500)]],
  });

  onVolunteerSubmit() {
    this.submitted.set(true);
    this.volunteerForm.markAllAsTouched();
    if (this.volunteerForm.invalid) return;
    this.snackBar.open('Thank you! We will contact you soon.', '✕', {
      duration: 5000, panelClass: 'mct-snack'
    });
    this.volunteerForm.reset();
    this.submitted.set(false);
  }
}
