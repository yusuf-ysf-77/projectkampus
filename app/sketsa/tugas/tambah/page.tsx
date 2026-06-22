"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { kategoriTugas } from "@/app/data/mock-data";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const schema = z.object({
  judul: z.string().min(1, "Judul wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
  deadline: z.string().min(1, "Deadline wajib diisi"),
  prioritas: z.string().min(1, "Prioritas wajib dipilih"),
  kategori: z.string().min(1, "Kategori wajib dipilih"),
});

type FormData = z.infer<typeof schema>;

export default function TambahTugasPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Tugas baru:", data);
    alert("Tugas berhasil ditambahkan!");
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
          <h1 className="text-2xl font-bold">Tambah Tugas</h1>
          <p className="text-muted-foreground">Buat tugas baru</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Form Tugas</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="judul">Judul</Label>
              <Input id="judul" {...register("judul")} placeholder="Judul tugas" />
              {errors.judul && (
                <p className="text-sm text-destructive">{errors.judul.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                {...register("deskripsi")}
                placeholder="Deskripsi tugas"
              />
              {errors.deskripsi && (
                <p className="text-sm text-destructive">
                  {errors.deskripsi.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input id="deadline" type="date" {...register("deadline")} />
              {errors.deadline && (
                <p className="text-sm text-destructive">
                  {errors.deadline.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Prioritas</Label>
                <Select onValueChange={(v) => setValue("prioritas", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih prioritas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tinggi">Tinggi</SelectItem>
                    <SelectItem value="sedang">Sedang</SelectItem>
                    <SelectItem value="rendah">Rendah</SelectItem>
                  </SelectContent>
                </Select>
                {errors.prioritas && (
                  <p className="text-sm text-destructive">
                    {errors.prioritas.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Kategori</Label>
                <Select onValueChange={(v) => setValue("kategori", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {kategoriTugas.map((k) => (
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
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit">Simpan Tugas</Button>
              <Button asChild variant="outline">
                <Link href="/sketsa/tugas">Batal</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
