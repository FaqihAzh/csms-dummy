"use client"

import { Badge, Button, Table, Typography } from "@/components";
import { ColumnDef } from "@tanstack/react-table";
import { CheckCircle, Circle, Download, Pen, Plus } from "lucide-react";

export default function DashboardPage() {
    interface User {
        id: string;
        kegiatan: string;
        potensi_bahaya: string;
        dampak_resiko: string;
        konsekuensi: string;
        kemungkinan: string;
        level_resiko: "rendah" | "moderat" | "tinggi" | "ekstrem";
        verifikasi: boolean;
        unit: string;
    }

    const users: User[] = [
        { 
            id: "1",
            kegiatan: "Aktivitas Produksi",
            potensi_bahaya: "Tertimpa",
            dampak_resiko: "Kebisingan Mesin",
            konsekuensi: "Admin",
            kemungkinan: "Sedang",
            level_resiko: "tinggi",
            verifikasi: true,
            unit: "Unit Pengembangan"
        },
        { 
            id: "2",
            kegiatan: "Pemeliharaan Mesin",
            potensi_bahaya: "Tersengat Listrik",
            dampak_resiko: "Luka Bakar",
            konsekuensi: "Kritis",
            kemungkinan: "Ekstrem",
            level_resiko: "ekstrem",
            verifikasi: false,
            unit: "Unit Operasional"
        },
        { 
            id: "3",
            kegiatan: "Handling Material",
            potensi_bahaya: "Terjatuh",
            dampak_resiko: "Fraktur",
            konsekuensi: "Serius",
            kemungkinan: "Ekstrem",
            level_resiko: "moderat",
            verifikasi: true,
            unit: "Unit Logistik"
        },
        { 
            id: "4",
            kegiatan: "Inspeksi Area",
            potensi_bahaya: "Terpeleset",
            dampak_resiko: "Memar",
            konsekuensi: "Minor",
            kemungkinan: "Rendah",
            level_resiko: "rendah",
            verifikasi: true,
            unit: "Unit Keselamatan"
        },
        { 
            id: "1",
            kegiatan: "Aktivitas Produksi",
            potensi_bahaya: "Tertimpa",
            dampak_resiko: "Kebisingan Mesin",
            konsekuensi: "Admin",
            kemungkinan: "Sedang",
            level_resiko: "tinggi",
            verifikasi: true,
            unit: "Unit Pengembangan"
        },
        { 
            id: "2",
            kegiatan: "Pemeliharaan Mesin",
            potensi_bahaya: "Tersengat Listrik",
            dampak_resiko: "Luka Bakar",
            konsekuensi: "Kritis",
            kemungkinan: "Ekstrem",
            level_resiko: "ekstrem",
            verifikasi: false,
            unit: "Unit Operasional"
        },
        { 
            id: "3",
            kegiatan: "Handling Material",
            potensi_bahaya: "Terjatuh",
            dampak_resiko: "Fraktur",
            konsekuensi: "Serius",
            kemungkinan: "Ekstrem",
            level_resiko: "moderat",
            verifikasi: true,
            unit: "Unit Logistik"
        },
        { 
            id: "4",
            kegiatan: "Inspeksi Area",
            potensi_bahaya: "Terpeleset",
            dampak_resiko: "Memar",
            konsekuensi: "Minor",
            kemungkinan: "Rendah",
            level_resiko: "rendah",
            verifikasi: true,
            unit: "Unit Keselamatan"
        },
        { 
            id: "1",
            kegiatan: "Aktivitas Produksi",
            potensi_bahaya: "Tertimpa",
            dampak_resiko: "Kebisingan Mesin",
            konsekuensi: "Admin",
            kemungkinan: "Sedang",
            level_resiko: "tinggi",
            verifikasi: true,
            unit: "Unit Pengembangan"
        },
        { 
            id: "2",
            kegiatan: "Pemeliharaan Mesin",
            potensi_bahaya: "Tersengat Listrik",
            dampak_resiko: "Luka Bakar",
            konsekuensi: "Kritis",
            kemungkinan: "Ekstrem",
            level_resiko: "ekstrem",
            verifikasi: false,
            unit: "Unit Operasional"
        },
        { 
            id: "3",
            kegiatan: "Handling Material",
            potensi_bahaya: "Terjatuh",
            dampak_resiko: "Fraktur",
            konsekuensi: "Serius",
            kemungkinan: "Ekstrem",
            level_resiko: "moderat",
            verifikasi: true,
            unit: "Unit Logistik"
        },
        { 
            id: "4",
            kegiatan: "Inspeksi Area",
            potensi_bahaya: "Terpeleset",
            dampak_resiko: "Memar",
            konsekuensi: "Minor",
            kemungkinan: "Rendah",
            level_resiko: "rendah",
            verifikasi: true,
            unit: "Unit Keselamatan"
        },
    ];

    const getLevelVariant = ( variant: string) => {
        switch (variant) {
          case 'rendah':
              return "success"
          case 'ekstrem':
              return "extreme"
          case 'tinggi':
              return "destructive"
          default:
              return "default"
        }
    }

    const userColumns: ColumnDef<User>[] = [
        {
            accessorKey: "kegiatan",
            header: "Kegiatan",
            size: 300,
        },
        {
            accessorKey: "potensi_bahaya",
            header: "Potensi Bahaya",
            size: 140,
        },
        {
            accessorKey: "dampak_resiko",
            header: "Dampak Resiko",
            size: 140,
        },
        {
            accessorKey: "konsekuensi",
            header: "Konsekuensi",
            size: 120,
        },
        {
            accessorKey: "kemungkinan",
            header: "Kemungkinan",
            size: 120,
        },
        {
            accessorKey: "level_resiko",
            header: "Level Resiko",
            size: 120,
            cell: ({ row }) => (
                <Badge variant={getLevelVariant(row.original.level_resiko)}>
                    {row.original.level_resiko}
                </Badge>
            ),
        },
        {
            accessorKey: "verifikasi",
            header: "Verifikasi",
            size: 100,
            cell: ({ row }) => (
                <div className="items-center">
                    {row.original.verifikasi === true ? (
                        <CheckCircle className="text-success size-4"/>
                    ) : (
                        <Circle className="text-text-secondary size-4"/>
                    )}
                </div>
            ),
        },
        {
            accessorKey: "unit",
            header: "Unit",
            size: 150,
        },
        {
            accessorKey: "action",
            header: "Aksi",
            size: 80,
            cell: ({ row }) => (
                <Button variant="ghost">
                    <Pen className="size-4"/>
                </Button>
            )
        },
    ];


    return (
        <div className="w-full">
            <div className="flex flex-col space-y-4">
                <div className="flex justify-between items-start bg-white p-4 md:p-8">
                    <div className="flex flex-col gap-1">
                        <Typography variant="h3">Risk Assessment</Typography>
                        <p>Manajemen dan evaluasi risiko kegiatan kontraktor</p>
                    </div>
                    <div className="flex flex-row items-center md:flex-col md:items-start my-auto gap-3">
                        <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
                            Export
                        </Button>
                        <Button leftIcon={<Plus className="h-4 w-4" />}>
                            Tambah Risk Assessment
                        </Button>
                    </div>
                </div>

                <div className="px-4 pb-4 w-full">
                    <Table 
                        data={users}
                        columns={userColumns}
                        enablePagination={true}
                        pageSize={8}
                        className="bg-background"
                    />
                </div>
            </div>
        </div>
    );
}
