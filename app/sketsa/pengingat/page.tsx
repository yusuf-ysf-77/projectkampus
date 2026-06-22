"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Input } from "@/app/components/ui/input";
import { Switch } from "@/app/components/ui/switch";
import { Plus, Search, Clock, Pencil, Trash2 } from "lucide-react";
import { pengingat } from "@/app/data/mock-data";
import Link from "next/link";

const pengulanganLabel: Record<string, string> = {
  sekali: "Sekali",
  harian: "Harian",
  mingguan: "Mingguan",
  bulanan: "Bulanan",
};

export default function PengingatPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(pengingat);

  const filtered = data.filter(
    (p) =>
      p.judul.toLowerCase().includes(search.toLowerCase()) ||
      p.pesan.toLowerCase().includes(search.toLowerCase())
  );

  const toggleAktif = (id: string) => {
    setData((prev) =>
      prev.map((p) => (p.id === id ? { ...p, aktif: !p.aktif } : p))
    );
  };

  const deletePengingat = (id: string) => {
    if (confirm("Yakin ingin menghapus pengingat ini?")) {
      setData((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Pengingat</h1>
          <p className="text-muted-foreground">Kelola pengingat Anda</p>
        </div>
        <Button asChild>
          <Link href="/sketsa/pengingat/tambah">
            <Plus className="mr-2 h-4 w-4" />
            Tambah Pengingat
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Cari pengingat..."
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
                <Switch
                  checked={item.aktif}
                  onCheckedChange={() => toggleAktif(item.id)}
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{item.pesan}</p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{item.waktu}</span>
                </div>
                <Badge variant="outline">
                  {pengulanganLabel[item.pengulangan]}
                </Badge>
              </div>
              <div className="flex items-center justify-between pt-1">
                <Badge variant={item.aktif ? "default" : "secondary"}>
                  {item.aktif ? "Aktif" : "Nonaktif"}
                </Badge>
                <div className="flex gap-1">
                  <Button asChild size="sm" variant="ghost">
                    <Link href={`/sketsa/pengingat/edit/${item.id}`}>
                      <Pencil className="h-3 w-3" />
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deletePengingat(item.id)}
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Tidak ada pengingat ditemukan.
        </div>
      )}
    </div>
  );
}
