import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { LanguageService } from '../../core/services/language.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';

export interface TrustMember {
  id: number;
  name: string;
  nameTe: string;
  designation: string;
  designationTe: string;
  department: string;
  departmentTe: string;
  bio: string;
  bioTe: string;
  photo: string;
  since: string;
  category: 'trustee' | 'advisory' | 'operational';
  contact?: string;
}

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [
    RouterLink, TranslatePipe,
    MatCardModule, MatIconModule, MatButtonModule,
    MatChipsModule, MatTooltipModule, MatDividerModule
  ],
  templateUrl: './management.html',
  styleUrl: './management.scss'
})
export class Management {
  lang = inject(LanguageService);
  activeCategory = signal<'all' | 'trustee' | 'advisory' | 'operational'>('all');

  readonly members: TrustMember[] = [
    {
      id: 1,
      name: 'Sri Bhagavan Swami Ramananda Yogi Chandrulu',
      nameTe: 'శ్రీ భగవాన్ స్వామి రమానంద యోగి చంద్రులు',
      designation: 'Founder & Spiritual Head',
      designationTe: 'స్థాపకుడు & ఆధ్యాత్మిక అధిపతి',
      department: 'Spiritual Leadership',
      departmentTe: 'ఆధ్యాత్మిక నాయకత్వం',
      bio: 'Founder of Maharshi Charitable Trust in 2013. A revered spiritual leader guiding thousands of devotees across Andhra Pradesh through yoga, meditation and Vedic teachings. Established Naimisharanya Ashramam at Mellacheruvu as the spiritual headquarters of MCT.',
      bioTe: '2013లో మహర్షి చారిటబుల్ ట్రస్ట్‌ను స్థాపించారు. యోగా, ధ్యానం మరియు వేద బోధనల ద్వారా ఆంధ్రప్రదేశ్ అంతటా వేలాది భక్తులకు మార్గదర్శకత్వం అందించే గొప్ప ఆధ్యాత్మిక నాయకుడు.',
      photo: 'images/ashrm/management/swami.jpg',
      since: '2013',
      category: 'trustee'
    },
    {
      id: 2,
      name: 'Sri Venkata Subbaiah',
      nameTe: 'శ్రీ వెంకట సుబ్బయ్య',
      designation: 'Chairman, Board of Trustees',
      designationTe: 'అధ్యక్షుడు, ట్రస్టీ బోర్డు',
      department: 'Board Administration',
      departmentTe: 'బోర్డు పరిపాలన',
      bio: 'A dedicated philanthropist and long-standing supporter of MCT initiatives. Oversees the overall governance, policy-making and strategic direction of Maharshi Charitable Trust.',
      bioTe: 'అంకితభావం గల పరోపకారి మరియు MCT కార్యక్రమాల దీర్ఘకాల మద్దతుదారు. మహర్షి చారిటబుల్ ట్రస్ట్ యొక్క మొత్తం పరిపాలన, విధాన రూపకల్పన మరియు వ్యూహాత్మక దిశను పర్యవేక్షిస్తారు.',
      photo: 'images/ashrm/management/member1.jpg',
      since: '2013',
      category: 'trustee'
    },
    {
      id: 3,
      name: 'Sri Ramaiah Naidu',
      nameTe: 'శ్రీ రమయ్య నాయుడు',
      designation: 'Vice Chairman',
      designationTe: 'ఉపాధ్యక్షుడు',
      department: 'Board Administration',
      departmentTe: 'బోర్డు పరిపాలన',
      bio: 'Assists the Chairman in overseeing trust operations. Leads rural development and water supply projects across Pileru Mandal and surrounding areas in Chittoor District.',
      bioTe: 'ట్రస్ట్ కార్యకలాపాలను పర్యవేక్షించడంలో అధ్యక్షుడికి సహాయం చేస్తారు. పిలేరు మండలం మరియు చిత్తూరు జిల్లాలో గ్రామీణ అభివృద్ధి మరియు నీటి సరఫరా ప్రాజెక్టులకు నేతృత్వం వహిస్తారు.',
      photo: 'images/ashrm/management/member2.jpg',
      since: '2014',
      category: 'trustee'
    },
    {
      id: 4,
      name: 'Sri Krishnaswamy Goud',
      nameTe: 'శ్రీ కృష్ణస్వామి గౌడ్',
      designation: 'Secretary',
      designationTe: 'కార్యదర్శి',
      department: 'Administration & Operations',
      departmentTe: 'పరిపాలన & కార్యకలాపాలు',
      bio: 'Manages day-to-day administrative operations of the trust. Responsible for coordinating all trust activities, maintaining records, legal documentation and inter-departmental communication.',
      bioTe: 'ట్రస్ట్ యొక్క రోజువారీ పరిపాలనా కార్యకలాపాలను నిర్వహిస్తారు. అన్ని ట్రస్ట్ కార్యకలాపాలను సమన్వయం చేయడం, రికార్డులు నిర్వహించడం, చట్టపరమైన పత్రాలు మరియు అంతర్ విభాగ సమాచారానికి బాధ్యత వహిస్తారు.',
      photo: 'images/ashrm/management/member3.jpg',
      since: '2013',
      category: 'trustee'
    },
    {
      id: 5,
      name: 'Sri Subrahmanyam Reddy',
      nameTe: 'శ్రీ సుబ్రహ్మణ్యం రెడ్డి',
      designation: 'Treasurer',
      designationTe: 'కోశాధికారి',
      department: 'Finance & Accounts',
      departmentTe: 'ఫైనాన్స్ & అకౌంట్స్',
      bio: 'Manages the financial affairs of the trust with full transparency and accountability. Oversees budgets, donation accounts, audit processes and financial reporting to the Board.',
      bioTe: 'పూర్తి పారదర్శకత మరియు జవాబుదారీతనంతో ట్రస్ట్ యొక్క ఆర్థిక వ్యవహారాలను నిర్వహిస్తారు. బడ్జెట్‌లు, విరాళ ఖాతాలు, ఆడిట్ ప్రక్రియలు మరియు బోర్డుకు ఆర్థిక నివేదికలను పర్యవేక్షిస్తారు.',
      photo: 'images/ashrm/management/member4.jpg',
      since: '2013',
      category: 'trustee'
    },
    {
      id: 6,
      name: 'Dr. Padmavathi Devi',
      nameTe: 'డా. పద్మావతి దేవి',
      designation: 'Trustee – Healthcare & Welfare',
      designationTe: 'ట్రస్టీ – ఆరోగ్య సేవ & సంక్షేమం',
      department: 'Healthcare & Social Welfare',
      departmentTe: 'ఆరోగ్య సేవ & సామాజిక సంక్షేమం',
      bio: 'A senior medical professional dedicated to MCT\'s healthcare mission. Organises free medical camps, mobile health clinics and health awareness programmes across rural villages of Pileru Mandal.',
      bioTe: 'MCT యొక్క ఆరోగ్య సేవా లక్ష్యానికి అంకితమైన సీనియర్ వైద్య నిపుణుడు. పిలేరు మండలంలోని గ్రామీణ గ్రామాలలో ఉచిత వైద్య శిబిరాలు, మొబైల్ ఆరోగ్య క్లినిక్‌లు మరియు ఆరోగ్య అవగాహన కార్యక్రమాలను నిర్వహిస్తారు.',
      photo: 'images/ashrm/management/member5.jpg',
      since: '2015',
      category: 'trustee'
    },
    {
      id: 7,
      name: 'Sri Anjaneyulu Sharma',
      nameTe: 'శ్రీ అంజనేయులు శర్మ',
      designation: 'Head – Spiritual Activities',
      designationTe: 'అధిపతి – ఆధ్యాత్మిక కార్యకలాపాలు',
      department: 'Spiritual & Cultural Affairs',
      departmentTe: 'ఆధ్యాత్మిక & సాంస్కృతిక వ్యవహారాలు',
      bio: 'Coordinates all Vedic rituals, yagams, temple programmes and spiritual discourses under the guidance of Sri Bhagavan Swami. Leads Varuna Yagnamu, Rathostavam and other annual events.',
      bioTe: 'శ్రీ భగవాన్ స్వామి మార్గదర్శకత్వంలో అన్ని వేద కార్యక్రమాలు, యాగాలు, దేవాలయ కార్యక్రమాలు మరియు ఆధ్యాత్మిక ప్రవచనాలను సమన్వయం చేస్తారు.',
      photo: 'images/ashrm/management/member6.jpg',
      since: '2014',
      category: 'operational'
    },
    {
      id: 8,
      name: 'Sri Venkateswara Prasad',
      nameTe: 'శ్రీ వెంకటేశ్వర ప్రసాద్',
      designation: 'Head – Rural Development',
      designationTe: 'అధిపతి – గ్రామీణ అభివృద్ధి',
      department: 'Rural Development & Infrastructure',
      departmentTe: 'గ్రామీణ అభివృద్ధి & మౌలిక సదుపాయాలు',
      bio: 'Oversees all rural development projects including drinking water supply, CC roads, plantation drives, and school infrastructure support in Mellacheruvu and neighbouring villages.',
      bioTe: 'మెల్లచెరువు మరియు పొరుగు గ్రామాలలో తాగునీటి సరఫరా, CC రోడ్లు, మొక్కలు నాటడం మరియు పాఠశాల మౌలిక సదుపాయాల మద్దతు సహా అన్ని గ్రామీణ అభివృద్ధి ప్రాజెక్టులను పర్యవేక్షిస్తారు.',
      photo: 'images/ashrm/management/member7.jpg',
      since: '2016',
      category: 'operational'
    },
    {
      id: 9,
      name: 'Sri Narayana Murthy',
      nameTe: 'శ్రీ నారాయణ మూర్తి',
      designation: 'Legal Advisor',
      designationTe: 'న్యాయ సలహాదారు',
      department: 'Legal & Compliance',
      departmentTe: 'న్యాయ & అనుపాలన',
      bio: 'Provides expert legal guidance to the trust on all compliance, regulatory and contractual matters. Ensures that all MCT activities are conducted within the framework of applicable laws.',
      bioTe: 'అన్ని అనుపాలన, నియంత్రణ మరియు కాంట్రాక్ట్ విషయాలపై ట్రస్ట్‌కు నిపుణ న్యాయ మార్గదర్శకత్వం అందిస్తారు.',
      photo: 'images/ashrm/management/member8.jpg',
      since: '2014',
      category: 'advisory'
    },
    {
      id: 10,
      name: 'Sri Balasubramanian Iyer',
      nameTe: 'శ్రీ బాలసుబ్రమణియన్ అయ్యర్',
      designation: 'Spiritual Advisory Member',
      designationTe: 'ఆధ్యాత్మిక సలహా సభ్యుడు',
      department: 'Advisory Council',
      departmentTe: 'సలహా మండలి',
      bio: 'A renowned Vedic scholar and spiritual guide who provides advisory support to MCT on matters of Vedic education, scripture interpretation and spiritual programme design.',
      bioTe: 'మహర్షి చారిటబుల్ ట్రస్ట్‌కు వేద విద్య, శాస్త్ర వ్యాఖ్యానం మరియు ఆధ్యాత్మిక కార్యక్రమ రూపకల్పనపై సలహా మద్దతు అందించే ప్రసిద్ధ వేద పండితుడు.',
      photo: 'images/ashrm/management/member9.jpg',
      since: '2015',
      category: 'advisory'
    },
    {
      id: 11,
      name: 'Smt. Kamala Devi',
      nameTe: 'శ్రీమతి కమలా దేవి',
      designation: 'Head – Women & Child Welfare',
      designationTe: 'అధిపతి – మహిళా & శిశు సంక్షేమం',
      department: 'Women & Child Welfare',
      departmentTe: 'మహిళా & శిశు సంక్షేమం',
      bio: 'Dedicated to empowering women and children in rural communities. Leads programmes on education, skill training, nutrition and health for women and children across MCT\'s operating areas.',
      bioTe: 'గ్రామీణ సమాజాలలో మహిళలు మరియు పిల్లలను సాధికారపర్చడానికి అంకితమైన. MCT కార్యకలాప ప్రాంతాలలో మహిళలు మరియు పిల్లల కోసం విద్య, నైపుణ్య శిక్షణ, పోషణ మరియు ఆరోగ్య కార్యక్రమాలకు నేతృత్వం వహిస్తారు.',
      photo: 'images/ashrm/management/member10.jpg',
      since: '2017',
      category: 'operational'
    },
    {
      id: 12,
      name: 'Sri Raghu Nath Rao',
      nameTe: 'శ్రీ రఘు నాథ్ రావు',
      designation: 'Finance Advisory Member',
      designationTe: 'ఫైనాన్స్ సలహా సభ్యుడు',
      department: 'Advisory Council',
      departmentTe: 'సలహా మండలి',
      bio: 'A chartered accountant and financial expert who advises the trust on investment strategy, fund utilisation, audit compliance and 80G tax exemption matters.',
      bioTe: 'పెట్టుబడి వ్యూహం, నిధుల వినియోగం, ఆడిట్ అనుపాలన మరియు 80G పన్ను మినహాయింపు విషయాలపై ట్రస్ట్‌కు సలహా ఇచ్చే చార్టర్డ్ అకౌంటెంట్ మరియు ఆర్థిక నిపుణుడు.',
      photo: 'images/ashrm/management/member11.jpg',
      since: '2016',
      category: 'advisory'
    }
  ];

