"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Plus, Search, Calendar, Clock, Pencil } from "lucide-react";
import { jadwal } from "@/app/data/mock-data";
import Link from "next/link";

export default function JadwalPage() {
  const [search, setSearch] = useState("");

  const filtered = jadwal.filter(
    (j) =>
      j.judul.toLowerCase().includes(search.toLowerCase()) ||
      j.kategori.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Jadwal</h1>
          <p className="text-muted-foreground">Kelola jadwal kegiatan Anda</p>
        </div>
        <Button asChild>
          <Link href="/sketsa/jadwal/tambah">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Jadwal
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari jadwal..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{item.judul}</CardTitle>
                <Badge
                  variant={
                    item.status === "completed" ? "secondary" : "default"
                  }
                >
                  {item.status === "completed"
                    ? "Selesai"
                    : item.status === "ongoing"
                    ? "Berlangsung"
                    : "Mendatang"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{item.deskripsi}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{item.tanggal}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>
                    {item.waktuMulai} - {item.waktuSelesai}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{item.kategori}</Badge>
                <Button asChild size="sm" variant="ghost">
                  <Link href={`/sketsa/jadwal/edit/${item.id}`}>
                    <Pencil className="mr-1 h-3 w-3" />
                    Edit
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Tidak ada jadwal ditemukan.
        </div>
      )}
    </div>
  );
}
