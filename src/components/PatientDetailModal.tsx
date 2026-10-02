import React from 'react';
import { 
  X, 
  User, 
  BedDouble, 
  Calendar, 
  Stethoscope, 
  Thermometer, 
  Syringe, 
  Scissors, 
  Wind, 
  Microscope, 
  ShieldCheck, 
  AlertTriangle, 
  Pill, 
  Clock,
  CheckCircle,
  FileText
} from 'lucide-react';
import { Patient } from '../types';

interface PatientDetailModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenAssessment: (patient: Patient) => void;
}

export const PatientDetailModal: React.FC<PatientDetailModalProps> = ({
  patient,
  isOpen,
  onClose,
  onOpenAssessment
}) => {
  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold">{patient.nameTh}</h3>
                <span className="text-xs text-slate-300 font-normal">({patient.nameEn})</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30">
                  HN: {patient.hn}
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-slate-700 text-slate-200">
                  VN: {patient.vn}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                เวชระเบียนผู้ป่วยและข้อมูลการเฝ้าระวังการติดเชื้อในโรงพยาบาล (IC Surveillance Record)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          
          {/* Top Demographic Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-[11px] text-slate-500 block">เพศ / อายุ</span>
              <span className="font-semibold text-slate-900 text-sm">
                {patient.gender === 'M' ? 'ชาย' : 'หญิง'}, {patient.age} ปี
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">ประเภทผู้ป่วย</span>
              <span className="font-semibold text-slate-900 text-sm">
                {patient.patientType} ({patient.ward.split(' ')[0]})
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">ห้อง / เตียง</span>
              <span className="font-semibold text-blue-700 font-mono text-sm">
                {patient.roomBed}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block">วันที่รับไว้รักษา (Admit)</span>
              <span className="font-semibold text-slate-900">
                {new Date(patient.admissionDate).toLocaleDateString('th-TH', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-[11px] text-slate-500 block">การวินิจฉัยหลัก (Primary Diagnosis)</span>
              <span className="font-semibold text-slate-900 text-sm">
                {patient.primaryDiagnosis}
              </span>
            </div>
            <div className="col-span-2">
              <span className="text-[11px] text-slate-500 block">แพทย์ผู้รับผิดชอบ (Attending Physician)</span>
              <span className="font-semibold text-slate-900">
                {patient.attendingPhysician}
              </span>
            </div>
          </div>

          {/* Core Surveillance Modules */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Module 1: Fever Surveillance > 48h */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Thermometer className="w-4 h-4 text-red-500" />
                  <span>เฝ้าระวังไข้หลัง 48 ชั่วโมง (Fever Post-48h)</span>
                </span>
                {patient.hasFeverPost48h ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">
                    พบไข้ ≥ 38.0°C
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600">
                    ไม่มีไข้เกินเกณฑ์
                  </span>
                )}
              </div>
              <div className="mt-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">อุณหภูมิสูงสุด (Peak Temp):</span>
                  <span className="font-bold text-slate-900 font-mono text-sm">
                    {patient.peakTemp ? `${patient.peakTemp}°C` : '-'}
                  </span>
                </div>
                {patient.feverOnsetDate && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">วันที่เริ่มมีไข้:</span>
                    <span className="font-medium text-slate-800">
                      {new Date(patient.feverOnsetDate).toLocaleString('th-TH')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">สถานะหลัง Admit 48 ชม.:</span>
                  <span className="font-medium text-slate-800">
                    {patient.hasFeverPost48h ? 'เข้าเกณฑ์ทริกเกอร์เฝ้าระวัง HAI' : 'ปกติ'}
                  </span>
                </div>
              </div>
            </div>

            {/* Module 2: Invasive Devices & Lines */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Syringe className="w-4 h-4 text-blue-600" />
                  <span>สายสวนและอุปกรณ์รุกล้ำ (Invasive Devices)</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700">
                  {patient.devices.length} ชนิด
                </span>
              </div>
              <div className="mt-3 space-y-2">
                {patient.devices.length === 0 ? (
                  <div className="text-slate-400 py-2">ไม่มีการใส่อุปกรณ์รุกล้ำ</div>
                ) : (
                  patient.devices.map((d, idx) => (
                    <div key={idx} className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="flex items-center justify-between font-semibold text-slate-900">
                        <span>{d.nameTh}</span>
                        <span className="text-blue-600 font-mono font-bold">
                          {d.deviceDays} วัน
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        ตำแหน่ง: {d.insertionSite} • ใส่เมื่อ: {new Date(d.insertionDate).toLocaleDateString('th-TH')}
                      </div>
                      {d.notes && <div className="text-[10px] text-slate-600 mt-1 italic">{d.notes}</div>}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Module 3: TB & Respiratory Isolation */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Wind className="w-4 h-4 text-amber-600" />
                  <span>วัณโรค & แยกโรคทางเดินหายใจ (TB Isolation)</span>
                </span>
                {patient.isRespiratoryIsolation ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                    {patient.isolationType || 'Airborne'} Isolation
                  </span>
                ) : (
                  <span className="text-slate-400 text-[10px]">ไม่ต้องแยกโรค</span>
                )}
              </div>
              <div className="mt-3 space-y-2">
                {patient.isRespiratoryIsolation ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-slate-500">ประเภทการวินิจฉัย:</span>
                      <span className="font-medium text-slate-900">
                        {patient.respiratoryDiagnosis || patient.primaryDiagnosis}
                      </span>
                    </div>
                    {patient.antiTbMedications && (
                      <div className="bg-amber-50/70 p-2 rounded-lg border border-amber-200 space-y-1">
                        <div className="font-semibold text-amber-900 flex items-center gap-1">
                          <Pill className="w-3 h-3 text-amber-700" />
                          <span>สูตรยา Anti-TB: {patient.antiTbMedications.drugNames}</span>
                        </div>
                        <div className="text-[11px] text-amber-800">
                          วันที่เริ่มยา: {new Date(patient.antiTbMedications.startDateTime).toLocaleString('th-TH')}
                        </div>
                        <div className="text-[11px] text-amber-800">
                          วันที่หยุดยา: {patient.antiTbMedications.stopDateTime ? new Date(patient.antiTbMedications.stopDateTime).toLocaleString('th-TH') : 'กำลังได้รับยาต่อเนื่อง (Ongoing)'}
                        </div>
                      </div>
                    )}
                    {patient.sputumAfbResult && (
                      <div className="flex justify-between">
                        <span className="text-slate-500">ผลเสมหะ (Sputum AFB):</span>
                        <span className="font-bold text-red-600">{patient.sputumAfbResult}</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-slate-400 py-2">ไม่ได้อยู่ในกลุ่มเฝ้าระวัง TB / ทางเดินหายใจ</div>
                )}
              </div>
            </div>

            {/* Module 4: MDRO Surveillance */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Microscope className="w-4 h-4 text-purple-600" />
                  <span>เชื้อดื้อยาขั้นวิกฤต (MDRO Surveillance)</span>
                </span>
                {patient.isMdro ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800">
                    พบเชื้อดื้อยา MDRO
                  </span>
                ) : (
                  <span className="text-slate-400 text-[10px]">ไม่พบเชื้อดื้อยา</span>
                )}
              </div>
              <div className="mt-3 space-y-2">
                {patient.isMdro && patient.mdroDetails ? (
                  <>
                    <div>
                      <span className="text-slate-500 block">เชื้อที่ตรวจพบ:</span>
                      <span className="font-bold text-purple-900 text-sm">
                        {patient.mdroDetails.organism}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">แบบแผนความดื้อยา (Resistance):</span>
                      <span className="font-medium text-rose-800">
                        {patient.mdroDetails.resistanceProfile}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">สิ่งส่งตรวจ (Specimen):</span>
                      <span className="font-semibold text-slate-800">
                        {patient.mdroDetails.specimen}
                      </span>
                    </div>
                    {patient.mdroDetails.antibioticsReceived && (
                      <div>
                        <span className="text-slate-500 block mb-1">ยาต้านจุลชีพ (ATB) ที่ได้รับ:</span>
                        <div className="space-y-1">
                          {patient.mdroDetails.antibioticsReceived.map((atb, idx) => (
                            <div key={idx} className="p-1.5 bg-slate-50 rounded border border-slate-200 font-medium">
                              {atb.name} - {atb.dose} ({atb.route})
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-slate-400 py-2">ไม่มีประวัติติดเชื้อดื้อยาในปัจจุบัน</div>
                )}
              </div>
            </div>

            {/* Module 5: Surgery & SSI */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs col-span-1 md:col-span-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <Scissors className="w-4 h-4 text-emerald-600" />
                  <span>การผ่าตัดและติดตามแผลผ่าตัด (Surgery & SSI Surveillance)</span>
                </span>
                {patient.isSsiSurveillance ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    SSI Tracking Active
                  </span>
                ) : (
                  <span className="text-slate-400 text-[10px]">ไม่มีการผ่าตัดที่ต้องเฝ้าระวัง</span>
                )}
              </div>
              <div className="mt-3">
                {patient.surgeryPerformed || patient.ssiDetails ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-slate-500 block">หัตถการผ่าตัด:</span>
                      <span className="font-bold text-slate-900">
                        {patient.ssiDetails?.procedure || patient.surgeryPerformed?.procedure}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">ศัลยแพทย์ผู้ผ่าตัด:</span>
                      <span className="font-semibold text-slate-800">
                        {patient.ssiDetails?.surgeon || patient.surgeryPerformed?.surgeon}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Wound Class & Implant:</span>
                      <span className="font-semibold text-slate-800">
                        {patient.ssiDetails?.woundClass || patient.surgeryPerformed?.woundClass || 'Clean'}
                        {patient.ssiDetails?.hasImplant ? ' • มี Implant (เฝ้าระวัง 90 วัน)' : ' • ไม่มี Implant (30 วัน)'}
                      </span>
                    </div>
                    {patient.ssiDetails?.woundDischarge && (
                      <div className="col-span-3 bg-slate-50 p-2 rounded-lg border border-slate-200">
                        <span className="font-semibold text-slate-700">ลักษณะแผล / สิ่งคัดหลั่ง: </span>
                        <span>{patient.ssiDetails.woundDischarge}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-slate-400 py-1">ผู้ป่วยรายนี้ไม่มีประวัติการผ่าตัดในการ Admit ครั้งนี้</div>
                )}
              </div>
            </div>

          </div>

          {/* Section: Current HAI Assessment Verdict */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>ผลการประเมินและการวินิจฉัยของคณะกรรมการ IC</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-white border border-slate-300">
                สถานะ: {patient.assessment.status}
              </span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-slate-500">การวินิจฉัย HAI: </span>
                  <strong className="text-slate-900 font-bold text-sm">
                    {patient.assessment.status === 'confirmed_hai' ? `Confirmed HAI (${patient.assessment.haiType})` :
                     patient.assessment.status === 'not_hai' ? 'ไม่ใช่การติดเชื้อใน รพ. (Not HAI / CAI)' :
                     'อยู่ระหว่างรอการประเมิน'}
                  </strong>
                </div>
                {patient.assessment.assessedBy && (
                  <div className="text-slate-600">
                    ประเมินโดย: <strong>{patient.assessment.assessedBy}</strong> ({patient.assessment.assessedRole})
                  </div>
                )}
              </div>
              {patient.assessment.recommendations && (
                <div className="bg-blue-50 p-2.5 rounded-lg border border-blue-200 text-blue-900">
                  <strong>ข้อเสนอแนะ/มาตรการ: </strong>
                  {patient.assessment.recommendations}
                </div>
              )}
              {patient.assessment.investigationNotes && (
                <div className="text-slate-600">
                  <strong>บันทึกการทบทวน: </strong>
                  {patient.assessment.investigationNotes}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            ปิดหน้าต่าง
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenAssessment(patient);
            }}
            className="px-5 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>เปิดแบบประเมินวินิจฉัย HAI</span>
          </button>
        </div>

      </div>
    </div>
  );
};
