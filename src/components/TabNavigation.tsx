import React from 'react';
import { 
  LayoutDashboard, 
  Thermometer, 
  Wind, 
  Microscope, 
  Scissors, 
  Syringe, 
  CheckSquare, 
  ShieldAlert
} from 'lucide-react';
import { Patient } from '../types';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
  filteredPatients: Patient[];
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  filteredPatients
}) => {
  const feverCount = filteredPatients.filter((p) => p.hasFeverPost48h).length;
  const tbCount = filteredPatients.filter((p) => p.isRespiratoryIsolation).length;
  const mdroCount = filteredPatients.filter((p) => p.isMdro).length;
  const ssiCount = filteredPatients.filter((p) => p.isSsiSurveillance).length;
  const devicesCount = filteredPatients.filter((p) => p.hasInvasiveDevices).length;
  const pendingAssessmentCount = filteredPatients.filter(
    (p) => p.assessment.status === 'pending_nurse' || p.assessment.status === 'pending_doctor'
  ).length;

  const tabs = [
    {
      id: 'overview',
      name: 'ภาพรวม & สถิติ',
      nameEn: 'Overview & Survey',
      icon: LayoutDashboard,
      badge: filteredPatients.length
    },
    {
      id: 'fever',
      name: 'ไข้ ≥ 38°C หลัง 48 ชม.',
      nameEn: 'Fever Post-48h',
      icon: Thermometer,
      badge: feverCount,
      badgeColor: 'bg-red-100 text-red-700'
    },
    {
      id: 'tb_respiratory',
      name: 'TB & แยกโรคทางเดินหายใจ',
      nameEn: 'TB & Isolation',
      icon: Wind,
      badge: tbCount,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'mdro',
      name: 'เชื้อดื้อยา MDRO',
      nameEn: 'MDRO Surveillance',
      icon: Microscope,
      badge: mdroCount,
      badgeColor: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'ssi',
      name: 'ติดตามแผลผ่าตัด SSI',
      nameEn: 'SSI Surveillance',
      icon: Scissors,
      badge: ssiCount,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'devices',
      name: 'ใส่สายสวน & อุปกรณ์',
      nameEn: 'Invasive Devices',
      icon: Syringe,
      badge: devicesCount,
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 'assessment_queue',
      name: 'คิวประเมินวินิจฉัย HAI',
      nameEn: 'HAI Assessment Queue',
      icon: CheckSquare,
      badge: pendingAssessmentCount,
      badgeColor: 'bg-rose-500 text-white font-bold'
    },
    {
      id: 'guidelines',
      name: 'แนวทาง & Bundle IC',
      nameEn: 'Bundles & Policy',
      icon: ShieldAlert,
      badge: null
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl mb-6 shadow-2xs overflow-hidden">
      <div className="flex items-center overflow-x-auto scrollbar-thin divide-x divide-slate-100">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-xs whitespace-nowrap transition-all flex-shrink-0 cursor-pointer ${
                isActive
                  ? 'bg-blue-50/70 text-blue-700 font-bold border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
              <div className="text-left">
                <div>{tab.name}</div>
                <div className="text-[10px] text-slate-400 font-normal leading-tight hidden lg:block">
                  {tab.nameEn}
                </div>
              </div>
              {tab.badge !== null && (
                <span
                  className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${
                    tab.badgeColor || 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
