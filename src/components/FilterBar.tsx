import React from 'react';
import { Search, Filter, Calendar, Building2, UserSquare2, CheckCircle2, RotateCcw } from 'lucide-react';
import { WARDS, DOCTORS } from '../mockData';
import { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (updated: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
  totalPatientsCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
  totalPatientsCount
}) => {
  const isFiltered =
    filters.startDate !== '' ||
    filters.endDate !== '' ||
    filters.ward !== '' ||
    filters.doctor !== '' ||
    filters.haiStatus !== '' ||
    filters.searchQuery !== '';

  const setPresetRange = (type: 'today' | '7days' | 'month' | 'prevalence') => {
    const today = new Date('2026-09-08');
    const formatDate = (d: Date) => d.toISOString().split('T')[0];

    if (type === 'today') {
      onFilterChange({
        startDate: formatDate(today),
        endDate: formatDate(today)
      });
    } else if (type === '7days') {
      const past = new Date(today);
      past.setDate(past.getDate() - 7);
      onFilterChange({
        startDate: formatDate(past),
        endDate: formatDate(today)
      });
    } else if (type === 'month') {
      const past = new Date(today);
      past.setDate(past.getDate() - 30);
      onFilterChange({
        startDate: formatDate(past),
        endDate: formatDate(today)
      });
    } else if (type === 'prevalence') {
      // 1-day prevalence survey window
      onFilterChange({
        startDate: '2026-09-01',
        endDate: '2026-09-08'
      });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Filter className="w-4 h-4 text-blue-600" />
          <span>ตัวกรองข้อมูลระบบเฝ้าระวัง (Surveillance Filters)</span>
          <span className="text-xs text-slate-500 font-normal">
            (กรองรายแผนก, รายแพทย์, ช่วงเวลาสำรวจ, และสถานะการติดเชื้อ)
          </span>
        </div>

        {/* Quick Date Presets */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-500 font-medium mr-1">ช่วงเวลาสำรวจ:</span>
          <button
            onClick={() => setPresetRange('today')}
            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            วันนี้ (Today)
          </button>
          <button
            onClick={() => setPresetRange('7days')}
            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            7 วันล่าสุด
          </button>
          <button
            onClick={() => setPresetRange('month')}
            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            30 วันล่าสุด
          </button>
          <button
            onClick={() => setPresetRange('prevalence')}
            className="px-2 py-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium transition-colors"
          >
            รอบสำรวจความชุก (Prevalence Period)
          </button>
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-red-600 hover:bg-red-50 font-medium transition-colors ml-1"
            >
              <RotateCcw className="w-3 h-3" />
              ล้างตัวกรอง
            </button>
          )}
        </div>
      </div>

      {/* Main Filter Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-3">
        
        {/* Start Date */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            วันที่เริ่มต้น (Start Date)
          </label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => onFilterChange({ startDate: e.target.value })}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-400" />
            วันที่สิ้นสุด (End Date)
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => onFilterChange({ endDate: e.target.value })}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          />
        </div>

        {/* Ward / Department Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Building2 className="w-3 h-3 text-slate-400" />
            รายแผนก / หอผู้ป่วย (Ward)
          </label>
          <select
            value={filters.ward}
            onChange={(e) => onFilterChange({ ward: e.target.value })}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 truncate"
          >
            <option value="">ทุกแผนก / หอผู้ป่วย (All Wards)</option>
            {WARDS.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
        </div>

        {/* Doctor Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <UserSquare2 className="w-3 h-3 text-slate-400" />
            รายแพทย์ผู้ดูแล (Physician)
          </label>
          <select
            value={filters.doctor}
            onChange={(e) => onFilterChange({ doctor: e.target.value })}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 truncate"
          >
            <option value="">แพทย์ทุกคน (All Physicians)</option>
            {DOCTORS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* HAI Assessment Status Filter */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-slate-400" />
            สถานะการประเมิน (HAI Status)
          </label>
          <select
            value={filters.haiStatus}
            onChange={(e) => onFilterChange({ haiStatus: e.target.value })}
            className="w-full px-2.5 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
          >
            <option value="">ทุกสถานะ (All Statuses)</option>
            <option value="pending_nurse">รอยืนยันโดย IC Nurse</option>
            <option value="pending_doctor">รอยืนยันโดยแพทย์ IC</option>
            <option value="confirmed_hai">ติดเชื้อใน รพ. (Confirmed HAI)</option>
            <option value="not_hai">ไม่ใช่ HAI (Not HAI / CAI)</option>
          </select>
        </div>

        {/* Search Input */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Search className="w-3 h-3 text-slate-400" />
            ค้นหา HN / VN / ชื่อ / โรค
          </label>
          <div className="relative">
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
              placeholder="เช่น 6601429, ปอดอักเสบ..."
              className="w-full pl-7 pr-2.5 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/60 focus:bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
            />
            <Search className="w-3 h-3 text-slate-400 absolute left-2 top-2" />
          </div>
        </div>

      </div>

      {/* Filter summary status text */}
      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
        <div>
          {isFiltered ? (
            <span className="font-medium text-blue-700">
              กำลังแสดงข้อมูลที่ผ่านการกรอง: <strong>{totalFilteredCount}</strong> จากทั้งหมด {totalPatientsCount} ราย
            </span>
          ) : (
            <span>แสดงข้อมูลผู้ป่วยที่อยู่ในการเฝ้าระวังทั้งหมด {totalPatientsCount} ราย</span>
          )}
        </div>
        <div className="hidden sm:block text-slate-400">
          * การกรองจะมีผลกับทุกตารางและสถิติในระบบทันที
        </div>
      </div>
    </div>
  );
};
