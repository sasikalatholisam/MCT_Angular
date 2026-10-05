export interface GalleryImage {
  src: string;
  caption: string;
  captionTe?: string;
}

export interface GalleryAlbum {
  id: string;
  label: string;
  labelTe: string;
  coverSrc: string;
  images: GalleryImage[];
}

export interface GalleryCategory {
  id: string;
  label: string;
  labelTe: string;
  icon: string;
  albums: GalleryAlbum[];
}

export const GALLERY_DATA: GalleryCategory[] = [
  {
    id: 'ashrams',
    label: 'Ashrams & Meditation Halls',
    labelTe: 'ఆశ్రమాలు & ధ్యాన మందిరాలు',
    icon: 'temple_hindu',
    albums: [
      {
        id: 'naimisharanya',
        label: 'Naimisharanya Ashramam',
        labelTe: 'నైమిశారణ్య ఆశ్రమం',
        coverSrc: 'images/ashrm/gallery/naimisharanya/img1.jpg',
        images: [
          { src: 'images/ashrm/gallery/naimisharanya/img1.jpg', caption: 'Naimisharanya Ashramam – Main View', captionTe: 'నైమిశారణ్య ఆశ్రమం – ముఖ్య దృశ్యం' },
          { src: 'images/ashrm/gallery/naimisharanya/img2.jpg', caption: 'Naimisharanya Ashramam – Prayer Hall', captionTe: 'నైమిశారణ్య ఆశ్రమం – ప్రార్థన మందిరం' },
          { src: 'images/ashrm/gallery/naimisharanya/img3.jpg', caption: 'Naimisharanya Ashramam – Garden', captionTe: 'నైమిశారణ్య ఆశ్రమం – తోట' },
        ]
      },
      {
        id: 'rajampet',
        label: 'MCT Meditation Hall – Rajampet',
        labelTe: 'MCT ధ్యాన మందిరం – రాజంపేట',
        coverSrc: 'images/ashrm/gallery/rajampet/img1.jpg',
        images: [
          { src: 'images/ashrm/gallery/rajampet/img1.jpg', caption: 'Rajampet Meditation Hall – Front View', captionTe: 'రాజంపేట ధ్యాన మందిరం – ముందు వీక్షణ' },
          { src: 'images/ashrm/gallery/rajampet/img2.jpg', caption: 'Rajampet Meditation Hall – Interior', captionTe: 'రాజంపేట ధ్యాన మందిరం – అంతర్భాగం' },
          { src: 'images/ashrm/gallery/rajampet/img3.jpg', caption: 'Rajampet – Puja Hall', captionTe: 'రాజంపేట – పూజా మందిరం' },
        ]
      },
      {
        id: 'badvel',
        label: 'MCT Meditation Hall – Badvel',
        labelTe: 'MCT ధ్యాన మందిరం – బద్వేల్',
        coverSrc: 'images/ashrm/gallery/badvel/img1.jpg',
        images: [
          { src: 'images/ashrm/gallery/badvel/img1.jpg', caption: 'Badvel Meditation Hall – Entrance', captionTe: 'బద్వేల్ ధ్యాన మందిరం – ప్రవేశ ద్వారం' },
          { src: 'images/ashrm/gallery/badvel/img2.jpg', caption: 'Badvel Meditation Hall – Main Hall', captionTe: 'బద్వేల్ ధ్యాన మందిరం – ప్రధాన హాలు' },
          { src: 'images/ashrm/gallery/badvel/img3.jpg', caption: 'Badvel – Corridor', captionTe: 'బద్వేల్ – కారిడర్' },
        ]
      },
      {
        id: 'chittathur',
        label: 'MCT Meditation Hall – Chittathur',
        labelTe: 'MCT ధ్యాన మందిరం – చిత్తాత్తూర్',
        coverSrc: 'images/ashrm/gallery/chittathur/img1.jpg',
        images: [
          { src: 'images/ashrm/gallery/chittathur/img1.jpg', caption: 'Chittathur Meditation Hall', captionTe: 'చిత్తాత్తూర్ ధ్యాన మందిరం' },
          { src: 'images/ashrm/gallery/chittathur/img2.jpg', caption: 'Chittathur Meditation Hall – Prayer Room', captionTe: 'చిత్తాత్తూర్ ధ్యాన మందిరం – ప్రార్థన గది' },
        ]
      },
    ]
  },
  {
    id: 'swami',
    label: 'Sri Bhagavan Swami',
    labelTe: 'శ్రీ భగవాన్ స్వామి',
    icon: 'self_improvement',
    albums: [
      {
        id: 'swami-darshan',
        label: 'Swami Darshan',
        labelTe: 'స్వామి దర్శనం',
        coverSrc: 'images/ashrm/gallery/swami/img1.jpg',
        images: [
          { src: 'images/ashrm/gallery/swami/img1.jpg', caption: 'Sri Bhagavan Swami Ramananda Yogi', captionTe: 'శ్రీ భగవాన్ స్వామి రమానంద యోగి' },
          { src: 'images/ashrm/gallery/swami/img2.jpg', caption: 'Sri Bhagavan Swami – Discourse', captionTe: 'శ్రీ భగవాన్ స్వామి – ప్రవచనం' },
        ]
      },
    ]
  },
  {
    id: 'events',
    label: 'Events & Yagams',
    labelTe: 'కార్యక్రమాలు & యాగాలు',
    icon: 'celebration',
    albums: [
      {
        id: 'varuna',
        label: 'Varuna Yagnamu',
        labelTe: 'వరుణ యాగము',
        coverSrc: 'images/ashrm/gallery/varuna/img1.jpg',
        images: [
          { src: 'images/ashrm/gallery/varuna/img1.jpg', caption: 'Varuna Yagnamu – Homa Kund', captionTe: 'వరుణ యాగము – హోమ కుండం' },
          { src: 'images/ashrm/gallery/varuna/img2.jpg', caption: 'Varuna Yagnamu – Devotees', captionTe: 'వరుణ యాగము – భక్తులు' },
        ]
      },
      {
        id: 'ramanavami',
        label: 'Sri Rama Navami',
        labelTe: 'శ్రీ రామ నవమి',
        coverSrc: 'images/ashrm/gallery/naimisharanya/img1.jpg',
        images: [
          { src: 'images/ashrm/gallery/naimisharanya/img1.jpg', caption: 'Sri Rama Navami Celebrations', captionTe: 'శ్రీ రామ నవమి వేడుకలు' },
          { src: 'images/ashrm/gallery/naimisharanya/img2.jpg', caption: 'Sita Rama Kalyanotsavam', captionTe: 'సీతా రామ కళ్యాణోత్సవం' },
        ]
      },
      {
        id: 'rathostavam',
        label: 'Rathostavam',
        labelTe: 'రథోత్సవం',
        coverSrc: 'images/ashrm/gallery/naimisharanya/img2.jpg',
        images: [
          { src: 'images/ashrm/gallery/naimisharanya/img2.jpg', caption: 'Annual Rathostavam Procession', captionTe: 'వార్షిక రథోత్సవ ఊరేగింపు' },
          { src: 'images/ashrm/gallery/varuna/img1.jpg',        caption: 'Rathostavam – Devotees Gathering', captionTe: 'రథోత్సవం – భక్తుల సమావేశం' },
        ]
      },
    ]
  },
  {
    id: 'activities',
    label: 'Social Activities',
    labelTe: 'సామాజిక కార్యకలాపాలు',
    icon: 'volunteer_activism',
    albums: [
      {
        id: 'annadanam',
        label: 'Nithya Annadanam',
        labelTe: 'నిత్య అన్నదానం',
        coverSrc: 'images/ashrm/gallery/rajampet/img2.jpg',
        images: [
          { src: 'images/ashrm/gallery/rajampet/img2.jpg', caption: 'Daily Free Meals – Annadanam Seva', captionTe: 'రోజువారీ ఉచిత భోజనం – అన్నదాన సేవ' },
          { src: 'images/ashrm/gallery/badvel/img1.jpg',   caption: 'Annadanam at Badvel Centre', captionTe: 'బద్వేల్ కేంద్రంలో అన్నదానం' },
        ]
      },
      {
        id: 'bookdist',
        label: 'Books Distribution',
        labelTe: 'పుస్తకాల పంపిణీ',
        coverSrc: 'images/ashrm/gallery/chittathur/img1.jpg',
        images: [
          { src: 'images/ashrm/gallery/chittathur/img1.jpg', caption: 'Annual Books Distribution to School Children', captionTe: 'పాఠశాల పిల్లలకు వార్షిక పుస్తకాల పంపిణీ' },
          { src: 'images/ashrm/gallery/chittathur/img2.jpg', caption: 'Books Distribution – Mellacheruvu', captionTe: 'పుస్తకాల పంపిణీ – మెల్లచెరువు' },
        ]
      },
      {
        id: 'plantation',
        label: 'Plantation Drive',
        labelTe: 'వృక్షారోపణ కార్యక్రమం',
        coverSrc: 'images/ashrm/gallery/swami/img1.jpg',
        images: [
          { src: 'images/ashrm/gallery/swami/img1.jpg', caption: 'Plantation Drive – Saplings Distribution', captionTe: 'వృక్షారోపణ – మొక్కల పంపిణీ' },
          { src: 'images/ashrm/gallery/swami/img2.jpg', caption: 'Go Green Initiative', captionTe: 'పచ్చని భారతం కార్యక్రమం' },
        ]
      },
    ]
  },
];
