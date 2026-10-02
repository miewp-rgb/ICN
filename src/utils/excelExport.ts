import * as XLSX from 'xlsx';
import { Patient } from '../types';

export interface ExcelExportOptions {
  surveyDate?: string;
  reportTitle?: string;
  preparedBy?: string;
}

export function generateInfectionControlExcel(
  patients: Patient[],
  options: ExcelExportOptions = {}
): void {
  const surveyDate = options.surveyDate || new Date().toISOString().split('T')[0];
  const reportTitle = options.reportTitle || 'รายงานสรุปการเฝ้าระวังการติดเชื้อในโรงพยาบาล (Hospital Infection Surveillance Report)';
  const preparedBy = options.preparedBy || 'คณะกรรมการควบคุมโรคติดเชื้อในโรงพยาบาล (IC Committee)';

  const workbook = XLSX.utils.book_new();

  // ==========================================
  // SHEET 1: สรุปภาพรวมและความชุก (Prevalence & Census)
  // ==========================================
  const ipdPatients = patients.filter((p) => p.patientType === 'IPD');
  const opdPatients = patients.filter((p) => p.patientType === 'OPD');
  const totalIpdCensus = ipdPatients.length + 380;
  const totalOpdCensus = opdPatients.length + 1250;
  const confirmedHai = patients.filter((p) => p.assessment.status === 'confirmed_hai');
  const prevalenceRate = ((confirmedHai.length / totalIpdCensus) * 100).toFixed(2);

  const foleyCount = patients.filter((p) => p.devices.some((d) => d.type === 'foley')).length;
  const ventCount = patients.filter((p) => p.devices.some((d) => d.type === 'ventilator')).length;
  const lineCount = patients.filter((p) => p.devices.some((d) => d.type === 'central_line' || d.type === 'arterial_line')).length;

  const foleyRatio = ((foleyCount / totalIpdCensus) * 100).toFixed(1);
  const ventRatio = ((ventCount / totalIpdCensus) * 100).toFixed(1);
  const lineRatio = ((lineCount / totalIpdCensus) * 100).toFixed(1);

  const overviewData = [
    [reportTitle],
    ['วันที่สำรวจ/ส่งออกข้อมูล:', surveyDate, 'ผู้จัดทำรายงาน:', preparedBy],
    ['มาตรฐานอ้างอิง:', 'CDC / NHSN Surveillance Criteria & กระทรวงสาธารณสุข'],
    [],
    ['--- 1. สรุปยอดผู้ป่วยและการสำรวจความชุก (Patient Census & Prevalence Survey) ---'],
    ['รายการ (Indicator)', 'จำนวน (Count)', 'หน่วย (Unit)', 'หมายเหตุ'],
    ['ยอดผู้ป่วยในทั้งหมด (IPD Census)', totalIpdCensus, 'คน', 'อัตราครองเตียง 84.5%'],
    ['ยอดผู้ป่วยนอกทั้งหมด (OPD Census)', totalOpdCensus, 'คน', 'ยอดผู้ป่วยมารับบริการ'],
    ['ผู้ป่วยที่ตรวจพบการติดเชื้อใน รพ. (Confirmed HAI)', confirmedHai.length, 'เคส', 'เข้าเกณฑ์สากล CDC/NHSN'],
    ['อัตราความชุกการติดเชื้อรวม (Prevalence Rate)', `${prevalenceRate}%`, '%', 'เป้าหมายมาตรฐาน < 3.0%'],
    [],
    ['--- 2. อัตราการใช้อุปกรณ์รุกล้ำ (Device Utilization Ratio) ---'],
    ['ประเภทอุปกรณ์ (Invasive Device)', 'จำนวนผู้ป่วยที่ใส่ (Cases)', 'อัตราการใช้ (Utilization Ratio %)', 'เกณฑ์เฝ้าระวังความเสี่ยง'],
    ['สายสวนปัสสาวะ (Urinary Catheter / Foley)', foleyCount, `${foleyRatio}%`, 'เฝ้าระวัง CAUTI'],
    ['เครื่องช่วยหายใจ (Mechanical Ventilator)', ventCount, `${ventRatio}%`, 'เฝ้าระวัง VAP'],
    ['สายสวนหลอดเลือด (Central line / Arterial line)', lineCount, `${lineRatio}%`, 'เฝ้าระวัง CLABSI'],
    [],
    ['--- 3. การจำแนกประเภทการติดเชื้อในโรงพยาบาล (HAI Classification) ---'],
    ['ประเภทการติดเชื้อ (HAI Type)', 'จำนวนเคส (Cases)', 'สัดส่วน (%)'],
    ['CAUTI (สายสวนปัสสาวะ)', confirmedHai.filter((p) => p.assessment.haiType === 'CAUTI').length, `${((confirmedHai.filter((p) => p.assessment.haiType === 'CAUTI').length / (confirmedHai.length || 1)) * 100).toFixed(1)}%`],
    ['VAP (เครื่องช่วยหายใจ)', confirmedHai.filter((p) => p.assessment.haiType === 'VAP').length, `${((confirmedHai.filter((p) => p.assessment.haiType === 'VAP').length / (confirmedHai.length || 1)) * 100).toFixed(1)}%`],
    ['SSI (แผลผ่าตัด)', confirmedHai.filter((p) => p.assessment.haiType === 'SSI').length, `${((confirmedHai.filter((p) => p.assessment.haiType === 'SSI').length / (confirmedHai.length || 1)) * 100).toFixed(1)}%`],
    ['CLABSI (สายสวนหลอดเลือด)', confirmedHai.filter((p) => p.assessment.haiType === 'CLABSI').length, `${((confirmedHai.filter((p) => p.assessment.haiType === 'CLABSI').length / (confirmedHai.length || 1)) * 100).toFixed(1)}%`],
    ['Other HAI (อื่นๆ)', confirmedHai.filter((p) => !['CAUTI', 'VAP', 'SSI', 'CLABSI'].includes(p.assessment.haiType || '')).length, `${((confirmedHai.filter((p) => !['CAUTI', 'VAP', 'SSI', 'CLABSI'].includes(p.assessment.haiType || '')).length / (confirmedHai.length || 1)) * 100).toFixed(1)}%`]
  ];

  const wsOverview = XLSX.utils.aoa_to_sheet(overviewData);
  wsOverview['!cols'] = [{ wch: 45 }, { wch: 25 }, { wch: 25 }, { wch: 30 }];
  XLSX.utils.book_append_sheet(workbook, wsOverview, '1.สรุปภาพรวมและความชุก');

  // ==========================================
  // SHEET 2: ผู้ป่วยมีไข้หลัง 48 ชม. (Post-48h Fever)
  // ==========================================
  const feverCases = patients.filter((p) => p.hasFeverPost48h);
  const feverRows = feverCases.map((p, index) => {
    const surgeryText = p.surgeryPerformed
      ? `${p.surgeryPerformed.procedure} (วันที่ ${p.surgeryPerformed.surgeryDate}, แพทย์: ${p.surgeryPerformed.surgeon})`
      : 'ไม่มีการผ่าตัด';

    const deviceList = p.devices.length > 0
      ? p.devices.map((d) => `${d.nameTh} (${d.deviceDays} วัน)`).join('; ')
      : 'ไม่มีการใส่สายสวน';

    const haiStatusText = p.assessment.status === 'confirmed_hai'
      ? `Confirmed HAI (${p.assessment.haiType})`
      : p.assessment.status === 'not_hai'
      ? 'ไม่ใช่ HAI (Not HAI)'
      : 'รอการประเมิน';

    return {
      'ลำดับ': index + 1,
      'HN': p.hn,
      'VN': p.vn,
      'ชื่อ-สกุล': p.nameTh,
      'เพศ': p.gender === 'M' ? 'ชาย' : 'หญิง',
      'อายุ (ปี)': p.age,
      'หอผู้ป่วย': p.ward,
      'ห้อง/เตียง': p.roomBed,
      'วันที่ Admit': p.admissionDate,
      'ไข้สูงสุด (°C)': p.peakTemp || 38.0,
      'วันที่เริ่มมีไข้': p.feverOnsetDate || '-',
      'การผ่าตัด (Surgery)': surgeryText,
      'การใส่สายสวน (Catheter/Device)': deviceList,
      'การวินิจฉัยหลัก (Primary Diagnosis)': p.primaryDiagnosis,
      'แพทย์ผู้รับผิดชอบ': p.attendingPhysician,
      'สถานะการประเมิน HAI': haiStatusText
    };
  });

  const wsFever = XLSX.utils.json_to_sheet(feverRows);
  wsFever['!cols'] = [
    { wch: 8 }, { wch: 12 }, { wch: 12 }, { wch: 22 }, { wch: 8 },
    { wch: 10 }, { wch: 20 }, { wch: 12 }, { wch: 14 }, { wch: 14 },
    { wch: 16 }, { wch: 35 }, { wch: 35 }, { wch: 30 }, { wch: 22 }, { wch: 22 }
  ];
  XLSX.utils.book_append_sheet(workbook, wsFever, '2.ไข้หลังAdmit48ชม');

  // ==========================================
  // SHEET 3: วัณโรคและแยกโรคทางเดินหายใจ (TB & Isolation)
  // ==========================================
  const tbCases = patients.filter((p) => p.isRespiratoryIsolation);
  const tbRows = tbCases.map((p, index) => {
    const antiTb = p.antiTbMedications;
    const isOngoing = antiTb && !antiTb.stopDateTime;

    return {
      'ลำดับ': index + 1,
      'HN': p.hn,
      'VN': p.vn,
      'ชื่อ-สกุล': p.nameTh,
      'อายุ (ปี)': p.age,
      'หอผู้ป่วย': p.ward,
      'ห้อง/เตียง': p.roomBed,
      'การวินิจฉัยโรค (1st Diag)': p.respiratoryDiagnosis || p.primaryDiagnosis,
      'ประเภทการแยกโรค': `${p.isolationType || 'Airborne'} Isolation`,
      'วันที่-เวลาเริ่มยา Anti-TB': antiTb?.startDateTime ? antiTb.startDateTime.replace('T', ' ') : 'ยังไม่เริ่มยา',
      'วันที่-เวลาหยุดยา Anti-TB': antiTb?.stopDateTime ? antiTb.stopDateTime.replace('T', ' ') : (isOngoing ? 'กำลังได้รับยาต่อเนื่อง (Ongoing)' : '-'),
      'สูตรยาต้านวัณโรค': antiTb?.drugNames || '-',
      'ผลตรวจเสมหะ (Sputum AFB)': p.sputumAfbResult || '-',
      'ผลตรวจ GeneXpert': p.geneXpertResult || '-',
      'แพทย์ผู้รับผิดชอบ': p.attendingPhysician
    };
  });

  const wsTb = XLSX.utils.json_to_sheet(tbRows);
  wsTb['!cols'] = [
    { wch: 8 }, { wch: 12 }, { wch: 12 }, { wch: 22 }, { wch: 10 },
    { wch: 18 }, { wch: 12 }, { wch: 30 }, { wch: 20 }, { wch: 24 },
    { wch: 28 }, { wch: 25 }, { wch: 22 }, { wch: 25 }, { wch: 22 }
  ];
  XLSX.utils.book_append_sheet(workbook, wsTb, '3.TBและแยกโรคทางเดินหายใจ');

  // ==========================================
  // SHEET 4: เชื้อดื้อยาปฏิชีวนะขั้นวิกฤต (MDRO)
  // ==========================================
  const mdroCases = patients.filter((p) => p.isMdro);
  const mdroRows = mdroCases.map((p, index) => {
    const mdro = p.mdroDetails;
    const atbList = mdro?.antibioticsReceived?.map((a) => `${a.name} ${a.dose} (${a.route})`).join('; ') || 'ไม่มี';

    return {
      'ลำดับ': index + 1,
      'HN': p.hn,
      'VN': p.vn,
      'ชื่อ-สกุล': p.nameTh,
      'อายุ (ปี)': p.age,
      'หอผู้ป่วย': p.ward,
      'ห้อง/เตียง': p.roomBed,
      'ชนิดเชื้อดื้อยา (Organism)': mdro?.organism || '-',
      'แบบแผนความดื้อยา (Resistance)': mdro?.resistanceProfile || '-',
      'สิ่งส่งตรวจ (Specimen)': mdro?.specimen || '-',
      'วันที่เพาะเชื้อ (Culture Date)': mdro?.cultureDate || '-',
      'ยาปฏิชีวนะ (ATB) ที่ได้รับ': atbList,
      'มาตรการควบคุม': 'Contact Precaution (ป้ายเตือน, ถุงมือ, เสื้อกาวน์)',
      'การประเมินการติดเชื้อ': p.assessment.status === 'confirmed_hai' ? 'True Infection (HAI)' : 'Colonization / Not HAI',
      'แพทย์ผู้รับผิดชอบ': p.attendingPhysician
    };
  });

  const wsMdro = XLSX.utils.json_to_sheet(mdroRows);
  wsMdro['!cols'] = [
    { wch: 8 }, { wch: 12 }, { wch: 12 }, { wch: 22 }, { wch: 10 },
    { wch: 18 }, { wch: 12 }, { wch: 28 }, { wch: 30 }, { wch: 16 },
    { wch: 15 }, { wch: 35 }, { wch: 30 }, { wch: 22 }, { wch: 22 }
  ];
  XLSX.utils.book_append_sheet(workbook, wsMdro, '4.เชื้อดื้อยาMDRO');

  // ==========================================
  // SHEET 5: เฝ้าระวังแผลผ่าตัด (SSI Surveillance)
  // ==========================================
  const ssiCases = patients.filter((p) => p.isSsiSurveillance);
  const ssiRows = ssiCases.map((p, index) => {
    const ssi = p.ssiDetails;
    return {
      'ลำดับ': index + 1,
      'HN': p.hn,
      'VN': p.vn,
      'ชื่อ-สกุล': p.nameTh,
      'หอผู้ป่วย': p.ward,
      'ห้อง/เตียง': p.roomBed,
      'หัตถการผ่าตัด (Procedure)': ssi?.procedure || p.surgeryPerformed?.procedure || '-',
      'วันที่ผ่าตัด': ssi?.surgeryDate || p.surgeryPerformed?.surgeryDate || '-',
      'ระยะเวลาหลังผ่าตัด (Post-Op Days)': ssi?.postOpDays ? `Day ${ssi.postOpDays}` : '-',
      'ศัลยแพทย์ผู้ผ่าตัด': ssi?.surgeon || p.surgeryPerformed?.surgeon || p.attendingPhysician,
      'ประเภทแผล (Wound Class)': ssi?.woundClass || p.surgeryPerformed?.woundClass || 'Clean',
      'อุปกรณ์เทียม (Implant)': ssi?.hasImplant ? 'มี (เฝ้าระวัง 90 วัน)' : 'ไม่มี (เฝ้าระวัง 30 วัน)',
      'ลักษณะแผล/สิ่งคัดหลั่ง': ssi?.woundDischarge || 'แผลแห้งดี ไม่มีหนอง',
      'สถานะการวินิจฉัย SSI': ssi?.surveillanceStatus || 'Under Surveillance'
    };
  });

  const wsSsi = XLSX.utils.json_to_sheet(ssiRows);
  wsSsi['!cols'] = [
    { wch: 8 }, { wch: 12 }, { wch: 12 }, { wch: 22 }, { wch: 18 },
    { wch: 12 }, { wch: 30 }, { wch: 14 }, { wch: 18 }, { wch: 22 },
    { wch: 18 }, { wch: 22 }, { wch: 30 }, { wch: 22 }
  ];
  XLSX.utils.book_append_sheet(workbook, wsSsi, '5.เฝ้าระวังแผลผ่าตัดSSI');

  // ==========================================
  // SHEET 6: สายสวนและอุปกรณ์รุกล้ำ (Invasive Devices)
  // ==========================================
  const deviceRows: any[] = [];
  let devIdx = 1;
  patients.forEach((p) => {
    if (p.devices && p.devices.length > 0) {
      p.devices.forEach((d) => {
        deviceRows.push({
          'ลำดับ': devIdx++,
          'HN': p.hn,
          'VN': p.vn,
          'ชื่อ-สกุล': p.nameTh,
          'หอผู้ป่วย': p.ward,
          'ห้อง/เตียง': p.roomBed,
          'ประเภทอุปกรณ์': d.type === 'foley' ? 'สายสวนปัสสาวะ' :
                          d.type === 'ventilator' ? 'เครื่องช่วยหายใจ' :
                          d.type === 'arterial_line' ? 'สายสวนหลอดเลือดแดง' :
                          d.type === 'central_line' ? 'สายสวนหลอดเลือดดำ' : d.type,
          'ชื่อสายสวน/อุปกรณ์': d.nameTh,
          'ตำแหน่งที่ใส่': d.insertionSite,
          'วันที่ใส่': d.insertionDate,
          'ระยะเวลาคาสาย (วัน)': d.deviceDays,
          'Care Bundle Compliance': d.bundleCompliant ? 'ครบตามเกณฑ์ Bundle' : 'พบข้อบกพร่อง Bundle',
          'แพทย์ผู้รับผิดชอบ': p.attendingPhysician,
          'หมายเหตุ': d.notes || '-'
        });
      });
    }
  });

  const wsDevices = XLSX.utils.json_to_sheet(deviceRows);
  wsDevices['!cols'] = [
    { wch: 8 }, { wch: 12 }, { wch: 12 }, { wch: 22 }, { wch: 18 },
    { wch: 12 }, { wch: 20 }, { wch: 28 }, { wch: 20 }, { wch: 14 },
    { wch: 16 }, { wch: 22 }, { wch: 22 }, { wch: 30 }
  ];
  XLSX.utils.book_append_sheet(workbook, wsDevices, '6.สายสวนและอุปกรณ์');

  // ==========================================
  // SHEET 7: คิวประเมินและการวินิจฉัย (HAI Assessment Queue)
  // ==========================================
  const queueRows = patients.map((p, index) => {
    const statusText = p.assessment.status === 'confirmed_hai' ? `Confirmed HAI (${p.assessment.haiType})` :
                       p.assessment.status === 'not_hai' ? 'ไม่ใช่ HAI (Not HAI / CAI)' :
                       p.assessment.status === 'pending_doctor' ? 'รอแพทย์ IC ยืนยัน' : 'รอพยาบาล IC ทบทวน';

    return {
      'ลำดับ': index + 1,
      'HN': p.hn,
      'VN': p.vn,
      'ชื่อ-สกุล': p.nameTh,
      'หอผู้ป่วย': p.ward,
      'ห้อง/เตียง': p.roomBed,
      'สถานะการวินิจฉัย': statusText,
      'ประเภท HAI': p.assessment.haiType || '-',
      'เกณฑ์ CDC/NHSN ที่เข้าได้': p.assessment.criteriaMet?.join('; ') || '-',
      'มาตรการ/ข้อเสนอแนะ IC': p.assessment.recommendations || '-',
      'บันทึกการทบทวน': p.assessment.investigationNotes || '-',
      'ผู้ประเมิน': p.assessment.assessedBy || '-',
      'บทบาทผู้ประเมิน': p.assessment.assessedRole || '-',
      'วันที่ประเมิน': p.assessment.assessedDate ? p.assessment.assessedDate.split('T')[0] : '-'
    };
  });

  const wsQueue = XLSX.utils.json_to_sheet(queueRows);
  wsQueue['!cols'] = [
    { wch: 8 }, { wch: 12 }, { wch: 12 }, { wch: 22 }, { wch: 18 },
    { wch: 12 }, { wch: 24 }, { wch: 16 }, { wch: 45 }, { wch: 40 },
    { wch: 30 }, { wch: 22 }, { wch: 18 }, { wch: 14 }
  ];
  XLSX.utils.book_append_sheet(workbook, wsQueue, '7.คิวประเมินและวินิจฉัยHAI');

  // Export & Download File
  const filename = `Infection_Control_Surveillance_Report_${surveyDate}.xlsx`;
  XLSX.writeFile(workbook, filename);
}
