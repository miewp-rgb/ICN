import React, { useState } from 'react';
import { 
  X, 
  FileSpreadsheet, 
  Download, 
  CheckCircle2, 
  Layers, 
  Calendar, 
  Building, 
  Table, 
  Sparkles,
  Thermometer,
  Wind,
  Microscope,
  Scissors,
  Syringe,
  CheckSquare
} from 'lucide-react';
import { Patient } from '../types';
import { generateInfectionControlExcel } from '../utils/excelExport';

interface ExcelExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  patients: Patient[];
  currentUserRole: string;
}

export const ExcelExportModal: React.FC<ExcelExportModalProps> = ({
  isOpen,
  onClose,
  patients,
  currentUserRole
}) => {
  if (!isOpen) return null;

  const [surveyDate, setSurveyDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [reportTitle, setReportTitle] = useState<string>(
    'รายงานสรุปการเฝ้าระวังการติดเชื้อในโรงพยาบาล (Hospital Infection Surveillance Report)'
  );
  const [activePreviewTab, setActivePreviewTab] = useState<string>('fever');
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const handleDownload = () => {
    setIsExporting(true);
    try {
      generateInfectionControlExcel(patients, {
        surveyDate,
        reportTitle,
        preparedBy: `${currentUserRole === 'IC Nurse' ? 'พว.อุษา นิยมรัตน์ (ICN)' : 'นพ.สมชาย เกียรติสกุล (IC Physician)'} / IC Committee`
      });
    } catch (err) {
      console.error('Failed to export excel:', err);
    } finally {
      setTimeout(() => {
        setIsExporting(false);
      }, 800);
    }
  };

  const sheetsInfo = [
    {
      id: 'overview',
      name: '1. สรุปภาพรวมและความชุก',
      desc: 'ยอดผู้ป่วยใน (IPD), ผู้ป่วยนอก (OPD), อัตราความชุกการติดเชื้อ (% Prevalence Rate), Device Utilization Ratio และสัดส่วน HAI',
      icon: Layers,
      count: 'สรุปเชิงสถิติ'
    },
    {
      id: 'fever',
      name: '2. ไข้หลัง Admit > 48 ชม.',
      desc: 'HN, VN, ชื่อ-สกุล, อายุ, หอผู้ป่วย, การผ่าตัด, การใส่สายสวน, การวินิจฉัยหลัก, และอุณหภูมิสูงสุด',
      icon: Thermometer,
      count: `${patients.filter((p) => p.hasFeverPost48h).length} รายการ`
    },
    {
      id: 'tb',
      name: '3. วัณโรค & แยกโรคทางเดินหายใจ',
      desc: 'HN, ชื่อ, 1st Diag TB, ประเภทแยกโรค, วันที่-เวลาเริ่มและหยุดยา Anti-TB, ผลเสมหะ AFB, GeneXpert',
      icon: Wind,
      count: `${patients.filter((p) => p.isRespiratoryIsolation).length} รายการ`
    },
    {
      id: 'mdro',
      name: '4. เชื้อดื้อยาปฏิชีวนะขั้นวิกฤต',
      desc: 'HN, ชื่อ, ชนิดเชื้อดื้อยา (CRE, MRSA, VRE), Resistance Profile, สิ่งส่งตรวจ, รายการยาปฏิชีวนะ (ATB) ที่ได้รับ',
      icon: Microscope,
      count: `${patients.filter((p) => p.isMdro).length} รายการ`
    },
    {
      id: 'ssi',
      name: '5. เฝ้าระวังแผลผ่าตัด (SSI)',
      desc: 'HN, ชื่อ, หัตถการผ่าตัด, วันที่ผ่าตัด, POD, ศัลยแพทย์, Wound Class, อุปกรณ์เทียม (Implant), และลักษณะสิ่งคัดหลั่ง',
      icon: Scissors,
      count: `${patients.filter((p) => p.isSsiSurveillance).length} รายการ`
    },
    {
      id: 'devices',
      name: '6. สายสวนและอุปกรณ์รุกล้ำ',
      desc: 'สายสวนปัสสาวะ, เครื่องช่วยหายใจ, สายสวนทางหลอดเลือดแดง/ดำ, ระยะเวลาคาสาย (Device Days), และ Care Bundle',
      icon: Syringe,
      count: `${patients.filter((p) => p.hasInvasiveDevices).length} รายการ`
    },
    {
      id: 'assessment',
      name: '7. คิวประเมิน & วินิจฉัย HAI',
      desc: 'สถานะการวินิจฉัย (Confirmed HAI / Not HAI), ประเภท HAI, เกณฑ์ CDC/NHSN ที่เข้าได้, ข้อเสนอแนะ IC, และผู้ประเมิน',
      icon: CheckSquare,
      count: `${patients.length} รายการ`
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-sm">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">ส่งออกรายงานการติดเชื้อในโรงพยาบาล (Excel Export)</h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                  .XLSX Workbook (7 Sheets)
                </span>
              </div>
              <p className="text-xs text-emerald-100 mt-0.5">
                ไฟล์ Excel รวม 7 ชีตข้อมูลตามเกณฑ์มาตรฐาน CDC / NHSN Surveillance พร้อมคอลัมน์ครบถ้วน
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Configuration Bar */}
        <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span className="font-semibold text-slate-700">วันที่สำรวจข้อมูล:</span>
              <input
                type="date"
                value={surveyDate}
                onChange={(e) => setSurveyDate(e.target.value)}
                className="px-2.5 py-1 border border-slate-300 rounded-lg bg-white font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-700">ชื่อหัวเรื่องรายงาน:</span>
              <input
                type="text"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
                className="px-2.5 py-1 border border-slate-300 rounded-lg bg-white font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 w-64 text-xs"
              />
            </div>
          </div>

          <button
            onClick={handleDownload}
            disabled={isExporting}
            className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'กำลังสร้างไฟล์ Excel...' : 'ดาวน์โหลดไฟล์ Excel (.xlsx)'}</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          
          {/* Sheets Structure Card */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                <Layers className="w-4 h-4 text-emerald-600" />
                <span>โครงสร้างทั้ง 7 แผ่นงาน (Sheets) ในไฟล์ Excel ที่จะส่งออก</span>
              </h4>
              <span className="text-[11px] text-slate-500">
                คลิกที่แผ่นงานเพื่อดูตัวอย่างโครงสร้างคอลัมน์
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {sheetsInfo.map((sheet) => {
                const IconComponent = sheet.icon;
                const isSelected = activePreviewTab === sheet.id;

                return (
                  <div
                    key={sheet.id}
                    onClick={() => setActivePreviewTab(sheet.id)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50/70 border-emerald-500 ring-2 ring-emerald-200'
                        : 'bg-white border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                            isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-slate-900 text-xs">{sheet.name}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/70 px-1.5 py-0.5 rounded">
                        {sheet.count}
                      </span>
                    </div>
                    <p className="text-[10.5px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {sheet.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Preview of the Selected Sheet */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
              <span className="font-bold text-slate-900 flex items-center gap-2 text-xs">
                <Table className="w-4 h-4 text-blue-600" />
                <span>ตัวอย่างโครงสร้างข้อมูลในแผ่นงาน: <strong>{sheetsInfo.find((s) => s.id === activePreviewTab)?.name}</strong></span>
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                UTF-8 Thai Encoding Supported
              </span>
            </div>

            {/* Simulated Excel Sheet Preview */}
            <div className="mt-3 overflow-x-auto bg-white rounded-lg border border-slate-200 shadow-2xs">
              {activePreviewTab === 'fever' && (
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-emerald-800 text-white font-semibold">
                      <th className="py-2 px-2.5 border border-emerald-700">ลำดับ</th>
                      <th className="py-2 px-2.5 border border-emerald-700">HN</th>
                      <th className="py-2 px-2.5 border border-emerald-700">VN</th>
                      <th className="py-2 px-2.5 border border-emerald-700">ชื่อ-สกุล</th>
                      <th className="py-2 px-2.5 border border-emerald-700">หอผู้ป่วย</th>
                      <th className="py-2 px-2.5 border border-emerald-700">ไข้สูงสุด (°C)</th>
                      <th className="py-2 px-2.5 border border-emerald-700">การผ่าตัด (Surgery)</th>
                      <th className="py-2 px-2.5 border border-emerald-700">การใส่สายสวน (Catheters)</th>
                      <th className="py-2 px-2.5 border border-emerald-700">สถานะ HAI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-sans">
                    {patients.filter((p) => p.hasFeverPost48h).slice(0, 4).map((p, idx) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="py-2 px-2.5 border border-slate-200 text-center font-mono">{idx + 1}</td>
                        <td className="py-2 px-2.5 border border-slate-200 font-mono font-bold text-blue-700">{p.hn}</td>
                        <td className="py-2 px-2.5 border border-slate-200 font-mono text-slate-500">{p.vn}</td>
                        <td className="py-2 px-2.5 border border-slate-200 font-medium text-slate-900">{p.nameTh}</td>
                        <td className="py-2 px-2.5 border border-slate-200">{p.ward.split(' ')[0]} ({p.roomBed})</td>
                        <td className="py-2 px-2.5 border border-slate-200 font-bold text-red-600 text-center">{p.peakTemp}°C</td>
                        <td className="py-2 px-2.5 border border-slate-200 text-slate-700">
                          {p.surgeryPerformed ? p.surgeryPerformed.procedure : 'ไม่มีการผ่าตัด'}
                        </td>
                        <td className="py-2 px-2.5 border border-slate-200 text-slate-700">
                          {p.devices.length > 0 ? p.devices.map((d) => `${d.nameTh} (${d.deviceDays} วัน)`).join(', ') : 'ไม่มี'}
                        </td>
                        <td className="py-2 px-2.5 border border-slate-200">
                          <span className="font-semibold text-red-700">{p.assessment.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activePreviewTab === 'tb' && (
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-amber-800 text-white font-semibold">
                      <th className="py-2 px-2.5 border border-amber-700">ลำดับ</th>
                      <th className="py-2 px-2.5 border border-amber-700">HN</th>
                      <th className="py-2 px-2.5 border border-amber-700">ชื่อ-สกุล</th>
                      <th className="py-2 px-2.5 border border-amber-700">การวินิจฉัยโรค</th>
                      <th className="py-2 px-2.5 border border-amber-700">ประเภทแยกโรค</th>
                      <th className="py-2 px-2.5 border border-amber-700">วันเริ่มยา Anti-TB</th>
                      <th className="py-2 px-2.5 border border-amber-700">วันหยุดยา Anti-TB</th>
                      <th className="py-2 px-2.5 border border-amber-700">สูตรยา</th>
                      <th className="py-2 px-2.5 border border-amber-700">ผลเสมหะ AFB</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-sans">
                    {patients.filter((p) => p.isRespiratoryIsolation).slice(0, 3).map((p, idx) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="py-2 px-2.5 border border-slate-200 text-center font-mono">{idx + 1}</td>
                        <td className="py-2 px-2.5 border border-slate-200 font-mono font-bold text-blue-700">{p.hn}</td>
                        <td className="py-2 px-2.5 border border-slate-200 font-medium text-slate-900">{p.nameTh}</td>
                        <td className="py-2 px-2.5 border border-slate-200">{p.respiratoryDiagnosis}</td>
                        <td className="py-2 px-2.5 border border-slate-200 font-semibold text-amber-900">{p.isolationType}</td>
                        <td className="py-2 px-2.5 border border-slate-200 text-emerald-700 font-medium">
                          {p.antiTbMedications?.startDateTime ? p.antiTbMedications.startDateTime.replace('T', ' ') : '-'}
                        </td>
                        <td className="py-2 px-2.5 border border-slate-200 text-slate-600">
                          {p.antiTbMedications?.stopDateTime ? p.antiTbMedications.stopDateTime.replace('T', ' ') : 'Ongoing (ต่อเนื่อง)'}
                        </td>
                        <td className="py-2 px-2.5 border border-slate-200">{p.antiTbMedications?.drugNames || '-'}</td>
                        <td className="py-2 px-2.5 border border-slate-200 font-bold text-red-600">{p.sputumAfbResult || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activePreviewTab === 'mdro' && (
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-purple-900 text-white font-semibold">
                      <th className="py-2 px-2.5 border border-purple-800">ลำดับ</th>
                      <th className="py-2 px-2.5 border border-purple-800">HN</th>
                      <th className="py-2 px-2.5 border border-purple-800">ชื่อ-สกุล</th>
                      <th className="py-2 px-2.5 border border-purple-800">หอผู้ป่วย</th>
                      <th className="py-2 px-2.5 border border-purple-800">ชนิดเชื้อดื้อยา (Organism)</th>
                      <th className="py-2 px-2.5 border border-purple-800">Resistance Profile</th>
                      <th className="py-2 px-2.5 border border-purple-800">สิ่งส่งตรวจ</th>
                      <th className="py-2 px-2.5 border border-purple-800">ยาปฏิชีวนะ (ATB) ที่ได้รับ</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-sans">
                    {patients.filter((p) => p.isMdro).slice(0, 3).map((p, idx) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="py-2 px-2.5 border border-slate-200 text-center font-mono">{idx + 1}</td>
                        <td className="py-2 px-2.5 border border-slate-200 font-mono font-bold text-blue-700">{p.hn}</td>
                        <td className="py-2 px-2.5 border border-slate-200 font-medium text-slate-900">{p.nameTh}</td>
                        <td className="py-2 px-2.5 border border-slate-200">{p.ward.split(' ')[0]}</td>
                        <td className="py-2 px-2.5 border border-slate-200 font-bold text-purple-900">{p.mdroDetails?.organism}</td>
                        <td className="py-2 px-2.5 border border-slate-200 text-rose-800">{p.mdroDetails?.resistanceProfile}</td>
                        <td className="py-2 px-2.5 border border-slate-200">{p.mdroDetails?.specimen}</td>
                        <td className="py-2 px-2.5 border border-slate-200">
                          {p.mdroDetails?.antibioticsReceived?.map((a) => `${a.name} ${a.dose}`).join('; ')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {activePreviewTab === 'ssi' && (
                <table className="w-full text-left border-collapse text-[11px]">
                  <thead>
                    <tr className="bg-emerald-900 text-white font-semibold">
                      <th className="py-2 px-2.5 border border-emerald-800">ลำดับ</th>
                      <th className="py-2 px-2.5 border border-emerald-800">HN</th>
                      <th className="py-2 px-2.5 border border-emerald-800">ชื่อ-สกุล</th>
                      <th className="py-2 px-2.5 border border-emerald-800">หัตถการผ่าตัด</th>
                      <th className="py-2 px-2.5 border border-emerald-800">วันที่ผ่าตัด</th>
                      <th className="py-2 px-2.5 border border-emerald-800">POD</th>
                      <th className="py-2 px-2.5 border border-emerald-800">ศัลยแพทย์</th>
                      <th className="py-2 px-2.5 border border-emerald-800">Wound Class</th>
                      <th className="py-2 px-2.5 border border-emerald-800">สถานะแผล/สิ่งคัดหลั่ง</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-sans">
                    {patients.filter((p) => p.isSsiSurveillance).slice(0, 3).map((p, idx) => (
                      <tr key={p.id} className="hover:bg-slate-50">
                        <td className="py-2 px-2.5 border border-slate-200 text-center font-mono">{idx + 1}</td>
                        <td className="py-2 px-2.5 border border-slate-200 font-mono font-bold text-blue-700">{p.hn}</td>
                        <td className="py-2 px-2.5 border border-slate-200 font-medium text-slate-900">{p.nameTh}</td>
                        <td className="py-2 px-2.5 border border-slate-200">{p.ssiDetails?.procedure}</td>
                        <td className="py-2 px-2.5 border border-slate-200">{p.ssiDetails?.surgeryDate}</td>
                        <td className="py-2 px-2.5 border border-slate-200 font-bold text-blue-600">Day {p.ssiDetails?.postOpDays}</td>
                        <td className="py-2 px-2.5 border border-slate-200">{p.ssiDetails?.surgeon}</td>
                        <td className="py-2 px-2.5 border border-slate-200">{p.ssiDetails?.woundClass}</td>
                        <td className="py-2 px-2.5 border border-slate-200">{p.ssiDetails?.woundDischarge}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {(activePreviewTab === 'overview' || activePreviewTab === 'devices' || activePreviewTab === 'assessment') && (
                <div className="p-4 text-center text-slate-500">
                  <div className="font-semibold text-slate-700 mb-1">
                    แผ่นงาน {sheetsInfo.find((s) => s.id === activePreviewTab)?.name} พร้อมสำหรับการส่งออก
                  </div>
                  <div className="text-[11px] text-slate-500">
                    ข้อมูลทั้งหมดถูกจัดกลุ่มและจัดฟอร์แมตเซลล์ตามมาตรฐานสำหรับโปรแกรม Microsoft Excel, Google Sheets, หรือ LibreOffice
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>พร้อมสร้างไฟล์และดาวน์โหลดลงในเครื่องทันที</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              ปิดหน้าต่าง
            </button>
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'กำลังส่งออก...' : 'ดาวน์โหลดไฟล์ตัวอย่าง Excel'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
