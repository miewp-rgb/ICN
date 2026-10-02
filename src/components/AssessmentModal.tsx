import React, { useState } from 'react';
import { 
  X, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  UserCheck, 
  Stethoscope, 
  FileText,
  Thermometer,
  Syringe,
  Scissors
} from 'lucide-react';
import { Patient, HaiStatus } from '../types';

interface AssessmentModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveAssessment: (
    patientId: string,
    assessmentData: {
      status: HaiStatus;
      haiType?: any;
      assessedBy: string;
      assessedRole: 'IC Nurse' | 'IC Physician';
      criteriaMet: string[];
      recommendations: string;
      investigationNotes: string;
    }
  ) => void;
  currentUserRole: 'IC Nurse' | 'IC Physician';
}

const COMMON_CRITERIA = [
  'มีไข้ ≥ 38.0°C หลังจาก Admit เกิน 48 ชั่วโมง',
  'ใส่อุปกรณ์รุกล้ำ (Foley/Vent/Line) ต่อเนื่อง > 2 วันปฏิทิน',
  'ผลเพาะเชื้อ (C/S) พบเชื้อก่อโรคก่อให้เกิดพยาธิสภาพ',
  'ตรวจพบสิ่งคัดหลั่งมีลักษณะเป็นหนอง (Purulent drainage)',
  'มีอาการแสดงเฉพาะที่ (ปวด บวม แดง ร้อน หรือกดเจ็บบริเวณแผล/สายสวน)',
  'ภาพรังสีทรวงอก (CXR) พบรอยโรคใหม่ (New pulmonary infiltrate)',
  'ผลตรวจทางห้องปฏิบัติการพบ Leukocytosis (WBC > 12,000/uL)'
];

