/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  MCT EVENTS DATA — edit this file to add / update / remove  ║
 * ║  events shown on the calendar and cards.                     ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * FIELD REFERENCE
 * ───────────────
 *  id          → unique string number (increment for new events)
 *  title       → event name displayed on card and detail sheet
 *  date        → YYYY-MM-DD  — controls which calendar day gets a dot
 *  time        → HH:MM (24-hour)
 *  venue       → location string
 *  category    → Daily | Weekly | Monthly | Annual | Ongoing | Special
 *  description → full text shown inside the detail bottom sheet
 *  img         → image path from public/ folder
 *                (e.g. 'images/ashrm/Events/annadanam.png')
 *
 * HOW TO ADD A NEW EVENT
 * ──────────────────────
 *  1. Copy any existing line below.
 *  2. Paste it before the closing ];
 *  3. Give it the next id number.
 *  4. Fill in title, date, time, venue, category, description, img.
 *  5. Save — the page hot-reloads instantly (ng serve).
 *
 * HOW TO UPDATE AN EVENT
 * ──────────────────────
 *  Just edit the field value on the relevant line and save.
 *
 * HOW TO REMOVE AN EVENT
 * ──────────────────────
 *  Delete the entire line for that event.
 */

import { CalendarEvent } from './calendar-event.model';

export const MCT_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Nitya Annadanam',
    date: '2026-10-01',
    time: '08:00',
    venue: 'Mellacheruvu',
    category: 'Daily',
    description: 'Serving food to the needy every day at MCT Mellacheruvu. This programme has been running continuously since 2014.',
    img: 'images/ashrm/Events/annadanam.png'
  },
  {
    id: '2',
    title: 'Books Distribution',
    date: '2026-10-04',
    time: '10:00',
    venue: 'Mellacheruvu-Pileru',
    category: 'Annual',
    description: 'Every year books are distributed to school children in Mellacheruvu village, Pileru, to encourage education.',
    img: 'images/ashrm/Events/books_distributuions.png'
  },
  {
    id: '3',
    title: 'Clothes Distribution',
    date: '2026-10-07',
    time: '10:00',
    venue: 'Mellacheruvu-Pileru',
    category: 'Annual',
    description: 'Distribution of clothes to poor and needy families. Food, Cloth and Shelter are the three basic needs of every person.',
    img: 'images/ashrm/Events/clothes_distribution.png'
  },
  {
    id: '4',
    title: 'Drinking Water Supply',
    date: '2026-10-10',
    time: '07:00',
    venue: 'Mellacheruvu-Pileru',
    category: 'Daily',
    description: 'Free drinking water supply for rural areas lacking facilities. Water is the foundation of the entire universe.',
    img: 'images/ashrm/Events/drinkingWater.png'
  },
  {
    id: '5',
    title: 'Gosamrakshana Shala',
    date: '2026-10-13',
    time: '06:00',
    venue: 'Mellacheruvu-Pileru',
    category: 'Ongoing',
    description: 'Protection and care of cows at MCT Goshala, Mellacheruvu. The importance of cow protection is described in many puranas.',
    img: 'images/ashrm/Events/goshala.png'
  },
  {
    id: '6',
    title: 'Groceries Distribution',
    date: '2026-10-16',
    time: '10:00',
    venue: 'Mellacheruvu-Pileru',
    category: 'Monthly',
    description: 'MCT distributes groceries every month to needy families who cannot afford them.',
    img: 'images/ashrm/Events/groceries.png'
  },
  {
    id: '7',
    title: 'Make Green Planet',
    date: '2026-10-19',
    time: '09:00',
    venue: 'Mellacheruvu-Pileru',
    category: 'Ongoing',
    description: 'Tree planting initiative to massively increase green cover in the region and restore soil health.',
    img: 'images/ashrm/Events/planting.png'
  },
  {
    id: '8',
    title: 'Varuna Yagnam',
    date: '2026-10-22',
    time: '06:00',
    venue: 'Mellacheruvu-Pileru',
    category: 'Annual',
    description: 'Annual Varuna Yagnam performed by priests before the rainy season at MCT. This is performed every year.',
    img: 'images/ashrm/Events/yagnamu.png'
  },
  {
    id: '9',
    title: 'Weekly Pravachanam',
    date: '2026-10-25',
    time: '18:00',
    venue: 'Naimisharanya Ashramam',
    category: 'Weekly',
    description: 'Every Saturday Swamiji delivers spiritual discourse on the evenings and Rathotsavam is held after that.',
    img: 'images/ashrm/Events/weeklyEvents1.png'
  },
  {
    id: '10',
    title: 'Poornima Pooja',
    date: '2026-10-28',
    time: '18:00',
    venue: 'Naimisharanya Ashramam',
    category: 'Monthly',
    description: 'Full moon day celebration and Poornima Pooja at MCT held every full moon day of the month.',
    img: 'images/ashrm/Events/paadalu.png'
  },
  {
    id: '11',
    title: 'Annual Celebrations',
    date: '2026-10-05',
    time: '09:00',
    venue: 'Naimisharanya Ashramam',
    category: 'Annual',
    description: 'Anniversary and milestone celebrations at Naimisharanya Ashramam including trust founding day events.',
    img: 'images/ashrm/Events/Annual.png'
  },
  {
    id: '12',
    title: 'Special Poojas & Festivals',
    date: '2026-10-12',
    time: '08:00',
    venue: 'Mellacheruvu',
    category: 'Special',
    description: 'Sri Rama Navami, Ugadi, Maha Shiva Ratri, Srinivasa Kalynam and other special festivals at MCT.',
    img: 'images/ashrm/Events/Annualpoojas.png'
  },
];
