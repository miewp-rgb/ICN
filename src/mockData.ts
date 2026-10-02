import { Patient } from './types';

export const WARDS = [
  'ICU (หอผู้ป่วยวิกฤต)',
  'Ward 1 (อายุรกรรมชาย-หญิง)',
  'Ward 2 (ศัลยกรรม)',
  'Ward 3 (ออร์โธปิดิกส์)',
  'Ward 4 (กุมารเวชกรรม)',
  'Ward 5 (ห้องแยกโรคความดันลบ - Isolation)',
  'OPD Medicine (คลินิกอายุรกรรม)',
  'OPD Surgery (คลินิกศัลยกรรม)',
  'OPD Pediatric (คลินิกกุมารเวช)',
  'OPD ARI (คลินิกโรคทางเดินหายใจ)'
];

export const DOCTORS = [
  'นพ.สมชาย เกียรติสกุล (อายุรแพทย์โรคติดเชื้อ)',
  'พญ.สุดา วงศ์สว่าง (ศัลยแพทย์ทั่วไป)',
  'นพ.ธีรวัฒน์ ชัยปกรณ์ (อายุรแพทย์โรคระบบทางเดินหายใจ)',
  'นพ.ประวิทย์ สุขเจริญ (ศัลยแพทย์กระดูกและข้อ)',
  'พญ.นลินี วัฒนา (กุมารแพทย์)',
  'นพ.กิตติศักดิ์ เจริญดี (แพทย์เวชบำบัดวิกฤต)'
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'p-001',
    hn: '6601429',
    vn: 'VN690801',
    nameTh: 'นายสมศักดิ์ สัจจาภิรมย์',
    nameEn: 'Mr. Somsak Sajjapirom',
    age: 67,
    gender: 'M',
    patientType: 'IPD',
    ward: 'ICU (หอผู้ป่วยวิกฤต)',
    roomBed: 'ICU-Bed 03',
    attendingPhysician: 'นพ.กิตติศักดิ์ เจริญดี (แพทย์เวชบำบัดวิกฤต)',
    department: 'อายุรกรรมวิกฤต',
    admissionDate: '2026-09-02T10:30:00',
    primaryDiagnosis: 'Aspiration Pneumonia with Septic Shock',
    hasFeverPost48h: true,
    peakTemp: 38.8,
    feverOnsetDate: '2026-09-06T14:20:00',
    surgeryPerformed: {
      procedure: 'Tracheostomy (เจาะคอ)',
      surgeryDate: '2026-09-04T09:00:00',
      surgeon: 'พญ.สุดา วงศ์สว่าง (ศัลยแพทย์ทั่วไป)',
      woundClass: 'Clean-Contaminated'
    },
    isRespiratoryIsolation: false,
    isMdro: true,
    mdroDetails: {
      organism: 'Acinetobacter baumannii (CRAB - Pan-drug resistant)',
      resistanceProfile: 'Carbapenem & Colistin sensitive only',
      specimen: 'Endotracheal Sputum',
      cultureDate: '2026-09-06T11:00:00',
      antibioticsReceived: [
        { name: 'Colistin Sodium', dose: '150 mg IV q 12h', route: 'IV', startDate: '2026-09-06T16:00:00' },
        { name: 'Meropenem', dose: '1 g IV q 8h (extended infusion)', route: 'IV', startDate: '2026-09-03T12:00:00' }
      ]
    },
    isSsiSurveillance: false,
    hasInvasiveDevices: true,
    devices: [
      {
        type: 'foley',
        nameTh: 'สายสวนปัสสาวะ (Foley catheter)',
        nameEn: 'Indwelling Urinary Catheter',
        insertionDate: '2026-09-02T11:00:00',
        insertionSite: 'Urethral',
        deviceDays: 7,
        bundleCompliant: true,
        notes: 'Urine cloudy with pus cells, sent UA & Urine C/S'
      },
      {
        type: 'ventilator',
        nameTh: 'เครื่องช่วยหายใจ (Mechanical Ventilator)',
        nameEn: 'Endotracheal Tube with Mechanical Ventilator',
        insertionDate: '2026-09-02T11:30:00',
        insertionSite: 'Oral ETT No. 7.5 depth 21 cm',
        deviceDays: 7,
        bundleCompliant: true,
        notes: 'Oral care with Chlorhexidine q 4h, Head of bed elevated 35°'
      },
      {
        type: 'arterial_line',
        nameTh: 'สายสวนทางหลอดเลือดแดง (Arterial line)',
        nameEn: 'Radial Arterial Line for invasive BP monitoring',
        insertionDate: '2026-09-03T08:00:00',
        insertionSite: 'Right Radial Artery',
        deviceDays: 6,
        bundleCompliant: true,
        notes: 'Dressing dry and intact, good pulse distal'
      },
      {
        type: 'central_line',
        nameTh: 'สายสวนหลอดเลือดดำส่วนกลาง (Central line)',
        nameEn: 'Triple Lumen CVC',
        insertionDate: '2026-09-02T14:00:00',
        insertionSite: 'Right Internal Jugular Vein',
        deviceDays: 7,
        bundleCompliant: true
      }
    ],
    assessment: {
      assessed: false,
      status: 'pending_nurse',
      criteriaMet: ['ไข้ ≥ 38.0°C หลังแอดมิท 48 ชม.', 'ใส่เครื่องช่วยหายใจ > 48 ชม.', 'เสมหะเปลี่ยนสีและมีแบคทีเรียดื้อยา'],
      investigationNotes: 'สงสัย VAP (Ventilator-Associated Pneumonia) หรือ CAUTI รอ IC Nurse ตรวจสอบผล Sputum C/S & Urine C/S'
    }
  },
  {
    id: 'p-002',
    hn: '6519803',
    vn: 'VN690802',
    nameTh: 'นางประภาวรรณ สุขสำราญ',
    nameEn: 'Mrs. Prapawan Suksamran',
    age: 54,
    gender: 'F',
    patientType: 'IPD',
    ward: 'Ward 5 (ห้องแยกโรคความดันลบ - Isolation)',
    roomBed: 'AIIR-501 (Negative Pressure)',
    attendingPhysician: 'นพ.ธีรวัฒน์ ชัยปกรณ์ (อายุรแพทย์โรคระบบทางเดินหายใจ)',
    department: 'อายุรกรรมระบบหายใจ',
    admissionDate: '2026-09-03T15:45:00',
    primaryDiagnosis: 'Pulmonary Tuberculosis (Cavitary, Sputum AFB 3+)',
    hasFeverPost48h: false,
    peakTemp: 37.4,
    isRespiratoryIsolation: true,
    firstDiagTbOrRespiratory: true,
    isolationType: 'Airborne',
    respiratoryDiagnosis: 'Active Cavitary Pulmonary TB with Hemoptysis',
    antiTbMedications: {
      drugNames: 'HRZE (Isoniazid, Rifampicin, Pyrazinamide, Ethambutol)',
      startDateTime: '2026-09-04T08:00:00',
      stopDateTime: undefined,
      ongoing: true
    },
    sputumAfbResult: 'AFB 3+ (Very Heavy)',
    geneXpertResult: 'MTB detected, Rifampicin Resistance NOT detected (Drug-sensitive TB)',
    isMdro: false,
    isSsiSurveillance: false,
    hasInvasiveDevices: false,
    devices: [],
    assessment: {
      assessed: true,
      status: 'not_hai',
      haiType: 'None',
      assessedBy: 'พว.อุษา นิยมรัตน์ (IC Nurse)',
      assessedRole: 'IC Nurse',
      assessedDate: '2026-09-04T11:00:00',
      criteriaMet: ['First diagnosis TB upon admission', 'Community-Acquired (CAI)'],
      recommendations: 'เฝ้าระวัง Airborne Isolation ตรวจสอบ Negative pressure room (-5 Pa) และการสวมใส่ N95 mask ทุกครั้งก่อนเข้าห้อง'
    }
  },
  {
    id: 'p-003',
    hn: '6408712',
    vn: 'VN690803',
    nameTh: 'นายบุญเลิศ ก้องเกียรติไกร',
    nameEn: 'Mr. Boonlert Kongkiatkrai',
    age: 62,
    gender: 'M',
    patientType: 'IPD',
    ward: 'Ward 2 (ศัลยกรรม)',
    roomBed: 'Ward 2 - 208',
    attendingPhysician: 'พญ.สุดา วงศ์สว่าง (ศัลยแพทย์ทั่วไป)',
    department: 'ศัลยกรรม',
    admissionDate: '2026-09-01T08:15:00',
    primaryDiagnosis: 'Acute Gangrenous Appendicitis with Peritonitis',
    hasFeverPost48h: true,
    peakTemp: 38.6,
    feverOnsetDate: '2026-09-05T19:00:00',
    surgeryPerformed: {
      procedure: 'Laparotomy with Appendectomy & Peritoneal Lavage',
      surgeryDate: '2026-09-01T13:30:00',
      surgeon: 'พญ.สุดา วงศ์สว่าง (ศัลยแพทย์ทั่วไป)',
      woundClass: 'Contaminated'
    },
    isRespiratoryIsolation: false,
    isMdro: false,
    isSsiSurveillance: true,
    ssiDetails: {
      procedure: 'Exploratory Laparotomy with Appendectomy',
      surgeryDate: '2026-09-01T13:30:00',
      surgeon: 'พญ.สุดา วงศ์สว่าง (ศัลยแพทย์ทั่วไป)',
      woundClass: 'Contaminated',
      hasImplant: false,
      postOpDays: 7,
      surveillanceStatus: 'Superficial Incisional',
      woundDischarge: 'Purulent discharge from surgical incision with erythema > 2 cm',
      woundCulture: 'Pending (Pus swab sent 2026-09-06)'
    },
    hasInvasiveDevices: true,
    devices: [
      {
        type: 'foley',
        nameTh: 'สายสวนปัสสาวะ (Foley catheter)',
        nameEn: 'Foley Catheter 16 Fr',
        insertionDate: '2026-09-01T12:00:00',
        insertionSite: 'Urethral',
        deviceDays: 7,
        bundleCompliant: true,
        notes: 'Plan off catheter today'
      }
    ],
    assessment: {
      assessed: true,
      status: 'confirmed_hai',
      haiType: 'SSI',
      assessedBy: 'นพ.สมชาย เกียรติสกุล (อายุรแพทย์โรคติดเชื้อ)',
      assessedRole: 'IC Physician',
      assessedDate: '2026-09-07T09:30:00',
      criteriaMet: ['Purulent drainage from superficial incision', 'Erythema and local pain post-op day 4', 'Surgeon diagnosis SSI'],
      recommendations: 'เปิดแผลระบายหนอง (Open wound drainage) ทำแผล sterile wet-to-dry เปลี่ยนยา ATB เป็น Ciprofloxacin + Metronidazole'
    }
  },
  {
    id: 'p-004',
    hn: '6312450',
    vn: 'VN690804',
    nameTh: 'นางวิไลพร นามทวีทรัพย์',
    nameEn: 'Mrs. Wilaiporn Namtaweesap',
    age: 72,
    gender: 'F',
    patientType: 'IPD',
    ward: 'Ward 1 (อายุรกรรมชาย-หญิง)',
    roomBed: 'Ward 1 - 105',
    attendingPhysician: 'นพ.สมชาย เกียรติสกุล (อายุรแพทย์โรคติดเชื้อ)',
    department: 'อายุรกรรม',
    admissionDate: '2026-08-30T11:00:00',
    primaryDiagnosis: 'Acute Pyelonephritis with Bacteremia',
    hasFeverPost48h: true,
    peakTemp: 38.4,
    feverOnsetDate: '2026-09-04T16:00:00',
    isRespiratoryIsolation: false,
    isMdro: true,
    mdroDetails: {
      organism: 'Klebsiella pneumoniae (CRE - Carbapenem Resistant Enterobacteriaceae)',
      resistanceProfile: 'Resistant to Imipenem, Meropenem, Ceftriaxone; Sensitive to Ceftazidime/Avibactam',
      specimen: 'Urine Culture (>10^5 CFU/mL)',
      cultureDate: '2026-09-03T14:30:00',
      antibioticsReceived: [
        { name: 'Ceftazidime/Avibactam (Zavicefta)', dose: '2.5 g IV q 8h', route: 'IV', startDate: '2026-09-04T18:00:00' },
        { name: 'Ceftriaxone (Discontinued)', dose: '2 g IV OD', route: 'IV', startDate: '2026-08-30T12:00:00', endDate: '2026-09-04T17:00:00' }
      ]
    },
    isSsiSurveillance: false,
    hasInvasiveDevices: true,
    devices: [
      {
        type: 'foley',
        nameTh: 'สายสวนปัสสาวะ (Foley catheter)',
        nameEn: 'Silicone Foley Catheter',
        insertionDate: '2026-08-30T11:30:00',
        insertionSite: 'Urethral',
        deviceDays: 9,
        bundleCompliant: false,
        notes: 'Urine bag was above bladder level on audit 09/03, rectified and educated nurse team'
      }
    ],
    assessment: {
      assessed: true,
      status: 'confirmed_hai',
      haiType: 'CAUTI',
      assessedBy: 'พว.พัชรา สุวรรณเวช (IC Nurse)',
      assessedRole: 'IC Nurse',
      assessedDate: '2026-09-05T14:00:00',
      criteriaMet: ['Foley catheter > 2 days', 'Fever > 38.0°C without other source', 'Urine culture CRE > 10^5 CFU/ml'],
      recommendations: 'Confirm CAUTI. ติดป้าย Contact Precaution หน้าห้อง ใส่ถุงมือ-เสื้อคลุม และประเมินถอดสายสวน Foley catheter โดยเร็วที่สุด'
    }
  },
  {
    id: 'p-005',
    hn: '6704118',
    vn: 'VN690805',
    nameTh: 'เด็กชายธนากร เจริญผล',
    nameEn: 'Master Thanakorn Charoenphon',
    age: 4,
    gender: 'M',
    patientType: 'IPD',
    ward: 'Ward 4 (กุมารเวชกรรม)',
    roomBed: 'Ward 4 - 402',
    attendingPhysician: 'พญ.นลินี วัฒนา (กุมารแพทย์)',
    department: 'กุมารเวชกรรม',
    admissionDate: '2026-09-04T16:20:00',
    primaryDiagnosis: 'Severe RSV Bronchiolitis with Respiratory Distress',
    hasFeverPost48h: false,
    peakTemp: 37.8,
    isRespiratoryIsolation: true,
    firstDiagTbOrRespiratory: true,
    isolationType: 'Contact',
    respiratoryDiagnosis: 'RSV Infection with acute wheezing & copious secretions',
    sputumAfbResult: 'N/A (NPA positive for RSV Antigen)',
    isMdro: false,
    isSsiSurveillance: false,
    hasInvasiveDevices: false,
    devices: [],
    assessment: {
      assessed: true,
      status: 'not_hai',
      haiType: 'None',
      assessedBy: 'พว.อุษา นิยมรัตน์ (IC Nurse)',
      assessedRole: 'IC Nurse',
      assessedDate: '2026-09-05T10:00:00',
      criteriaMet: ['Onset prior to admission (Community-acquired RSV)'],
      recommendations: 'Contact & Droplet precaution, Cohort isolation in Pediatric ward, dedicated suction equipment'
    }
  },
  {
    id: 'p-006',
    hn: '6201994',
    vn: 'VN690806',
    nameTh: 'นายประเสริฐ ตั้งมั่นคง',
    nameEn: 'Mr. Prasert Tangmankong',
    age: 70,
    gender: 'M',
    patientType: 'IPD',
    ward: 'Ward 3 (ออร์โธปิดิกส์)',
    roomBed: 'Ward 3 - 312',
    attendingPhysician: 'นพ.ประวิทย์ สุขเจริญ (ศัลยแพทย์กระดูกและข้อ)',
    department: 'ศัลยกรรมกระดูกและข้อ',
    admissionDate: '2026-08-28T09:00:00',
    primaryDiagnosis: 'Osteoarthritis Right Knee - Total Knee Arthroplasty',
    hasFeverPost48h: true,
    peakTemp: 38.3,
    feverOnsetDate: '2026-09-06T20:00:00',
    surgeryPerformed: {
      procedure: 'Total Knee Arthroplasty (TKA) Right Knee',
      surgeryDate: '2026-08-29T10:30:00',
      surgeon: 'นพ.ประวิทย์ สุขเจริญ (ศัลยแพทย์กระดูกและข้อ)',
      woundClass: 'Clean'
    },
    isRespiratoryIsolation: false,
    isMdro: true,
    mdroDetails: {
      organism: 'MRSA (Methicillin-Resistant Staphylococcus aureus)',
      resistanceProfile: 'Oxacillin resistant, Vancomycin sensitive (MIC 1.0 mcg/mL)',
      specimen: 'Surgical Wound Swab',
      cultureDate: '2026-09-06T21:00:00',
      antibioticsReceived: [
        { name: 'Vancomycin', dose: '1 g IV q 12h', route: 'IV', startDate: '2026-09-07T08:00:00' }
      ]
    },
    isSsiSurveillance: true,
    ssiDetails: {
      procedure: 'Total Knee Arthroplasty (TKA)',
      surgeryDate: '2026-08-29T10:30:00',
      surgeon: 'นพ.ประวิทย์ สุขเจริญ (ศัลยแพทย์กระดูกและข้อ)',
      woundClass: 'Clean',
      hasImplant: true,
      postOpDays: 10,
      surveillanceStatus: 'Deep Incisional',
      woundDischarge: 'Swelling, warm joint effusion, wound serosanguinous drainage with MRSA',
      woundCulture: 'MRSA positive'
    },
    hasInvasiveDevices: false,
    devices: [],
    assessment: {
      assessed: false,
      status: 'pending_doctor',
      criteriaMet: ['Clean surgery with prosthesis', 'Fever and joint inflammation > POD 5', 'Positive MRSA culture'],
      investigationNotes: 'สงสัย Deep Incisional / Organ-Space SSI with MRSA รอแพทย์เจ้าของไข้และ IC Physician ประเมินร่วมกันเพื่อวางแผน I&D หรือ debridement'
    }
  },
  {
    id: 'p-007',
    hn: '6503341',
    vn: 'VN690807',
    nameTh: 'นางมาลี ชาญเวช',
    nameEn: 'Mrs. Malee Chanwech',
    age: 49,
    gender: 'F',
    patientType: 'IPD',
    ward: 'Ward 5 (ห้องแยกโรคความดันลบ - Isolation)',
    roomBed: 'AIIR-502 (Negative Pressure)',
    attendingPhysician: 'นพ.ธีรวัฒน์ ชัยปกรณ์ (อายุรแพทย์โรคระบบทางเดินหายใจ)',
    department: 'อายุรกรรมระบบหายใจ',
    admissionDate: '2026-08-26T14:15:00',
    primaryDiagnosis: 'Multidrug-Resistant Tuberculosis (MDR-TB)',
    hasFeverPost48h: false,
    peakTemp: 37.2,
    isRespiratoryIsolation: true,
    firstDiagTbOrRespiratory: true,
    isolationType: 'Airborne',
    respiratoryDiagnosis: 'MDR-TB with prior incomplete therapy, persistent cough and weight loss',
    antiTbMedications: {
      drugNames: 'Bedaquiline, Linezolid, Levofloxacin, Clofazimine, Cycloserine',
      startDateTime: '2026-08-27T09:00:00',
      stopDateTime: undefined,
      ongoing: true
    },
    sputumAfbResult: 'AFB 2+ (Positive)',
    geneXpertResult: 'MTB detected, Rifampicin Resistance DETECTED (MDR-TB pattern)',
    isMdro: true,
    mdroDetails: {
      organism: 'Mycobacterium tuberculosis (MDR-TB)',
      resistanceProfile: 'Resistant to Isoniazid and Rifampicin',
      specimen: 'Sputum',
      cultureDate: '2026-08-27T10:00:00',
      antibioticsReceived: [
        { name: 'Bedaquiline', dose: '400 mg PO daily x 2 wks then 200 mg 3x/wk', route: 'Oral', startDate: '2026-08-27T09:00:00' },
        { name: 'Linezolid', dose: '600 mg PO OD', route: 'Oral', startDate: '2026-08-27T09:00:00' },
        { name: 'Levofloxacin', dose: '750 mg PO OD', route: 'Oral', startDate: '2026-08-27T09:00:00' }
      ]
    },
    isSsiSurveillance: false,
    hasInvasiveDevices: false,
    devices: [],
    assessment: {
      assessed: true,
      status: 'not_hai',
      haiType: 'None',
      assessedBy: 'นพ.สมชาย เกียรติสกุล (อายุรแพทย์โรคติดเชื้อ)',
      assessedRole: 'IC Physician',
      assessedDate: '2026-08-28T14:00:00',
      criteriaMet: ['Community Acquired MDR-TB', 'Known relapsed patient'],
      recommendations: 'รักษาในห้อง Negative Pressure อย่างต่อเนื่อง ติดตาม sputum conversion และเฝ้าระวัง adverse reaction จากยากลุ่ม 2nd-line'
    }
  },
  {
    id: 'p-008',
    hn: '6618990',
    vn: 'VN690808',
    nameTh: 'นายวันชัย บุญประเสริฐ',
    nameEn: 'Mr. Wanchai Boonprasert',
    age: 58,
    gender: 'M',
    patientType: 'IPD',
    ward: 'ICU (หอผู้ป่วยวิกฤต)',
    roomBed: 'ICU-Bed 01',
    attendingPhysician: 'นพ.กิตติศักดิ์ เจริญดี (แพทย์เวชบำบัดวิกฤต)',
    department: 'อายุรกรรมวิกฤต',
    admissionDate: '2026-09-03T02:30:00',
    primaryDiagnosis: 'Intracerebral Hemorrhage s/p Craniotomy with clot removal',
    hasFeverPost48h: true,
    peakTemp: 38.9,
    feverOnsetDate: '2026-09-06T04:00:00',
    surgeryPerformed: {
      procedure: 'Emergency Craniotomy with clot removal',
      surgeryDate: '2026-09-03T04:00:00',
      surgeon: 'พญ.สุดา วงศ์สว่าง (ศัลยแพทย์ทั่วไป)',
      woundClass: 'Clean'
    },
    isRespiratoryIsolation: false,
    isMdro: false,
    isSsiSurveillance: true,
    ssiDetails: {
      procedure: 'Emergency Craniotomy',
      surgeryDate: '2026-09-03T04:00:00',
      surgeon: 'พญ.สุดา วงศ์สว่าง (ศัลยแพทย์ทั่วไป)',
      woundClass: 'Clean',
      hasImplant: false,
      postOpDays: 5,
      surveillanceStatus: 'Under Surveillance',
      woundDischarge: 'Surgical scalp wound clean, no discharge',
      woundCulture: 'No growth'
    },
    hasInvasiveDevices: true,
    devices: [
      {
        type: 'ventilator',
        nameTh: 'เครื่องช่วยหายใจ (Mechanical Ventilator)',
        nameEn: 'Mechanical Ventilator SIMV mode',
        insertionDate: '2026-09-03T03:00:00',
        insertionSite: 'Oral ETT No. 8.0 depth 22 cm',
        deviceDays: 6,
        bundleCompliant: true,
        notes: 'Ventilator bundle checklist 100% compliant'
      },
      {
        type: 'foley',
        nameTh: 'สายสวนปัสสาวะ (Foley catheter)',
        nameEn: 'Foley catheter 16 Fr',
        insertionDate: '2026-09-03T03:15:00',
        insertionSite: 'Urethral',
        deviceDays: 6,
        bundleCompliant: true
      },
      {
        type: 'arterial_line',
        nameTh: 'สายสวนทางหลอดเลือดแดง (Arterial line)',
        nameEn: 'Left Radial Arterial line',
        insertionDate: '2026-09-03T05:00:00',
        insertionSite: 'Left Radial Artery',
        deviceDays: 6,
        bundleCompliant: true
      }
    ],
    assessment: {
      assessed: false,
      status: 'pending_nurse',
      criteriaMet: ['Fever 38.9°C after 48h of admission', 'Mechanical ventilation > 48h'],
      investigationNotes: 'CXR แสดง new infiltrate right lower lobe เสมหะขุ่นเหนียว สงสัย VAP กำลังเก็บ Sputum C/S'
    }
  },
  {
    id: 'p-009',
    hn: '6523118',
    vn: 'VN690809',
    nameTh: 'นางเพ็ญศรี มณีรัตน์',
    nameEn: 'Mrs. Phensri Maneerat',
    age: 63,
    gender: 'F',
    patientType: 'IPD',
    ward: 'Ward 2 (ศัลยกรรม)',
    roomBed: 'Ward 2 - 215',
    attendingPhysician: 'พญ.สุดา วงศ์สว่าง (ศัลยแพทย์ทั่วไป)',
    department: 'ศัลยกรรม',
    admissionDate: '2026-09-02T13:00:00',
    primaryDiagnosis: 'Choledocholithiasis s/p Cholecystectomy',
    hasFeverPost48h: true,
    peakTemp: 38.2,
    feverOnsetDate: '2026-09-05T10:00:00',
    surgeryPerformed: {
      procedure: 'Laparoscopic Cholecystectomy with T-tube drainage',
      surgeryDate: '2026-09-03T09:30:00',
      surgeon: 'พญ.สุดา วงศ์สว่าง (ศัลยแพทย์ทั่วไป)',
      woundClass: 'Clean-Contaminated'
    },
    isRespiratoryIsolation: false,
    isMdro: true,
    mdroDetails: {
      organism: 'VRE (Vancomycin-Resistant Enterococcus faecium)',
      resistanceProfile: 'High-level Aminoglycoside and Vancomycin resistant; Linezolid sensitive',
      specimen: 'Bile Drainage Fluid',
      cultureDate: '2026-09-05T15:00:00',
      antibioticsReceived: [
        { name: 'Linezolid', dose: '600 mg IV q 12h', route: 'IV', startDate: '2026-09-06T09:00:00' }
      ]
    },
    isSsiSurveillance: true,
    ssiDetails: {
      procedure: 'Laparoscopic Cholecystectomy with T-tube',
      surgeryDate: '2026-09-03T09:30:00',
      surgeon: 'พญ.สุดา วงศ์สว่าง (ศัลยแพทย์ทั่วไป)',
      woundClass: 'Clean-Contaminated',
      hasImplant: false,
      postOpDays: 5,
      surveillanceStatus: 'Organ/Space',
      woundDischarge: 'Turbid bile drainage from subhepatic space',
      woundCulture: 'VRE positive'
    },
    hasInvasiveDevices: true,
    devices: [
      {
        type: 'foley',
        nameTh: 'สายสวนปัสสาวะ (Foley catheter)',
        nameEn: 'Foley catheter 14 Fr',
        insertionDate: '2026-09-03T08:30:00',
        insertionSite: 'Urethral',
        deviceDays: 5,
        bundleCompliant: true
      }
    ],
    assessment: {
      assessed: true,
      status: 'confirmed_hai',
      haiType: 'SSI',
      assessedBy: 'นพ.สมชาย เกียรติสกุล (อายุรแพทย์โรคติดเชื้อ)',
      assessedRole: 'IC Physician',
      assessedDate: '2026-09-07T11:00:00',
      criteriaMet: ['Organ/space SSI criteria met', 'Positive VRE from intra-abdominal fluid', 'Post-op day 3 fever and abdominal tenderness'],
      recommendations: 'วินิจฉัย Organ/Space SSI with VRE. ให้ Contact precaution แยกห้องเดี่ยวหรือ cohort. ปรับ ATB เป็น Linezolid IV ตามผล sensitivity'
    }
  },
  {
    id: 'p-010',
    hn: '6801944',
    vn: 'VN690810',
    nameTh: 'นางสมจิตต์ สว่างวงษ์',
    nameEn: 'Mrs. Somjit Sawangwong',
    age: 78,
    gender: 'F',
    patientType: 'IPD',
    ward: 'Ward 1 (อายุรกรรมชาย-หญิง)',
    roomBed: 'Ward 1 - 110',
    attendingPhysician: 'นพ.สมชาย เกียรติสกุล (อายุรแพทย์โรคติดเชื้อ)',
    department: 'อายุรกรรม',
    admissionDate: '2026-09-01T17:00:00',
    primaryDiagnosis: 'Chronic Kidney Disease stage 5 with Uremic Encephalopathy',
    hasFeverPost48h: true,
    peakTemp: 38.5,
    feverOnsetDate: '2026-09-04T11:00:00',
    isRespiratoryIsolation: false,
    isMdro: true,
    mdroDetails: {
      organism: 'Pseudomonas aeruginosa (MDR - Carbapenem Resistant)',
      resistanceProfile: 'Resistant to Ciprofloxacin, Piperacillin/Tazobactam, Meropenem; Sensitive to Ceftolozane/Tazobactam',
      specimen: 'Hemoculture (2 bottles positive)',
      cultureDate: '2026-09-04T12:00:00',
      antibioticsReceived: [
        { name: 'Ceftolozane/Tazobactam (Zerbaxa)', dose: '1.5 g IV q 8h (dose adjusted for renal)', route: 'IV', startDate: '2026-09-05T10:00:00' }
      ]
    },
    isSsiSurveillance: false,
    hasInvasiveDevices: true,
    devices: [
      {
        type: 'central_line',
        nameTh: 'สายสวนหลอดเลือดดำฟอกเลือด (Dual-lumen Hemodialysis Catheter)',
        nameEn: 'Right Internal Jugular Permcath',
        insertionDate: '2026-08-15T14:00:00',
        insertionSite: 'Right Internal Jugular',
        deviceDays: 24,
        bundleCompliant: false,
        notes: 'Erythema and purulent crust around catheter exit site'
      },
      {
        type: 'foley',
        nameTh: 'สายสวนปัสสาวะ (Foley catheter)',
        nameEn: 'Foley catheter 16 Fr',
        insertionDate: '2026-09-01T18:00:00',
        insertionSite: 'Urethral',
        deviceDays: 7,
        bundleCompliant: true
      }
    ],
    assessment: {
      assessed: true,
      status: 'confirmed_hai',
      haiType: 'CLABSI',
      assessedBy: 'พว.อุษา นิยมรัตน์ (IC Nurse)',
      assessedRole: 'IC Nurse',
      assessedDate: '2026-09-06T15:00:00',
      criteriaMet: ['Bloodstream infection with central line in place > 48h', 'Local signs of infection at exit site', 'MDR Pseudomonas in blood culture'],
      recommendations: 'วินิจฉัย CLABSI (Central Line-Associated Bloodstream Infection). แนะนำถอดหรือเปลี่ยนสายสวนหลอดเลือดดำฟอกเลือด และส่งปลายสายเพาะเชื้อ (Catheter tip C/S)'
    }
  },
  {
    id: 'p-011',
    hn: '6409823',
    vn: 'VN690811',
    nameTh: 'นายอนันต์ ศรีสุขสวัสดิ์',
    nameEn: 'Mr. Anan Srisuksawat',
    age: 42,
    gender: 'M',
    patientType: 'IPD',
    ward: 'Ward 5 (ห้องแยกโรคความดันลบ - Isolation)',
    roomBed: 'AIIR-503 (Negative Pressure)',
    attendingPhysician: 'นพ.ธีรวัฒน์ ชัยปกรณ์ (อายุรแพทย์โรคระบบทางเดินหายใจ)',
    department: 'อายุรกรรมระบบหายใจ',
    admissionDate: '2026-09-05T11:30:00',
    primaryDiagnosis: 'Suspected Pulmonary Tuberculosis with Pleural Effusion',
    hasFeverPost48h: false,
    peakTemp: 37.6,
    isRespiratoryIsolation: true,
    firstDiagTbOrRespiratory: true,
    isolationType: 'Airborne',
    respiratoryDiagnosis: 'Right pleural effusion with chronic weight loss and night sweats, Suspected TB Pleurisy',
    antiTbMedications: {
      drugNames: 'Rifampicin, Isoniazid, Pyrazinamide, Ethambutol (Rimstar 4-FDC)',
      startDateTime: '2026-09-06T07:30:00',
      stopDateTime: undefined,
      ongoing: true
    },
    sputumAfbResult: 'AFB 1+ (Positive)',
    geneXpertResult: 'MTB detected, Rifampicin resistance NOT detected',
    isMdro: false,
    isSsiSurveillance: false,
    hasInvasiveDevices: false,
    devices: [],
    assessment: {
      assessed: false,
      status: 'pending_nurse',
      criteriaMet: ['Admitted with first diagnosis TB', 'Airborne isolation initiated'],
      investigationNotes: 'ผู้ป่วยเพิ่งเริ่มยา anti-TB วันที่ 06/09/2026 เวลา 07:30 น. อยู่ระหว่างเฝ้าระวัง Airborne isolation ประจำวัน'
    }
  },
  {
    id: 'p-012',
    hn: '6311005',
    vn: 'VN690812',
    nameTh: 'นายธวัชชัย บวรนันทน์',
    nameEn: 'Mr. Thawatchai Bawornnan',
    age: 51,
    gender: 'M',
    patientType: 'IPD',
    ward: 'Ward 1 (อายุรกรรมชาย-หญิง)',
    roomBed: 'Ward 1 - 114',
    attendingPhysician: 'นพ.สมชาย เกียรติสกุล (อายุรแพทย์โรคติดเชื้อ)',
    department: 'อายุรกรรม',
    admissionDate: '2026-08-20T10:00:00',
    primaryDiagnosis: 'Pulmonary TB s/p completion of 2-week intensive phase isolation',
    hasFeverPost48h: false,
    peakTemp: 36.8,
    isRespiratoryIsolation: true,
    firstDiagTbOrRespiratory: true,
    isolationType: 'Standard',
    respiratoryDiagnosis: 'Pulmonary TB (Sputum converted negative x 3 specimens)',
    antiTbMedications: {
      drugNames: 'HRZE formula',
      startDateTime: '2026-08-20T14:00:00',
      stopDateTime: '2026-09-07T08:00:00',
      ongoing: false
    },
    sputumAfbResult: 'AFB Negative x 3 consecutive days (Converted)',
    geneXpertResult: 'MTB detected, No RIF resistance',
    isMdro: false,
    isSsiSurveillance: false,
    hasInvasiveDevices: false,
    devices: [],
    assessment: {
      assessed: true,
      status: 'not_hai',
      haiType: 'None',
      assessedBy: 'พว.อุษา นิยมรัตน์ (IC Nurse)',
      assessedRole: 'IC Nurse',
      assessedDate: '2026-09-07T09:00:00',
      criteriaMet: ['TB Isolation completed and discontinued', 'Sputum smear negative x 3'],
      recommendations: 'หยุดมาตรการแยกโรค Airborne Isolation (Stop isolation) ย้ายเข้าวอร์ดทั่วไปได้ และจ่ายยาต่อเนื่องแบบ DOTS'
    }
  },
  {
    id: 'p-013',
    hn: '6605531',
    vn: 'VN690813',
    nameTh: 'นางกานดา พงษ์ศิริ',
    nameEn: 'Mrs. Kanda Pongsiri',
    age: 59,
    gender: 'F',
    patientType: 'IPD',
    ward: 'Ward 2 (ศัลยกรรม)',
    roomBed: 'Ward 2 - 204',
    attendingPhysician: 'พญ.สุดา วงศ์สว่าง (ศัลยแพทย์ทั่วไป)',
    department: 'ศัลยกรรม',
    admissionDate: '2026-09-04T08:00:00',
    primaryDiagnosis: 'Left Breast Carcinoma s/p Modified Radical Mastectomy',
    hasFeverPost48h: false,
    peakTemp: 37.1,
    surgeryPerformed: {
      procedure: 'Modified Radical Mastectomy (MRM) Left Breast',
      surgeryDate: '2026-09-04T13:00:00',
      surgeon: 'พญ.สุดา วงศ์สว่าง (ศัลยแพทย์ทั่วไป)',
      woundClass: 'Clean'
    },
    isRespiratoryIsolation: false,
    isMdro: false,
    isSsiSurveillance: true,
    ssiDetails: {
      procedure: 'Modified Radical Mastectomy (MRM)',
      surgeryDate: '2026-09-04T13:00:00',
      surgeon: 'พญ.สุดา วงศ์สว่าง (ศัลยแพทย์ทั่วไป)',
      woundClass: 'Clean',
      hasImplant: false,
      postOpDays: 4,
      surveillanceStatus: 'Under Surveillance',
      woundDischarge: 'Jackson-Pratt drain 40 mL serosanguinous, wound edges approximated well',
      woundCulture: 'No swab needed'
    },
    hasInvasiveDevices: false,
    devices: [],
    assessment: {
      assessed: true,
      status: 'not_hai',
      haiType: 'None',
      assessedBy: 'พว.พัชรา สุวรรณเวช (IC Nurse)',
      assessedRole: 'IC Nurse',
      assessedDate: '2026-09-07T14:30:00',
      criteriaMet: ['Clean wound without signs of SSI'],
      recommendations: 'เฝ้าระวังต่อเนื่อง 30 วันตามเกณฑ์ SSI Surveillance'
    }
  },
  {
    id: 'p-014',
    hn: '6712999',
    vn: 'VN690814',
    nameTh: 'นายเกรียงศักดิ์ ธรรมรัตน์',
    nameEn: 'Mr. Kriangsak Thammarat',
    age: 65,
    gender: 'M',
    patientType: 'IPD',
    ward: 'ICU (หอผู้ป่วยวิกฤต)',
    roomBed: 'ICU-Bed 05',
    attendingPhysician: 'นพ.กิตติศักดิ์ เจริญดี (แพทย์เวชบำบัดวิกฤต)',
    department: 'อายุรกรรมวิกฤต',
    admissionDate: '2026-09-01T06:00:00',
    primaryDiagnosis: 'Cardiogenic Shock s/p Acute Myocardial Infarction',
    hasFeverPost48h: true,
    peakTemp: 38.7,
    feverOnsetDate: '2026-09-05T08:00:00',
    isRespiratoryIsolation: false,
    isMdro: false,
    isSsiSurveillance: false,
    hasInvasiveDevices: true,
    devices: [
      {
        type: 'arterial_line',
        nameTh: 'สายสวนทางหลอดเลือดแดง (Arterial line)',
        nameEn: 'Femoral Arterial Line',
        insertionDate: '2026-09-01T07:00:00',
        insertionSite: 'Right Femoral Artery',
        deviceDays: 7,
        bundleCompliant: true,
        notes: 'High infection risk site (femoral), advised changing to radial when feasible'
      },
      {
        type: 'foley',
        nameTh: 'สายสวนปัสสาวะ (Foley catheter)',
        nameEn: 'Foley Catheter 16 Fr with urometer',
        insertionDate: '2026-09-01T06:30:00',
        insertionSite: 'Urethral',
        deviceDays: 7,
        bundleCompliant: true
      },
      {
        type: 'ventilator',
        nameTh: 'เครื่องช่วยหายใจ (Mechanical Ventilator)',
        nameEn: 'Mechanical Ventilator',
        insertionDate: '2026-09-01T08:00:00',
        insertionSite: 'Oral ETT No. 8.0',
        deviceDays: 7,
        bundleCompliant: true
      }
    ],
    assessment: {
      assessed: false,
      status: 'pending_doctor',
      criteriaMet: ['Fever > 38.5°C with invasive femoral line > 5 days'],
      investigationNotes: 'สงสัย Arterial catheter-related bloodstream infection หรือ VAP แพทย์และ IC กำลังรอผล Hemoculture 2 ข้าง'
    }
  },
  // OPD Patients samples
  {
    id: 'p-015',
    hn: '6804551',
    vn: 'VN690815',
    nameTh: 'นางสาวนริศรา พงศ์วานิช',
    nameEn: 'Ms. Narissara Pongwanich',
    age: 31,
    gender: 'F',
    patientType: 'OPD',
    ward: 'OPD ARI (คลินิกโรคทางเดินหายใจ)',
    roomBed: 'Exam Room 2',
    attendingPhysician: 'นพ.ธีรวัฒน์ ชัยปกรณ์ (อายุรแพทย์โรคระบบทางเดินหายใจ)',
    department: 'อายุรกรรมระบบหายใจ',
    admissionDate: '2026-09-08T09:00:00',
    primaryDiagnosis: 'Influenza Type A with Acute Pharyngitis',
    hasFeverPost48h: false,
    peakTemp: 38.6,
    isRespiratoryIsolation: true,
    firstDiagTbOrRespiratory: true,
    isolationType: 'Droplet',
    respiratoryDiagnosis: 'Influenza A positive by rapid antigen test, high fever, sore throat',
    isMdro: false,
    isSsiSurveillance: false,
    hasInvasiveDevices: false,
    devices: [],
    assessment: {
      assessed: true,
      status: 'not_hai',
      haiType: 'None',
      assessedBy: 'พว.อุษา นิยมรัตน์ (IC Nurse)',
      assessedRole: 'IC Nurse',
      assessedDate: '2026-09-08T09:45:00',
      criteriaMet: ['Outpatient Community Transmission'],
      recommendations: 'Home isolation 5 วัน, สวม surgical mask ตลอดเวลา, แนะนำสุขอนามัยการล้างมือ'
    }
  },
  {
    id: 'p-016',
    hn: '6804552',
    vn: 'VN690816',
    nameTh: 'นายชัยยุทธ ทรงอักษร',
    nameEn: 'Mr. Chaiyuth Song-aksorn',
    age: 45,
    gender: 'M',
    patientType: 'OPD',
    ward: 'OPD Surgery (คลินิกศัลยกรรม)',
    roomBed: 'Dressing Room 1',
    attendingPhysician: 'พญ.สุดา วงศ์สว่าง (ศัลยแพทย์ทั่วไป)',
    department: 'ศัลยกรรม',
    admissionDate: '2026-09-08T10:15:00',
    primaryDiagnosis: 'Follow up post-op Inguinal Hernioplasty (Day 14)',
    hasFeverPost48h: false,
    peakTemp: 36.6,
    surgeryPerformed: {
      procedure: 'Right Open Inguinal Hernioplasty with Mesh',
      surgeryDate: '2026-08-25T11:00:00',
      surgeon: 'พญ.สุดา วงศ์สว่าง (ศัลยแพทย์ทั่วไป)',
      woundClass: 'Clean'
    },
    isRespiratoryIsolation: false,
    isMdro: false,
    isSsiSurveillance: true,
    ssiDetails: {
      procedure: 'Right Open Inguinal Hernioplasty with Mesh (Implant)',
      surgeryDate: '2026-08-25T11:00:00',
      surgeon: 'พญ.สุดา วงศ์สว่าง (ศัลยแพทย์ทั่วไป)',
      woundClass: 'Clean',
      hasImplant: true,
      postOpDays: 14,
      surveillanceStatus: 'No Infection / Resolved',
      woundDischarge: 'Wound clean, dry, sutures removed, mesh intact, no sign of SSI'
    },
    hasInvasiveDevices: false,
    devices: [],
    assessment: {
      assessed: true,
      status: 'not_hai',
      haiType: 'None',
      assessedBy: 'พว.พัชรา สุวรรณเวช (IC Nurse)',
      assessedRole: 'IC Nurse',
      assessedDate: '2026-09-08T10:45:00',
      criteriaMet: ['Post-op Day 14 follow-up clean and healed'],
      recommendations: 'เฝ้าระวัง SSI ครบ 90 วัน เนื่องจากมีการใส่อุปกรณ์เทียม (Synthetic mesh)'
    }
  },
  {
    id: 'p-017',
    hn: '6709921',
    vn: 'VN690817',
    nameTh: 'นางอารีรัตน์ วิบูลย์กุล',
    nameEn: 'Mrs. Areerat Wiboonkul',
    age: 56,
    gender: 'F',
    patientType: 'IPD',
    ward: 'Ward 3 (ออร์โธปิดิกส์)',
    roomBed: 'Ward 3 - 305',
    attendingPhysician: 'นพ.ประวิทย์ สุขเจริญ (ศัลยแพทย์กระดูกและข้อ)',
    department: 'ศัลยกรรมกระดูกและข้อ',
    admissionDate: '2026-09-03T11:00:00',
    primaryDiagnosis: 'Closed Fracture Right Femoral Shaft s/p ORIF with Intramedullary Nail',
    hasFeverPost48h: true,
    peakTemp: 38.4,
    feverOnsetDate: '2026-09-06T18:00:00',
    surgeryPerformed: {
      procedure: 'ORIF with Intramedullary Nail Right Femur',
      surgeryDate: '2026-09-03T14:00:00',
      surgeon: 'นพ.ประวิทย์ สุขเจริญ (ศัลยแพทย์กระดูกและข้อ)',
      woundClass: 'Clean'
    },
    isRespiratoryIsolation: false,
    isMdro: false,
    isSsiSurveillance: true,
    ssiDetails: {
      procedure: 'ORIF with Intramedullary Nail',
      surgeryDate: '2026-09-03T14:00:00',
      surgeon: 'นพ.ประวิทย์ สุขเจริญ (ศัลยแพทย์กระดูกและข้อ)',
      woundClass: 'Clean',
      hasImplant: true,
      postOpDays: 5,
      surveillanceStatus: 'Under Surveillance',
      woundDischarge: 'Minimal serous discharge, mild local warmth',
      woundCulture: 'Swab sent, pending'
    },
    hasInvasiveDevices: true,
    devices: [
      {
        type: 'foley',
        nameTh: 'สายสวนปัสสาวะ (Foley catheter)',
        nameEn: 'Foley Catheter 16 Fr',
        insertionDate: '2026-09-03T13:30:00',
        insertionSite: 'Urethral',
        deviceDays: 5,
        bundleCompliant: true
      }
    ],
    assessment: {
      assessed: false,
      status: 'pending_nurse',
      criteriaMet: ['Fever > 38°C after 48 hours post-op', 'Clean orthopedic surgery with implant'],
      investigationNotes: 'ติดตามอาการปวดบวมรอบแผลผ่าตัด และผลเพาะเชื้อจากปัสสาวะและแผล'
    }
  },
  {
    id: 'p-018',
    hn: '6803112',
    vn: 'VN690818',
    nameTh: 'นายจักรพงษ์ สินธุวงศ์',
    nameEn: 'Mr. Jakkapong Sinthuwong',
    age: 38,
    gender: 'M',
    patientType: 'OPD',
    ward: 'OPD Medicine (คลินิกอายุรกรรม)',
    roomBed: 'Exam Room 5',
    attendingPhysician: 'นพ.สมชาย เกียรติสกุล (อายุรแพทย์โรคติดเชื้อ)',
    department: 'อายุรกรรม',
    admissionDate: '2026-09-08T11:00:00',
    primaryDiagnosis: 'Essential Hypertension routine check-up',
    hasFeverPost48h: false,
    peakTemp: 36.7,
    isRespiratoryIsolation: false,
    isMdro: false,
    isSsiSurveillance: false,
    hasInvasiveDevices: false,
    devices: [],
    assessment: {
      assessed: true,
      status: 'not_hai',
      haiType: 'None'
    }
  }
];

// Statistical baseline for Point Prevalence Survey
export const PREVALENCE_STATS = {
  totalRegisteredPatients: 2145,
  opdPatientsTotal: 1350,
  ipdPatientsTotal: 795,
  totalPatientDaysPeriod: 8640,
  activeHaiConfirmedCount: 12,
  pendingReviewCount: 15,
  overdueReviewCount: 6,
  criticalOverdueCount: 2
};
