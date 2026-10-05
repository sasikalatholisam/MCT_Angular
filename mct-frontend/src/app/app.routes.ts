import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { About } from './features/about/about';
import { Activities } from './features/activities/activities';
import { Gallery } from './features/gallery/gallery';
import { Blog } from './features/blog/blog';
import { Donation } from './features/donation/donation';
import { Contact } from './features/contact/contact';
import { History } from './features/history/history';
import { Events } from './features/events/events';
import { Management } from './features/management/management';

export const routes: Routes = [
  { path: '',            component: Home },
  { path: 'about',       component: About },
  { path: 'activities',  component: Activities },
  { path: 'gallery',     component: Gallery },
  { path: 'blog',        component: Blog },
  { path: 'events',      component: Events },
  { path: 'donation',    component: Donation },
  { path: 'contact',     component: Contact },
  { path: 'history',     component: History },
  { path: 'management',  component: Management },
  { path: '**',          redirectTo: '' }
];