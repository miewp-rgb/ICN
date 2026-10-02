import React from 'react';
import { Thermometer, Eye, CheckCircle, AlertTriangle, Syringe, Scissors, ShieldAlert } from 'lucide-react';
import { Patient } from '../types';

interface FeverSurveillanceViewProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onOpenAssessment: (patient: Patient) => void;
}

export const FeverSurveillanceView: React.FC<FeverSurveillanceViewProps> = ({
  patients,
  onSelectPatient,
  onOpenAssessment
}) => {
  const feverCases = patients.filter((p) => p.hasFeverPost48h);

  return (
    <div className="space-y-4">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-50 via-rose-50 to-orange-50 border border-red-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-xs">
              <Thermometer className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>เฝ้าระวังผู้ป่วยมีไข้ Temp ≥ 38.0°C หลัง Admit &gt; 48 ชั่วโมง</span>
                <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  {feverCases.length} ราย
                </span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                เกณฑ์สากล CDC/NHSN: สัญญาณเตือนสำคัญของการติดเชื้อในโรงพยาบาล (Healthcare-Associated Infection Screening Trigger)
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500 bg-white/80 px-3 py-1.5 rounded-lg border border-red-200 shadow-2xs">
            เป้าหมาย: ตรวจสอบแหล่งกำเนิดไข้ (Fever workup), สายสวน, แผลผ่าตัด
          </div>
        </div>
      </div>

      {/* Table of cases */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-3.5">HN / VN</th>
                <th className="py-3 px-3.5">ชื่อ-สกุล / เพศ-อายุ</th>
                <th className="py-3 px-3.5">การวินิจฉัย (Diagnosis)</th>
                <th className="py-3 px-3.5">หอผู้ป่วย & เตียง</th>
                <th className="py-3 px-3.5">วันที่ Admit</th>
                <th className="py-3 px-3.5 text-center">ไข้สูงสุด (°C)</th>
                <th className="py-3 px-3.5">การผ่าตัด (Surgery)</th>
                <th className="py-3 px-3.5">การใส่สายสวน (Catheter/Device)</th>
                <th className="py-3 px-3.5">สถานะ HAI</th>
                <th className="py-3 px-3.5 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {feverCases.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400">
                    ไม่พบผู้ป่วยที่มีไข้หลัง Admit 48 ชม. ตามเงื่อนไขตัวกรอง
                  </td>
                </tr>
              ) : (
                feverCases.map((patient) => {
                  const hasSurgery = Boolean(patient.surgeryPerformed);
                  const hasDevices = patient.devices && patient.devices.length > 0;
                  const isHighFever = (patient.peakTemp || 0) >= 38.5;

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

                      {/* Name & Age */}
                      <td className="py-3 px-3.5">
                        <div className="font-semibold text-slate-900">{patient.nameTh}</div>
                        <div className="text-[10px] text-slate-500">
                          {patient.gender === 'M' ? 'ชาย' : 'หญิง'}, อายุ {patient.age} ปี
                        </div>
                      </td>

                      {/* Diagnosis */}
                      <td className="py-3 px-3.5 max-w-[200px]">
                        <div className="font-medium text-slate-800 line-clamp-2" title={patient.primaryDiagnosis}>
                          {patient.primaryDiagnosis}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          แพทย์: {patient.attendingPhysician.split(' ')[0]} {patient.attendingPhysician.split(' ')[1]}
                        </div>
                      </td>

                      {/* Ward & Bed */}
                      <td className="py-3 px-3.5">
                        <div className="font-medium text-slate-700">{patient.ward.split(' ')[0]}</div>
                        <div className="text-[10px] text-slate-500 font-mono bg-slate-100 px-1.5 py-0.5 rounded inline-block mt-0.5">
                          {patient.roomBed}
                        </div>
                      </td>

                      {/* Admit Date */}
                      <td className="py-3 px-3.5 text-slate-600 whitespace-nowrap">
                        <div>
                          {new Date(patient.admissionDate).toLocaleDateString('th-TH', {
                            day: 'numeric',
                            month: 'short',
                            year: '2-digit'
                          })}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {new Date(patient.admissionDate).toLocaleTimeString('th-TH', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })} น.
                        </div>
                      </td>

                      {/* Peak Temp */}
                      <td className="py-3 px-3.5 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 font-bold px-2 py-1 rounded-md text-xs ${
                            isHighFever
                              ? 'bg-red-100 text-red-700 border border-red-200'
                              : 'bg-orange-100 text-orange-800 border border-orange-200'
                          }`}
                        >
                          <Thermometer className="w-3 h-3" />
                          {patient.peakTemp ? `${patient.peakTemp.toFixed(1)}°C` : '≥38.0°C'}
                        </span>
                      </td>

                      {/* Surgery details */}
                      <td className="py-3 px-3.5 max-w-[180px]">
                        {hasSurgery && patient.surgeryPerformed ? (
                          <div className="bg-amber-50/80 border border-amber-200 rounded-md p-1.5 text-[11px]">
                            <div className="font-semibold text-amber-900 flex items-center gap-1 truncate">
                              <Scissors className="w-3 h-3 text-amber-600 shrink-0" />
                              <span className="truncate">{patient.surgeryPerformed.procedure}</span>
                            </div>
                            <div className="text-[10px] text-amber-700 mt-0.5">
                              วันที่ {new Date(patient.surgeryPerformed.surgeryDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}
                              {patient.surgeryPerformed.woundClass && ` (${patient.surgeryPerformed.woundClass})`}
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px]">- ไม่มีการผ่าตัด -</span>
                        )}
                      </td>

                      {/* Catheter / Device details */}
                      <td className="py-3 px-3.5 max-w-[200px]">
                        {hasDevices ? (
                          <div className="space-y-1">
                            {patient.devices.map((device, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-1 text-[11px] bg-blue-50/70 border border-blue-100 px-1.5 py-0.5 rounded text-blue-900"
                              >
                                <Syringe className="w-2.5 h-2.5 text-blue-600 shrink-0" />
                                <span className="font-medium truncate">{device.nameTh.split('(')[0]}</span>
                                <span className="text-[10px] text-blue-600 font-semibold shrink-0">
                                  ({device.deviceDays} วัน)
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px]">- ไม่มีสายสวน -</span>
                        )}
                      </td>

                      {/* HAI Status badge */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {patient.assessment.status === 'confirmed_hai' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                            <AlertTriangle className="w-3 h-3 text-red-600" />
                            Confirmed: {patient.assessment.haiType || 'HAI'}
                          </span>
                        ) : patient.assessment.status === 'not_hai' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            ไม่ใช่ HAI (CAI)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-800 border border-amber-200 animate-pulse-subtle">
                            <ShieldAlert className="w-3 h-3 text-amber-600" />
                            รอการประเมิน
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onSelectPatient(patient)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="ดูรายละเอียดเวชระเบียนผู้ป่วย"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onOpenAssessment(patient)}
                            className="px-2 py-1 text-[11px] font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors shadow-2xs flex items-center gap-1"
                            title="เปิดแบบประเมินการติดเชื้อใน รพ."
                          >
                            <CheckCircle className="w-3 h-3" />
                            <span>ประเมิน HAI</span>
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
