import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  AlertTriangle,
  ClipboardCheck,
  Shield,
  Briefcase,
  ListChecks,
} from 'lucide-react';
import { MenuItemProps } from '@/components';

export const getSidebarMenuItems = (currentPage: string, navigate: (page: string) => void): MenuItemProps[] => [
  {
    icon: <LayoutDashboard size={20} />,
    label: 'Dashboard',
    expanded: false,
    children: [
      {
        icon: <></>,
        label: 'Risk Assessment & Prakualifikasi',
        onClick: () => navigate('dashboard-risk'),
        active: currentPage === 'dashboard-risk',
      },
      {
        icon: <></>,
        label: 'Implementasi',
        onClick: () => navigate('dashboard-implementasi'),
        active: currentPage === 'dashboard-implementasi',
      },
      {
        icon: <></>,
        label: 'PJA & WIP',
        onClick: () => navigate('dashboard-pja-wip'),
        active: currentPage === 'dashboard-pja-wip',
      },
      {
        icon: <></>,
        label: 'Final Evaluation',
        onClick: () => navigate('dashboard-final'),
        active: currentPage === 'dashboard-final',
      },
    ],
  },
  {
    icon: <Users size={20} />,
    label: 'Manajemen User',
    expanded: currentPage === 'user',
    children: [
      {
        icon: <></>,
        label: 'User',
        onClick: () => navigate('user'),
        active: currentPage === 'user',
      },
    ],
  },
  {
    icon: <Building2 size={20} />,
    label: 'Daftar Kontraktor',
    onClick: () => navigate('kontraktor'),
    active: currentPage === 'kontraktor',
  },
  {
    icon: <Settings size={20} />,
    label: 'Master CSMS',
    expanded: false,
    children: [
      {
        icon: <></>,
        label: 'Periode',
        onClick: () => navigate('periode'),
        active: currentPage === 'periode',
      },
      {
        icon: <></>,
        label: 'Unit',
        onClick: () => navigate('unit'),
        active: currentPage === 'unit',
      },
      {
        icon: <></>,
        label: 'Soal',
        onClick: () => navigate('soal'),
        active: currentPage === 'soal',
      },
      {
        icon: <></>,
        label: 'KPI',
        onClick: () => navigate('kpi'),
        active: currentPage === 'kpi',
      },
    ],
  },
  {
    icon: <AlertTriangle size={20} />,
    label: 'Risk Assessment',
    onClick: () => navigate('risk-assessment'),
    active: currentPage === 'risk-assessment',
  },
  {
    icon: <ClipboardCheck size={20} />,
    label: 'Prakualifikasi',
    expanded: ['penilaian', 'daftar-final-approve', 'sertifikat'].includes(currentPage),
    children: [
      {
        icon: <></>,
        label: 'Penilaian',
        onClick: () => navigate('penilaian'),
        active: currentPage === 'penilaian',
      },
      {
        icon: <></>,
        label: 'Daftar Final Approve',
        onClick: () => navigate('daftar-final-approve'),
        active: currentPage === 'daftar-final-approve',
      },
      {
        icon: <></>,
        label: 'Sertifikat',
        onClick: () => navigate('sertifikat'),
        active: currentPage === 'sertifikat',
      },
    ],
  },
  {
    icon: <Shield size={20} />,
    label: 'Selection',
    onClick: () => navigate('selection'),
    active: currentPage === 'selection',
  },
  {
    icon: <ClipboardCheck size={20} />,
    label: 'Pre Job Activity',
    expanded: ['evaluasi-hse-plan', 'penilaian-pja'].includes(currentPage),
    children: [
      {
        icon: <></>,
        label: 'Evaluasi HSE Plan dan Target KPI',
        onClick: () => navigate('evaluasi-hse-plan'),
        active: currentPage === 'evaluasi-hse-plan',
      },
      {
        icon: <></>,
        label: 'Penilaian PJA',
        onClick: () => navigate('penilaian-pja'),
        active: currentPage === 'penilaian-pja',
      },
    ],
  },
  {
    icon: <Briefcase size={20} />,
    label: 'WIP',
    onClick: () => navigate('wip'),
    active: currentPage === 'wip',
  },
  {
    icon: <ListChecks size={20} />,
    label: 'Final Evaluation',
    expanded: false,
    children: [
      {
        icon: <></>,
        label: 'Realisasi KPI dan Final Evaluasi',
        onClick: () => navigate('final-realisasi-kpi'),
        active: currentPage === 'final-realisasi-kpi',
      },
      {
        icon: <></>,
        label: 'Pekerjaan Selesai',
        onClick: () => navigate('final-pekerjaan-selesai'),
        active: currentPage === 'final-pekerjaan-selesai',
      },
    ],
  },
];