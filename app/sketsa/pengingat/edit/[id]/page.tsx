"use client";

import { use } from "react";
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
import { pengulanganOptions, pengingat } from "@/app/data/mock-data";
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

export default function EditPengingatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const item = pengingat.find((p) => p.id === id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    values: item
      ? {
          judul: item.judul,
          pesan: item.pesan,
          waktu: item.waktu,
          pengulangan: item.pengulangan,
        }
      : undefined,
  });

  if (!item) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Pengingat tidak ditemukan.</p>
        <Button asChild variant="link">
          <Link href="/sketsa/pengingat">Kembali ke daftar pengingat</Link>
        </Button>
      </div>
    );
  }

  const onSubmit = (data: FormData) => {
    console.log("Update pengingat:", id, data);
    alert("Pengingat berhasil diupdate!");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/sketsa/pengingat">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Edit Pengingat</h1>
          <p className="text-muted-foreground">Ubah detail pengingat</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Form Edit Pengingat</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="judul">Judul</Label>
              <Input id="judul" {...register("judul")} />
              {errors.judul && (
                <p className="text-sm text-destructive">
                  {errors.judul.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="pesan">Pesan</Label>
              <Textarea id="pesan" {...register("pesan")} />
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
              <Select
                defaultValue={item.pengulangan}
                onValueChange={(v) => setValue("pengulangan", v)}
              >
                <SelectTrigger>
                  <SelectValue />
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
              <Button type="submit">Simpan Perubahan</Button>
              <Button asChild variant="outline">
                <Link href="/sketsa/pengingat">Batal</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
