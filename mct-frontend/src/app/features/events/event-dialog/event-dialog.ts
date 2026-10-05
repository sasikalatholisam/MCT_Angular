import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CalendarEvent } from '../events';

export interface DialogData {
  mode: 'add' | 'edit';
  event: CalendarEvent;
}

@Component({
  selector: 'app-event-dialog',
  standalone: true,
  imports: [
    FormsModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatButtonModule, MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>{{ data.mode === 'add' ? 'add_circle' : 'edit' }}</mat-icon>
      {{ data.mode === 'add' ? 'Add Event' : 'Edit Event' }}
    </h2>

    <mat-dialog-content class="dialog-body">
      <mat-form-field appearance="outline" class="full">
        <mat-label>Event Title *</mat-label>
        <input matInput [(ngModel)]="data.event.title" required maxlength="100" />
      </mat-form-field>

      <div class="row-2">
        <mat-form-field appearance="outline" class="half">
          <mat-label>Date *</mat-label>
          <input matInput type="date" [(ngModel)]="data.event.date" required />
        </mat-form-field>
        <mat-form-field appearance="outline" class="half">
          <mat-label>Time</mat-label>
          <input matInput type="time" [(ngModel)]="data.event.time" />
        </mat-form-field>
      </div>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Venue *</mat-label>
        <input matInput [(ngModel)]="data.event.venue" required maxlength="100" />
        <mat-icon matSuffix>location_on</mat-icon>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Category</mat-label>
        <mat-select [(ngModel)]="data.event.category">
          @for (cat of categories; track cat) {
            <mat-option [value]="cat">{{ cat }}</mat-option>
          }
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full">
        <mat-label>Description</mat-label>
        <textarea matInput [(ngModel)]="data.event.description" rows="3" maxlength="500"></textarea>
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-stroked-button (click)="cancel()">Cancel</button>
      <button mat-flat-button class="save-btn"
              [disabled]="!data.event.title || !data.event.date || !data.event.venue"
              (click)="save()">
        <mat-icon>save</mat-icon>
        {{ data.mode === 'add' ? 'Add Event' : 'Save Changes' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    h2 { display: flex; align-items: center; gap: 0.5rem; font-size: 1.2rem; }
    .dialog-body { display: flex; flex-direction: column; gap: 0.25rem; min-width: 300px; padding-top: 0.5rem; }
    .full  { width: 100%; }
    .half  { width: calc(50% - 0.5rem); }
    .row-2 { display: flex; gap: 1rem; }
    .save-btn { background-color: #f86f2d !important; color: white !important; }
    @media (max-width: 480px) { .half { width: 100%; } .row-2 { flex-direction: column; gap: 0; } }
  `]
})
export class EventDialogComponent {
  data: DialogData = inject(MAT_DIALOG_DATA);
  private ref      = inject(MatDialogRef<EventDialogComponent>);

  categories = ['Daily','Weekly','Monthly','Annual','Ongoing','Special'];

  save()   { this.ref.close(this.data.event); }
  cancel() { this.ref.close(); }
}
