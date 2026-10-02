import React from 'react';
import { Microscope, Eye, CheckCircle, AlertTriangle, Pill, ShieldAlert } from 'lucide-react';
import { Patient } from '../types';

interface MdroSurveillanceViewProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onOpenAssessment: (patient: Patient) => void;
}

export const MdroSurveillanceView: React.FC<MdroSurveillanceViewProps> = ({
  patients,
  onSelectPatient,
  onOpenAssessment
}) => {
  const mdroCases = patients.filter((p) => p.isMdro);

  return (
    <div className="space-y-4">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-50 via-fuchsia-50 to-indigo-50 border border-purple-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-700 flex items-center justify-center text-white shadow-xs">
              <Microscope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>เฝ้าระวังเชื้อดื้อยาปฏิชีวนะขั้นวิกฤต (MDRO - Multi-Drug Resistant Organisms)</span>
                <span className="bg-purple-700 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  {mdroCases.length} ราย
                </span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                ติดตาม CRE, MRSA, VRE, CRAB, MDR-Pseudomonas • เฝ้าระวังการใช้ยาปฏิชีวนะ (Antimicrobial Stewardship) และ Contact Precautions
              </p>
            </div>
          </div>
          <div className="text-xs text-purple-900 bg-white/80 px-3 py-1.5 rounded-lg border border-purple-200">
            มาตรการ: ติดป้าย Contact Precaution, Cohort หรือห้องเดี่ยว, ทำความสะอาดสิ่งแวดล้อม
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
                <th className="py-3 px-3.5">ชื่อ-สกุล / อายุ</th>
                <th className="py-3 px-3.5">หอผู้ป่วย & เตียง</th>
                <th className="py-3 px-3.5">ชนิดเชื้อดื้อยา (Organism)</th>
                <th className="py-3 px-3.5">รูปแบบความดื้อยา (Resistance)</th>
                <th className="py-3 px-3.5">สิ่งส่งตรวจ (Specimen)</th>
                <th className="py-3 px-3.5">ยาปฏิชีวนะ (ATB) ที่ได้รับ</th>
                <th className="py-3 px-3.5">สถานะ HAI / แพทย์</th>
                <th className="py-3 px-3.5 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mdroCases.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    ไม่พบผู้ป่วยที่มีเชื้อดื้อยา MDRO ตามเงื่อนไขตัวกรอง
                  </td>
                </tr>
              ) : (
                mdroCases.map((patient) => {
                  const mdro = patient.mdroDetails;
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

                      {/* Ward & Bed */}
                      <td className="py-3 px-3.5">
                        <div className="font-medium text-slate-700">{patient.ward.split(' ')[0]}</div>
                        <div className="text-[10px] text-slate-500 font-mono bg-slate-100 px-1.5 py-0.5 rounded inline-block mt-0.5">
                          {patient.roomBed}
                        </div>
                      </td>

                      {/* Organism */}
                      <td className="py-3 px-3.5 max-w-[200px]">
                        <span className="inline-block px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-bold text-[11px] mb-0.5 border border-purple-200">
                          {mdro?.organism.split('(')[0].trim()}
                        </span>
                        <div className="text-[10px] text-slate-600 line-clamp-1">
                          {mdro?.organism}
                        </div>
                      </td>

                      {/* Resistance profile */}
                      <td className="py-3 px-3.5 max-w-[180px]">
                        <div className="text-[11px] font-medium text-rose-800 line-clamp-2" title={mdro?.resistanceProfile}>
                          {mdro?.resistanceProfile || 'MDR profile'}
                        </div>
                      </td>

                      {/* Specimen & Date */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <div className="font-medium text-slate-800">{mdro?.specimen}</div>
                        {mdro?.cultureDate && (
                          <div className="text-[10px] text-slate-400">
                            C/S: {new Date(mdro.cultureDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}
                          </div>
                        )}
                      </td>

                      {/* ATB Received */}
                      <td className="py-3 px-3.5 max-w-[220px]">
                        {mdro?.antibioticsReceived && mdro.antibioticsReceived.length > 0 ? (
                          <div className="space-y-1">
                            {mdro.antibioticsReceived.map((atb, idx) => (
                              <div
                                key={idx}
                                className="bg-slate-50 border border-slate-200 rounded p-1 text-[11px]"
                              >
                                <div className="font-semibold text-slate-800 flex items-center gap-1">
                                  <Pill className="w-2.5 h-2.5 text-blue-600" />
                                  <span>{atb.name}</span>
                                </div>
                                <div className="text-[10px] text-slate-500">
                                  {atb.dose} ({atb.route})
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px]">- ไม่พบรายการ ATB -</span>
                        )}
                      </td>

                      {/* HAI Status / Doctor */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <div>
                          {patient.assessment.status === 'confirmed_hai' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-200">
                              <AlertTriangle className="w-3 h-3 text-red-600" />
                              Confirmed: {patient.assessment.haiType || 'HAI'}
                            </span>
                          ) : patient.assessment.status === 'not_hai' ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              Not HAI / Colonization
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-800 animate-pulse-subtle">
                              <ShieldAlert className="w-3 h-3 text-amber-600" />
                              รอทบทวน
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1">
                          {patient.attendingPhysician.split(' ')[0]} {patient.attendingPhysician.split(' ')[1]}
                        </div>
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
                            className="px-2 py-1 text-[11px] font-medium bg-purple-700 hover:bg-purple-800 text-white rounded-md transition-colors shadow-2xs flex items-center gap-1"
                            title="ประเมินการติดเชื้อจริงเทียบกับ Colonization"
                          >
                            <CheckCircle className="w-3 h-3" />
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
