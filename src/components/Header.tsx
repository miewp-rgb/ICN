import React from 'react';
import { ShieldAlert, UserCheck, Stethoscope, FileSpreadsheet, RefreshCw, Activity, HeartPulse, FileCode } from 'lucide-react';

interface HeaderProps {
  currentUserRole: 'IC Nurse' | 'IC Physician';
  onRoleChange: (role: 'IC Nurse' | 'IC Physician') => void;
  onOpenPrevalenceSurvey: () => void;
  onOpenGuidelines: () => void;
  onExportReport: () => void;
  onDownloadSingleHtml?: () => void;
  totalAlerts: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUserRole,
  onRoleChange,
  onOpenPrevalenceSurvey,
  onOpenGuidelines,
  onExportReport,
  onDownloadSingleHtml,
  totalAlerts
}) => {
  const todayStr = new Intl.DateTimeFormat('th-TH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(new Date());

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3.5 gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-sm ring-2 ring-blue-100">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
                  Infection Control Dashboard
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
                  ระบบเฝ้าระวังสด Live
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Hospital Infection Surveillance & Control Monitoring System • โรงพยาบาลศูนย์การแพทย์
              </p>
            </div>
          </div>

          {/* Quick Actions & Role Switcher */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            {/* Prevalence Survey Quick Button */}
            <button
              onClick={onOpenPrevalenceSurvey}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors shadow-2xs"
              title="เปิดเครื่องมือคำนวณและรายงานความชุกการติดเชื้อ"
            >
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>Prevalence Survey</span>
            </button>

            {/* IC Guidelines Quick Button */}
            <button
              onClick={onOpenGuidelines}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 transition-colors"
              title="ดูแนวทางและเกณฑ์วินิจฉัย IC / Bundle Checklist"
            >
              <HeartPulse className="w-3.5 h-3.5 text-slate-600" />
              <span>แนวทาง IC & Bundles</span>
            </button>

            {/* Export Report Button (Excel) */}
            <button
              onClick={onExportReport}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 transition-colors shadow-2xs cursor-pointer"
              title="ดูตัวอย่างและส่งออกรายงานเฝ้าระวังการติดเชื้อเป็นไฟล์ Excel (.xlsx)"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>ส่งออก Excel (.xlsx)</span>
            </button>

            {/* Single HTML Bundle Download Button */}
            {onDownloadSingleHtml && (
              <button
                onClick={onDownloadSingleHtml}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-800 hover:bg-indigo-100 border border-indigo-300 transition-colors shadow-2xs cursor-pointer"
                title="ดาวน์โหลดระบบทั้งแอปเป็นไฟล์ HTML เดียว (Single-File Bundle) บันเดิลครบทุกสคริปต์และสไตล์ สามารถเปิดใช้งานแบบออฟไลน์ได้ทันที"
              >
                <FileCode className="w-4 h-4 text-indigo-600" />
                <span>ดาวน์โหลด HTML 1 ไฟล์</span>
              </button>
            )}

            {/* User Role Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
              <button
                onClick={() => onRoleChange('IC Nurse')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
                  currentUserRole === 'IC Nurse'
                    ? 'bg-white text-blue-700 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>พยาบาล IC (ICN)</span>
              </button>
              <button
                onClick={() => onRoleChange('IC Physician')}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
                  currentUserRole === 'IC Physician'
                    ? 'bg-white text-indigo-700 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
                <span>แพทย์ IC</span>
              </button>
            </div>

            {/* Date display */}
            <div className="hidden lg:block text-right pl-2 border-l border-slate-200">
              <div className="text-[11px] font-semibold text-slate-700">{todayStr}</div>
              <div className="text-[10px] text-slate-400">Time: 24-hr Surveillance</div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
};
