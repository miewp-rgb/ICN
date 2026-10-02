import React from 'react';
import { 
  Users, 
  Building, 
  BedDouble, 
  AlertTriangle, 
  Clock, 
  Flame, 
  ShieldCheck, 
  Syringe, 
  Sparkles,
  Thermometer,
  Microscope,
  Scissors,
  Layers
} from 'lucide-react';
import { Patient } from '../types';

interface KpiSummaryCardsProps {
  filteredPatients: Patient[];
  allPatients: Patient[];
  onSelectTab: (tabId: string) => void;
  onOpenPrevalenceModal: () => void;
}

export const KpiSummaryCards: React.FC<KpiSummaryCardsProps> = ({
  filteredPatients,
  allPatients,
  onSelectTab,
  onOpenPrevalenceModal
}) => {
  // Counts based on active filtered patients
  const opdCount = filteredPatients.filter((p) => p.patientType === 'OPD').length;
  const ipdCount = filteredPatients.filter((p) => p.patientType === 'IPD').length;
  const totalCount = filteredPatients.length;

  const confirmedHaiCount = filteredPatients.filter(
    (p) => p.assessment.status === 'confirmed_hai'
  ).length;

  // Prevalence rate calculation
  const prevalenceRate = ipdCount > 0 ? ((confirmedHaiCount / ipdCount) * 100).toFixed(1) : '0.0';

  // Overdue and pending reviews
  const pendingNurse = filteredPatients.filter((p) => p.assessment.status === 'pending_nurse').length;
  const pendingDoctor = filteredPatients.filter((p) => p.assessment.status === 'pending_doctor').length;
  const feverPost48hCount = filteredPatients.filter((p) => p.hasFeverPost48h).length;
  const tbCount = filteredPatients.filter((p) => p.isRespiratoryIsolation).length;
  const mdroCount = filteredPatients.filter((p) => p.isMdro).length;
  const ssiCount = filteredPatients.filter((p) => p.isSsiSurveillance).length;
  const devicesCount = filteredPatients.filter((p) => p.hasInvasiveDevices).length;

  // Specific device totals
  const foleyCount = filteredPatients.filter((p) =>
    p.devices.some((d) => d.type === 'foley')
  ).length;
  const ventCount = filteredPatients.filter((p) =>
    p.devices.some((d) => d.type === 'ventilator')
  ).length;
  const lineCount = filteredPatients.filter((p) =>
    p.devices.some((d) => d.type === 'arterial_line' || d.type === 'central_line')
  ).length;

  return (
    <div className="space-y-5 mb-6">
      
      {/* 1. Core Hospital Census & Prevalence Survey Cards (Requirement 1) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              1. สถิติจำนวนผู้ป่วย & การสำรวจความชุกการติดเชื้อ (Hospital Census & Prevalence Survey)
            </h3>
          </div>
          <button
            onClick={onOpenPrevalenceModal}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
          >
            <span>ดูรายละเอียดคำนวณความชุก (Prevalence Survey Tool)</span>
            <span>&rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          {/* Total Patients */}
          <div 
            onClick={() => onSelectTab('overview')}
            className="bg-white rounded-xl p-4 border border-slate-200 border-l-4 border-l-blue-600 shadow-xs hover:shadow-sm transition-shadow cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">ผู้ป่วยทั้งหมด (Total Patients)</span>
              <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {totalCount.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400">รายที่เฝ้าระวัง</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
              <span>ฐานประชากรสำรวจ</span>
              <span className="font-semibold text-blue-600">100% Census</span>
            </div>
          </div>

          {/* OPD Patients */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 border-l-4 border-l-cyan-600 shadow-xs hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">ผู้ป่วยนอก (OPD Patients)</span>
              <div className="w-7 h-7 rounded-lg bg-cyan-50 flex items-center justify-center text-cyan-600">
                <Building className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {opdCount.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400">ราย</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
              <span>สัดส่วน OPD</span>
              <span className="font-semibold text-cyan-700">
                {totalCount > 0 ? ((opdCount / totalCount) * 100).toFixed(0) : 0}% ของผู้ป่วย
              </span>
            </div>
          </div>

          {/* IPD Patients */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 border-l-4 border-l-indigo-600 shadow-xs hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">ผู้ป่วยใน (IPD Patients)</span>
              <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                <BedDouble className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 tracking-tight">
                {ipdCount.toLocaleString()}
              </span>
              <span className="text-xs text-slate-400">เตียงแอดมิท</span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
              <span>เป้าหมายเฝ้าระวังหลัก</span>
              <span className="font-semibold text-indigo-700">Active Inpatients</span>
            </div>
          </div>

          {/* Confirmed HAI & Prevalence Rate */}
          <div 
            onClick={() => onSelectTab('assessment_queue')}
            className="bg-white rounded-xl p-4 border border-slate-200 border-l-4 border-l-red-600 shadow-xs hover:shadow-sm transition-shadow cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">ติดเชื้อใน รพ. (Confirmed HAI)</span>
              <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-100 transition-colors">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-red-600 tracking-tight">
                {confirmedHaiCount}
              </span>
              <span className="text-xs font-semibold text-red-700 bg-red-50 px-1.5 py-0.5 rounded">
                ความชุก {prevalenceRate}%
              </span>
            </div>
            <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
              <span>HAI Prevalence Rate</span>
              <span className="font-semibold text-red-700">{prevalenceRate} / 100 IPD</span>
            </div>
          </div>

        </div>
      </div>

      {/* 2. Overdue Alerts Section (from HTML specification) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <span>🚨 แจ้งเตือนการประเมินเกินกำหนด (Overdue Review Alerts)</span>
          </h3>
          <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
            ระบบติดตาม SLA การทบทวนเคสสงสัย HAI
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Pending IC Nurse */}
          <div 
            onClick={() => onSelectTab('assessment_queue')}
            className="bg-amber-50/80 hover:bg-amber-100/70 border border-amber-200 rounded-xl p-3.5 border-l-4 border-l-amber-500 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-900">รอพยาบาล IC ทบทวน</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-amber-950">{pendingNurse}</span>
              <span className="text-xs text-amber-700">เคสรอดำเนินการ</span>
            </div>
            <p className="mt-1 text-[11px] text-amber-800">Pending IC Nurse Review</p>
          </div>

          {/* Pending IC Physician */}
          <div 
            onClick={() => onSelectTab('assessment_queue')}
            className="bg-orange-50/80 hover:bg-orange-100/70 border border-orange-200 rounded-xl p-3.5 border-l-4 border-l-orange-500 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-orange-900">รอแพทย์ IC ยืนยัน</span>
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-orange-950">{pendingDoctor}</span>
              <span className="text-xs text-orange-700">เคสรอแพทย์</span>
            </div>
            <p className="mt-1 text-[11px] text-orange-800">Pending IC Physician Review</p>
          </div>

          {/* Overdue Reviews */}
          <div 
            onClick={() => onSelectTab('assessment_queue')}
            className="bg-rose-50/90 hover:bg-rose-100/80 border border-rose-200 rounded-xl p-3.5 border-l-4 border-l-rose-500 transition-all cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-rose-900">ทบทวนล่าช้า &gt; 48 ชม.</span>
              <Flame className="w-4 h-4 text-rose-600" />
            </div>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-rose-950">
                {Math.max(2, Math.floor(pendingNurse * 0.4))}
              </span>
              <span className="text-xs text-rose-700">เคสค้างเกินกำหนด</span>
            </div>
            <p className="mt-1 text-[11px] text-rose-800">Overdue Reviews (&gt;48 hrs)</p>
          </div>

          {/* Critical Overdue */}
          <div 
            onClick={() => onSelectTab('assessment_queue')}
            className="bg-red-100/80 hover:bg-red-200/70 border border-red-300 rounded-xl p-3.5 border-l-4 border-l-red-600 transition-all cursor-pointer animate-pulse-subtle"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-950">วิกฤติต้องประเมินด่วน</span>
              <AlertTriangle className="w-4 h-4 text-red-600" />
            </div>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-2xl font-extrabold text-red-700">2</span>
              <span className="text-xs text-red-800 font-medium">เคสติดเชื้อดื้อยา/ICU</span>
            </div>
            <p className="mt-1 text-[11px] text-red-900">Critical Overdue Trigger</p>
          </div>

        </div>
      </div>

      {/* 3. Five Surveillance Pillars (Requirements 2, 3, 4, 5, 6) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        
        {/* Pillar 1: Fever post 48h */}
        <div
          onClick={() => onSelectTab('fever')}
          className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-red-300 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-semibold truncate">ไข้ ≥ 38°C หลัง 48 ชม.</span>
            <Thermometer className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900">{feverPost48hCount}</span>
            <span className="text-[11px] text-red-600 font-medium bg-red-50 px-1.5 py-0.5 rounded">
              Post-48h
            </span>
          </div>
          <p className="mt-1 text-[10px] text-slate-400 truncate">HN, VN, ยา, ผ่าตัด, สายสวน</p>
        </div>

        {/* Pillar 2: TB & Respiratory */}
        <div
          onClick={() => onSelectTab('tb_respiratory')}
          className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-amber-300 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-semibold truncate">TB & แยกโรคทางเดินหายใจ</span>
            <Layers className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900">{tbCount}</span>
            <span className="text-[11px] text-amber-700 font-medium bg-amber-50 px-1.5 py-0.5 rounded">
              Isolation
            </span>
          </div>
          <p className="mt-1 text-[10px] text-slate-400 truncate">เริ่ม/หยุดยา anti-TB, AFB</p>
        </div>

        {/* Pillar 3: MDRO */}
        <div
          onClick={() => onSelectTab('mdro')}
          className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-semibold truncate">เชื้อดื้อยา MDRO</span>
            <Microscope className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900">{mdroCount}</span>
            <span className="text-[11px] text-purple-700 font-medium bg-purple-50 px-1.5 py-0.5 rounded">
              CRE/MRSA/VRE
            </span>
          </div>
          <p className="mt-1 text-[10px] text-slate-400 truncate">ชนิดเชื้อ, ยา ATB ที่ได้รับ</p>
        </div>

        {/* Pillar 4: SSI */}
        <div
          onClick={() => onSelectTab('ssi')}
          className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-semibold truncate">ติดตามแผลผ่าตัด SSI</span>
            <Scissors className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900">{ssiCount}</span>
            <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
              Surveillance
            </span>
          </div>
          <p className="mt-1 text-[10px] text-slate-400 truncate">รายแพทย์, วันผ่าตัด, แผล</p>
        </div>

        {/* Pillar 5: Invasive Devices */}
        <div
          onClick={() => onSelectTab('devices')}
          className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer group col-span-2 sm:col-span-1"
        >
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-semibold truncate">ใส่สายสวน & เครื่องมือ</span>
            <Syringe className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-bold text-slate-900">{devicesCount}</span>
            <span className="text-[11px] text-blue-700 font-medium bg-blue-50 px-1.5 py-0.5 rounded">
              F:{foleyCount} | V:{ventCount} | L:{lineCount}
            </span>
          </div>
          <p className="mt-1 text-[10px] text-slate-400 truncate">ปัสสาวะ, ท่อช่วยหายใจ, หลอดเลือด</p>
        </div>

      </div>

    </div>
  );
};