  readonly categories = [
    { id: 'all',         labelKey: 'management.cat_all',         icon: 'groups' },
    { id: 'trustee',     labelKey: 'management.cat_trustees',    icon: 'verified_user' },
    { id: 'operational', labelKey: 'management.cat_operational', icon: 'settings' },
    { id: 'advisory',    labelKey: 'management.cat_advisory',    icon: 'psychology' }
  ] as const;

  get filteredMembers(): TrustMember[] {
    const cat = this.activeCategory();
    return cat === 'all' ? this.members : this.members.filter(m => m.category === cat);
  }

  memberName(m: TrustMember): string {
    return this.lang.activeLang() === 'te' ? m.nameTe : m.name;
  }

  memberDesignation(m: TrustMember): string {
    return this.lang.activeLang() === 'te' ? m.designationTe : m.designation;
  }

  memberDept(m: TrustMember): string {
    return this.lang.activeLang() === 'te' ? m.departmentTe : m.department;
  }

  memberBio(m: TrustMember): string {
    return this.lang.activeLang() === 'te' ? m.bioTe : m.bio;
  }

  categoryLabel(id: string): string {
    return this.lang.translations()?.['management']?.[`cat_${id}`] ?? id;
  }

  setCategory(cat: 'all' | 'trustee' | 'advisory' | 'operational') {
    this.activeCategory.set(cat);
  }

  countFor(cat: string): number {
    return cat === 'all' ? this.members.length : this.members.filter(m => m.category === cat).length;
  }
}
