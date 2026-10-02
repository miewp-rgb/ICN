import React from 'react';
import { Wind, Clock, Eye, CheckCircle, ShieldCheck, AlertOctagon, Pill } from 'lucide-react';
import { Patient } from '../types';

interface TbIsolationViewProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onOpenAssessment: (patient: Patient) => void;
}

export const TbIsolationView: React.FC<TbIsolationViewProps> = ({
  patients,
  onSelectPatient,
  onOpenAssessment
}) => {
  const tbCases = patients.filter((p) => p.isRespiratoryIsolation);

  return (
    <div className="space-y-4">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border border-amber-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-600 flex items-center justify-center text-white shadow-xs">
              <Wind className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>เฝ้าระวังผู้ป่วย First Diagnosis TB & โรคติดเชื้อทางเดินหายใจที่ต้องแยกโรค</span>
                <span className="bg-amber-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  {tbCases.length} ราย
                </span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                ติดตามมาตรการ Airborne / Droplet Isolation • เฝ้าระวังวัน-เวลาเริ่มและหยุดยา Anti-TB และผลตรวจเสมหะ (AFB / GeneXpert)
              </p>
            </div>
          </div>
          <div className="text-xs text-amber-900 bg-white/80 px-3 py-1.5 rounded-lg border border-amber-200">
            มาตรการ: N95 Mask, Negative Pressure Room (-5 Pa), แนะนำยา DOTS
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
                <th className="py-3 px-3.5">การวินิจฉัย (1st Diag TB/ARI)</th>
                <th className="py-3 px-3.5">ประเภทการแยกโรค</th>
                <th className="py-3 px-3.5">หอผู้ป่วย & ห้อง</th>
                <th className="py-3 px-3.5">วันที่-เวลาเริ่มยา Anti-TB</th>
                <th className="py-3 px-3.5">วันที่-เวลาหยุดยา Anti-TB</th>
                <th className="py-3 px-3.5">ผลเสมหะ (AFB / GeneXpert)</th>
                <th className="py-3 px-3.5">แพทย์ผู้ดูแล</th>
                <th className="py-3 px-3.5 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tbCases.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400">
                    ไม่พบผู้ป่วยกลุ่มวัณโรคหรือแยกโรคทางเดินหายใจตามเงื่อนไขตัวกรอง
                  </td>
                </tr>
              ) : (
                tbCases.map((patient) => {
                  const antiTb = patient.antiTbMedications;
                  const isolation = patient.isolationType || 'Airborne';

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
                        <div className="font-medium text-slate-800 line-clamp-2">
                          {patient.respiratoryDiagnosis || patient.primaryDiagnosis}
                        </div>
                        {patient.firstDiagTbOrRespiratory && (
                          <span className="inline-block mt-0.5 text-[9px] bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded font-semibold">
                            1st Diag TB/Respiratory
                          </span>
                        )}
                      </td>

                      {/* Isolation Type */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {isolation === 'Airborne' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            <AlertOctagon className="w-3 h-3 text-amber-600" />
                            Airborne (N95)
                          </span>
                        ) : isolation === 'Droplet' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-100 text-sky-800 border border-sky-200">
                            <Wind className="w-3 h-3 text-sky-600" />
                            Droplet
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-purple-100 text-purple-800 border border-purple-200">
                            Contact
                          </span>
                        )}
                      </td>

                      {/* Ward & Room */}
                      <td className="py-3 px-3.5">
                        <div className="font-medium text-slate-700">{patient.ward.split(' ')[0]}</div>
                        <div className="text-[10px] text-slate-500 font-mono bg-slate-100 px-1.5 py-0.5 rounded inline-block mt-0.5">
                          {patient.roomBed}
                        </div>
                      </td>

                      {/* Anti-TB Start Date/Time */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {antiTb && antiTb.startDateTime ? (
                          <div className="text-emerald-700 font-medium">
                            <div className="flex items-center gap-1">
                              <Pill className="w-3 h-3 text-emerald-600" />
                              <span>
                                {new Date(antiTb.startDateTime).toLocaleDateString('th-TH', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: '2-digit'
                                })}
                              </span>
                            </div>
                            <div className="text-[10px] text-emerald-600 pl-4">
                              {new Date(antiTb.startDateTime).toLocaleTimeString('th-TH', {
                                hour: '2-digit',
                                minute: '2-digit'
                              })} น.
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px]">- ยังไม่เริ่ม -</span>
                        )}
                      </td>

                      {/* Anti-TB Stop Date/Time */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {antiTb ? (
                          antiTb.stopDateTime ? (
                            <div className="text-slate-700">
                              <div className="font-medium">
                                {new Date(antiTb.stopDateTime).toLocaleDateString('th-TH', {
                                  day: 'numeric',
                                  month: 'short',
                                  year: '2-digit'
                                })}
                              </div>
                              <div className="text-[10px] text-slate-400">
                                {new Date(antiTb.stopDateTime).toLocaleTimeString('th-TH', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })} น. (หยุดยาแล้ว)
                              </div>
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <Clock className="w-2.5 h-2.5" />
                              กำลังได้รับยาต่อเนื่อง (Ongoing)
                            </span>
                          )
                        ) : (
                          <span className="text-slate-400 text-[11px]">- ไม่ได้ยา -</span>
                        )}
                      </td>

                      {/* Sputum & GeneXpert */}
                      <td className="py-3 px-3.5 max-w-[180px]">
                        <div className="space-y-0.5 text-[11px]">
                          {patient.sputumAfbResult && (
                            <div className="font-semibold text-slate-800">
                              AFB: <span className={patient.sputumAfbResult.includes('Positive') || patient.sputumAfbResult.includes('+') ? 'text-red-600' : 'text-emerald-600'}>{patient.sputumAfbResult}</span>
                            </div>
                          )}
                          {patient.geneXpertResult && (
                            <div className="text-[10px] text-slate-500 truncate" title={patient.geneXpertResult}>
                              Xpert: {patient.geneXpertResult}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Doctor */}
                      <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap text-[11px]">
                        {patient.attendingPhysician.split(' ')[0]} {patient.attendingPhysician.split(' ')[1]}
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
                            className="px-2 py-1 text-[11px] font-medium bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors shadow-2xs flex items-center gap-1"
                            title="บันทึกผลการติดตามการแยกโรค"
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
