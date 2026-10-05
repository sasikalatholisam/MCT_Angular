import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { LanguageService } from '../../core/services/language.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-donation',
  standalone: true,
  imports: [
    RouterLink, ReactiveFormsModule, TranslatePipe,
    MatCardModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatIconModule,
    MatSnackBarModule, MatDividerModule, MatListModule
  ],
  templateUrl: './donation.html',
  styleUrl: './donation.scss'
})
export class Donation {
  lang     = inject(LanguageService);
  private fb       = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  submitted = signal(false);

  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.maxLength(50)]],
    lastName:  ['', [Validators.required, Validators.maxLength(50)]],
    phone:     ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
    email:     ['', [Validators.required, Validators.email]],
    amount:    ['', [Validators.required, Validators.min(1)]],
    purpose:   ['General', Validators.required]
  });

  get purposes(): string[] {
    return this.lang.translations()?.['donation']?.['purpose_options'] ?? [];
  }

  onSubmit() {
    this.submitted.set(true);
    this.form.markAllAsTouched();
    if (this.form.invalid) return;
    this.snackBar.open(
      this.lang.translations()?.['donation']?.['thank_you'] ?? 'Thank you for your donation!',
      '✕', { duration: 6000, panelClass: 'mct-snack' }
    );
    this.form.reset({ purpose: 'General' });
    this.submitted.set(false);
  }
}
