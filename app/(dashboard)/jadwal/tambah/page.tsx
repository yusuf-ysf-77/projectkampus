"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { kategoriJadwal } from "@/app/data/mock-data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const schema = z.object({
  judul: z.string().min(1, "Judul wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
  tanggal: z.string().min(1, "Tanggal wajib diisi"),
  waktuMulai: z.string().min(1, "Waktu mulai wajib diisi"),
  waktuSelesai: z.string().min(1, "Waktu selesai wajib diisi"),
  kategori: z.string().min(1, "Kategori wajib dipilih"),
});

type FormData = z.infer<typeof schema>;

export default function TambahJadwalPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Jadwal baru:", data);
    alert("Jadwal berhasil ditambahkan!");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/jadwal">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Tambah Jadwal</h1>
          <p className="text-muted-foreground">Buat jadwal kegiatan baru</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Form Jadwal</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="judul">Judul</Label>
              <Input id="judul" {...register("judul")} placeholder="Judul jadwal" />
              {errors.judul && (
                <p className="text-sm text-destructive">{errors.judul.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                {...register("deskripsi")}
                placeholder="Deskripsi jadwal"
              />
              {errors.deskripsi && (
                <p className="text-sm text-destructive">
                  {errors.deskripsi.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tanggal">Tanggal</Label>
              <Input id="tanggal" type="date" {...register("tanggal")} />
              {errors.tanggal && (
                <p className="text-sm text-destructive">
                  {errors.tanggal.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="waktuMulai">Waktu Mulai</Label>
                <Input
                  id="waktuMulai"
                  type="time"
                  {...register("waktuMulai")}
                />
                {errors.waktuMulai && (
                  <p className="text-sm text-destructive">
                    {errors.waktuMulai.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="waktuSelesai">Waktu Selesai</Label>
                <Input
                  id="waktuSelesai"
                  type="time"
                  {...register("waktuSelesai")}
                />
                {errors.waktuSelesai && (
                  <p className="text-sm text-destructive">
                    {errors.waktuSelesai.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Kategori</Label>
              <Select onValueChange={(v) => setValue("kategori", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {kategoriJadwal.map((k) => (
                    <SelectItem key={k} value={k}>
                      {k}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.kategori && (
                <p className="text-sm text-destructive">
                  {errors.kategori.message}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit">Simpan Jadwal</Button>
              <Button asChild variant="outline">
                <Link href="/jadwal">Batal</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
