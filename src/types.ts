export type PatientType = 'OPD' | 'IPD';

export type HaiStatus = 'pending_nurse' | 'pending_doctor' | 'confirmed_hai' | 'not_hai' | 'under_investigation';

export type IsolationType = 'Airborne' | 'Droplet' | 'Contact' | 'Protective' | 'Standard';

export type WoundClass = 'Clean' | 'Clean-Contaminated' | 'Contaminated' | 'Dirty/Infected';

export type SsiStatus = 'Under Surveillance' | 'Superficial Incisional' | 'Deep Incisional' | 'Organ/Space' | 'No Infection / Resolved';

export type DeviceType = 'foley' | 'ventilator' | 'arterial_line' | 'central_line';

export interface InvasiveDeviceInfo {
  type: DeviceType;
  nameTh: string;
  nameEn: string;
  insertionDate: string;
  insertionSite: string;
  deviceDays: number;
  bundleCompliant: boolean;
  notes?: string;
}

export interface HaiAssessment {
  assessed: boolean;
  status: HaiStatus;
  haiType?: 'CAUTI' | 'VAP' | 'SSI' | 'CLABSI' | 'HAP' | 'C.difficile' | 'Other HAI' | 'None';
  assessedBy?: string;
  assessedRole?: 'IC Nurse' | 'IC Physician';
  assessedDate?: string;
  criteriaMet?: string[];
  recommendations?: string;
  investigationNotes?: string;
}

export interface Patient {
  id: string;
  hn: string;
  vn: string;
  nameTh: string;
  nameEn: string;
  age: number;
  gender: 'M' | 'F';
  patientType: PatientType;
  ward: string;
  roomBed: string;
  attendingPhysician: string;
  department: string;
  admissionDate: string;
  dischargeDate?: string;
  primaryDiagnosis: string;
  
  // Requirement 2: Fever > 48h
  hasFeverPost48h: boolean;
  peakTemp?: number;
  feverOnsetDate?: string;
  surgeryPerformed?: {
    procedure: string;
    surgeryDate: string;
    surgeon: string;
    woundClass?: WoundClass;
  };
  
  // Requirement 3: TB & Respiratory
  isRespiratoryIsolation: boolean;
  firstDiagTbOrRespiratory?: boolean;
  isolationType?: IsolationType;
  respiratoryDiagnosis?: string;
  antiTbMedications?: {
    drugNames: string;
    startDateTime: string;
    stopDateTime?: string;
    ongoing: boolean;
  };
  sputumAfbResult?: string;
  geneXpertResult?: string;
  
  // Requirement 4: MDRO
  isMdro: boolean;
  mdroDetails?: {
    organism: string;
    resistanceProfile: string;
    specimen: string;
    cultureDate: string;
    antibioticsReceived: {
      name: string;
      dose: string;
      route: string;
      startDate: string;
      endDate?: string;
    }[];
  };

  // Requirement 5: SSI Surveillance
  isSsiSurveillance: boolean;
  ssiDetails?: {
    procedure: string;
    surgeryDate: string;
    surgeon: string;
    woundClass: WoundClass;
    hasImplant: boolean;
    postOpDays: number;
    surveillanceStatus: SsiStatus;
    woundDischarge?: string;
    woundCulture?: string;
  };

  // Requirement 6: Catheters and Invasive Devices
  hasInvasiveDevices: boolean;
  devices: InvasiveDeviceInfo[];

  // Requirement 7: HAI Assessment
  assessment: HaiAssessment;
}

export interface FilterState {
  startDate: string;
  endDate: string;
  ward: string;
  doctor: string;
  haiStatus: string;
  searchQuery: string;
}
