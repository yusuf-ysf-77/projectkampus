"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const schema = z
  .object({
    passwordLama: z.string().min(1, "Password lama wajib diisi"),
    passwordBaru: z.string().min(6, "Password baru minimal 6 karakter"),
    konfirmasi: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.passwordBaru === data.konfirmasi, {
    message: "Konfirmasi password tidak cocok",
    path: ["konfirmasi"],
  });

type FormData = z.infer<typeof schema>;

export default function UbahPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Ubah password:", { passwordLama: data.passwordLama });
    alert("Password berhasil diubah!");
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href="/profil">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Ubah Password</h1>
          <p className="text-muted-foreground">Perbarui password akun Anda</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Form Ubah Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="passwordLama">Password Lama</Label>
              <div className="relative">
                <Input
                  id="passwordLama"
                  type={showPassword ? "text" : "password"}
                  {...register("passwordLama")}
                  placeholder="Masukkan password lama"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.passwordLama && (
                <p className="text-sm text-destructive">
                  {errors.passwordLama.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="passwordBaru">Password Baru</Label>
              <Input
                id="passwordBaru"
                type="password"
                {...register("passwordBaru")}
                placeholder="Masukkan password baru"
              />
              {errors.passwordBaru && (
                <p className="text-sm text-destructive">
                  {errors.passwordBaru.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="konfirmasi">Konfirmasi Password Baru</Label>
              <Input
                id="konfirmasi"
                type="password"
                {...register("konfirmasi")}
                placeholder="Ulangi password baru"
              />
              {errors.konfirmasi && (
                <p className="text-sm text-destructive">
                  {errors.konfirmasi.message}
                </p>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit">Simpan Perubahan</Button>
              <Button asChild variant="outline">
                <Link href="/profil">Batal</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