export const AssessmentModal: React.FC<AssessmentModalProps> = ({
  patient,
  isOpen,
  onClose,
  onSaveAssessment,
  currentUserRole
}) => {
  if (!isOpen || !patient) return null;

  const [status, setStatus] = useState<HaiStatus>(
    patient.assessment.status || 'confirmed_hai'
  );
  const [haiType, setHaiType] = useState<string>(
    patient.assessment.haiType || 
    (patient.devices.some(d => d.type === 'foley') ? 'CAUTI' :
     patient.devices.some(d => d.type === 'ventilator') ? 'VAP' :
     patient.isSsiSurveillance ? 'SSI' : 'Other HAI')
  );
  const [assessorName, setAssessorName] = useState<string>(
    patient.assessment.assessedBy || 
    (currentUserRole === 'IC Nurse' ? 'พว.อุษา นิยมรัตน์ (ICN)' : 'นพ.สมชาย เกียรติสกุล (IC Physician)')
  );
  const [criteriaSelected, setCriteriaSelected] = useState<string[]>(
    patient.assessment.criteriaMet || [
      'มีไข้ ≥ 38.0°C หลังจาก Admit เกิน 48 ชั่วโมง'
    ]
  );
  const [recommendations, setRecommendations] = useState<string>(
    patient.assessment.recommendations || 
    'ประเมินถอดสายสวนโดยเร็วที่สุด, เฝ้าระวังอาการทางคลินิก, และเน้นย้ำสุขอนามัยการล้างมือ 5 ช่วงเวลา'
  );
  const [investigationNotes, setInvestigationNotes] = useState<string>(
    patient.assessment.investigationNotes || ''
  );

  const toggleCriterion = (criterion: string) => {
    if (criteriaSelected.includes(criterion)) {
      setCriteriaSelected(criteriaSelected.filter(c => c !== criterion));
    } else {
      setCriteriaSelected([...criteriaSelected, criterion]);
    }
  };

  const handleSave = () => {
    onSaveAssessment(patient.id, {
      status,
      haiType: status === 'confirmed_hai' ? (haiType as any) : 'None',
      assessedBy: assessorName,
      assessedRole: currentUserRole,
      criteriaMet: criteriaSelected,
      recommendations,
      investigationNotes
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                แบบประเมินและวินิจฉัยการติดเชื้อในโรงพยาบาล (IC Assessment & Diagnostic Evaluation)
              </h3>
              <p className="text-xs text-slate-500">
                สำหรับพยาบาล IC (ICN) และแพทย์ IC • เกณฑ์มาตรฐาน CDC/NHSN Surveillance Criteria
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          
          {/* Patient Quick Summary Box */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-slate-900">{patient.nameTh}</span>
                <span className="text-slate-400">({patient.nameEn})</span>
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold text-[11px]">
                  HN: {patient.hn}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-mono text-[11px]">
                  VN: {patient.vn}
                </span>
              </div>
              <div className="text-slate-500 mt-1 flex flex-wrap items-center gap-3 text-[11px]">
                <span>อายุ: {patient.age} ปี</span>
                <span>หอผู้ป่วย: <strong>{patient.ward}</strong></span>
                <span>เตียง: <strong>{patient.roomBed}</strong></span>
                <span>แพทย์: {patient.attendingPhysician.split(' ')[0]} {patient.attendingPhysician.split(' ')[1]}</span>
              </div>
              <div className="text-slate-600 mt-1">
                การวินิจฉัยหลัก: <span className="font-medium text-slate-900">{patient.primaryDiagnosis}</span>
              </div>
            </div>

            {/* Triggers */}
            <div className="flex flex-col gap-1 text-[11px]">
              {patient.hasFeverPost48h && (
                <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 font-semibold flex items-center gap-1">
                  <Thermometer className="w-3 h-3" />
                  ไข้ {patient.peakTemp}°C หลัง 48 ชม.
                </span>
              )}
              {patient.devices && patient.devices.length > 0 && (
                <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-semibold flex items-center gap-1">
                  <Syringe className="w-3 h-3" />
                  มีสายสวน {patient.devices.length} รายการ
                </span>
              )}
              {patient.surgeryPerformed && (
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold flex items-center gap-1">
                  <Scissors className="w-3 h-3" />
                  ผ่าตัด: {patient.surgeryPerformed.procedure}
                </span>
              )}
            </div>
          </div>

          {/* Section 1: Final Assessment Verdict */}
          <div>
            <label className="block font-bold text-slate-900 mb-2">
              1. ผลการวินิจฉัยและตัดสินสถานะ (Assessment Verdict) *
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              
              <label
                className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                  status === 'confirmed_hai'
                    ? 'bg-red-50/80 border-red-500 text-red-950 ring-2 ring-red-200'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">ติดเชื้อใน รพ. (Confirmed HAI)</span>
                  <input
                    type="radio"
                    name="verdict"
                    checked={status === 'confirmed_hai'}
                    onChange={() => setStatus('confirmed_hai')}
                    className="text-red-600"
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-1">
                  เข้าเกณฑ์ HAI ชัดเจนหลังจาก Admit 48 ชม.
                </span>
              </label>

              <label
                className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                  status === 'not_hai'
                    ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950 ring-2 ring-emerald-200'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">ไม่ใช่ HAI (Not HAI / CAI)</span>
                  <input
                    type="radio"
                    name="verdict"
                    checked={status === 'not_hai'}
                    onChange={() => setStatus('not_hai')}
                    className="text-emerald-600"
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-1">
                  ติดจากชุมชน (CAI) หรือไม่ใช่การติดเชื้อ
                </span>
              </label>

              <label
                className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                  status === 'pending_doctor'
                    ? 'bg-orange-50/80 border-orange-500 text-orange-950 ring-2 ring-orange-200'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">ส่งต่อแพทย์ IC ยืนยัน</span>
                  <input
                    type="radio"
                    name="verdict"
                    checked={status === 'pending_doctor'}
                    onChange={() => setStatus('pending_doctor')}
                    className="text-orange-600"
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-1">
                  เคสซับซ้อน ต้องการความเห็นแพทย์เฉพาะทาง
                </span>
              </label>

              <label
                className={`p-3 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                  status === 'under_investigation'
                    ? 'bg-amber-50/80 border-amber-500 text-amber-950 ring-2 ring-amber-200'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold">อยู่ระหว่างสืบสวน</span>
                  <input
                    type="radio"
                    name="verdict"
                    checked={status === 'under_investigation'}
                    onChange={() => setStatus('under_investigation')}
                    className="text-amber-600"
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-1">
                  รอผลตรวจทางห้องปฏิบัติการ (Pending C/S)
                </span>
              </label>

            </div>
          </div>

          {/* Section 2: HAI Classification (If Confirmed HAI) */}
          {status === 'confirmed_hai' && (
            <div className="bg-red-50/50 p-3.5 rounded-xl border border-red-200">
              <label className="block font-bold text-red-950 mb-2">
                2. การจำแนกประเภทการติดเชื้อในโรงพยาบาล (HAI Classification) *
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'CAUTI', label: 'CAUTI (สายสวนปัสสาวะ)' },
                  { id: 'VAP', label: 'VAP (เครื่องช่วยหายใจ)' },
                  { id: 'SSI', label: 'SSI (ตำแหน่งผ่าตัด)' },
                  { id: 'CLABSI', label: 'CLABSI (สายสวนหลอดเลือด)' },
                  { id: 'HAP', label: 'HAP (ปอดอักเสบใน รพ.)' },
                  { id: 'C.difficile', label: 'C. difficile Colitis' },
                  { id: 'Other HAI', label: 'Other HAI อื่นๆ' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setHaiType(item.id)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold text-left transition-colors border ${
                      haiType === item.id
                        ? 'bg-red-600 text-white border-red-700 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Diagnostic Criteria Checklist */}
          <div>
            <label className="block font-bold text-slate-900 mb-2">
              3. เกณฑ์การวินิจฉัยที่เข้าได้ (Criteria Met - CDC/NHSN Surveillance Definition)
            </label>
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
              {COMMON_CRITERIA.map((criterion, idx) => {
                const checked = criteriaSelected.includes(criterion);
                return (
                  <label
                    key={idx}
                    onClick={() => toggleCriterion(criterion)}
                    className={`flex items-start gap-2.5 p-2 rounded-lg cursor-pointer transition-colors ${
                      checked ? 'bg-blue-50/70 text-blue-950 font-medium' : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-blue-600"
                    />
                    <span>{criterion}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Section 4: Recommendations & Clinical Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-900 mb-1">
                4. มาตรการและข้อเสนอแนะควบคุมโรค (IC Recommendations & Interventions)
              </label>
              <textarea
                value={recommendations}
                onChange={(e) => setRecommendations(e.target.value)}
                rows={3}
                placeholder="เช่น แนะนำ off foley catheter, ติดป้าย Contact Precaution, ให้ยาปฏิชีวนะตาม C/S..."
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-900 mb-1">
                5. บันทึกการทบทวนของพยาบาล IC / แพทย์ (Review Notes)
              </label>
              <textarea
                value={investigationNotes}
                onChange={(e) => setInvestigationNotes(e.target.value)}
                rows={3}
                placeholder="รายละเอียดผลแล็บ, การสืบสวนระบาดวิทยา, การส่งตรวจเพิ่มเติม..."
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-xs"
              />
            </div>
          </div>

          {/* Section 5: Assessor Identification */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">ผู้ทำการประเมิน:</span>
              <input
                type="text"
                value={assessorName}
                onChange={(e) => setAssessorName(e.target.value)}
                className="px-2.5 py-1 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white font-medium"
              />
              <span className="text-[11px] text-slate-400">
                (บทบาท: {currentUserRole === 'IC Nurse' ? 'พยาบาล IC' : 'แพทย์ IC'})
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              วันที่ประเมิน: {new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs flex items-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" />
            <span>บันทึกผลการประเมิน</span>
          </button>
        </div>

      </div>
    </div>
  );
};
