"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Plus, Search } from "lucide-react";
import { tugas } from "@/app/data/mock-data";
import Link from "next/link";

const statusConfig = {
  belum: { label: "Belum", variant: "outline" as const },
  proses: { label: "Proses", variant: "default" as const },
  selesai: { label: "Selesai", variant: "secondary" as const },
};

const prioritasConfig = {
  tinggi: { label: "Tinggi", variant: "destructive" as const },
  sedang: { label: "Sedang", variant: "default" as const },
  rendah: { label: "Rendah", variant: "secondary" as const },
};

export default function TugasPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("semua");

  const filtered = tugas.filter((t) => {
    const matchSearch =
      t.judul.toLowerCase().includes(search.toLowerCase()) ||
      t.kategori.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === "semua" || t.status === activeTab;
    return matchSearch && matchTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tugas</h1>
          <p className="text-muted-foreground">Kelola daftar tugas Anda</p>
        </div>
        <Button asChild>
          <Link href="/tugas/tambah">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Tugas
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari tugas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="semua">Semua</TabsTrigger>
          <TabsTrigger value="belum">Belum</TabsTrigger>
          <TabsTrigger value="proses">Proses</TabsTrigger>
          <TabsTrigger value="selesai">Selesai</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{item.judul}</CardTitle>
                <Badge variant={statusConfig[item.status].variant}>
                  {statusConfig[item.status].label}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{item.deskripsi}</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Deadline:</span>
                <span>{item.deadline}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{item.kategori}</Badge>
                  <Badge variant={prioritasConfig[item.prioritas].variant}>
                    {prioritasConfig[item.prioritas].label}
                  </Badge>
                </div>
                <Button asChild size="sm" variant="ghost">
                  <Link href={`/tugas/${item.id}`}>Detail</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Tidak ada tugas ditemukan.
        </div>
      )}
    </div>
  );
}
