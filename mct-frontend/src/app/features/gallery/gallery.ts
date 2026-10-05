import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { LanguageService } from '../../core/services/language.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { GALLERY_DATA, GalleryCategory, GalleryAlbum, GalleryImage } from './gallery.data';
import { LightboxDialogComponent } from './lightbox-dialog/lightbox-dialog';

export type { GalleryImage };

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    RouterLink, FormsModule, TranslatePipe,
    MatIconModule, MatButtonModule, MatTooltipModule,
    MatInputModule, MatFormFieldModule,
    MatDialogModule, MatRippleModule,
  ],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss'
})
export class Gallery {
  lang   = inject(LanguageService);
  dialog = inject(MatDialog);

  readonly categories: GalleryCategory[] = GALLERY_DATA;

  // Navigation state
  activeCatId  = signal<string>(GALLERY_DATA[0].id);
  activeAlbumId = signal<string>(GALLERY_DATA[0].albums[0].id);
  searchQuery  = signal('');

  get activeCategory(): GalleryCategory {
    return this.categories.find(c => c.id === this.activeCatId())!;
  }

  get activeAlbum(): GalleryAlbum {
    const cat = this.activeCategory;
    return cat.albums.find(a => a.id === this.activeAlbumId()) ?? cat.albums[0];
  }

  get filteredImages(): GalleryImage[] {
    const q = this.searchQuery().toLowerCase().trim();
    const imgs = this.activeAlbum.images;
    if (!q) return imgs;
    const te = this.lang.activeLang() === 'te';
    return imgs.filter(i => (te ? i.captionTe ?? i.caption : i.caption).toLowerCase().includes(q));
  }

  selectCategory(catId: string) {
    this.activeCatId.set(catId);
    const cat = this.categories.find(c => c.id === catId)!;
    this.activeAlbumId.set(cat.albums[0].id);
    this.searchQuery.set('');
  }

  selectAlbum(albumId: string) {
    this.activeAlbumId.set(albumId);
    this.searchQuery.set('');
  }

  caption(img: GalleryImage): string {
    return this.lang.activeLang() === 'te' ? (img.captionTe ?? img.caption) : img.caption;
  }

  albumLabel(album: GalleryAlbum): string {
    return this.lang.activeLang() === 'te' ? album.labelTe : album.label;
  }

  categoryLabel(cat: GalleryCategory): string {
    return this.lang.activeLang() === 'te' ? cat.labelTe : cat.label;
  }

  openLightbox(index: number) {
    const images: GalleryImage[] = this.filteredImages;
    this.dialog.open(LightboxDialogComponent, {
      data: { images, index, lang: this.lang.activeLang() },
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'lightbox-panel'
    });
  }

  downloadImage(img: GalleryImage, event: MouseEvent) {
    event.stopPropagation();
    const link = document.createElement('a');
    link.href = img.src;
    link.download = this.caption(img).replace(/\s+/g, '_') + '.jpg';
    link.target = '_blank';
    link.click();
  }

  get albumImageCount(): number { return this.filteredImages.length; }
  get totalImages(): number { return this.activeAlbum.images.length; }
}
