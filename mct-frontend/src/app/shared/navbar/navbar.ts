import { Component, inject, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '../pipes/translate.pipe';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  lang = inject(LanguageService);
  menuOpen      = signal(false);
  adminDropOpen = signal(false);
  mediaDropOpen = signal(false);

  toggleMenu()  { this.menuOpen.set(!this.menuOpen()); }
  closeMenu()   { this.menuOpen.set(false); this.adminDropOpen.set(false); this.mediaDropOpen.set(false); }
  toggleAdmin() { this.adminDropOpen.set(!this.adminDropOpen()); this.mediaDropOpen.set(false); }
  toggleMedia() { this.mediaDropOpen.set(!this.mediaDropOpen()); this.adminDropOpen.set(false); }

  @HostListener('document:keydown.escape')
  onEscape() { this.menuOpen.set(false); this.adminDropOpen.set(false); this.mediaDropOpen.set(false); }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest('.has-dropdown')) {
      this.adminDropOpen.set(false);
      this.mediaDropOpen.set(false);
    }
  }
}
