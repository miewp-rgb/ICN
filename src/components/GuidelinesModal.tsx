import React from 'react';
import { X, BookOpen, ShieldCheck, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';

interface GuidelinesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GuidelinesModal: React.FC<GuidelinesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">คู่มือเกณฑ์วินิจฉัยและมาตรฐานการควบคุมการติดเชื้อในโรงพยาบาล</h3>
              <p className="text-xs text-slate-300">
                อ้างอิงแนวทาง CDC / NHSN Surveillance Definitions & กรมควบคุมโรค กระทรวงสาธารณสุข
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          
          {/* Section 1 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <span>1. เกณฑ์การเฝ้าระวังไข้หลัง Admit 48 ชั่วโมง (Post-48h Fever Rule)</span>
            </h4>
            <p className="leading-relaxed text-slate-600">
              การติดเชื้อในโรงพยาบาล (Healthcare-Associated Infection: HAI) คือการติดเชื้อที่เกิดขึ้นกับผู้ป่วยในขณะที่รับการรักษาตัวในโรงพยาบาล โดยที่<strong>ไม่มีอาการหรือไม่มีการเพาะเชื้ออยู่ในระยะฟักตัว (Incubation period) ณ วันที่แรกรับ (Admission date)</strong> โดยใช้กรอบเวลาหลังจาก Admit เกิน 48 ชั่วโมง (หรือปฏิทินวันที่ 3 ของการนอน รพ.) หากพบอุณหภูมิร่างกาย ≥ 38.0°C ร่วมกับมีหัตถการรุกล้ำ เช่น สายสวน หรือการผ่าตัด ต้องได้รับการทบทวนโดยพยาบาล IC ทุกราย
            </p>
          </div>

          {/* Section 2 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>2. นิยามการติดเชื้อในตำแหน่งสำคัญ (CDC / NHSN Core Criteria)</span>
            </h4>
            <div className="space-y-3 mt-2">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900 text-xs">CAUTI (Catheter-Associated Urinary Tract Infection)</div>
                <div className="text-slate-600 mt-1">
                  ผู้ป่วยคาสายสวนปัสสาวะมาแล้ว &gt; 2 วันปฏิทิน ร่วมกับมีไข้ &gt; 38.0°C หรือปวดบริเวณ suprapubic / costovertebral angle และมีผลเพาะเชื้อปัสสาวะ (Urine C/S) พบเชื้อก่อโรค ≥ 10⁵ CFU/ml
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900 text-xs">VAP (Ventilator-Associated Pneumonia)</div>
                <div className="text-slate-600 mt-1">
                  ผู้ป่วยใส่ท่อช่วยหายใจและต่อเครื่องช่วยหายใจ &gt; 2 วันปฏิทิน ร่วมกับภาพรังสีทรวงอก (CXR) มี new or progressive infiltrate, ไข้ ≥ 38°C, เสมหะขุ่นข้นขึ้น (purulent sputum), หรือ WBC &gt; 12,000 / &lt; 4,000
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900 text-xs">SSI (Surgical Site Infection)</div>
                <div className="text-slate-600 mt-1">
                  การติดเชื้อเกิดขึ้นภายใน 30 วันหลังผ่าตัด (หรือภายใน 90 วันกรณีมีอุปกรณ์เทียม/Implant) แบ่งเป็น Superficial Incisional, Deep Incisional, และ Organ/Space SSI
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900 text-xs">CLABSI (Central Line-Associated Bloodstream Infection)</div>
                <div className="text-slate-600 mt-1">
                  ผู้ป่วยคาสายสวนหลอดเลือดดำส่วนกลาง &gt; 2 วันปฏิทิน ตรวจพบเชื้อในกระแสเลือด (Positive Hemoculture) โดยไม่มีแหล่งติดเชื้ออื่นในร่างกายอธิบายได้
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>3. มาตรการแยกโรควัณโรค (Airborne Precaution) และเชื้อดื้อยา (Contact Precaution)</span>
            </h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 mt-1">
              <li><strong>TB / Airborne Isolation:</strong> ผู้ป่วยแรกรับด้วย 1st Diag TB ต้องพักในห้องแยกความดันลบ (Negative Pressure Room) เจ้าหน้าที่สวมหน้ากาก N95 ตลอดเวลา เฝ้าระวังวัน-เวลาเริ่มยา Anti-TB และติดตามผลเสมหะ AFB ซ้ำ</li>
              <li><strong>MDRO Contact Precaution:</strong> ผู้ป่วยที่ตรวจพบเชื้อ CRE, MRSA, VRE, CRAB ต้องติดป้ายสัญลักษณ์ Contact Precaution, สวมถุงมือและเสื้อคลุม (Gown) เมื่อสัมผัสผู้ป่วย, และใช้อุปกรณ์ทางการแพทย์เฉพาะตัว</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            รับทราบและปิด
          </button>
        </div>

      </div>
    </div>
  );
};
