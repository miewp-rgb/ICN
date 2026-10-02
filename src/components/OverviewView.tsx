import React from 'react';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  ShieldCheck, 
  Syringe, 
  Scissors, 
  Wind, 
  Thermometer, 
  Microscope,
  Calendar,
  Building,
  ArrowUpRight,
  FileSpreadsheet,
  FileCode
} from 'lucide-react';
import { Patient } from '../types';

interface OverviewViewProps {
  patients: Patient[];
  onSelectPatient: (patient: Patient) => void;
  onOpenAssessment: (patient: Patient) => void;
  onSelectTab: (tabId: string) => void;
  onOpenPrevalenceSurvey: () => void;
  onOpenExcelModal?: () => void;
  onDownloadSingleHtml?: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  patients,
  onSelectPatient,
  onOpenAssessment,
  onSelectTab,
  onOpenPrevalenceSurvey,
  onOpenExcelModal,
  onDownloadSingleHtml
}) => {
  const confirmedHai = patients.filter((p) => p.assessment.status === 'confirmed_hai');
  const ipdPatients = patients.filter((p) => p.patientType === 'IPD');
  const prevalenceRate = ipdPatients.length > 0 ? ((confirmedHai.length / ipdPatients.length) * 100).toFixed(1) : '0.0';

  // Group by HAI type
  const haiBreakdown: Record<string, number> = {
    CAUTI: 0,
    VAP: 0,
    SSI: 0,
    CLABSI: 0,
    'Other HAI': 0
  };

  confirmedHai.forEach((p) => {
    const t = p.assessment.haiType || 'Other HAI';
    if (haiBreakdown[t] !== undefined) {
      haiBreakdown[t]++;
    } else {
      haiBreakdown['Other HAI']++;
    }
  });

  // Group by Ward
  const wardBreakdown: Record<string, { total: number; hai: number }> = {};
  patients.forEach((p) => {
    const w = p.ward.split(' ')[0];
    if (!wardBreakdown[w]) {
      wardBreakdown[w] = { total: 0, hai: 0 };
    }
    wardBreakdown[w].total++;
    if (p.assessment.status === 'confirmed_hai') {
      wardBreakdown[w].hai++;
    }
  });

  return (
    <div className="space-y-6">
      
      {/* Prevalence Survey Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full bg-blue-500/10 transform rotate-12 pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-200 border border-blue-400/30 mb-2">
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              <span>การสำรวจความชุกการติดเชื้อในโรงพยาบาล (Prevalence Survey Mode)</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white">
              Hospital Infection Surveillance & Epidemiology Overview
            </h2>
            <p className="text-xs text-blue-200 mt-1 max-w-2xl">
              รายงานอัตราความชุกการติดเชื้อ (Prevalence Rate), อัตราการใช้อุปกรณ์รุกล้ำ (Device Utilization Ratio), และการเฝ้าระวังเชื้อดื้อยาขั้นวิกฤต สำหรับคณะกรรมการควบคุมโรคติดเชื้อในโรงพยาบาล (IC Committee)
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white/10 backdrop-blur-xs px-4 py-2.5 rounded-xl border border-white/15 text-center">
              <div className="text-[11px] text-blue-200">อัตราความชุกรวม (Prevalence)</div>
              <div className="text-2xl font-bold text-white">{prevalenceRate}%</div>
              <div className="text-[10px] text-blue-300">ต่อ 100 ผู้ป่วยใน</div>
            </div>
            <button
              onClick={onOpenPrevalenceSurvey}
              className="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>เปิดรายงานวิเคราะห์ความชุก</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            {onOpenExcelModal && (
              <button
                onClick={onOpenExcelModal}
                className="px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                title="เปิดหน้าต่างดาวน์โหลดตัวอย่างไฟล์สรุปรายงานการติดเชื้อเป็น Excel (.xlsx)"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>ส่งออกรายงาน Excel</span>
              </button>
            )}
            {onDownloadSingleHtml && (
              <button
                onClick={onDownloadSingleHtml}
                className="px-3.5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                title="ดาวน์โหลดแอปทั้งระบบเป็นไฟล์ HTML เดี่ยว (.html) เปิดดูแบบ Offline ได้ทันที"
              >
                <FileCode className="w-4 h-4" />
                <span>บันเดิล HTML 1 ไฟล์</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid of Visual Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Card 1: HAI Classification Breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span>จำแนกประเภทการติดเชื้อใน รพ. (HAI Types)</span>
            </h4>
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded">
              รวม {confirmedHai.length} เคส
            </span>
          </div>

          <div className="space-y-3 pt-3 text-xs">
            {Object.entries(haiBreakdown).map(([name, count]) => {
              const pct = confirmedHai.length > 0 ? ((count / confirmedHai.length) * 100).toFixed(0) : 0;
              return (
                <div key={name}>
                  <div className="flex items-center justify-between font-medium text-slate-700 mb-1">
                    <span>{name}</span>
                    <span className="text-slate-900 font-bold">{count} เคส ({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        name === 'CAUTI'
                          ? 'bg-amber-500'
                          : name === 'VAP'
                          ? 'bg-sky-500'
                          : name === 'SSI'
                          ? 'bg-emerald-500'
                          : name === 'CLABSI'
                          ? 'bg-purple-500'
                          : 'bg-blue-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
            <span>เกณฑ์การวินิจฉัย</span>
            <span className="font-semibold text-slate-700">CDC/NHSN Criteria</span>
          </div>
        </div>

        {/* Card 2: Ward Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-indigo-500" />
              <span>สถิติรายหอผู้ป่วย (Ward Breakdown)</span>
            </h4>
            <span className="text-xs text-slate-400">Total & HAI</span>
          </div>

          <div className="space-y-2.5 pt-3 text-xs max-h-[220px] overflow-y-auto pr-1">
            {Object.entries(wardBreakdown).map(([wardName, data]) => {
              const hasHai = data.hai > 0;
              return (
                <div
                  key={wardName}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100"
                >
                  <div>
                    <div className="font-semibold text-slate-800">{wardName}</div>
                    <div className="text-[10px] text-slate-500">ผู้ป่วยทั้งหมด {data.total} ราย</div>
                  </div>
                  <div className="text-right">
                    {hasHai ? (
                      <span className="inline-flex items-center gap-1 font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded text-[11px]">
                        <AlertTriangle className="w-3 h-3" />
                        HAI {data.hai} เคส
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-medium text-[11px] bg-emerald-50 px-2 py-0.5 rounded">
                        0 HAI
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Card 3: Quick Surveillance Actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>การเข้าถึงระบบเฝ้าระวังด่วน (Quick Navigation)</span>
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-3">
              <button
                onClick={() => onSelectTab('fever')}
                className="p-2.5 rounded-lg border border-red-100 bg-red-50/50 hover:bg-red-50 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1 text-red-700 font-bold text-xs">
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>ไข้ &gt; 48 ชม.</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {patients.filter((p) => p.hasFeverPost48h).length} เคสทริกเกอร์
                </div>
              </button>

              <button
                onClick={() => onSelectTab('tb_respiratory')}
                className="p-2.5 rounded-lg border border-amber-100 bg-amber-50/50 hover:bg-amber-50 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1 text-amber-800 font-bold text-xs">
                  <Wind className="w-3.5 h-3.5" />
                  <span>TB & แยกโรค</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {patients.filter((p) => p.isRespiratoryIsolation).length} เคสแยกโรค
                </div>
              </button>

              <button
                onClick={() => onSelectTab('mdro')}
                className="p-2.5 rounded-lg border border-purple-100 bg-purple-50/50 hover:bg-purple-50 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1 text-purple-800 font-bold text-xs">
                  <Microscope className="w-3.5 h-3.5" />
                  <span>เชื้อดื้อยา MDRO</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {patients.filter((p) => p.isMdro).length} เคส CRE/MRSA
                </div>
              </button>

              <button
                onClick={() => onSelectTab('ssi')}
                className="p-2.5 rounded-lg border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-1 text-emerald-800 font-bold text-xs">
                  <Scissors className="w-3.5 h-3.5" />
                  <span>ติดตามแผลผ่าตัด</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {patients.filter((p) => p.isSsiSurveillance).length} เคสผ่าตัด
                </div>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => onSelectTab('assessment_queue')}
              className="w-full py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <span>ไปที่คิวประเมินการติดเชื้อ (Assessment Queue)</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Patient List Preview */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-blue-600" />
            <span>เคสที่อยู่ในการเฝ้าระวังทั้งหมด (Surveillance Patient Roster)</span>
          </h4>
          <span className="text-xs text-slate-500">
            คลิกแถวเพื่อดูประวัติการรักษาและรายละเอียดการประเมิน
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase text-[11px]">
                <th className="py-2.5 px-3">HN / VN</th>
                <th className="py-2.5 px-3">ชื่อ-สกุล</th>
                <th className="py-2.5 px-3">ประเภท</th>
                <th className="py-2.5 px-3">หอผู้ป่วย</th>
                <th className="py-2.5 px-3">การวินิจฉัย</th>
                <th className="py-2.5 px-3">แพทย์ผู้ดูแล</th>
                <th className="py-2.5 px-3">สถานะเฝ้าระวัง</th>
                <th className="py-2.5 px-3 text-right">การจัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.slice(0, 8).map((p) => (
                <tr
                  key={p.id}
                  onClick={() => onSelectPatient(p)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="py-2.5 px-3 font-mono font-bold text-blue-700">{p.hn}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-800">{p.nameTh}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        p.patientType === 'IPD'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-cyan-100 text-cyan-800'
                      }`}
                    >
                      {p.patientType}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{p.ward.split(' ')[0]}</td>
                  <td className="py-2.5 px-3 text-slate-700 max-w-[200px] truncate">{p.primaryDiagnosis}</td>
                  <td className="py-2.5 px-3 text-slate-500">{p.attendingPhysician.split(' ')[0]} {p.attendingPhysician.split(' ')[1]}</td>
                  <td className="py-2.5 px-3">
                    {p.assessment.status === 'confirmed_hai' ? (
                      <span className="text-red-600 font-bold text-[11px]">HAI: {p.assessment.haiType}</span>
                    ) : p.assessment.status === 'not_hai' ? (
                      <span className="text-emerald-700 font-medium text-[11px]">Not HAI</span>
                    ) : (
                      <span className="text-amber-700 font-medium text-[11px]">รอประเมิน</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onOpenAssessment(p)}
                      className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-medium"
                    >
                      ประเมิน
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
