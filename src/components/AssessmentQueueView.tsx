import React from 'react';
import { 
  CheckSquare, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  FileText, 
  UserCheck, 
  Stethoscope, 
  Search,
  Eye
} from 'lucide-react';
import { Patient, HaiStatus } from '../types';

interface AssessmentQueueViewProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onOpenAssessment: (patient: Patient) => void;
  onQuickAssess: (patientId: string, status: HaiStatus, haiType?: any) => void;
  currentUserRole: 'IC Nurse' | 'IC Physician';
}

export const AssessmentQueueView: React.FC<AssessmentQueueViewProps> = ({
  patients,
  onSelectPatient,
  onOpenAssessment,
  onQuickAssess,
  currentUserRole
}) => {
  return (
    <div className="space-y-4">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-50 via-red-50 to-amber-50 border border-rose-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rose-600 flex items-center justify-center text-white shadow-xs">
              <CheckSquare className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>คิวประเมินและวินิจฉัยการติดเชื้อในโรงพยาบาล (HAI Assessment Queue)</span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                บทบาทพยาบาล IC (ICN) และแพทย์ IC: ร่วมทบทวนเคสสงสัยตามเกณฑ์ CDC/NHSN เพื่อยืนยันหรือคัดกรองว่าเป็นการติดเชื้อในโรงพยาบาลจริงหรือไม่
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">คุณกำลังประเมินในฐานะ:</span>
            <span className="font-bold px-2.5 py-1 rounded-lg bg-white border border-rose-300 text-rose-800 shadow-2xs">
              {currentUserRole === 'IC Nurse' ? 'พยาบาล IC (IC Nurse)' : 'แพทย์ IC (IC Physician)'}
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3.5">ระดับความเร่งด่วน</th>
                <th className="py-3 px-3.5">HN / VN</th>
                <th className="py-3 px-3.5">ผู้ป่วย & วอร์ด</th>
                <th className="py-3 px-3.5">เหตุผลที่ทริกเกอร์เฝ้าระวัง (Trigger Criteria)</th>
                <th className="py-3 px-3.5 text-center">ระยะเวลารอ (Days Pending)</th>
                <th className="py-3 px-3.5">ผู้รับผิดชอบทบทวน</th>
                <th className="py-3 px-3.5">สถานะปัจจุบัน</th>
                <th className="py-3 px-3.5 text-center">การตัดสินใจประเมิน (Action)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    ไม่พบเคสในคิวประเมินตามเงื่อนไขตัวกรอง
                  </td>
                </tr>
              ) : (
                patients.map((patient) => {
                  const status = patient.assessment.status;
                  const isPending = status === 'pending_nurse' || status === 'pending_doctor';
                  const isCritical = (patient.peakTemp || 0) >= 38.5 || patient.isMdro;
                  
                  // Synthesize trigger text
                  let triggerText = 'เฝ้าระวังการติดเชื้อทั่วไป';
                  if (patient.hasFeverPost48h && patient.devices.some(d => d.type === 'ventilator')) {
                    triggerText = 'ไข้ > 48 ชม. + ใส่เครื่องช่วยหายใจ (สงสัย VAP)';
                  } else if (patient.hasFeverPost48h && patient.devices.some(d => d.type === 'foley')) {
                    triggerText = 'ไข้ > 48 ชม. + ใส่สายสวนปัสสาวะ (สงสัย CAUTI)';
                  } else if (patient.isSsiSurveillance && (patient.peakTemp || 0) >= 38.0) {
                    triggerText = 'แผลผ่าตัด + มีไข้ (สงสัย SSI)';
                  } else if (patient.isMdro) {
                    triggerText = `พบเชื้อดื้อยา ${patient.mdroDetails?.organism.split('(')[0]}`;
                  } else if (patient.hasFeverPost48h) {
                    triggerText = `มีไข้ ${patient.peakTemp}°C หลังแอดมิท 48 ชม.`;
                  } else if (patient.isRespiratoryIsolation) {
                    triggerText = 'First Diag TB / ทางเดินหายใจแยกโรค';
                  }

                  return (
                    <tr
                      key={patient.id}
                      className={`hover:bg-slate-50/80 transition-colors group ${
                        isPending ? 'bg-amber-50/30' : ''
                      }`}
                    >
                      {/* Priority */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {isCritical && isPending ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-600 text-white shadow-2xs animate-pulse-subtle">
                            <AlertTriangle className="w-3 h-3" />
                            วิกฤติ (Critical)
                          </span>
                        ) : isPending ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                            <Clock className="w-3 h-3 text-amber-600" />
                            ด่วน (High)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-700">
                            เสร็จสิ้นแล้ว
                          </span>
                        )}
                      </td>

                      {/* HN / VN */}
                      <td className="py-3 px-3.5 font-mono">
                        <div className="font-bold text-blue-700">{patient.hn}</div>
                        <div className="text-[10px] text-slate-400">{patient.vn}</div>
                      </td>

                      {/* Patient & Ward */}
                      <td className="py-3 px-3.5">
                        <div className="font-semibold text-slate-900">{patient.nameTh}</div>
                        <div className="text-[10px] text-slate-500">
                          {patient.ward.split(' ')[0]} ({patient.roomBed})
                        </div>
                      </td>

                      {/* Trigger Criteria */}
                      <td className="py-3 px-3.5 max-w-[220px]">
                        <div className="font-medium text-slate-800 text-[11px]">
                          {triggerText}
                        </div>
                        {patient.assessment.criteriaMet && patient.assessment.criteriaMet.length > 0 && (
                          <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                            เกณฑ์: {patient.assessment.criteriaMet.join(', ')}
                          </div>
                        )}
                      </td>

                      {/* Days Pending */}
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        {isPending ? (
                          <span className="font-bold text-red-600 font-mono text-xs bg-red-50 px-2 py-0.5 rounded border border-red-200">
                            {isCritical ? '5 วัน' : '2 วัน'}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">-</span>
                        )}
                      </td>

                      {/* Assigned Reviewer */}
                      <td className="py-3 px-3.5 whitespace-nowrap text-[11px]">
                        <div className="flex items-center gap-1 text-slate-700 font-medium">
                          {patient.assessment.status === 'pending_doctor' ? (
                            <>
                              <Stethoscope className="w-3 h-3 text-indigo-600" />
                              <span>แพทย์ IC / {patient.attendingPhysician.split(' ')[0]}</span>
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-3 h-3 text-blue-600" />
                              <span>{patient.assessment.assessedBy || 'พว.อุษา นิยมรัตน์ (ICN)'}</span>
                            </>
                          )}
                        </div>
                      </td>

                      {/* Current Status */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {status === 'confirmed_hai' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-red-100 text-red-800 border border-red-200">
                            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                            Confirmed HAI ({patient.assessment.haiType})
                          </span>
                        ) : status === 'not_hai' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            ไม่ใช่ HAI (Not HAI)
                          </span>
                        ) : status === 'pending_doctor' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-orange-100 text-orange-900 border border-orange-200">
                            รอแพทย์ IC ยืนยัน
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-amber-100 text-amber-900 border border-amber-200">
                            รอพยาบาล IC ทบทวน
                          </span>
                        )}
                      </td>

                      {/* Decision Action Buttons */}
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          
                          {/* Quick Confirm HAI */}
                          <button
                            onClick={() => onQuickAssess(patient.id, 'confirmed_hai', 'Other HAI')}
                            className="px-2 py-1 text-[11px] font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded transition-colors shadow-2xs flex items-center gap-1"
                            title="ยืนยันทันทีว่าเกิดการติดเชื้อในโรงพยาบาลจริง (Confirm HAI)"
                          >
                            <CheckCircle className="w-3 h-3" />
                            <span>Confirm HAI</span>
                          </button>

                          {/* Quick Not HAI */}
                          <button
                            onClick={() => onQuickAssess(patient.id, 'not_hai', 'None')}
                            className="px-2 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded transition-colors flex items-center gap-1"
                            title="ตัดออก: ไม่ใช่การติดเชื้อใน รพ. (เช่น ติดมาจากชุมชน หรือ Colonization)"
                          >
                            <XCircle className="w-3 h-3 text-slate-500" />
                            <span>Not HAI</span>
                          </button>

                          {/* Open Full Assessment Modal */}
                          <button
                            onClick={() => onOpenAssessment(patient)}
                            className="px-2 py-1 text-[11px] font-medium bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded transition-colors flex items-center gap-1"
                            title="เปิดแบบประเมินวินิจฉัยฉบับเต็ม บันทึกเกณฑ์ CDC/NHSN และคำแนะนำ"
                          >
                            <FileText className="w-3 h-3" />
                            <span>ประเมินละเอียด</span>
                          </button>

                          {/* View details */}
                          <button
                            onClick={() => onSelectPatient(patient)}
                            className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                            title="เปิดดูประวัติผู้ป่วย"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                        </div>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
