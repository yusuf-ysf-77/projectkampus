"use client";

import { use } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import { tugas } from "@/app/data/mock-data";
import Link from "next/link";
import { ArrowLeft, Calendar, Folder } from "lucide-react";

const statusConfig = {
  belum: { label: "Belum Dikerjakan", variant: "outline" as const },
  proses: { label: "Dalam Proses", variant: "default" as const },
  selesai: { label: "Selesai", variant: "secondary" as const },
};

const prioritasConfig = {
  tinggi: { label: "Tinggi", variant: "destructive" as const },
  sedang: { label: "Sedang", variant: "default" as const },
  rendah: { label: "Rendah", variant: "secondary" as const },
};

export default function DetailTugasPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const item = tugas.find((t) => t.id === id);

  if (!item) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Tugas tidak ditemukan.</p>
        <Button asChild variant="link">
          <Link href="/sketsa/tugas">Kembali ke daftar tugas</Link>
        </Button>
      </div>
    );
  }

  const updateStatus = (newStatus: "belum" | "proses" | "selesai") => {
    console.log(`Update tugas ${id} status ke: ${newStatus}`);
    alert(`Status tugas berhasil diubah ke: ${statusConfig[newStatus].label}`);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/sketsa/tugas">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{item.judul}</h1>
          <p className="text-muted-foreground">Detail tugas</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle>{item.judul}</CardTitle>
            <div className="flex gap-2">
              <Badge variant={statusConfig[item.status].variant}>
                {statusConfig[item.status].label}
              </Badge>
              <Badge variant={prioritasConfig[item.prioritas].variant}>
                {prioritasConfig[item.prioritas].label}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Deskripsi
            </h3>
            <p className="text-sm">{item.deskripsi}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Deadline</p>
                <p className="text-sm font-medium">{item.deadline}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Folder className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Kategori</p>
                <p className="text-sm font-medium">{item.kategori}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium mb-3">Update Status</h3>
            <div className="flex gap-2">
              {(["belum", "proses", "selesai"] as const).map((status) => (
                <Button
                  key={status}
                  variant={item.status === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => updateStatus(status)}
                  disabled={item.status === status}
                >
                  {statusConfig[status].label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
