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
import { pengulanganOptions } from "@/app/data/mock-data";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const schema = z.object({
  judul: z.string().min(1, "Judul wajib diisi"),
  pesan: z.string().min(1, "Pesan wajib diisi"),
  waktu: z.string().min(1, "Waktu wajib diisi"),
  pengulangan: z.string().min(1, "Pengulangan wajib dipilih"),
});

type FormData = z.infer<typeof schema>;

export default function TambahPengingatPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Pengingat baru:", data);
    alert("Pengingat berhasil ditambahkan!");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/pengingat">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Tambah Pengingat</h1>
          <p className="text-muted-foreground">Buat pengingat baru</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Form Pengingat</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="judul">Judul</Label>
              <Input
                id="judul"
                {...register("judul")}
                placeholder="Judul pengingat"
              />
              {errors.judul && (
                <p className="text-sm text-destructive">
                  {errors.judul.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pesan">Pesan</Label>
              <Textarea
                id="pesan"
                {...register("pesan")}
                placeholder="Pesan pengingat"
              />
              {errors.pesan && (
                <p className="text-sm text-destructive">
                  {errors.pesan.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="waktu">Waktu Pengingat</Label>
              <Input id="waktu" type="datetime-local" {...register("waktu")} />
              {errors.waktu && (
                <p className="text-sm text-destructive">
                  {errors.waktu.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Pengulangan</Label>
              <Select onValueChange={(v) => setValue("pengulangan", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih pengulangan" />
                </SelectTrigger>
                <SelectContent>
                  {pengulanganOptions.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.pengulangan && (
                <p className="text-sm text-destructive">
                  {errors.pengulangan.message}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit">Simpan Pengingat</Button>
              <Button asChild variant="outline">
                <Link href="/pengingat">Batal</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
