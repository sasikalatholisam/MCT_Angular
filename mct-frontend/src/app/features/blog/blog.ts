import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { LanguageService } from '../../core/services/language.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

export interface AudioBook {
  id: string;
  title: string;
  titleTe: string;
  author: string;
  description: string;
  descriptionTe: string;
  duration: string;
  category: string;
  fileUrl: string;
  coverUrl: string;
  language: 'Telugu' | 'English' | 'Sanskrit';
  size: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    RouterLink, FormsModule, TranslatePipe,
    MatCardModule, MatIconModule, MatButtonModule,
    MatChipsModule, MatTooltipModule,
    MatInputModule, MatFormFieldModule,
    MatBadgeModule, MatDividerModule, MatProgressBarModule
  ],
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class Blog {
  lang = inject(LanguageService);

  activeFilter = signal('all');
  searchQuery  = signal('');
  playingId    = signal<string | null>(null);

  audioBooks: AudioBook[] = [
    {
      id: 'bg-te',
      title: 'Bhagavad Gita',
      titleTe: 'భగవద్గీత',
      author: 'Sri Bhagavan Swami Ramananda Yogi',
      description: 'Complete recitation of Bhagavad Gita with meaning and commentary.',
      descriptionTe: 'భగవద్గీత పూర్తి పఠనం అర్థం మరియు వ్యాఖ్యానంతో.',
      duration: '3h 45m',
      category: 'gita',
      fileUrl: 'audio/bhagavad_gita_telugu.mp3',
      coverUrl: 'images/audio/bg_cover.jpg',
      language: 'Telugu',
      size: '210 MB'
    },
    {
      id: 'veda-en',
      title: 'Vedic Chants',
      titleTe: 'వేద మంత్రాలు',
      author: 'MCT Vedic Scholars',
      description: 'Sacred Vedic chants for meditation, peace and daily worship.',
      descriptionTe: 'ధ్యానం, శాంతి మరియు రోజువారీ పూజ కోసం పవిత్ర వేద మంత్రాలు.',
      duration: '1h 20m',
      category: 'vedas',
      fileUrl: 'audio/vedic_chants.mp3',
      coverUrl: 'images/audio/vedic_cover.jpg',
      language: 'Sanskrit',
      size: '75 MB'
    },
    {
      id: 'yoga-te',
      title: 'Yoga & Pranayama Guide',
      titleTe: 'యోగా & ప్రాణాయామ మార్గదర్శకం',
      author: 'Sri Bhagavan Swami Ramananda Yogi',
      description: 'Step-by-step audio guide for yoga asanas and pranayama breathing techniques.',
      descriptionTe: 'యోగా ఆసనాలు మరియు ప్రాణాయామ శ్వాస పద్ధతులకు దశ-దశ ఆడియో మార్గదర్శకం.',
      duration: '55m',
      category: 'yoga',
      fileUrl: 'audio/yoga_pranayama.mp3',
      coverUrl: 'images/audio/yoga_cover.jpg',
      language: 'Telugu',
      size: '52 MB'
    },
    {
      id: 'meditation-te',
      title: 'Meditation Techniques',
      titleTe: 'ధ్యాన పద్ధతులు',
      author: 'MCT Spiritual Team',
      description: 'Guided meditation sessions for inner peace and self-realisation.',
      descriptionTe: 'అంతరంగ శాంతి మరియు స్వయం సాక్షాత్కారం కోసం నిర్దేశిత ధ్యాన సత్రాలు.',
      duration: '2h 10m',
      category: 'meditation',
      fileUrl: 'audio/meditation_guide.mp3',
      coverUrl: 'images/audio/meditation_cover.jpg',
      language: 'Telugu',
      size: '124 MB'
    },
    {
      id: 'ramayan-te',
      title: 'Ramayana Katha',
      titleTe: 'రామాయణ కథ',
      author: 'Sri Bhagavan Swami Ramananda Yogi',
      description: 'Full Ramayana narration with spiritual discourses and devotional songs.',
      descriptionTe: 'ఆధ్యాత్మిక ప్రవచనాలు మరియు భక్తి గీతాలతో పూర్తి రామాయణ కథనం.',
      duration: '6h 30m',
      category: 'purana',
      fileUrl: 'audio/ramayana_katha.mp3',
      coverUrl: 'images/audio/ramayana_cover.jpg',
      language: 'Telugu',
      size: '370 MB'
    },
    {
      id: 'gita-en',
      title: 'Gita Bodha – English',
      titleTe: 'గీతా బోధ – ఆంగ్లం',
      author: 'MCT Spiritual Team',
      description: 'English commentary on Bhagavad Gita, suitable for global audiences.',
      descriptionTe: 'భగవద్గీతపై ఆంగ్ల వ్యాఖ్యానం, ప్రపంచ ప్రేక్షకులకు అనువైనది.',
      duration: '4h 05m',
      category: 'gita',
      fileUrl: 'audio/gita_english.mp3',
      coverUrl: 'images/audio/gita_en_cover.jpg',
      language: 'English',
      size: '232 MB'
    }
  ];

  categories = ['all', 'gita', 'vedas', 'yoga', 'meditation', 'purana'];

  get filtered(): AudioBook[] {
    const f = this.activeFilter();
    const q = this.searchQuery().toLowerCase().trim();
    const isTE = this.lang.activeLang() === 'te';
    let list = f === 'all' ? this.audioBooks : this.audioBooks.filter(b => b.category === f);
    if (q) list = list.filter(b =>
      (isTE ? b.titleTe : b.title).toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q)
    );
    return list;
  }

  setFilter(cat: string) { this.activeFilter.set(cat); }

  togglePlay(id: string) {
    this.playingId.set(this.playingId() === id ? null : id);
  }

  downloadBook(book: AudioBook) {
    const link = document.createElement('a');
    link.href = book.fileUrl;
    link.download = book.title.replace(/\s+/g, '_') + '.mp3';
    link.target = '_blank';
    link.click();
  }

  categoryLabel(cat: string): string {
    const labels: Record<string, string> = {
      all: 'All', gita: 'Gita', vedas: 'Vedas',
      yoga: 'Yoga', meditation: 'Meditation', purana: 'Purana'
    };
    return labels[cat] ?? cat;
  }

  langColor(lang: string): string {
    return lang === 'Telugu' ? '#e65100' : lang === 'Sanskrit' ? '#6a1b9a' : '#1565c0';
  }

  displayTitle(book: AudioBook): string {
    return this.lang.activeLang() === 'te' ? book.titleTe : book.title;
  }

  displayDesc(book: AudioBook): string {
    return this.lang.activeLang() === 'te' ? book.descriptionTe : book.description;
  }
}
