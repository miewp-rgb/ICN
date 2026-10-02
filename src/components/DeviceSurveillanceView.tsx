import React from 'react';
import { Syringe, Eye, CheckCircle, AlertTriangle, ShieldCheck, Activity, Wind } from 'lucide-react';
import { Patient, DeviceType } from '../types';

interface DeviceSurveillanceViewProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onOpenAssessment: (patient: Patient) => void;
}

export const DeviceSurveillanceView: React.FC<DeviceSurveillanceViewProps> = ({
  patients,
  onSelectPatient,
  onOpenAssessment
}) => {
  const devicePatients = patients.filter((p) => p.hasInvasiveDevices);

  // Device counts
  const foleyPatients = devicePatients.filter((p) =>
    p.devices.some((d) => d.type === 'foley')
  );
  const ventPatients = devicePatients.filter((p) =>
    p.devices.some((d) => d.type === 'ventilator')
  );
  const arterialPatients = devicePatients.filter((p) =>
    p.devices.some((d) => d.type === 'arterial_line')
  );
  const centralLinePatients = devicePatients.filter((p) =>
    p.devices.some((d) => d.type === 'central_line')
  );

  return (
    <div className="space-y-4">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Syringe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>เฝ้าระวังผู้ป่วยใส่สายสวนและอุปกรณ์การแพทย์ (Invasive Device Surveillance)</span>
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                  {devicePatients.length} ราย
                </span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                เฝ้าระวังความเสี่ยง CAUTI (สายสวนปัสสาวะ), VAP (เครื่องช่วยหายใจ), และ CLABSI/Vascular Line Infection (สายสวนหลอดเลือดแดง/ดำ)
              </p>
            </div>
          </div>

          {/* Device Breakdown Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 border border-amber-200">
              สายสวนปัสสาวะ (Foley): {foleyPatients.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-sky-100 text-sky-900 border border-sky-200">
              เครื่องช่วยหายใจ (Ventilator): {ventPatients.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-rose-100 text-rose-900 border border-rose-200">
              สายหลอดเลือดแดง (A-line): {arterialPatients.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-purple-100 text-purple-900 border border-purple-200">
              สายหลอดเลือดดำ (C-line): {centralLinePatients.length}
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
                <th className="py-3 px-3.5">HN / VN</th>
                <th className="py-3 px-3.5">ชื่อ-สกุล / วอร์ด</th>
                <th className="py-3 px-3.5">สายสวนปัสสาวะ (Foley)</th>
                <th className="py-3 px-3.5">เครื่องช่วยหายใจ (Ventilator)</th>
                <th className="py-3 px-3.5">สายสวนทางหลอดเลือดแดง/ดำ</th>
                <th className="py-3 px-3.5">ความสอดคล้องตาม Bundle</th>
                <th className="py-3 px-3.5">แพทย์ผู้ดูแล</th>
                <th className="py-3 px-3.5">สถานะ HAI</th>
                <th className="py-3 px-3.5 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {devicePatients.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    ไม่พบผู้ป่วยที่ใส่อุปกรณ์รุกล้ำตามเงื่อนไขตัวกรอง
                  </td>
                </tr>
              ) : (
                devicePatients.map((patient) => {
                  const foley = patient.devices.find((d) => d.type === 'foley');
                  const vent = patient.devices.find((d) => d.type === 'ventilator');
                  const aLine = patient.devices.find((d) => d.type === 'arterial_line');
                  const cLine = patient.devices.find((d) => d.type === 'central_line');

                  const allCompliant = patient.devices.every((d) => d.bundleCompliant);

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

                      {/* Foley Catheter Column */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {foley ? (
                          <div className="bg-amber-50 border border-amber-200 rounded p-1.5 text-[11px]">
                            <div className="font-semibold text-amber-900 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                              <span>ใส่สายสวนปัสสาวะ</span>
                            </div>
                            <div className="text-[10px] text-amber-800 mt-0.5">
                              Device Days: <strong className="font-bold">{foley.deviceDays} วัน</strong>
                            </div>
                            <div className="text-[9px] text-amber-700 truncate" title={foley.nameEn}>
                              {foley.nameEn}
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px]">- ไม่ได้ใส่ -</span>
                        )}
                      </td>

                      {/* Mechanical Ventilator Column */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {vent ? (
                          <div className="bg-sky-50 border border-sky-200 rounded p-1.5 text-[11px]">
                            <div className="font-semibold text-sky-900 flex items-center gap-1">
                              <Wind className="w-3 h-3 text-sky-600" />
                              <span>ใส่เครื่องช่วยหายใจ</span>
                            </div>
                            <div className="text-[10px] text-sky-800 mt-0.5">
                              Ventilator Days: <strong className="font-bold">{vent.deviceDays} วัน</strong>
                            </div>
                            <div className="text-[9px] text-sky-700 truncate" title={vent.insertionSite}>
                              {vent.insertionSite}
                            </div>
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px]">- ไม่ได้ใส่ -</span>
                        )}
                      </td>

                      {/* Arterial / Central Line Column */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {aLine || cLine ? (
                          <div className="space-y-1">
                            {aLine && (
                              <div className="bg-rose-50 border border-rose-200 rounded p-1 text-[11px]">
                                <div className="font-semibold text-rose-900 flex items-center gap-1">
                                  <Activity className="w-2.5 h-2.5 text-rose-600" />
                                  <span>Arterial line: {aLine.deviceDays} วัน</span>
                                </div>
                                <div className="text-[9px] text-rose-700">{aLine.insertionSite}</div>
                              </div>
                            )}
                            {cLine && (
                              <div className="bg-purple-50 border border-purple-200 rounded p-1 text-[11px]">
                                <div className="font-semibold text-purple-900 flex items-center gap-1">
                                  <Syringe className="w-2.5 h-2.5 text-purple-600" />
                                  <span>Central line: {cLine.deviceDays} วัน</span>
                                </div>
                                <div className="text-[9px] text-purple-700">{cLine.insertionSite}</div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px]">- ไม่มีสายหลอดเลือด -</span>
                        )}
                      </td>

                      {/* Bundle Compliance */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {allCompliant ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle className="w-3 h-3 text-emerald-600" />
                            ครบตามเกณฑ์ Bundle (100%)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                            <AlertTriangle className="w-3 h-3 text-amber-600" />
                            พบข้อบกพร่อง Bundle
                          </span>
                        )}
                      </td>

                      {/* Doctor */}
                      <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap text-[11px]">
                        {patient.attendingPhysician.split(' ')[0]} {patient.attendingPhysician.split(' ')[1]}
                      </td>

                      {/* HAI Status */}
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        {patient.assessment.status === 'confirmed_hai' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800">
                            {patient.assessment.haiType}
                          </span>
                        ) : patient.assessment.status === 'not_hai' ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800">
                            ไม่พบ HAI
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-800">
                            รอประเมิน
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-3.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onSelectPatient(patient)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="ดูรายละเอียดการใส่สายสวน"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onOpenAssessment(patient)}
                            className="px-2 py-1 text-[11px] font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors shadow-2xs flex items-center gap-1"
                            title="ประเมินการติดเชื้อจากสายสวน (CAUTI / VAP / CLABSI)"
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
