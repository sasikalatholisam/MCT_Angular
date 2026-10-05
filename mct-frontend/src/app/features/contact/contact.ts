import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { LanguageService } from '../../core/services/language.service';

/* Indian mobile: 10 digits starting 6–9 */
function phoneValidator(ctrl: AbstractControl) {
  const val = (ctrl.value ?? '').toString().replace(/\s/g, '');
  return /^[6-9]\d{9}$/.test(val) ? null : { phone: true };
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    TranslatePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  lang      = inject(LanguageService);
  private fb        = inject(FormBuilder);
  private sanitizer = inject(DomSanitizer);
  private snackBar  = inject(MatSnackBar);

  submitted = signal(false);
  success   = signal(false);

  form = this.fb.group({
    name:    ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    phone:   ['', [Validators.required, phoneValidator]],
    email:   ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
    subject: ['', [Validators.required, Validators.maxLength(80)]],
    message: ['', [Validators.required, Validators.maxLength(500)]]
  });

  onSubmit() {
    this.submitted.set(true);
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    /* API call would go here */
    this.success.set(true);
    this.snackBar.open(
      this.lang.translations()?.['contact']?.['success_msg']
        ?? 'Your message has been sent successfully!',
      '✕',
      { duration: 5000, panelClass: 'mct-snack' }
    );
    this.form.reset();
    this.submitted.set(false);
  }

  get safeMapUrl(): SafeResourceUrl {
    const url = this.lang.translations()?.['contact']?.['map_embed']
      ?? 'https://www.google.com/maps/d/u/0/embed?mid=1LWt4zMz8WeSP86rtshk82N88DxJnuGbn';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
