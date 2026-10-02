import React from 'react';
import { Scissors, Eye, CheckCircle, AlertTriangle, ShieldCheck, Calendar, User } from 'lucide-react';
import { Patient } from '../types';

interface SsiSurveillanceViewProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onOpenAssessment: (patient: Patient) => void;
}

export const SsiSurveillanceView: React.FC<SsiSurveillanceViewProps> = ({
  patients,
  onSelectPatient,
  onOpenAssessment
}) => {
  const ssiCases = patients.filter((p) => p.isSsiSurveillance);

  return (
    <div className="space-y-4">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border border-emerald-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white shadow-xs">
              <Scissors className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>เฝ้าระวังการติดเชื้อตำแหน่งผ่าตัด (Surgical Site Infection - SSI Surveillance)</span>
                <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  {ssiCases.length} ราย
                </span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                ติดตามแผลผ่าตัด 30 วัน (หรือ 90 วันกรณีมีอุปกรณ์เทียม/Implant) • จำแนกตามหัตถการ, ศัลยแพทย์, Wound Class และลักษณะแผล
              </p>
            </div>
          </div>
          <div className="text-xs text-emerald-900 bg-white/80 px-3 py-1.5 rounded-lg border border-emerald-200">
            เกณฑ์ NHSN: Superficial Incisional, Deep Incisional, Organ/Space SSI
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3.5">HN / VN</th>
                <th className="py-3 px-3.5">ชื่อ-สกุล / วอร์ด</th>
                <th className="py-3 px-3.5">หัตถการผ่าตัด (Procedure)</th>
                <th className="py-3 px-3.5">วันที่ผ่าตัด / POD</th>
                <th className="py-3 px-3.5">ศัลยแพทย์ (Surgeon)</th>
                <th className="py-3 px-3.5">ประเภทแผล (Wound Class)</th>
                <th className="py-3 px-3.5 text-center">อุปกรณ์เทียม (Implant)</th>
                <th className="py-3 px-3.5">สถานะ SSI / สิ่งคัดหลั่ง</th>
                <th className="py-3 px-3.5 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ssiCases.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    ไม่พบผู้ป่วยที่อยู่ในระบบเฝ้าระวัง SSI ตามเงื่อนไขตัวกรอง
                  </td>
                </tr>
              ) : (
                ssiCases.map((patient) => {
                  const ssi = patient.ssiDetails;
                  const isConfirmedSsi =
                    ssi?.surveillanceStatus.includes('Incisional') ||
                    ssi?.surveillanceStatus.includes('Organ/Space') ||
                    patient.assessment.haiType === 'SSI';

                  return (
                    <tr
                      key={patient.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => onSelectPatient(patient)}
                    >
                      {/* HN / VN */}
                      <td className="py-3 px-3.5 font-mono">
                        <div className="font-bold text-blue-700">{patient.hn}</div>
                        <div className="text-[10px] text-slate-400">{patient.vn}</div>
                      </td>

                      {/* Name & Ward */}
                      <td className="py-3 px-3.5">
                        <div className="font-semibold text-slate-900">{patient.nameTh}</div>
                        <div className="text-[10px] text-slate-500">
                          {patient.ward.split(' ')[0]} ({patient.roomBed})
                        </div>
                      </td>

                      {/* Procedure */}
                      <td className="py-3 px-3.5 max-w-[200px]">
                        <div className="font-medium text-slate-800 line-clamp-2">
                          {ssi?.procedure || patient.surgeryPerformed?.procedure}
                        </div>
                      </td>

                      {/* Surgery Date & Post-Op Days */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <div className="font-medium text-slate-700 flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-slate-400" />
                          <span>
                            {ssi?.surgeryDate
                              ? new Date(ssi.surgeryDate).toLocaleDateString('th-TH', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: '2-digit'
                                })
                              : '-'}
                          </span>
                        </div>
                        <div className="text-[10px] font-semibold text-blue-600 pl-4">
                          POD: {ssi?.postOpDays ? `Day ${ssi.postOpDays}` : '-'}
                        </div>
                      </td>

                      {/* Surgeon */}
                      <td className="py-3 px-3.5 whitespace-nowrap text-slate-800">
                        <div className="flex items-center gap-1 font-medium">
                          <User className="w-3 h-3 text-slate-400" />
                          <span>{ssi?.surgeon || patient.surgeryPerformed?.surgeon || patient.attendingPhysician}</span>
                        </div>
                      </td>

                      {/* Wound Class */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                            ssi?.woundClass === 'Clean'
                              ? 'bg-slate-100 text-slate-700'
                              : ssi?.woundClass === 'Clean-Contaminated'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {ssi?.woundClass || 'Clean'}
                        </span>
                      </td>

                      {/* Implant */}
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        {ssi?.hasImplant ? (
                          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                            มี Implant (90d)
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">ไม่มี (30d)</span>
                        )}
                      </td>

                      {/* Status & Wound discharge */}
                      <td className="py-3 px-3.5 max-w-[200px]">
                        <div>
                          {isConfirmedSsi ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                              <AlertTriangle className="w-3 h-3 text-red-600" />
                              {ssi?.surveillanceStatus}
                            </span>
                          ) : ssi?.surveillanceStatus === 'Under Surveillance' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-100 text-blue-800">
                              อยู่ระหว่างเฝ้าระวัง
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              ไม่ติดเชื้อ / หายแล้ว
                            </span>
                          )}
                        </div>
                        {ssi?.woundDischarge && (
                          <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5" title={ssi.woundDischarge}>
                            {ssi.woundDischarge}
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onSelectPatient(patient)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="ดูรายละเอียดการผ่าตัดและแผล"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onOpenAssessment(patient)}
                            className="px-2 py-1 text-[11px] font-medium bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors shadow-2xs flex items-center gap-1"
                            title="บันทึกการประเมินแผลผ่าตัด SSI"
                          >
                            <ShieldCheck className="w-3 h-3" />
                            <span>ประเมิน</span>
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
