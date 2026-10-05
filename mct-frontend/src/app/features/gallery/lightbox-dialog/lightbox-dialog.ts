import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GalleryImage } from '../gallery.data';

export interface LightboxData {
  images: GalleryImage[];
  index: number;
  lang?: string;
}

@Component({
  selector: 'app-lightbox-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
    <div class="lb-container">

      <!-- Top bar -->
      <div class="lb-topbar">
        <span class="lb-album-caption">{{ captionForCurrent() }}</span>
        <div class="lb-topbar-actions">
          <button class="lb-btn" mat-icon-button (click)="download()" matTooltip="Download image">
            <mat-icon>file_download</mat-icon>
          </button>
          <button class="lb-btn" mat-icon-button (click)="close()" matTooltip="Close (Esc)">
            <mat-icon>close</mat-icon>
          </button>
        </div>
      </div>

      <!-- Main image area -->
      <div class="lb-stage">
        <!-- Prev -->
        <button class="lb-nav lb-prev" mat-icon-button
                (click)="prev()" [disabled]="current() === 0"
                matTooltip="Previous (←)">
          <mat-icon>chevron_left</mat-icon>
        </button>

        <!-- Image -->
        <div class="lb-img-wrap">
          <img [src]="images[current()].src"
               [alt]="captionForCurrent()"
               class="lb-img" />
        </div>

        <!-- Next -->
        <button class="lb-nav lb-next" mat-icon-button
                (click)="next()" [disabled]="current() === images.length - 1"
                matTooltip="Next (→)">
          <mat-icon>chevron_right</mat-icon>
        </button>
      </div>

      <!-- Counter -->
      <div class="lb-counter-bar">
        <span class="lb-counter">{{ current() + 1 }} / {{ images.length }}</span>
      </div>

      <!-- Thumbnail strip -->
      <div class="lb-thumbs" #thumbStrip>
        @for (img of images; track img.src; let i = $index) {
          <div class="lb-thumb"
               [class.active]="i === current()"
               (click)="jumpTo(i)"
               [matTooltip]="imgCaption(img)">
            <div class="lb-thumb-img"
                 [style.background-image]="'url(' + img.src + ')'"></div>
          </div>
        }
      </div>

    </div>
  `,
  styleUrl: './lightbox-dialog.scss'
})
export class LightboxDialogComponent {
  private dialogRef = inject(MatDialogRef<LightboxDialogComponent>);
  private data: LightboxData = inject(MAT_DIALOG_DATA);

  images = this.data.images;
  lang   = this.data.lang ?? 'en';
  current = signal(this.data.index);

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowRight') this.next();
    if (e.key === 'ArrowLeft')  this.prev();
    if (e.key === 'Escape')     this.close();
  }

  next()   { if (this.current() < this.images.length - 1) this.current.update(v => v + 1); }
  prev()   { if (this.current() > 0) this.current.update(v => v - 1); }
  close()  { this.dialogRef.close(); }
  jumpTo(i: number) { this.current.set(i); }

  imgCaption(img: GalleryImage): string {
    return this.lang === 'te' ? (img.captionTe ?? img.caption) : img.caption;
  }

  captionForCurrent(): string {
    return this.imgCaption(this.images[this.current()]);
  }

  download() {
    const img = this.images[this.current()];
    const link = document.createElement('a');
    link.href = img.src;
    link.download = this.captionForCurrent().replace(/\s+/g, '_') + '.jpg';
    link.target = '_blank';
    link.click();
  }
}
