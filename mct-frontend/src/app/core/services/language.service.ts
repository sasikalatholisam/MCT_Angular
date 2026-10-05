import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LanguageService {

  activeLang = signal<'en' | 'te'>('en');
  translations = signal<Record<string, any>>({});

  constructor(private http: HttpClient) {
    toObservable(this.activeLang)
      .pipe(switchMap(lang => this.http.get<Record<string, any>>(`/i18n/${lang}.json`)))
      .subscribe(data => this.translations.set(data));
  }

  switchLanguage(lang: 'en' | 'te') {
    this.activeLang.set(lang);
  }

  get(key: string): string {
    const keys = key.split('.');
    let result: any = this.translations();
    for (const k of keys) {
      result = result?.[k];
    }
    return result ?? key;
  }
}