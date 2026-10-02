import React, { useState, useMemo } from 'react';
import { INITIAL_PATIENTS } from './mockData';
import { Patient, FilterState, HaiStatus } from './types';

// Components
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { KpiSummaryCards } from './components/KpiSummaryCards';
import { TabNavigation } from './components/TabNavigation';
import { OverviewView } from './components/OverviewView';
import { FeverSurveillanceView } from './components/FeverSurveillanceView';
import { TbIsolationView } from './components/TbIsolationView';
import { MdroSurveillanceView } from './components/MdroSurveillanceView';
import { SsiSurveillanceView } from './components/SsiSurveillanceView';
import { DeviceSurveillanceView } from './components/DeviceSurveillanceView';
import { AssessmentQueueView } from './components/AssessmentQueueView';

// Modals
import { PatientDetailModal } from './components/PatientDetailModal';
import { AssessmentModal } from './components/AssessmentModal';
import { PrevalenceSurveyModal } from './components/PrevalenceSurveyModal';
import { GuidelinesModal } from './components/GuidelinesModal';
import { ExcelExportModal } from './components/ExcelExportModal';

export default function App() {
  // Master Patient State
  const [patients, setPatients] = useState<Patient[]>(INITIAL_PATIENTS);

  // Active Surveillance Tab
  const [activeTab, setActiveTab] = useState<string>('overview');

  // User Role Switcher: IC Nurse vs IC Physician
  const [currentUserRole, setCurrentUserRole] = useState<'IC Nurse' | 'IC Physician'>('IC Nurse');

  // Modals & Selected Patient
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [assessmentPatient, setAssessmentPatient] = useState<Patient | null>(null);
  const [isPrevalenceModalOpen, setIsPrevalenceModalOpen] = useState<boolean>(false);
  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState<boolean>(false);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState<boolean>(false);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    ward: '',
    doctor: '',
    startDate: '',
    endDate: '',
    haiStatus: '',
    patientType: '',
    searchQuery: ''
  });

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      ward: '',
      doctor: '',
      startDate: '',
      endDate: '',
      haiStatus: '',
      patientType: '',
      searchQuery: ''
    });
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Filter Logic
  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      // Search query (HN, VN, Name, Diagnosis)
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase();
        const matchesHn = patient.hn.toLowerCase().includes(query);
        const matchesVn = patient.vn.toLowerCase().includes(query);
        const matchesNameTh = patient.nameTh.toLowerCase().includes(query);
        const matchesNameEn = patient.nameEn.toLowerCase().includes(query);
        const matchesDiag = patient.primaryDiagnosis.toLowerCase().includes(query);

        if (!matchesHn && !matchesVn && !matchesNameTh && !matchesNameEn && !matchesDiag) {
          return false;
        }
      }

      // Ward filter
      if (filters.ward !== '' && !patient.ward.includes(filters.ward)) {
        return false;
      }

      // Doctor filter
      if (filters.doctor !== '' && patient.attendingPhysician !== filters.doctor) {
        return false;
      }

      // HAI Status filter
      if (filters.haiStatus !== '') {
        if (filters.haiStatus === 'overdue') {
          const isPending =
            patient.assessment.status === 'pending_nurse' ||
            patient.assessment.status === 'pending_doctor';
          if (!isPending) return false;
        } else if (patient.assessment.status !== filters.haiStatus) {
          return false;
        }
      }

      // Patient Type (OPD vs IPD)
      if (filters.patientType !== '' && patient.patientType !== filters.patientType) {
        return false;
      }

      // Date filtering (Admission Date)
      if (filters.startDate !== '') {
        const admitTime = new Date(patient.admissionDate).getTime();
        const startTime = new Date(filters.startDate).getTime();
        if (admitTime < startTime) return false;
      }

      if (filters.endDate !== '') {
        const admitTime = new Date(patient.admissionDate).getTime();
        const endTime = new Date(filters.endDate + 'T23:59:59').getTime();
        if (admitTime > endTime) return false;
      }

      return true;
    });
  }, [patients, filters]);

  // Quick Assess from Table
  const handleQuickAssess = (patientId: string, status: HaiStatus, haiType: any = 'Other HAI') => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === patientId) {
          return {
            ...p,
            assessment: {
              ...p.assessment,
              status,
              haiType: status === 'confirmed_hai' ? haiType : 'None',
              assessedBy: currentUserRole === 'IC Nurse' ? 'พว.อุษา นิยมรัตน์ (ICN)' : 'นพ.สมชาย เกียรติสกุล (IC Physician)',
              assessedRole: currentUserRole,
              assessmentDate: new Date().toISOString()
            }
          };
        }
        return p;
      })
    );

    const targetPatient = patients.find((p) => p.id === patientId);
    showToast(
      status === 'confirmed_hai'
        ? `ยืนยันการติดเชื้อใน รพ. (Confirmed HAI: ${haiType}) สำหรับ HN ${targetPatient?.hn || patientId}`
        : `บันทึกสถานะ ไม่ใช่ HAI (Not HAI) สำหรับ HN ${targetPatient?.hn || patientId}`
    );
  };

  // Full Assessment Form Save
  const handleSaveAssessment = (
    patientId: string,
    assessmentData: {
      status: HaiStatus;
      haiType?: any;
      assessedBy: string;
      assessedRole: 'IC Nurse' | 'IC Physician';
      criteriaMet: string[];
      recommendations: string;
      investigationNotes: string;
    }
  ) => {
    setPatients((prev) =>
      prev.map((p) => {
        if (p.id === patientId) {
          return {
            ...p,
            assessment: {
              ...p.assessment,
              status: assessmentData.status,
              haiType: assessmentData.status === 'confirmed_hai' ? assessmentData.haiType : 'None',
              assessedBy: assessmentData.assessedBy,
              assessedRole: assessmentData.assessedRole,
              assessmentDate: new Date().toISOString(),
              criteriaMet: assessmentData.criteriaMet,
              recommendations: assessmentData.recommendations,
              investigationNotes: assessmentData.investigationNotes
            }
          };
        }
        return p;
      })
    );

    const targetPatient = patients.find((p) => p.id === patientId);
    showToast(
      `บันทึกผลการประเมินเวชระเบียน HN ${targetPatient?.hn} สำเร็จ (${assessmentData.status})`
    );
  };

  // Export Summary Action
  const handleExportReport = () => {
    setIsExcelModalOpen(true);
  };

  // Download Single HTML Bundle
  const handleDownloadSingleHtml = async () => {
    try {
      showToast('กำลังดาวน์โหลดไฟล์ HTML เดี่ยว (Single-File Bundle)...');
      const response = await fetch('/api/download-single-html');
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Infection_Control_Dashboard_SingleFile.html';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        showToast('ดาวน์โหลดไฟล์ HTML เดี่ยวสำเร็จ! สามารถเปิดดูแบบ Offline ได้ทันที');
      } else {
        // Fallback to static asset if available
        const a = document.createElement('a');
        a.href = '/Infection_Control_Dashboard_SingleFile.html';
        a.download = 'Infection_Control_Dashboard_SingleFile.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        showToast('ดาวน์โหลดไฟล์ HTML เดี่ยวสำเร็จ!');
      }
    } catch {
      window.location.href = '/api/download-single-html';
    }
  };

  // Total pending alerts
  const totalPendingAlerts = patients.filter(
    (p) => p.assessment.status === 'pending_nurse' || p.assessment.status === 'pending_doctor'
  ).length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans antialiased text-slate-800">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom-5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <span className="text-xs font-medium">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white text-xs ml-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Header */}
      <Header
        currentUserRole={currentUserRole}
        onRoleChange={setCurrentUserRole}
        onOpenPrevalenceSurvey={() => setIsPrevalenceModalOpen(true)}
        onOpenGuidelines={() => setIsGuidelinesModalOpen(true)}
        onExportReport={handleExportReport}
        onDownloadSingleHtml={handleDownloadSingleHtml}
        totalAlerts={totalPendingAlerts}
      />

      {/* Dashboard Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
        
        {/* Filter Bar */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalFilteredCount={filteredPatients.length}
          totalPatientsCount={patients.length}
        />

        {/* KPI Summary Cards */}
        <KpiSummaryCards
          filteredPatients={filteredPatients}
          allPatients={patients}
          onSelectTab={(tabId) => setActiveTab(tabId)}
          onOpenPrevalenceModal={() => setIsPrevalenceModalOpen(true)}
        />

        {/* Tab Navigation */}
        <TabNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          filteredPatients={filteredPatients}
        />

        {/* Active Tab Surveillance Content */}
        <div className="transition-opacity duration-200">
          {activeTab === 'overview' && (
            <OverviewView
              patients={filteredPatients}
              onSelectPatient={(patient) => setSelectedPatient(patient)}
              onOpenAssessment={(patient) => setAssessmentPatient(patient)}
              onSelectTab={(tabId) => setActiveTab(tabId)}
              onOpenPrevalenceSurvey={() => setIsPrevalenceModalOpen(true)}
              onOpenExcelModal={() => setIsExcelModalOpen(true)}
              onDownloadSingleHtml={handleDownloadSingleHtml}
            />
          )}

          {activeTab === 'fever' && (
            <FeverSurveillanceView
              patients={filteredPatients}
              onSelectPatient={(patient) => setSelectedPatient(patient)}
              onOpenAssessment={(patient) => setAssessmentPatient(patient)}
            />
          )}

          {activeTab === 'tb_respiratory' && (
            <TbIsolationView
              patients={filteredPatients}
              onSelectPatient={(patient) => setSelectedPatient(patient)}
              onOpenAssessment={(patient) => setAssessmentPatient(patient)}
            />
          )}

          {activeTab === 'mdro' && (
            <MdroSurveillanceView
              patients={filteredPatients}
              onSelectPatient={(patient) => setSelectedPatient(patient)}
              onOpenAssessment={(patient) => setAssessmentPatient(patient)}
            />
          )}

          {activeTab === 'ssi' && (
            <SsiSurveillanceView
              patients={filteredPatients}
              onSelectPatient={(patient) => setSelectedPatient(patient)}
              onOpenAssessment={(patient) => setAssessmentPatient(patient)}
            />
          )}

          {activeTab === 'invasive_devices' && (
            <DeviceSurveillanceView
              patients={filteredPatients}
              onSelectPatient={(patient) => setSelectedPatient(patient)}
              onOpenAssessment={(patient) => setAssessmentPatient(patient)}
            />
          )}

          {activeTab === 'assessment_queue' && (
            <AssessmentQueueView
              patients={filteredPatients}
              onSelectPatient={(patient) => setSelectedPatient(patient)}
              onOpenAssessment={(patient) => setAssessmentPatient(patient)}
              onQuickAssess={handleQuickAssess}
              currentUserRole={currentUserRole}
            />
          )}
        </div>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            <strong>Hospital Infection Surveillance & Control Monitoring System (IC Dashboard)</strong> • มาตรฐาน CDC / NHSN Surveillance Criteria
          </div>
          <div>
            งานควบคุมและป้องกันการติดเชื้อในโรงพยาบาล (IC Committee) • เวอร์ชันระบบ 2.4.0
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PatientDetailModal
        patient={selectedPatient}
        isOpen={Boolean(selectedPatient)}
        onClose={() => setSelectedPatient(null)}
        onOpenAssessment={(patient) => {
          setSelectedPatient(null);
          setAssessmentPatient(patient);
        }}
      />

      <AssessmentModal
        patient={assessmentPatient}
        isOpen={Boolean(assessmentPatient)}
        onClose={() => setAssessmentPatient(null)}
        onSaveAssessment={handleSaveAssessment}
        currentUserRole={currentUserRole}
      />

      <PrevalenceSurveyModal
        isOpen={isPrevalenceModalOpen}
        onClose={() => setIsPrevalenceModalOpen(false)}
        patients={patients}
        onOpenExcelModal={() => {
          setIsPrevalenceModalOpen(false);
          setIsExcelModalOpen(true);
        }}
      />

      <GuidelinesModal
        isOpen={isGuidelinesModalOpen}
        onClose={() => setIsGuidelinesModalOpen(false)}
      />

      <ExcelExportModal
        isOpen={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
        patients={patients}
        currentUserRole={currentUserRole}
      />

    </div>
  );
}
